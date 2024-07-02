// function fsequence(n) {
//   if (n == 1) {
//     return 0;
//   } else if (n == 2) {
//     return 1;
//   } else {
//     return fsequence(n - 1) + fsequence(n - 2);
//   }
// }

// console.log(fsequence(11));

// function Student(name, age, major) {
//   this.name = name;
//   this.age = age;
//   this.major = major;
// }

// Student.prototype.sayHi = function () {
//   console.log(this.name + "說你好");
// };

// class Student {
//   constructor(major) {
//     this.major = major;
//   }

//   sayHi() {
//     console.log(this.name + "說你好");
//   }
// }

// class Person {
//   constructor(name, age) {
//     this.name = name;
//     this.age = age;
//   }
// }

// class Student extends Person {
//   constructor(name, age, major) {
//     super(name, age);
//     this.major = major;
//   }
// }

class Circle {
  static allCircles = [];

  constructor(radius) {
    this.radius = radius;
    Circle.allCircles.push(this);
  }

  getArea() {
    return Math.PI * this.radius * this.radius;
  }

  static getAllCircleAreaTotal() {
    let result = 0;
    Circle.allCircles.forEach((circle) => {
      result += circle.getArea();
    });
    return result;
  }
}

let c1 = new Circle(10);
let c2 = new Circle(10);
let c3 = new Circle(10);

console.log(Circle.getAllCircleAreaTotal());
