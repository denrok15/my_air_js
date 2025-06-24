// ===== 1. Глубокое клонирование объекта =====
// Условие: Создать глубокую копию объекта (включая вложенные структуры)
// Подход: Рекурсивное копирование с проверкой типов
// Сложность: O(n), где n - количество элементов в объекте
function deepclone(obj) {
  // Базовый случай: примитивы или null возвращаются как есть
  if (obj === null || typeof obj !== 'object') return obj
  
  // Обработка массивов
  if (Array.isArray(obj)) {
    const result = []
    for (let i = 0; i < obj.length; i++) {
      result[i] = deepclone(obj[i]) // Рекурсивное клонирование элементов
    }
    return result
  }
  
  // Обработка обычных объектов
  const result = {}
  for (const key in obj) {
    // Копируем только собственные свойства (не наследованные)
    if (obj.hasOwnProperty(key)) {
      result[key] = deepclone(obj[key]) // Рекурсивное клонирование свойств
    }
  }
  
  return result
}

// ===== 2. Глубокое сравнение объектов =====
// Условие: Рекурсивно сравнить два объекта на идентичность
// Подход: Пошаговое сравнение типов, ключей и значений
// Сложность: O(n), где n - количество элементов в объекте
function equal(a, b) {
  // Быстрая проверка для примитивов и ссылок
  if (a === b) return true
  
  // Проверка на null и что оба аргумента - объекты
  if (a === null || b === null || typeof a !== 'object' || typeof b !== 'object') {
    return false
  }
  
  // Сравнение количества собственных ключей
  const keysA = Object.keys(a)
  const keysB = Object.keys(b)
  if (keysA.length !== keysB.length) return false
  
  // Рекурсивное сравнение каждого свойства
  for (let key of keysA) {
    if (!keysB.includes(key)) return false // Проверка наличия ключа
    if (!equal(a[key], b[key])) return false // Рекурсивное сравнение значений
  }
  
  return true
}

// Примеры использования
const original = {
  name: "John",
  age: 30,
  address: {
    city: "New York",
    street: "123 Main St"
  },
  hobbies: ["reading", "swimming"]
}

const cloned = deepclone(original)
console.log("Клонированный объект:", cloned)
console.log("Сравнение оригинала и клона:", equal(original, cloned)) // true

const modified = deepclone(original)
modified.address.city = "Boston"
console.log("Сравнение с измененным объектом:", equal(original, modified)) // false
