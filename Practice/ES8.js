/*
  Notes about ES8 Features
*/
// Just another string method
// usefull for aligning characters of strings
'Turtle'.padStart(10)
'Turtle'.padEnd(15)
// console.log('Turtle'.padStart(10));

// Why is this useful?
const fun = (a,b,c,d) => {
  console.log(a);
}
fun(1,2,3,4);

let obj = {
  username: 'Santa',
  username1: 'Carla',
  username2: 'Mr.Bennett'
}
// displays key and value
Object.keys(obj).forEach((key, index) => {
  console.log(key, obj[key]);
})

// displays value
Object.values(obj).forEach(value => {
  console.log(value);
})

// displays value as as if it were an array
Object.entries(obj).forEach(value => {
  console.log(value);
})

// displays values like an array but adds the key at the end minus 'username'
Object.entries(obj).map(value => {
  return value [1] + value[0].replace('username', '')
})
// #3) Get the below object to go from:

let obj1 = {
  my: 'name',
  is: 'Rudolf',
  the: 'raindeer'
}
// to this: 'my name is Rudolf the raindeer'

Object.entries(obj1).map(value => value.join(" ")).join(' ')
