// ===== 1. Проверка анаграмм =====
// Условие: Даны две строки s1 и s2. Проверить, являются ли они анаграммами.
// Подход: Нормализуем строки (удаляем пробелы, приводим к нижнему регистру), 
// сравниваем длины, считаем частоту символов и проверяем совпадение.
// Сложность: O(n)
function isanargam(s1, s2) {
  const normalize = (str) => str.replace(/\s/g, '').toLowerCase();
  const ss1 = normalize(s1);
  const ss2 = normalize(s2);
  if (ss1.length !== ss2.length) return false; // Разные длины → не анаграммы
  const charCount = {};
  for (const char of ss1) {
    charCount[char] = (charCount[char] || 0) + 1; // Считаем частоту символов
  }
  for (const char of ss2) {
    if (!charCount[char]) return false; // Если символ отсутствует → false
    charCount[char]--; // Уменьшаем счетчик
  }
  return true;
}

// ===== 2. Проверка уникальности символов =====
// Условие: Проверить, содержит ли строка strs только уникальные символы.
// Подход: Проходим по строке, проверяем, был ли символ уже в буфере.
// Сложность: O(n²) (из-за includes в цикле)
function isuniqeue(strs) {
  let buffer = '';
  for (const char of strs) {
    if (buffer.includes(char)) return false; // Если символ уже был → false
    buffer += char; // Добавляем символ в буфер
  }
  return true;
}

// ===== 3. Поиск первого уникального элемента =====
// Условие: Найти первый элемент массива arr, который встречается только один раз.
// Подход: Считаем частоту элементов, затем ищем первый с частотой 1.
// Сложность: O(n)
function isone(arr) {
  const counter = {};
  for (const digit of arr) {
    counter[digit] = (counter[digit] || 0) + 1; // Считаем частоту
  }
  for (const item of arr) {
    if (counter[item] === 1) return item; // Первый уникальный
  }
}

// ===== 4. Бинарный поиск =====
// Условие: Найти индекс элемента target в отсортированном массиве arr.
// Подход: Делим массив пополам, сравниваем с target, сужаем диапазон.
// Сложность: O(log n)
function binarysearch(arr, target) {
  let start = 0;
  let end = arr.length - 1;
  while (start <= end) {
    let middle = Math.floor((start + end) / 2);
    if (arr[middle] === target) return middle; // Нашли элемент
    else if (arr[middle] > target) end = middle - 1; // Ищем слева
    else start = middle + 1; // Ищем справа
  }
  return -1; // Элемент не найден
}

// ===== 5. Проверка изограммы =====
// Условие: Проверить, является ли строка s изограммой (все символы уникальны).
// Подход: Используем Set для отслеживания уникальных символов.
// Сложность: O(n)
function isIsogram(s) {
  const letters = new Set();
  for (const char of s.toLowerCase()) {
    if (letters.has(char)) return false; // Если символ уже был → false
    letters.add(char); // Добавляем символ в Set
  }
  return true;
}

// ===== 6. Поиск двух чисел с заданной суммой =====
// Условие: Найти индексы двух чисел в массиве arr, дающих в сумме target.
// Подход: Используем хэш-таблицу для запоминания пройденных элементов.
// Сложность: O(n)
function twosum(arr, target) {
  const values = {};
  for (let i = 0; i < arr.length; i++) {
    const completed = target - arr[i]; // Искомое число
    if (values.hasOwnProperty(completed)) {
      return [values[completed], i]; // Нашли пару
    }
    values[arr[i]] = i; // Запоминаем индекс числа
  }
  return []; // Не нашли
}

// ===== 7. Мемоизация чисел Фибоначчи =====
// Условие: Реализовать мемоизированную функцию для вычисления чисел Фибоначчи.
// Подход: Используем кеш для хранения уже вычисленных значений.
// Сложность: O(n) (с мемоизацией)
function createfibmemo() {
  const cache = new Map();
  cache.set(0, 0);
  cache.set(1, 1);
  return function fibmemo(n) {
    if (cache.has(n)) {
      return cache.get(n); // Возвращаем кешированное значение
    }
    const result = fibmemo(n - 1) + fibmemo(n - 2);
    cache.set(n, result); // Сохраняем в кеш
    return result;
  }
}

// ===== 8. Алгоритм скользящего окна =====
// Условие: Найти длину самой длинной подстроки без повторяющихся символов.
// Подход: Используем два указателя и хэш для отслеживания позиций символов.
// Сложность: O(n)
function slidingwindow(str) {
  let left = 0;
  let maxlength = 0;
  const chars = {};
  for (let right = 0; right < str.length; right++) {
    const curchar = str[right];
    if (chars[curchar] >= left) {
      left = chars[curchar] + 1; // Сдвигаем левую границу
    }
    chars[curchar] = right; // Запоминаем позицию символа
    maxlength = Math.max(maxlength, right - left + 1); // Обновляем максимум
  }
  return maxlength;
}

