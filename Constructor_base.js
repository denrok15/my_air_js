// ===== 1. Конструктор Product =====
// Создает объекты продуктов с именем и ценой
function Product(name, price) {
  // Свойства экземпляра
  this.name = name;
  this.price = price;
}

// Метод в прототипе - будет доступен всем экземплярам
Product.prototype.info = function() {
  console.log(`Продукт: ${this.name}, цена: ${this.price}`);
}

// Создание экземпляра продукта
const moloko = new Product('Молоко', 25);
moloko.info(); // Вывод: "Продукт: Молоко, цена: 25"

// ===== 2. Конструктор Person =====
// Создает объекты персон с именем
function Person(name) {
  this.name = name;
}

// Метод в прототипе
Person.prototype.sayName = function() {
  console.log(`Твое имя ${this.name}`);
}

// ===== 3. Конструктор Student =====
// Создает объекты студентов с именем и группой
function Student(name, group) {
  this.name = name;
  this.group = group;
}

// Метод в прототипе
Student.prototype.intro = function() {
  console.log(`Группа ${this.group} Имя ${this.name}`);
}

// ===== 4. Полифил для оператора new =====
// Реализация собственной версии оператора new
function myNew(constructor, ...args) {
  // 1. Создаем новый пустой объект
  const buffer = {};
  
  // 2. Устанавливаем прототип нового объекта
  Object.setPrototypeOf(buffer, constructor.prototype);
  
  // 3. Вызываем конструктор с привязанным контекстом
  constructor.apply(buffer, args);
  
  // 4. Возвращаем созданный объект
  return buffer;
}

// Пример использования:
const student = myNew(Student, 'Иван', 'Группа A');
student.intro(); // Вывод: "Группа Группа A Имя Иван"

// ===== 5. Работа с контекстом (this) =====
// Функция, использующая this
function sayHello() {
  console.log(`Привет, меня зовут ${this.name}`);
}

const user = { name: "Артем" };

// Вызов функции с явным указанием контекста
sayHello.call(user); // Вывод: "Привет, меня зовут Артем"
