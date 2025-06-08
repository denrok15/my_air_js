function getPaths(tree) {
  const result = []
  const stack = [{node: tree, path: `${tree.name}`}]
  while (stack.length > 0) {
    let {node, path} = stack.pop()
    if (!node.children) {
      result.push(path)
    } else {
      for (let i = node.children.length - 1; i >= 0; i--) {
        const child = node.children[i]
        stack.push({node: child, path: `${path}/${child.name}`})
      }
    }

  }
  return result
}const tree = {
  type: 'nested',
  children: [
    { type: 'added', value: 42 },
    {
      type: 'nested',
      children: [
        { type: 'added', value: 43 },
      ],
    },
    { type: 'added', value: 44 },

  ]
}

function getNodes(tree,type) {
    const stack = [tree]
    const result = []
    while (stack.length > 0) {
        const node = stack.pop()
        if (node.type === type) {
            result.push(node)
        }
        if (node.children) {
            for (let i = node.children.length - 1; i>= 0; i --) {
                stack.push(node.children[i])
            }
        }
    }
    return result
}
function getNodes2(tree,type) {
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

const addedItems = getNodes2(tree, 'added');
console.log(addedItems)
const data = {
  name: "folder",
  children: [
    { name: "file1.txt" },
    { name: "file2.txt" },
    {
      name: "images",
      children: [
        { name: "image.png" },
        {
          name: "vacation",
          children: [{ name: "crocodile.png" }, { name: "penguin.png" }],
        },
      ],
    },
    { name: "shopping-list.pdf" },
  ],
};

function printFileTree(root) {
  const stack = [{ node: root, depth: 0 }];

  while (stack.length > 0) {
    const { node, depth } = stack.pop();

    console.log("  ".repeat(depth) + node.name);

    if (node.children) {
      for (let i = node.children.length - 1; i >= 0; i--) {
        stack.push({ node: node.children[i], depth: depth + 1 });
      }
    }
  }
}
/*
Необходимо написать функцию поиска составного авиабилета.
Функция принимает на вход пункт вылета, пункт назначения и функцию поиска билетов и должна вернуть промис,
который разогнается массивом всех пунктов перелета или редкостится ошибкой 'No way'.
Функция поиска билетов возвращает список городов, до которых можно долететь из заданного.
*/

const example = {'A': ['B', 'D'], 'B': ['C', 'N', 'Z'], 'D': ['E', 'F'], 'F': ['S']}

async function fetchFlights(from) {
  return example[from];
}

console.log(findPath('A', 'N', fetchFlights)) // Promise.resolve(['A', 'B', 'N'])
console.log(findPath('A', 'S', fetchFlights)) // Promise.resolve(['A', 'D', 'F', 'S'])
console.log(findPath('B', 'S', fetchFlights)) // Promise.reject(new Error('No way'))

async function findPath(from, to, fetchFlights) {
    const queue = [{node: from, path: [from]}]
    const visited = {}
    while (queue.length > 0) {
        const {node, path} = queue.shift()
        if (visited[node]) continue
        visited[node] = true
        if (node === to) return path
        try {
            const neighbors = await fetchFlights(node)
            if (neighbors) {
                for (const neighbor of neighbors) {
                queue.push({node:neighbor, path: [...path,neighbor]})
            }
        }
        } catch {
            continue
        }


    }
    throw new Error('No way')


}
