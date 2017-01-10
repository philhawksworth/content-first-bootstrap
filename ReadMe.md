# Content first scaffold

A very basic site scaffold intended to accelerate the content creation and site IA process.

## The concept

Web design and development is usually more successful when the design and creation of content happens early in the process. The content is important for informing the IA, the UX and the visual design.

This tool helps content strategists and copywriters begine creating content in a way that outputs a simple, structured web site. Organised by descrete content blocks and pages, the site that emerges can used as the basis for further planning and development.

## Features

- Create pages and populate with content blocks
- Structured text formatting within content blocks via Markdown
- A logical and user friendly content management interface via Contentful
- Control over url structures
- A site automatically generated and deployed to the web for sharing and review
- Content blocks on pages decorated with logical class names to allow the beginnings of styling and further development.
-  A central content repository which can be used for onward site development.

## Prerequisites

- A content space in Contentful with the following content structure:
```
    // describe content structure
    {}
``` 
- A development build, deployed to Netlify for build automation

## Development

After forking this repo, install the dependencies with NPM.

`npm install`

Add Contentful access details to the `config.json` file.

### Pull content from Contentful

`gulp content`

### Run development build

`gulp dev` or `gulp`

### Pull content and build 

`gulp build`

### Deploy to Netlify

After adding a site to Netlify and configureing a build (`gulp build`) triggered from changes to the master branch - 

`git push`



