// ===== 1. Получение всех путей в дереве =====
// Условие: Найти все пути от корня до листьев в древовидной структуре
// Подход: Обход в глубину (DFS) с использованием стека
// Сложность: O(n), где n - количество узлов
function getPaths(tree) {
  const result = []
  const stack = [{node: tree, path: `${tree.name}`}]
  
  while (stack.length > 0) {
    let {node, path} = stack.pop()
    
    // Если узел - лист, добавляем путь в результат
    if (!node.children) {
      result.push(path)
    } else {
      // Добавляем детей в стек в обратном порядке для правильного обхода
      for (let i = node.children.length - 1; i >= 0; i--) {
        const child = node.children[i]
        stack.push({node: child, path: `${path}/${child.name}`})
      }
    }
  }
  return result
}

// ===== 2. Поиск узлов по типу (итеративный вариант) =====
// Условие: Найти все узлы дерева с указанным типом
// Подход: DFS с использованием стека
// Сложность: O(n)
function getNodes(tree, type) {
  const stack = [tree]
  const result = []
  
  while (stack.length > 0) {
    const node = stack.pop()
    
    if (node.type === type) {
      result.push(node)
    }
    
    // Добавляем детей в стек
    if (node.children) {
      for (let i = node.children.length - 1; i >= 0; i--) {
        stack.push(node.children[i])
      }
    }
  }
  return result
}

// ===== 3. Поиск узлов по типу (рекурсивный вариант) =====
// Условие: Найти все узлы дерева с указанным типом
// Подход: Рекурсивный обход дерева
// Сложность: O(n)
function getNodes2(tree, type) {
  const result = []
  
  function travel(node) {
    if (node.type === type) {
      result.push(node)
    }
    if (node.children) {
      for (const child of node.children)
        travel(child)
    }
  }
  
  travel(tree)
  return result
}

// ===== 4. Печать структуры файлового дерева =====
// Условие: Вывести древовидную структуру с отступами
// Подход: DFS с сохранением глубины уровня
// Сложность: O(n)
function printFileTree(root) {
  const stack = [{node: root, depth: 0}]

  while (stack.length > 0) {
    const {node, depth} = stack.pop()

    console.log("  ".repeat(depth) + node.name)

    if (node.children) {
      // Добавляем в обратном порядке для правильного вывода
      for (let i = node.children.length - 1; i >= 0; i--) {
        stack.push({node: node.children[i], depth: depth + 1})
      }
    }
  }
}

// ===== 5. Поиск пути в графе перелетов =====
// Условие: Найти маршрут между городами с пересадками
// Подход: BFS (поиск в ширину) с асинхронными запросами
// Сложность: O(V + E), где V - вершины, E - ребра
async function findPath(from, to, fetchFlights) {
  const queue = [{node: from, path: [from]}]
  const visited = {}
  
  while (queue.length > 0) {
    const {node, path} = queue.shift()
    
    // Пропускаем уже посещенные города
    if (visited[node]) continue
    visited[node] = true
    
    // Нашли конечный пункт
    if (node === to) return path
    
    try {
      // Получаем доступные рейсы
      const neighbors = await fetchFlights(node)
      
      if (neighbors) {
        // Добавляем соседние города в очередь
        for (const neighbor of neighbors) {
          queue.push({node: neighbor, path: [...path, neighbor]})
        }
      }
    } catch {
      continue
    }
  }
  
  throw new Error('No way')
}

// Пример данных для тестирования
const fileTree = {
  name: "folder",
  children: [
    {name: "file1.txt"},
    {name: "file2.txt"},
    {
      name: "images",
      children: [
        {name: "image.png"},
        {
          name: "vacation",
          children: [{name: "crocodile.png"}, {name: "penguin.png"}],
        },
      ],
    },
    {name: "shopping-list.pdf"},
  ],
}

const flightRoutes = {
  'A': ['B', 'D'],
  'B': ['C', 'N', 'Z'],
  'D': ['E', 'F'],
  'F': ['S']
}

async function fetchFlights(from) {
  return flightRoutes[from]
}

// Тестирование функций
console.log("Все пути в дереве:")
console.log(getPaths(fileTree))

console.log("\nПечать структуры дерева:")
printFileTree(fileTree)

console.log("\nПоиск пути перелетов:")
findPath('A', 'N', fetchFlights).then(console.log).catch(console.error)
findPath('A', 'S', fetchFlights).then(console.log).catch(console.error)
findPath('B', 'S', fetchFlights).then(console.log).catch(console.error)
