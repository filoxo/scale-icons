# Goals

- Simple: add svg images, get out an optimized svg spritesheet with an Icon component to surface these to your app.
- Separate: icons are a separate concern with regards to frontend development. By having a dedicated library for icons, you can optimize and reach for the right tools.
- Visual: too much of this is done without visual feedback. Every icon should be validated down to the pixel.
- Optimized: good icons should be fast and optimized for the web. takes many images, and makes it into one svg sprite that is delivered to the browser; and can be reused throughout the dom with minimal performance.

## Requirements

! this list is incomplete

- sizes should be consistent
  - same viewport size
  - fill='currentColor'
  - fill vs stroke
- typescript/ide autocomplete
- svgs should be reused, not duplicated in the dom
- svgs should be optimized for web
- some sort of visual feedback automatically generated
- should be accessible

### Non-requirements

- no need to import SVG components in React (might even go so far as to say its a bad practice in general...)
- no need for reusing SVG icons in CSS. they can simply be Icon components targeted with normal CSS, or find an alternative styling.
- ! Icons are NOT illustrations. targetting direct svg contents/children elements is not a requirement and should have a different workflow.

## future features

# implemenation notes

- use Vite for modern features (TS, speed, etc.)
- rollup plugins are very simple, and api compatible with vite
  - https://github.com/godxiaoji/rollup-plugin-svg-sprites 
    - [to generate a single sprite](https://github.com/godxiaoji/rollup-plugin-svg-sprites#a-large-number-of-svgs)

## the build pipeline...
- get list of svgs
- validate that each one of them following some rules (ie. has a viewBox, etc.)
- optimize each svg with svgo
- take all svgs and combine into a single spritesheet
- take all svgs and generate an Icon component (React) that autogens an enum of all icon names
