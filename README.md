UI Library Template
=================
The easiest way for designers and front-end developers to create, edit and view project's style guides and perform element by element styling of interface.

## Usage
To use ui library in your Ruby on Rails project rename `index.html` to something like `library.html` and put it to `public` folder of application.

Additionaly you will also need to add `library.css` and `library.js` to your application. You can place them to `public` folder as well or include them to assets pipeline by adding them to `app/assets` folder.

### Navigation
&larr; key opens and closes navigation on the left of library

&rarr; key opens and closes html code preview for elements on the right of library

&uarr; key scrolls to previous section of library

&darr; key scrolls to next section of library

### Adding sections
To add new element to the library just insert `<div class="library-section"></div>` and place element's markup inside it. Add `data-label` attribute to `.library-section` for specifying element's label.
To disable code preview for a specific element simply add `data-code="false"` to `.library-section` div.

### Color Samples
You can easily create and add color samples just by putting `<div class="library-color-sample"></div>` inside library section, and specifying background color via inline styles.

If you want to create 3 shades of initial color - put 3 `<div class="library-color-shade"></div>` inside `.library-color-sample` element and specify background color via inline styles.

## Making changes

All source files of stylesheets and javascripts are placed inside `src` folder and are written in `sass` and `coffeescript`. So to make changes you need to edit `.sass` and `.coffee` files and compile them to `.css` and `.js`.

For compiling source files you can use tools like [CodeKit](http://incident57.com/codekit/) or do it manualy with coffescript and sass via terminal:

Run from project's folder:
`sass --watch src/library.sass:stylesheets/library.css` for css changes

`coffee -o javascripts/ -cw src/` for javascript changes
