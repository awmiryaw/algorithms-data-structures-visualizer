import {
    bubbleSortSteps,
    selectionSortSteps,
    insertionSortSteps,
    bfs,
    dfs,
    dijkstra,
    BinarySearchTree
} from "./algorithms.js";

const tabs = document.querySelectorAll(".tab");
const pages = document.querySelectorAll(".page");

for (const tab of tabs) {
    tab.addEventListener("click", () => {
        for (const item of tabs)
            item.classList.remove("active");

        for (const page of pages)
            page.classList.remove("active");

        tab.classList.add("active");
        document.getElementById(tab.dataset.page).classList.add("active");
    });
}

const bars = document.getElementById("bars");
const arraySize = document.getElementById("arraySize");
const speed = document.getElementById("speed");
const sortAlgorithm = document.getElementById("sortAlgorithm");
const startSortButton = document.getElementById("startSort");
const newArrayButton = document.getElementById("newArray");
const resetSortButton = document.getElementById("resetSort");
const comparisonsOutput = document.getElementById("comparisons");
const movesOutput = document.getElementById("moves");
const sortMessage = document.getElementById("sortMessage");

let values = [];
let originalValues = [];
let sorting = false;

function makeArray() {
    const size = Number(arraySize.value);
    values = [];

    for (let i = 0; i < size; i++)
        values.push(Math.floor(Math.random() * 90) + 10);

    originalValues = [...values];
    comparisonsOutput.textContent = "0";
    movesOutput.textContent = "0";
    sortMessage.textContent = "Choose an algorithm and press Start.";
    drawBars(values);
}

function drawBars(array, active = [], done = false) {
    bars.innerHTML = "";

    for (let i = 0; i < array.length; i++) {
        const bar = document.createElement("div");
        bar.className = "bar";
        bar.style.height = `${array[i] * 4}px`;
        bar.title = String(array[i]);

        if (done)
            bar.classList.add("done");
        else if (active.includes(i))
            bar.classList.add("active");

        bars.appendChild(bar);
    }
}

function wait(milliseconds) {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
}

async function startSorting() {
    if (sorting)
        return;

    sorting = true;
    setSortButtons(true);

    let steps;

    if (sortAlgorithm.value === "bubble")
        steps = bubbleSortSteps(values);
    else if (sortAlgorithm.value === "selection")
        steps = selectionSortSteps(values);
    else
        steps = insertionSortSteps(values);

    sortMessage.textContent = "Sorting in progress...";

    for (const step of steps) {
        values = [...step.array];
        comparisonsOutput.textContent = String(step.comparisons);
        movesOutput.textContent = String(step.moves);
        drawBars(step.array, step.active, step.done === true);
        await wait(720 - Number(speed.value));
    }

    sortMessage.textContent = "Array sorted.";
    sorting = false;
    setSortButtons(false);
}

function setSortButtons(disabled) {
    startSortButton.disabled = disabled;
    newArrayButton.disabled = disabled;
    resetSortButton.disabled = disabled;
    arraySize.disabled = disabled;
    sortAlgorithm.disabled = disabled;
}

newArrayButton.addEventListener("click", makeArray);

resetSortButton.addEventListener("click", () => {
    if (sorting)
        return;

    values = [...originalValues];
    comparisonsOutput.textContent = "0";
    movesOutput.textContent = "0";
    sortMessage.textContent = "Array reset.";
    drawBars(values);
});

startSortButton.addEventListener("click", startSorting);
arraySize.addEventListener("input", makeArray);

const graph = {
    A: [
        { node: "B", weight: 4 },
        { node: "C", weight: 2 }
    ],
    B: [
        { node: "A", weight: 4 },
        { node: "D", weight: 5 },
        { node: "E", weight: 7 }
    ],
    C: [
        { node: "A", weight: 2 },
        { node: "D", weight: 1 },
        { node: "F", weight: 6 }
    ],
    D: [
        { node: "B", weight: 5 },
        { node: "C", weight: 1 },
        { node: "E", weight: 3 },
        { node: "F", weight: 4 }
    ],
    E: [
        { node: "B", weight: 7 },
        { node: "D", weight: 3 },
        { node: "G", weight: 2 }
    ],
    F: [
        { node: "C", weight: 6 },
        { node: "D", weight: 4 },
        { node: "G", weight: 5 }
    ],
    G: [
        { node: "E", weight: 2 },
        { node: "F", weight: 5 }
    ]
};

