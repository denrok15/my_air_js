/*
Дан массив целых неотрицательных чисел, нужно сгруппировать друг с другом числа,
которые можно получить путём перестановки цифр их составляющих,
нули при этом игнорируем, т. к. нет числа 011.
Решение должно быть максимально эффективно по памяти и времени.
*/

function digitPermutation(arr) {
    const result = {}
    arr.forEach((digit) => {
        const key = String(digit)
            .split('')
            .filter(el => el !== '0')
            .sort()
        if (result[key]) {
            result[key].push(digit)
        }
        else {
            result[key] = [digit]
            }
    })
    return Object.values(result)

}

console.clear();
console.log("start test");
console.log(
  digitPermutation([1230, 99, 23001, 123, 111, 300021, 101010, 90000009, 9])
);
// [[99, 90000009], [111, 101010], [1230, 23001, 123, 300021], [9]]
console.log(digitPermutation([11, 22])); // [[11], [22]]
console.log(digitPermutation([11111111112, 122222222222])); // [[11111111112], [122222222222]]
console.log("end test");


// Результат:

function render(msg) {
    console.log(msg)
}

function createmessage() {
    let expectid = 1
    const buffer = new Map()
    return function(msg) {
        buffer.set(msg.id,msg.text)
        while (buffer.has(expectid)) {
            render(buffer.get(expectid))
            buffer.delete(exectid)
            expectid += 1
        }
    }

    }



printFileTree(data);
function allSequences(words) {
  const position = new Array(words.length).fill(0);
  let finished = false;

  return function nextSequence() {
    if (finished) return undefined;

    const current = position.map((val, i) => words[i][val]).join(" ");

    for (let i = words.length - 1; i >= 0; i--) {
      position[i]++;

      if (position[i] < words[i].length) break;

      position[i] = 0;

      if (i === 0) {
        finished = true;
      }
    }

    return current;
  };
}

const nextSequence = allSequences([
  [0, 1, 2],
  ["a", "b"],
  ["?", "!", "."],
]);

console.log(nextSequence()); // "0 a ?"
console.log(nextSequence()); // "0 a !"
console.log(nextSequence()); // "0 a ."
console.log(nextSequence()); // "0 b ?"
// ...
console.log(nextSequence()); // "2 b ."
console.log(nextSequence()); // undefined
function promiseAny(promises) {
    return new Promise((resolve, reject) => {
        let rejectedCount = 0;
        const errors = [];

        promises.forEach((promise) => {
            Promise.resolve(promise)
                .then(resolve) // Если промис успешен — сразу резолвим результат
                .catch((error) => {
                    errors.push(error);
                    rejectedCount++;
                    if (rejectedCount === promises.length) {
                        reject(new AggregateError(errors, "All promises were rejected"));
                    }
                });
        });
    });
}


