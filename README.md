### hclust
[Agglomerative hierarchical clustering](https://en.wikipedia.org/wiki/Hierarchical_clustering) in JavaScript

Inspired by the MIT-licensed [hcluster.js](https://github.com/cmpolis/hcluster.js) by [@ChrisPolis](https://twitter.com/chrispolis)

---

### Usage

#### Browser

```html
<script src="hclust.min.js"></script>
<script>
  hclust.clusterData(...);
  hclust.euclideanDistance(...);
  hclust.avgDistance(...);
  hclust.minDistance(...);
  hclust.maxDistance(...);
</script>
```

#### Node

`npm install @greenelab/hclust.git`

or

`yarn add @greenelab/hclust.git`

then 

```javascript
import { clusterData } from 'hclust';
import { euclideanDistance } from 'hclust';
import { avgDistance } from 'hclust';
import { minDistance } from 'hclust';
import { maxDistance } from 'hclust';
```

---

### `clusterData({ data, key, distance, linkage, onProgress })`

#### Parameters

**`data`**

The data you want to cluster, in the format:

```javascript
[
  ...
  [ ... 1, 2, 3 ...],
  [ ... 1, 2, 3 ...],
  [ ... 1, 2, 3 ...],
  ...
]
```

or if `key` parameter is specified:

```javascript
[
  ...
  { someKey: [ ... 1, 2, 3 ...] },
  { someKey: [ ... 1, 2, 3 ...] },
  { someKey: [ ... 1, 2, 3 ...] },
  ...
]
```

The entries in the outer array can be considered the `rows` and the entries within each `row` array can be considered the `cols`.
Each `row` should have the same number of `cols`.

*Default value:* `[]`

**`key`**

A `string` key to specify which values to extract from the `data` array.
If omitted, `data` is assumed to be an array of arrays.
If specified, `data` is assumed to be array of objects, each with a key that contains the values for that `row`.

*Default value:* `''`

**`distance`**

A function to calculate the distance between two equal-dimension vectors, used in calculating the distance matrix, in the format:

```javascript
function (arrayA, arrayB) { return someNumber; }
```

The function receives two equal-length arrays of numbers (ints or floats) and should return a number (int or float).

*Default value:* `euclideanDistance` from this `hclust` package

**`linkage`**

A function to calculate the distance between pairs of clusters, used in determining linkage criterion, in the format:

```javascript
function (arrayA, arrayB, distanceMatrix) { return someNumber; }
```

The function receives two sets of indexes and the distance matrix computed between each datum and every other datum.
The function should return a number (int or float)

*Default value:* `averageDistance` from this `hclust` package  
*Other built-in values:* `minDistance` and `maxDistance` from this `hclust` package

**`onProgress`**

A function that is called several times throughout clustering, and is provided the current progress through the clustering, in the format:

```javascript
function (progress) { }
```

The function receives the percent progress between `0` and `1`.

*Default value:* an internal function that `console.log`'s the progress

**Note:** [`postMessage`](https://developer.mozilla.org/en-US/docs/Web/API/Worker/postMessage) is called in the same places as `onProgress`, if the script is running as a [web worker](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers).

#### Returns

```javascript
const { clusters, distances, order, clustersGivenK } = clusterData(...);
```

**`clusters`**

The resulting cluster tree, in the format:

```javascript
{
  indexes: [ ... Number, Number, Number ... ],
  height: Number,
  children: [ ... {}, {}, {} ... ]
}

```

**`distances`**

The computed distance matrix, in the format:

```javascript
[
  ...
  [ ... Number, Number, Number ...],
  [ ... Number, Number, Number ...],
  [ ... Number, Number, Number ...]
  ...
]
```

**`order`**

The new order of the data, in terms of original data array indexes, in the format:

```javascript
[ ... Number, Number, Number ... ]
```

Equivalent to `clusters.indexes` and `clustersGivenK[1]`.

**`clustersGivenK`** 

A list of tree slices in terms of original data array indexes, where index = K, in the format:

```javascript
[
  [], // K = 0
  [ [] ], // K = 1
  [ [], [] ], // K = 2
  [ [], [], [] ], // K = 3
  [ [], [], [], [] ], // K = 4
  [ [], [], [], [], [] ] // K = 5
  ...
]
```

---

### `avgDistance(arrayA, arrayB, distanceMatrix)`

Calculates the average distance between pairs of clusters.

---

### `minDistance(arrayA, arrayB, distanceMatrix)`

Calculates the smallest distance between pairs of clusters.

---

### `maxDistance(arrayA, arrayB, distanceMatrix)`

Calculates the largest distance between pairs of clusters.

---

### Comparison with [hcluster.js](https://github.com/cmpolis/hcluster.js)

- This package does not duplicate items from the original dataset in the results.
Results are given in terms of indexes, either with respect to the original dataset or the distance matrix.
- This package uses more modern JavaScript syntaxes and practices to make the code cleaner and simpler.
- This package provides an `onProgress` callback and calls `postMessage` for use in [web workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers).
Because clustering can take a long time with large data sets,
you may want to run it as a web worker so the browser doesn't freeze for a long time, and you may need a callback so you can give users visual feedback on its progress.
- This package makes some performance optimizations, such as removing unnecessary loops through big sets.
It has been tested on modern OS's (Windows, Mac, Linux, iOS, Android), devices (desktop, laptop, mobile), browsers (Chrome, Firefox, Safari), contexts (main thread, web worker), and hosting locations (local, online).
The results vary widely, and are likely sensitive to the specifics of hardware, cpu cores, browser implementation, etc.
But in general, this package is more performant than `hcluster.js`, to varying degrees, and is always at least as performant on average.
Chrome seems to see the most performance gains (up to 10x, when the row number is high), while Firefox seems to see no gains.
- This package does not touch the input data object, whereas the `hcluster.js` package does.
D3 often expects you to mutate data objects directly, which is now typically considered bad practice in JavaScript.
Instead, this package returns the useful data from the clustering algorithm (including the distance matrix), and allows you to mutate or not mutate the data object depending on your needs.
In the future, a simple option could be added to instruct the algorithm to mutate the data object, if users can provide good use cases for what information is needed for constructing various D3 visualizations.

---

### Making changes to the library

1. [Install Node](https://nodejs.org/en/download/)
2. [Install Yarn](https://classic.yarnpkg.com/en/docs/install)
3. Clone this repo and navigate to it in your command terminal
4. Run `yarn install` to install this package's dependencies
5. Make desired changes to `./src/hclust.js`
6. Run `npm run test` to automatically rebuild the library and run test suite
7. Run `npm run build` to just rebuild the library, and output the compiled contents to `./build/hclust.min.js`
8. Commit changes to repo if necessary. *Make sure to run the build command before committing; it won't happen automatically.*

---

### Similar Libraries

[cmpolis/hcluster.js](https://github.com/cmpolis/hcluster.js)
[harthur/clustering](https://github.com/harthur/clustering)
[mljs/hclust](https://github.com/mljs/hclust)
[math-utils/hierarchical-clustering](https://github.com/math-utils/hierarchical-clustering)
