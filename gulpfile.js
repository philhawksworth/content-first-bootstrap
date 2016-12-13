const gulp = require('gulp');
const contentful = require('contentful');

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


// Get the pages data from the cloud CMS and stash them locally
gulp.task('get:pages', function() {
  console.log("Getting pages from CMS...");
  client.getEntries({'content_type':'page', 'select':'fields'}).then(
    function(resp) {
      for(item in resp.items) {
        var fields = resp.items[item].fields;
        site.pages[fields.url] = {
          title: fields.title,
          pagePurpose: fields.pagePurpose,
          PageContent: fields.PageContent
        }
        console.log("gathered data for ", fields.url);
      }
    }
  ).then( function(){
    console.log("...done getting pages. ");
  })
});


gulp.task('default', ['get:pages']);
