export function bubbleSortSteps(values) {
    const array = [...values];
    const steps = [];
    let comparisons = 0;
    let moves = 0;

    for (let end = array.length - 1; end > 0; end--) {
        let changed = false;

        for (let i = 0; i < end; i++) {
            comparisons++;
            steps.push({
                array: [...array],
                active: [i, i + 1],
                comparisons,
                moves
            });

            if (array[i] > array[i + 1]) {
                [array[i], array[i + 1]] = [array[i + 1], array[i]];
                moves++;
                changed = true;

                steps.push({
                    array: [...array],
                    active: [i, i + 1],
                    comparisons,
                    moves
                });
            }
        }

        if (!changed)
            break;
    }

    steps.push({
        array: [...array],
        active: [],
        comparisons,
        moves,
        done: true
    });

    return steps;
}

export function selectionSortSteps(values) {
    const array = [...values];
    const steps = [];
    let comparisons = 0;
    let moves = 0;

    for (let i = 0; i < array.length - 1; i++) {
        let min = i;

        for (let j = i + 1; j < array.length; j++) {
            comparisons++;
            steps.push({
                array: [...array],
                active: [min, j],
                comparisons,
                moves
            });

            if (array[j] < array[min])
                min = j;
        }

        if (min !== i) {
            [array[i], array[min]] = [array[min], array[i]];
            moves++;

            steps.push({
                array: [...array],
                active: [i, min],
                comparisons,
                moves
            });
        }
    }

    steps.push({
        array: [...array],
        active: [],
        comparisons,
        moves,
        done: true
    });

    return steps;
}

export function insertionSortSteps(values) {
    const array = [...values];
    const steps = [];
    let comparisons = 0;
    let moves = 0;

    for (let i = 1; i < array.length; i++) {
        const value = array[i];
        let j = i - 1;

        while (j >= 0) {
            comparisons++;
            steps.push({
                array: [...array],
                active: [j, j + 1],
                comparisons,
                moves
            });

            if (array[j] <= value)
                break;

            array[j + 1] = array[j];
            moves++;
            j--;
        }

        array[j + 1] = value;
        moves++;

        steps.push({
            array: [...array],
            active: [j + 1],
            comparisons,
            moves
        });
    }

    steps.push({
        array: [...array],
        active: [],
        comparisons,
        moves,
        done: true
    });

    return steps;
}

export function bfs(graph, start) {
    if (!graph[start])
        return [];

    const visited = new Set([start]);
    const queue = [start];
    const order = [];

    while (queue.length > 0) {
        const node = queue.shift();
        order.push(node);

        for (const edge of graph[node]) {
            if (!visited.has(edge.node)) {
                visited.add(edge.node);
                queue.push(edge.node);
            }
        }
    }

    return order;
}

export function dfs(graph, start) {
    if (!graph[start])
        return [];

    const visited = new Set();
    const order = [];

    function visit(node) {
        visited.add(node);
        order.push(node);

        for (const edge of graph[node]) {
            if (!visited.has(edge.node))
                visit(edge.node);
        }
    }

    visit(start);
    return order;
}

export function dijkstra(graph, start) {
    const distances = {};
    const visited = new Set();
    const order = [];

    for (const node of Object.keys(graph))
        distances[node] = Infinity;

    if (!graph[start])
        return { order, distances };

    distances[start] = 0;

    while (visited.size < Object.keys(graph).length) {
        let current = null;
        let bestDistance = Infinity;

        for (const node of Object.keys(graph)) {
            if (!visited.has(node) && distances[node] < bestDistance) {
                current = node;
                bestDistance = distances[node];
            }
        }

        if (current === null)
            break;

        visited.add(current);
        order.push(current);

        for (const edge of graph[current]) {
            const newDistance = distances[current] + edge.weight;

            if (newDistance < distances[edge.node])
                distances[edge.node] = newDistance;
        }
    }

    return { order, distances };
}

export class TreeNode {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

export class BinarySearchTree {
    constructor() {
        this.root = null;
    }

    insert(value) {
        const node = new TreeNode(value);

        if (this.root === null) {
            this.root = node;
            return true;
        }

        let current = this.root;

        while (true) {
            if (value === current.value)
                return false;

            if (value < current.value) {
                if (current.left === null) {
                    current.left = node;
                    return true;
                }

                current = current.left;
            } else {
                if (current.right === null) {
                    current.right = node;
                    return true;
                }

                current = current.right;
            }
        }
    }

    search(value) {
        const path = [];
        let current = this.root;

        while (current !== null) {
            path.push(current.value);

            if (value === current.value)
                return { found: true, path };

            if (value < current.value)
                current = current.left;
            else
                current = current.right;
        }

        return { found: false, path };
    }

    delete(value) {
        const before = this.inorder();
        this.root = this.deleteNode(this.root, value);
        const after = this.inorder();

        return before.length !== after.length;
    }

    deleteNode(node, value) {
        if (node === null)
            return null;

        if (value < node.value) {
            node.left = this.deleteNode(node.left, value);
            return node;
        }

        if (value > node.value) {
            node.right = this.deleteNode(node.right, value);
            return node;
        }

        if (node.left === null)
            return node.right;

        if (node.right === null)
            return node.left;

        let successor = node.right;

        while (successor.left !== null)
            successor = successor.left;

        node.value = successor.value;
        node.right = this.deleteNode(node.right, successor.value);

        return node;
    }

    inorder() {
        const values = [];

        function visit(node) {
            if (node === null)
                return;

            visit(node.left);
            values.push(node.value);
            visit(node.right);
        }

        visit(this.root);
        return values;
    }

    height() {
        function getHeight(node) {
            if (node === null)
                return 0;

            return 1 + Math.max(
                getHeight(node.left),
                getHeight(node.right)
            );
        }

        return getHeight(this.root);
    }
}
