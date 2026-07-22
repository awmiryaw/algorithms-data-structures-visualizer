# Algorithms & Data Structures Visualizer

An interactive browser project for visualizing sorting algorithms, graph traversal and binary search tree operations.

The project demonstrates algorithm implementation, data structures, DOM manipulation, asynchronous animations and responsive frontend development with JavaScript.

## Live Features

### Sorting

- Bubble Sort
- Selection Sort
- Insertion Sort
- Adjustable array size
- Adjustable animation speed
- Comparison and move counters
- Reset and random array generation

### Graphs

- Breadth-First Search
- Depth-First Search
- Dijkstra's shortest path algorithm
- Adjustable starting node
- Animated visit order
- Shortest-distance output for Dijkstra

### Binary Search Tree

- Insert values
- Search with path visualization
- Delete values
- In-order traversal
- Tree height
- Duplicate-value handling

## Technologies

- HTML
- CSS
- JavaScript
- SVG
- Node.js built-in test runner tools

## Project Structure

```text
algorithms-data-structures-visualizer/
├── .github/
│   └── workflows/
│       └── tests.yml
├── src/
│   ├── algorithms.js
│   └── app.js
├── tests/
│   └── algorithms.test.js
├── .gitignore
├── index.html
├── package.json
├── README.md
└── styles.css
```

## Run Locally

Python can be used to serve the project:

```bash
python3 -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

You can also run:

```bash
npm start
```

## Run Tests

```bash
npm test
```

Expected output:

```text
All tests passed.
```

## Main Logic

`algorithms.js` contains the sorting, graph and tree logic.

`app.js` connects the algorithms to the page and handles animations, controls and SVG rendering.

The algorithm functions are kept separate from the interface so they can be tested without opening the browser.

## GitHub Pages

The project does not need a build step. It can be published directly with GitHub Pages from the `main` branch.
