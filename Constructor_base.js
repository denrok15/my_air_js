function Product(name, price) {
  this.name = name;
  this.price = price;
}

Product.prototype.info = function () {
  console.log(`Продукт : ${this.name}, цена: ${this.price}`);
}


const moloko = new Product('Молоко', 25)
moloko.info()


function Person(name) {
  this.name = name;
}

Person.prototype.sayName = function () {
  console.log(`Твое имя ${this.name}`)
}

function Student(name, group) {
  this.name = name;
  this.group = group;

}

Student.prototype.intro = function () {
  console.log(`Группа ${this.group} Имя ${this.name}`);
}

function myNew(constructor, ...args) {
  const buffer = {}
  Object.setPrototypeOf(buffer,constructor.prototype)
  constructor.apply(buffer, args);
  return buffer

}
function sayHello() {
  console.log(`Привет, меня зовут ${this.name}`);
}

const user = { name: "Артем" };

sayHello.call(user); // Привет, меня зовут Артем

