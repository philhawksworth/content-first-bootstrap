const fs = require('fs');
const gulp = require('gulp');
const runSequence = require('run-sequence');
const contentful = require('contentful');
const clean = require('gulp-clean');
const pug = require('pug');
const sass = require('gulp-sass');
const mkdirp = require('mkdirp');
const md = require('marked');
const extend = require('extend')
const webserver = require('gulp-webserver');


// set up the contentful query client
// readonly access from these creds
var client = contentful.createClient({
  space: '816a4wnwhz0n',
  accessToken: 'f4fda8fe98ee467b1638ca7617931b09a58aebc00e5c52f2fb8aace1e6393b22'
});

// The content data for the site.
var site = {
  pages : {}
  // TODO: add rootURL as environment variable
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
        
        // gather the page sections
        var pageSections = [];
        for(var section in fields.contentSections) {
          pageSections.push(fields.contentSections[section].fields);
        }

        // populate the page object
        site.pages[fields.url] = {
          title: fields.title,
          url: fields.url,
          pagePurpose: fields.pagePurpose,
          pageContent: fields.pageContent,
          contentSections: pageSections
        }
        
        console.log("gathered data for ", fields.url);
      }
      fs.writeFileSync('dist/site.json', JSON.stringify(site));
    })
);


// Generate the pages of the site from the gathered content data
gulp.task('generate', function(){
  for(var page in site.pages) {
    console.log("Generate ", page);
    var path = "dist" + page.split(".")[0];
    mkdirp.sync(path);
    var html = pug.renderFile('src/templates/base.pug',  extend({"md":md, "pretty": true}, site.pages[page], {"site": site}));
    fs.writeFileSync(path +'/index.html', html);
  }
});


// Compile CSS from Sass
gulp.task('sass', () =>
  gulp.src(['src/sass/base.scss'])
    .pipe(sass({outputStyle: 'compressed', includePaths: ['./src/sass/include']}).on('error', sass.logError))
    .pipe(gulp.dest('dist/style'))
);

// compile scripts as required
gulp.task('scripts', () =>
  gulp.src(['src/scripts/**.js'])
    .pipe(gulp.dest('dist/scripts'))
);



// serve the static dist folder
gulp.task('serve', function() {
  gulp.src('dist')
    .pipe(webserver({
      livereload: false,
      open: false
    }));
});


// Watchers
gulp.task('sass:watch', () =>
  gulp.watch('src/sass/**/*.scss', ['sass'])
);
gulp.task('templates:watch', () =>
  gulp.watch('src/templates/**/*.pug', ['generate'])
);



// run the build in sequence
gulp.task('build', function (cb) {
  runSequence(
    'clean',
    'get:pages',
    ['generate', 'sass', 'scripts'],
    cb
  );
});


// default helpers
gulp.task('default', ['build']);
gulp.task('watch', ['sass:watch', 'templates:watch']);

