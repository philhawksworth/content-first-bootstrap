const fs = require('fs');
const gulp = require('gulp');
const runSequence = require('run-sequence');
const contentful = require('contentful');
const clean = require('gulp-clean');
const pug = require('pug');
const mkdirp = require('mkdirp');
const md = require('marked');
const extend = require('extend')

// set up the contentful query client
// readonly access from these creds
var client = contentful.createClient({
  space: '816a4wnwhz0n',
  accessToken: 'f4fda8fe98ee467b1638ca7617931b09a58aebc00e5c52f2fb8aace1e6393b22'
});

// The content data for the site.
var site = {
  pages : {}
};


// Clean up output directory
gulp.task('clean', function () {
  return gulp.src('dist/*', {read: false})
    .pipe(clean());
});




// Get the pages data from the cloud CMS and stash them locally
gulp.task('get:pages', () =>
  client.getEntries({'content_type':'page', 'select':'fields'})
    .then(
    function(resp) {
      for(var item in resp.items) {
        var fields = resp.items[item].fields;
        site.pages[fields.url] = {
          title: fields.title,
          pagePurpose: fields.pagePurpose,
          pageContent: fields.pageContent
        }
        console.log("gathered data for ", fields.url);
      }
      fs.writeFileSync('dist/site.json', JSON.stringify(site));
    })
);

gulp.task('generate', function(){

  console.log("Generate HTML");

  for(var page in site.pages) {
    console.log("Generate ", page);
    var path = "dist" + page.split(".")[0];
    mkdirp.sync(path);
    var html = pug.renderFile('src/templates/base.pug',  extend({"md":md}, site.pages[page]));
    fs.writeFileSync(path +'/index.html', html);
  }

});

gulp.task('build', function (cb) {
  runSequence(
    'clean',
    'get:pages',
    'generate',
    cb
  );
});

gulp.task('default', ['build']);

