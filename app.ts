//Basic Native types ------------------------------------------------------------------

//Typing explicitly
let aString: string;

aString = "Hello World";

//Typing implicitly
let aNum = 5;

//Invalid due to implicit typing from initial declaration
// aNum = "hi";

//Typing bool implicitly
let aBool = true;

//Undefined types default to type of any. Bad practice, since we are making a point to use Typescript anyway
let anyVar;

//Union with | to define an or situation for the types this variable will accept
let year: string | number;

//Both following statements are valid as they satisfy each available type for year
year = 2022
year = "2022"

//Year cannot be a boolean, it was not allowed
// year = true;

//Parsed year is now using the year variable but is enforcing its own type of a constant number through the ParseInt function
const parsedYear = parseInt(year);

//----------------------------------------------------------------------------------------

//Arrays - same functionality available as native JS

//Implicit array typing
let arrString = ['a','b','c'];

//Explicit array typing
let arrAltString: string[] = [];

//Explicit number arrays
let arrNumber: number[] = [];

//Implicit bool arrray
let arrBool = [true,false];

//Redundant typing example for boolean array
let arrAltBool: boolean[] = [true,false];

//Implicitly types union array
let arrMix = [1, "a", true];

//Explicitly typed union array, accepts multiple types
let arrAltMix: (string | number| boolean)[] =[];
arrAltMix[0] = "b";
arrAltMix.push(5);


//TUPLES

//Explicitly define the spot in the array for which types belong. Place typing within brackets instead of parenthesis to enforce placement of types into array
//This means you cant implicitly type a tuplea array either, because implicit use will default to unions.
let arrTuple: [string,number] = ["string", 5];

// -----------------------------------------------------------------------------------------------
//Objects

//Types within the object get implicit assignment in this example
//Person object can only have a name with type string, and age of type number
let person = {
    name: "James",
    age: 27
}

// ---------------------------------------------------------------------------------------------------

//Type Aliases
//For example, lets say we use the string | number union often for variables, might want to establish a custom type
type stringOrNum = string | number;
let custYear: stringOrNum;

custYear = 2022;
custYear = "2022"

//--------------------------------------------------------------------------------------------------

//Functions usually dont like accepting any types, so explicit define parameter types to be used
//Below is also explicitly types that the return value will be a number; however, we don't have to for this function's case as typescript
//uses the type outcome from the returned values (both being numbers);
function calcSum(a: number,b: number): number{
    return a + b;
}
calcSum(2,2);

//Declaring function first as arrow function purely defining it. This function will accept 2 numbers and return a number.
let altCalcSum: (a: number, b: number) => number;

//Typescript enforces proper use of this functions parameter types and return types since we define it previously.
altCalcSum = (first, second) => {
    return first + second;
}

//Optional parameter alteration using ?, always at the end of the function, not the beginning
let optCalcSum: (a: number, b: number, c?: number) => number;

//Types are enforced again but use of the third parameter isnt as we allowed it to be optional
optCalcSum =  (first,second) => {
    return first + second;
}

optCalcSum(2,2);

// ---------------------------------------------------------------------------------------------------

//Void Type, return void
const sayHi = () => {
    console.log('Hi');
}
//----------------------------------------------------------------------------------------------------

//Interfaces and Classes
//Enforce the shape/structure of an object

//Define a person and what is should look like (its requirements)
interface PersonInterface {
    name: string;
    age: number;
}

//mike is just an object, formed as declared, not adhering to our interface
let mike = {
    name: "mike",
    age: 34
}

//James is using the PersonInterface and Typescript requires defining name and age or else james is an invalid implementation of PersonInterface
//Also, we cannot add anything to james that isnt defined as a part of the PersonInterface
let james: PersonInterface = {
    name: "james",
    age: 30
}

//Classes can implement an interface

class Person implements PersonInterface {

