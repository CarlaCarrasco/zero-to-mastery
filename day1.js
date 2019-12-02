/* 
    Advent of code 25 days till Xmas challenge
    Description: https://adventofcode.com/2019/day/1
    Input: https://adventofcode.com/2019/day/1/input
    Challenge01
*/
let str = document.querySelector('pre');
let newStr = str.textContent;
let arr = newStr.split("\n");
let calc = arr.map(function(num) {
    return Math.floor(num/3 - 2);
    
});
calc.pop(); // remove last element (line break?)
calc.reduce(function(total, num) {
    return Math.floor(total + num)
})
