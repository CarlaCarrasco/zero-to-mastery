// reference type
var obj1 = { value: 10};
var obj2 = obj1;
var obj3 = { value: 10 };
console.log(obj1===obj2) // true because it's referencing the same object
console.log(obj1===obj3) // false, not referencing same object
// context tells us where we are within an object
const obj4 = {
  a: function () {
    console.log(this);
  }
}

// instantiation
class Player {
  // constructor func will run everytime a class is created
  constructor (name, type) {
    this.name = name;
    this.type = type;
  }
  intro() {
    console.log(`Hi my name is ${this.name}. I am type ${this.type}.`)
  }
}

class Wizard extends Player {
  // anytime we extend we have to call constructor
  constructor (name, type){
    // super gives access to vars
    super(name, type)
  }
  play(){
    console.log(`WEEEE I'm a ${this.type}`);
  }
}

// Create new wizards
const wiz1 = new Wizard (`Harmony`, 'Healer');
const wiz2 = new Wizard ('Mr. B', 'Viscouse Bite');

wiz1.play();
wiz1.intro();

