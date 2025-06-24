// ===== 1. Разделение массива на чанки (вариант 1) =====
// Условие: Разделить массив на подмассивы указанного размера
// Подход: Итерация по элементам с накоплением в буфере
// Сложность: O(n)
Array.prototype.chunc = function(n) {
  const result = []
  let buffer = []
  for (const value of this) {
    buffer.push(value)
    if (buffer.length === n) {
      result.push(buffer)
      buffer = []
    }
  }
  if (buffer.length > 0) {
    result.push(buffer) // Добавляем последний неполный чанк
  }
  return result
}

// ===== 2. Разделение массива на чанки (вариант 2) =====
// Условие: Разделить массив на подмассивы указанного размера
// Подход: Использование slice с шагом n
// Сложность: O(n)
Array.prototype.chunc2 = function(n) {
  const result = []
  for (let i = 0; i < this.length; i += n) {
    result.push(this.slice(i, i + n)) // Берем отрезок массива
  }
  return result
}

// ===== 3. Группировка с плоским отображением =====
// Условие: Сгруппировать элементы по ключу с возможностью плоского отображения
// Подход: Создание коллекции с группировкой по ключу
// Сложность: O(n)
Array.prototype.flatMapGroupBy = function(fn) {
  const collection = {}
  for (const item of this) {
    const key = fn(item) // Вычисляем ключ группировки
    if (key in collection) {
      collection[key].push(item)
    } else {
      collection[key] = [item]
    }
  }
  return collection
}

// ===== 4. Рекурсивное выравнивание массива =====
// Условие: Рекурсивно преобразовать многомерный массив в одномерный
// Подход: Рекурсивная обработка вложенных массивов
// Сложность: O(n), где n - общее количество элементов
Array.prototype.flati = function() {
  const result = []
  this.forEach((item) => {
    if (Array.isArray(item)) {
      result.push(...item.flati()) // Рекурсивное выравнивание
    } else {
      result.push(item)
    }
  })
  return result
}

// Пример использования flati
const ar = [1, [2, [3], 4], 5]
console.log(ar.flati()) // [1, 2, 3, 4, 5]

// ===== 5. Группировка элементов массива =====
// Условие: Сгруппировать элементы массива по ключу
// Подход: Создание объекта с массивами для каждого ключа
// Сложность: O(n)
Array.prototype.groupby = function(fn) {
  const result = {}
  this.forEach((value) => {
    const key = fn(value) // Вычисляем ключ
    if (result[key]) {
      result[key].push(value)
    } else {
      result[key] = [value] // Создаем новую группу
    }
  })
  return result
}
