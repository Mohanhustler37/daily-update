Higer Order Functions (forEach, filter, map, sort, reduce)
----- ----- ---------

forEach => returns nothing

// Synchronous call back function
arr.forEach((element, index, entireArr) => { })

----------------------------------------------------------

filter => returns newArray with less no. of elements in original array

// filter takes condition and return array if its true
const newArray = arr.filter((element) => element >= 21 );

----------------------------------------------------------

map => returns newArray with same no. of elements in original array

// map returns an array so we can map again that array
const sameNoOfEle = arr.map(arr => Math.sqrt(arr))
			.map(arr => arr * 2);

----------------------------------------------------------

sort => returns newArray with same no. of elements in original array

const sameNoOfEle = arr.sort((c1, c2) => c1 > c2 ? return 1 : return -1);

// ASCE

const asc = arr.sort((a, b) => a - b);

// DESC

const desc = arr.sort((a, b) => b - a);

----------------------------------------------------------

reduce => takes two parameters,  first => callback, second => initial value

conat sum = age.reduce((total, age) => total + age, 0);

----------------------------------------------------------

const combined = ages
		.map(age => age * 2)
		.filter(age => age >= 40)
		.sort((a, b) => a - b)
		.reduce((a, b) => a + b, 0);

----------------------------------------------------------

JS CRASH COURSE
-- ----- ------
WHAT:
High level => no need of memory managemant
interpreted => no need of compiler to run the programming
Multi-paradigm => either functional or object oriented
Used for => form validation, alerts
js server using nodejs runtime.

WHY:
programming language of the browser.
used to build very interactive UI with frameworks like React
Used for Server side and full stack applications.
Used in mobile development(React Native, NativeScript, Ionic)
Used in desktop application(Electron Js) 

var => global scope
let => mutable 
const => immutable, more robust and secure, less prompt for errors

primitive datatypes => directly assigned to memory (strings, numbers, boolean, null, undefined, symbols)

No need of semicolon to terminate the line

typeof varName

template string

string properties => 
str.length;
str.toUpperCase();
str.toLowerCase();
str.subString(startIndex, endIndex); // if endIndex is 5, its stop before 5
str.split(''); // returns array of values

Array that hold mutiple values with any data type

array constructor => const num = new Array(1,2,3,4); 

arr.push('qwerty'); // push the value on the end
arr.unshift('asdfgh');// push the value at start
arr.pop();
Array.isArray(arr); // to check if it is an array
arr.indexOf('element');

Object Literals: key value pair
------ --------
const obj = { key: 'value' };

obj.name = 'me';

Destructuring:
const { name, email, address: { city } } = person;
// person object contains address object and that contains city as member

Json is a data format, used for sending data to the server and recieve from server.

array of object: (todos)
----- -- ------
JSON.stringify(todos);

for(let todo of todos){ }

default parameters

Create Objects:
1. function constructor with prototype
2. class

1 =>
// Function Constructor 
function Person(name, dob){
 this.name = name,
 this.dob = new Date(dob)

 this.getName = function() { return this.name; }
}
// Prototype Function
Person.prototype.getYear = function() { return this.dob.getFullYear(); }

// Instantiate object
conat person1 = new Person('mohan', '15.06.1994');

--------------------------               ------------------------------------------
class
-----

class Person {
 constructor(name, dob){
  this.name = name,
  this.dob = new Date(dob)
 }
 
 getName() { return this.name; }
 getYear() { return this.dob.getFullYear(); }
 
}

Single Element Selector(if more than one => it will give the first)
------ ------- --------
document.getElementById('my-form');
document.querySelector('h1');

Mutiple Element Selector
------ ------- --------
document.querySelectorAll('h1');
document.getElementByClassName('item');
document.getElementByTagName('li');

const ul = document.querySelector('ul');
ul.remove();
ul.lastElementChild.remove();
ul.firstElementChild.textContent = 'Hello';
ul.childern[1].innerText = 'Brad';
ul.lastElementChild.innerHTML = '<h1>Hello</h1>';
ul.style.background = 'red';

btn.addEventListener('click', (e) => { 
 e.preventDefault(); // restrict the form submitting or button submit 
 console.log(e.target);

});

document.querySelector('h1').classList.add('bg-dark');


setTimeout(() => msg.remove(), 3000);
 
const li = document.createElement('li');
li.appendChild(document.createTextNode('qwerty' : 'asdfgh'));

ul.appendChild(li);


JSON:
Javascript Object Notation
Lightweight data-interchange format
Often used with AJAX(more than XML)

Data Type:
Number  (without double quotes, int or float)
String  (with double quotes)
Boolean (true or false)
Array   (ordered list)
Object  (Unordered collection) 
Null    (empty value)

Syntax: { "name": "value" }
File type => .json
MIME type => "Application/json"

JSON.stringify(obj);
JSON.parse(obj);

we can't give function as argument in JSON. check json online validater


































