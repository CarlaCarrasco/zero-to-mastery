/*
  Notes on advanced arrays:
  - Looping through arrays in various ways
  - Looping through objects in various ways
*/

const basket = ['apples', 'oranges', 'grapes'];
const detailedBasket = {
  apples: 5,
  oranges: 10,
  grapes: 1000
}

//1
for (let i = 0; i < basket.length; i++) {
  console.log(basket[i]);
}

//2
basket.forEach(item => {
  console.log(item);
})

// for of loop (arrays & strings)
// this is Iterating: Looping throught iterables (arrays & strings). 
for (item in detailedBasket) {
  console.log(item);
}

// for in loop (object properties)
// this is Enumerating: Looping through objects. Properties of an object are enumerable. 
for (item of basket) {
  console.log(item);
}

// Question #1:
// create a function called biggestNumberInArray() that takes
// an array as a parameter and returns the biggest number.
// biggestNumberInArray([-1,0,3,100, 99, 2, 99]) should return 100;
// Use at least 3 different types of javascript loops to write this:
const array = [-1,0,3,100, 99, 2, 99] // should return 100
const array2 = ['a', 3, 4, 2] // should return 4
const array3 = [] // should return 0

function biggestNumberInArray(arr) {
  let newArr = [];
  let highest = 0;
  for (let i = 0; i < arr.length; i++) { // this would be the old way of solving this problem
    if (highest < arr[i]) {
      highest = arr[i];
    }
  }
  return highest

}
biggestNumberInArray(array);

function biggestNumberInArray2(arr) {
  let highest = 0;
  arr.forEach(item => { // for each loop
    if (highest < item) {
      highest = item;
    }
  })
  return highest;
}

function biggestNumberInArray3(arr) {
    let highest = 0;
  for (item of arr) { // for of loop
    if (highest < item) {
      highest = item;
    }
  }
  return highest;

}

// Question #2:
// Write a function checkBasket() that lets you know if the item is in the basket or not
amazonBasket = {
  glasses: 1,
  books: 2,
  floss: 100
}

function checkBasket(basket, lookingFor) {
  // for in loop - used for looping through objects
  for (item in basket) { 
    if (item === lookingFor) {
      return `${lookingFor} is in your basket`
    }
  }
  return 'that does not exist in your basket'
}

checkBasket(amazonBasket, 'glasses');
checkBasket(amazonBasket, 'Drone');
