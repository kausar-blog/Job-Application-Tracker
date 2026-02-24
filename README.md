# Job-Application-Tracker

## Answers to Questions

### 1. What is the difference between getElementById, getElementsByClassName, and querySelector / querySelectorAll?

### Answer :

## getElementById selected a single element its unique id. and return 1 element and first single method selecting an element by id

#### const header = document.getElementById('header');

## getElementByClassName selected a element its unique class. and returns an HTMLCollection (live collection). can access element like job[0], job[1]

#### const job = document.getElementByClassName('menu-job');

## querySelector / querySelectorAll.. use css selectors to the element querySelector → returns the first matching element. but querySelectorAll → returns the all matching element.

### const firstItem = document.querySelector(".menu-job");

### const allItems = document.querySelectorAll(".menu-job");

### 2. How do you create and insert a new element into the DOM?

### Answer:

## first time create element using document.createElement(). .. then set content or attributes... than using methods as your wish ... appendChild, prepend, parentNode, children, etc etc...

#### js code this project :: `

const kausar = document.createElement('div');

kausar.innerText = 'Hello, this is my new project';
kausar.className='kausar-blog';
kausar.style.backgroundColor='red';

const container = document.getElementById('container');
container.appendChild(kausar);
`

## container.prepend(kausar) - add this beginning

### 3. What is Event Bubbling? And how does it work?

### answer:

## bubbling is the event propagate in this DOM from child elements up to the parent elements. first time start to the end and there the output the end to the start... first, the button event runs. Then the div event runs. Then the body event runs.

### 4. What is Event Delegation in JavaScript? Why is it useful?

## answer:

## event delegation is the technique and attach a single event listener to there ar parent element handle for this element. and adding event listeners to many children . on the parent and use the event's target to identify which child was clicked.

### js code `

document.getElementById('menu').addEventListener('click', (event) => {
fif(event.target.tagName==='MENU'){
console.log('click this menu: ', event.target.innerText);
}
});
`

### 5. What is the difference between preventDefault() and stopPropagation() methods?

### answer: preventDefault() vs stopPropagation()

## method --> preventDefault() stops the browser.. browser's default behavior for the event ... dose not stop for event bubbling to the DOM ....

## method --> stopPropagation() stops the event ... event form moving (bubbling) to the parent elements ... does not stop the browser's the default behavior.. Only "Child clicked" will print.
