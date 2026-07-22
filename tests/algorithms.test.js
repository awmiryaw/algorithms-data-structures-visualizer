import assert from "node:assert/strict";
import {
    bubbleSortSteps,
    selectionSortSteps,
    insertionSortSteps,
    bfs,
    dfs,
    dijkstra,
    BinarySearchTree
} from "../src/algorithms.js";

function lastArray(steps) {
    return steps[steps.length - 1].array;
}

assert.deepEqual(
    lastArray(bubbleSortSteps([5, 1, 4, 2])),
    [1, 2, 4, 5]
);

assert.deepEqual(
    lastArray(selectionSortSteps([9, 3, 7, 1])),
    [1, 3, 7, 9]
);

assert.deepEqual(
    lastArray(insertionSortSteps([8, 2, 6, 3])),
    [2, 3, 6, 8]
);

const graph = {
    A: [{ node: "B", weight: 2 }, { node: "C", weight: 5 }],
    B: [{ node: "A", weight: 2 }, { node: "C", weight: 1 }],
    C: [{ node: "A", weight: 5 }, { node: "B", weight: 1 }]
};

assert.deepEqual(bfs(graph, "A"), ["A", "B", "C"]);
assert.deepEqual(dfs(graph, "A"), ["A", "B", "C"]);

const result = dijkstra(graph, "A");
assert.equal(result.distances.A, 0);
assert.equal(result.distances.B, 2);
assert.equal(result.distances.C, 3);

const tree = new BinarySearchTree();

for (const value of [50, 30, 70, 20, 40, 60, 80])
    assert.equal(tree.insert(value), true);

assert.equal(tree.insert(50), false);
assert.deepEqual(tree.inorder(), [20, 30, 40, 50, 60, 70, 80]);
assert.equal(tree.height(), 3);
assert.equal(tree.search(60).found, true);
assert.equal(tree.search(100).found, false);
assert.equal(tree.delete(70), true);
assert.deepEqual(tree.inorder(), [20, 30, 40, 50, 60, 80]);
assert.equal(tree.delete(999), false);

console.log("All tests passed.");