const positions = {
    A: [90, 210],
    B: [260, 90],
    C: [260, 330],
    D: [430, 210],
    E: [610, 90],
    F: [610, 330],
    G: [720, 210]
};

const graphCanvas = document.getElementById("graphCanvas");
const graphAlgorithm = document.getElementById("graphAlgorithm");
const startNode = document.getElementById("startNode");
const visitOrder = document.getElementById("visitOrder");
const distancesOutput = document.getElementById("distances");
const graphMessage = document.getElementById("graphMessage");
const startGraphButton = document.getElementById("startGraph");
const resetGraphButton = document.getElementById("resetGraph");

function addSvgElement(name, attributes, parent = graphCanvas) {
    const element = document.createElementNS("http://www.w3.org/2000/svg", name);

    for (const [key, value] of Object.entries(attributes))
        element.setAttribute(key, String(value));

    parent.appendChild(element);
    return element;
}

function graphEdges() {
    const edges = [];
    const added = new Set();

    for (const [from, items] of Object.entries(graph)) {
        for (const edge of items) {
            const key = [from, edge.node].sort().join("-");

            if (!added.has(key)) {
                added.add(key);
                edges.push({
                    from,
                    to: edge.node,
                    weight: edge.weight
                });
            }
        }
    }

    return edges;
}

function drawGraph() {
    graphCanvas.innerHTML = "";

    for (const edge of graphEdges()) {
        const [x1, y1] = positions[edge.from];
        const [x2, y2] = positions[edge.to];

        addSvgElement("line", {
            x1,
            y1,
            x2,
            y2,
            class: "edge"
        });

        addSvgElement("text", {
            x: (x1 + x2) / 2,
            y: (y1 + y2) / 2 - 8,
            class: "edge-label"
        }).textContent = String(edge.weight);
    }

    for (const [node, [x, y]] of Object.entries(positions)) {
        addSvgElement("circle", {
            cx: x,
            cy: y,
            r: 28,
            class: "node-circle",
            "data-node": node
        });

        addSvgElement("text", {
            x,
            y,
            class: "node-text"
        }).textContent = node;
    }
}

function resetGraph() {
    drawGraph();
    visitOrder.textContent = "-";
    distancesOutput.textContent = "-";
    graphMessage.textContent = "Run BFS, DFS or Dijkstra from any node.";
}

async function runGraphAlgorithm() {
    startGraphButton.disabled = true;
    resetGraphButton.disabled = true;

    const start = startNode.value;
    let order;
    let distances = null;

    if (graphAlgorithm.value === "bfs")
        order = bfs(graph, start);
    else if (graphAlgorithm.value === "dfs")
        order = dfs(graph, start);
    else {
        const result = dijkstra(graph, start);
        order = result.order;
        distances = result.distances;
    }

    resetGraph();
    graphMessage.textContent = "Running...";

    const visited = [];

    for (const node of order) {
        const circle = graphCanvas.querySelector(`[data-node="${node}"]`);
        circle.classList.add("active");
        await wait(350);
        circle.classList.remove("active");
        circle.classList.add("visited");

        visited.push(node);
        visitOrder.textContent = visited.join(" → ");
    }

    if (distances !== null) {
        distancesOutput.textContent = Object.entries(distances)
            .map(([node, distance]) => `${node}: ${distance}`)
            .join(", ");
    } else {
        distancesOutput.textContent = "Not used";
    }

    graphMessage.textContent = "Algorithm completed.";
    startGraphButton.disabled = false;
    resetGraphButton.disabled = false;
}

startGraphButton.addEventListener("click", runGraphAlgorithm);
resetGraphButton.addEventListener("click", resetGraph);

const tree = new BinarySearchTree();
const treeCanvas = document.getElementById("treeCanvas");
const treeValue = document.getElementById("treeValue");
const insertNodeButton = document.getElementById("insertNode");
const searchNodeButton = document.getElementById("searchNode");
const deleteNodeButton = document.getElementById("deleteNode");
const resetTreeButton = document.getElementById("resetTree");
const inorderOutput = document.getElementById("inorderOutput");
const treeHeight = document.getElementById("treeHeight");
const treeMessage = document.getElementById("treeMessage");

