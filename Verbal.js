Promise.resolve(1)
.then(() => 2)
.then(() => Promise.reject('Error'))
.then((x)=> 4 / x)
.catch(() => 3)
.then((x) => x * 3)
  .then((x) => Promise.resolve(x + 1))
.then(console.log)
console.log(typeof foo);
foo();

function foo() {
  console.log('Hello from foo');
}

console.log(typeof bar);
bar();

var bar = function () {
  console.log('Hello from bar');
};

console.log('Start');

setTimeout(() => {
  console.log('Timeout');
}, 0);

Promise.resolve().then(() => console.log('Promise'));

console.log('End');
