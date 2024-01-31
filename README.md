# Frontend Mentor - Age calculator app solution

This is a solution to the [Age calculator app challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/age-calculator-app-dF9DFFpj-Q). Frontend Mentor challenges help you improve your coding skills by building realistic projects. 

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)
- [Acknowledgments](#acknowledgments)


## Overview

### The challenge

Users should be able to:

- View an age in years, months, and days after submitting a valid date through the form
- Receive validation errors if:
  - Any field is empty when the form is submitted
  - The day number is not between 1-31
  - The month number is not between 1-12
  - The year is in the future
  - The date is invalid e.g. 31/04/1991 (there are 30 days in April)
- View the optimal layout for the interface depending on their device's screen size
- See hover and focus states for all interactive elements on the page
- **Bonus**: See the age numbers animate to their final number when the form is submitted

### Screenshot

![width: 375px](./screenshots/375px.png)
![width: 1440px](./screenshots/1440px.png)



### Links

- Solution URL: ()
- Live Site URL: ()

## My process

### Built with

- Semantic HTML5 markup
- CSS
- SASS
- JavaScript
- Mobile-first workflow



### What I learned

This is my first project in Frontend Mentor and I started to put my learning from various sources into practice and started to make sense of frustrating css concept like width, height, flex and so much more. Here are some of the takeaways from this project:

1. I learn to analyse design and plan how I would write my html code and css before jumping right into the project and it indeed saves me a lot of time. 
2. I learn to use semantic html tags instead of divs that is very confusing if we have too much of it.
3. I learn to use variable in css so that I can reuse some of my code, and it makes maintenance so much easier. For example, multiple places need the same color.
4. I learn how to play with width and height property, position - absolute, and layout like flexbox in css.


```scss
/*Import modules
// avoid @import, use @use or both @forward and @use combined.
1. In scss partial, create _index.html - the purpose is to collect every modules in the folder, and send them out as a single file (instead of multiple files, which is troublesome).
2. write @forward codes in it.
  - use can rename namespace with any name
  - or use * to take away the namespace completely (so we don't need to specify module name in order to access codes inside it.).
3. write @use codes in other files.
*/

@forward 'abstracts/fonts';
@forward 'abstracts/colors';

@use 'abstracts' as *;
@use 'abstracts' as *;
```

### Continued development

My next step would be learning more css techniques like media queries, container queries that can make responsive web design easier. I also want to further consolidate my knowledge with position, transform, layout, animation by practising them during leisure time. Besides, I plan to start learning JavaScript and DOM Manipulation to make my future project interactive.


### Useful resources

- [Introduction To Responsive Web Design - HTML & CSS Tutorial](https://www.youtube.com/watch?v=srvUrASNj0s&t=489s) - This video further consolidates my understanding of responsive web design and other topics like width, max-width, and min-width to achieve desired styles I want.
- [4 ways to deal with overflowing text](https://www.youtube.com/watch?v=6Nv0weHy7t0) - This video from Kevin Powell taught how to deal with annoying overflowing when styling webpage with css, I implemented one of the solution and it solved the issue and I am happy with that.
- [Learn HTML – Full Tutorial for Beginners (2022)](https://www.youtube.com/watch?v=kUMe1FH4CHE) - This video made by Dave Gray and shared by FreeCodeCamp lets me understand basic html and learn semantic tags.
- [CSS Tutorial – Full Course for Beginners](https://www.youtube.com/watch?v=OXGznpKZ_sA&t=32388s) - This video gets me started with all the basic css before starting this project.
- [HTML & CSS Full Course - Beginner to Pro](https://www.youtube.com/watch?v=G3e-cpL7ofc&t=9727s) - This video combines both tutorials and project-based learning and helped me a lot with how html and css works. I grasped the concept of layout like grid and flexbox here. Very recommended due to his teaching appraoch.


## Author
- Frontend Mentor - [@WeiXinToo](https://www.frontendmentor.io/profile/WeiXinToo)

## Acknowledgments

I would like to express my sincere gratitude towards two teacher from YouTube - Dave Gray, Kevin Powell, SuperSimpleDev, Web Dev Simplified and FreeCodeCamp for all the html and cs knowledge that makes this project possible.


