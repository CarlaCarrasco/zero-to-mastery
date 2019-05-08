/*
  Debugging
  - Given a complex line of code, break it down to understand the error or what it truly does.
*/

// Pretend that you're given this code by a coworker who asks for you to figure out what it does. 
How do you break the code down to understand its purpose?

const flattened = [[0,1], [2,3], [4,5]].reduce(
  (a,b) => a.concat(b), []);

  /* First thing to do is just read it
    Well looks like we are assigning a variable and we have 
    a nested array. The code wants to do something called flattened. 
    - We know what reduce is so we can say 
    a = accumulator
    b = array
    - The accumulator starts as an empty array
    - concat is placing the nested array into the empty array
  */

// Changed up the code to be more 'readable'
const flattened1 = [[0,1], [2,3], [4,5]].reduce(
  (accumulator, array) => {
  console.log('array', array);
  console.log('accumulator', accumulator);
  return accumulator.concat(array) 
  },[]);

/*
  How the code is proccessed
  1. The accumulator starts off blank
  2. When the first loop interates it grabs the first index, which is a nested array [0,1]
  3. Concat pushes the items in array index 0 into the accumulator.
  4. loop continues until array completely looped through. 

  - The purpose of this code is to loop through a nested array and combine all interates as a single array
    [0, 1, 2, 3, 4, 5]
    
    Note: Instead of using console.log, you can use debugger
    the debugger keyword debugger is a dev tool that allows you to go through the code step by step. 
    Although a piece of code can look confusing at first, you can use this technique to better understand the code. 
   */