function getTreeValue() {
    const value = Number(treeValue.value);

    if (!Number.isInteger(value) || value < 0 || value > 99) {
        treeMessage.textContent = "Enter a whole number from 0 to 99.";
        return null;
    }

    return value;
}

function updateTreeInfo() {
    const values = tree.inorder();
    inorderOutput.textContent = values.length > 0 ? values.join(", ") : "-";
    treeHeight.textContent = String(tree.height());
}

function buildTreeLayout(node, minX, maxX, y, level, result) {
    if (node === null)
        return;

    const x = (minX + maxX) / 2;
    result.push({
        node,
        x,
        y,
        level
    });

    buildTreeLayout(node.left, minX, x, y + 90, level + 1, result);
    buildTreeLayout(node.right, x, maxX, y + 90, level + 1, result);
}

function drawTree(highlight = [], found = null) {
    treeCanvas.innerHTML = "";

    if (tree.root === null) {
        updateTreeInfo();
        return;
    }

    const layout = [];
    buildTreeLayout(tree.root, 45, 855, 55, 0, layout);
    const byNode = new Map(layout.map(item => [item.node, item]));

    for (const item of layout) {
        if (item.node.left !== null) {
            const child = byNode.get(item.node.left);

            addTreeSvg("line", {
                x1: item.x,
                y1: item.y,
                x2: child.x,
                y2: child.y,
                class: "tree-edge"
            });
        }

        if (item.node.right !== null) {
            const child = byNode.get(item.node.right);

            addTreeSvg("line", {
                x1: item.x,
                y1: item.y,
                x2: child.x,
                y2: child.y,
                class: "tree-edge"
            });
        }
    }

    for (const item of layout) {
        let className = "tree-node";

        if (item.node.value === found)
            className += " found";
        else if (highlight.includes(item.node.value))
            className += " visiting";

        addTreeSvg("circle", {
            cx: item.x,
            cy: item.y,
            r: 25,
            class: className
        });

        addTreeSvg("text", {
            x: item.x,
            y: item.y,
            class: "node-text"
        }).textContent = String(item.node.value);
    }

    updateTreeInfo();
}

function addTreeSvg(name, attributes) {
    const element = document.createElementNS("http://www.w3.org/2000/svg", name);

    for (const [key, value] of Object.entries(attributes))
        element.setAttribute(key, String(value));

    treeCanvas.appendChild(element);
    return element;
}

insertNodeButton.addEventListener("click", () => {
    const value = getTreeValue();

    if (value === null)
        return;

    if (tree.insert(value))
        treeMessage.textContent = `${value} inserted.`;
    else
        treeMessage.textContent = `${value} is already in the tree.`;

    treeValue.value = "";
    drawTree();
});

searchNodeButton.addEventListener("click", async () => {
    const value = getTreeValue();

    if (value === null)
        return;

    const result = tree.search(value);

    for (let i = 0; i < result.path.length; i++) {
        const currentPath = result.path.slice(0, i + 1);
        drawTree(currentPath);
        await wait(300);
    }

    drawTree([], result.found ? value : null);

    if (result.found)
        treeMessage.textContent = `${value} found.`;
    else
        treeMessage.textContent = `${value} not found.`;
});

deleteNodeButton.addEventListener("click", () => {
    const value = getTreeValue();

    if (value === null)
        return;

    if (tree.delete(value))
        treeMessage.textContent = `${value} deleted.`;
    else
        treeMessage.textContent = `${value} not found.`;

    treeValue.value = "";
    drawTree();
});

resetTreeButton.addEventListener("click", () => {
    tree.root = null;
    treeValue.value = "";
    treeMessage.textContent = "Tree cleared.";
    drawTree();
});

treeValue.addEventListener("keydown", event => {
    if (event.key === "Enter")
        insertNodeButton.click();
});

for (const value of [50, 30, 70, 20, 40, 60, 80])
    tree.insert(value);

makeArray();
drawGraph();
drawTree();