    //Use private to make sure that properties of our class are inaccessible to implementations of the class, but code will be upset this was set in the interface.
    private name: string;
    //public is implicitly assigned to properties
    age: number;
    //Additional properties are invalid as ts enforces the PersonInterface
    // height: string;

    constructor(n: string, a: number){
        this.name = n;
        this.age = a
    }

    greet(){
        return `Hi, my name is ${this.name}, and I am ${this.age}.`
    }
}

let anne = new Person("Anne", 25);

//Age is a publicly accessible property of our class
anne.age = 34;

//Below is invalid since the name property was privatized, cannot access it to change it\
// anne.name = "Annitta"

console.log(anne.greet());

// ---
//Rewrite the same class but cleaner

class AltPerson implements PersonInterface {
    constructor(public name: string, public age: number){}

    greet(){
        return `Hi, my name is ${this.name}, and I am ${this.age}.`
    }
}

let jack = new AltPerson("Jack", 23);

//Below is invalid since the name property was privatized, cannot access it to change it\
// anne.name = "Annitta"

console.log(jack.greet());

//---------------------------------------------------------------------------------------------------

//DOM Manipulation and Type Casting

//Typescript doesnt not know if the element by Id exists, could be null, and so it also doesnt know what type we are working with
// const inputName = document.querySelector('#name');

//# accessor for elements by Id in html
//So instead we define that the type will be an HTMLInputElement via type casting
 const inputName = document.querySelector('#name') as HTMLInputElement;
 const inputAge = document.querySelector('#age') as HTMLInputElement;
 //TS will know this is a form since it is also a type of html tag
 const inputForm = document.querySelector('form')!; 
 // . accessor for classes in html, and need to be type cast for div
 const greeting = document.querySelector('.greeting') as HTMLDivElement;

 //Since inputForm may be null/not present, typescript requires the ? operator OR add an ! to the form variable declaration
inputForm.addEventListener('submit', (e) => {
    e.preventDefault(); // prevent page refresh

    //Use our form inputs to create a new person object
    //Age is not immediately recognized as a number, even though the HTML input type was number, so we use valueAsNumber
    const person = new Person(inputName.value, inputAge.valueAsNumber)

    //innerText is recognized as coming from the HTML's div element
    greeting.innerText = person.greet();

    //reset form after submit
    inputForm.reset();
})

//------------------------------------------------------------------------------------------------

//Generics

//TS doesn't like not knowing what an arg is, but what if we dont know what we want to pass it? make it arg of <T> or <X>, whatever, but usually T.
// <T> is now a placeholder, we can pass the placeholder type to parameters/arguments and as the return value
function doSomething<T>(arg: T): T {
    //do something
    return arg;
}

//TS accepts any of these passed args with various types
doSomething(5);
doSomething("stringTest");

//We can also now tell it what we are going to pass in
doSomething<string>("stringNewTest");

//Following fails because we said we would enter a type of string but passed in a number as the argument
//doSomething<string>(5);

//Also usable with interfaces
interface book<T> {
    id: number;
    name: string;
    data: T;
}

//When defining a variable of the interface, we must tell it what type will be passed for the generic placeholder, so it must be explicitly typed upon each implementation
const aBook: book<string> = {
    id: 1,
    name: "Hamlet",
    data: "Classical Tragedy"
}

const anotherBook: book<string[]> = {
    id: 2,
    name: "Romeo and Juliet",
    data: ["Classical Tragedy", "Classical Romance"]
}

//--------------------------------------------------------------------------------------------------------------

//Enums - a way to assign a descriptive word to a numeric value
//Like a database listing the type of a row as 2 but then you need to go to a type table to join and see what a type 2 is.

//This object has indices like an array
enum ManufacturerMake { TESLA,AUDI,MERCEDES,VOLVO,FORD,BMW}

//If make is supposed to be FORD then we can assign make such as:
const myCar = {
    year: 2022,
    make: ManufacturerMake.FORD
}

//Index number of 4 will be printed to console
console.log(myCar.make);