// ===== 9. Максимальный подмассив =====
// Условие: Найти максимальную сумму подмассива в массиве nums.
// Подход: Алгоритм Кадане: динамически обновляем текущий и глобальный максимум.
// Сложность: O(n)
function maxpodmarra(nums) {
  let maxCurrent = nums[0];
  let maxGlobal = nums[0];
  for (let i = 1; i < nums.length; i++) {
    maxCurrent = Math.max(nums[i], maxCurrent + nums[i]); // Локальный максимум
    if (maxCurrent > maxGlobal) {
      maxGlobal = maxCurrent; // Обновляем глобальный максимум
    }
  }
  return maxGlobal;
}

// ===== 10. Проверка валидности скобок =====
// Условие: Проверить, правильно ли расставлены скобки в строке str.
// Подход: Используем стек для отслеживания открывающих скобок.
// Сложность: O(n)
function isskobki(str) {
  const stack = [];
  const pairs = {
    ')': '(',
    ']': '[',
    '}': '{'
  };
  for (let char of str) {
    if (['(','[','{'].includes(char)) {
      stack.push(char); // Добавляем открывающую скобку в стек
    } else if ([')',']','}'].includes(char)) {
      const popi = stack.pop(); // Достаем последнюю открывающую
      if (popi !== pairs[char]) {
        return false; // Не совпадает тип скобок
      }
    }
  }
  return (stack.length === 0); // Стек должен быть пустым
}

// ===== 11. Проверка панграммы =====
// Условие: Проверить, содержит ли строка text все буквы алфавита.
// Подход: Используем Set для отслеживания уникальных букв.
// Сложность: O(n)
function ispangram(text) {
  const chars = new Set();
  for (const char of text.toUpperCase()) {
    if (/[A-Z]/.test(char)) {
      chars.add(char); // Добавляем букву в Set
    }
  }
  return chars.size === 26; // Должны быть все 26 букв
}

// ===== 12. Группировка чисел по произведению цифр =====
// Условие: Сгруппировать числа из массива arr по произведению их цифр.
// Подход: Для каждого числа вычисляем ключ (произведение цифр) и группируем.
// Сложность: O(n * k), где k — среднее количество цифр
function groupByDigitProduct(arr) {
  const result = {};
  arr.forEach((digit) => {
    const key = String(digit)
      .split('')
      .reduce((acc, el) => {
        if (el !== '0') {
          return acc * Number(el); // Умножаем цифры (игнорируя 0)
        } else {
          return acc;
        }
      }, 1);
    if (result[key]) {
      result[key].push(digit); // Добавляем в существующую группу
    } else {
      result[key] = [digit]; // Создаем новую группу
    }
  });
  return Object.values(result); // Возвращаем группы
}

// ===== 13. Преобразование camelCase в snake_case =====
// Условие: Преобразовать строку s из camelCase в snake_case.
// Подход: Проходим по строке, добавляем "_" перед заглавными буквами.
// Сложность: O(n)
function perevod(s) {
  let snew = '';
  for (const char of s) {
    if (char === char.toUpperCase() && char !== char.toLowerCase()) {
      snew += '_'; // Добавляем подчеркивание перед заглавной
      snew += char.toLowerCase(); // Переводим в нижний регистр
    } else {
      snew += char; // Оставляем как есть
    }
  }
  return snew;
}

// Тесты
console.log(isanargam("listen", "silent")); // true
console.log(isuniqeue("abcdef")); // true
console.log(isone([1, 2, 1, 3, 4, 3, 4])); // 2
console.log(binarysearch([1, 2, 3, 4, 5], 4)); // 3
console.log(isIsogram("Dermatoglyphics")); // true
console.log(twosum([2, 7, 11, 15], 9)); // [0, 1]
const fib = createfibmemo();
console.log(fib(10)); // 55
console.log(slidingwindow("abcabcbb")); // 3
console.log(maxpodmarra([-2, 1, -3, 4, -1, 2, 1, -5, 4])); // 6
console.log(isskobki("([[]])")); // true
console.log(ispangram("The quick brown fox jumps over the lazy dog")); // true
console.log(groupByDigitProduct([123, 321, 132, 44, 8])); // [[123, 321, 132], [44], [8]]
console.log(perevod("camelCaseExample")); // "camel_case_example"
