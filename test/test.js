import { clusterData } from '../build/hclust.min.js';
import { minDistance } from '../build/hclust.min.js';
import { maxDistance } from '../build/hclust.min.js';
import hcluster from './chrispolis.hcluster.min.js';

import dataset1 from './dataset-1.json';
import dataset2 from './dataset-2.json';

test('can import hclusterjs', () => {
  expect(hcluster).toBeDefined();
});

test('can import hclust', () => {
  expect(clusterData).toBeDefined();
});

test('test dataset 1, default settings', () => {
  // get received results from this package
  const resultsB = clusterData({
    data: dataset1,
    key: 'value',
    onProgress: null
  });

  // transform order to be in terms of sample name/id
  const orderB = resultsB.order
    .map((index) => dataset1[index])
    .map((node) => node.sample);
  // transform slice to be in terms of sample name/id
  const sliceB = resultsB.clustersGivenK[10].map((cluster) =>
    cluster.map((index) => dataset1[index]).map((node) => node.sample)
  );

  // get "expected" results from hcluster.js
  const resultsA = hcluster()
    .distance('euclidean')
    .linkage('avg')
    .posKey('value')
    .data(dataset1);

  // transform order to be in terms of sample name/id
  const orderA = resultsA.orderedNodes().map((node) => node.sample);
  // transform slice to be in terms of sample name/id
  const sliceA = resultsA
    .getClusters(10)
    .map((cluster) => cluster.map((node) => node.sample));

  console.log('Expected order:', orderA, 'Received order:', orderB);
  console.log('Expected slice:', sliceA, 'Received slice:', sliceB);

  expect(orderB).toStrictEqual(orderA);
  expect(sliceB).toStrictEqual(sliceA);
});

test('test dataset 1, min distance linkage', () => {
  // get received results from this package
  const resultsB = clusterData({
    data: dataset1,
    key: 'value',
    linkage: minDistance,
    onProgress: null
  });

  // transform order to be in terms of sample name/id
  const orderB = resultsB.order
    .map((index) => dataset1[index])
    .map((node) => node.sample);
  // transform slice to be in terms of sample name/id
  const sliceB = resultsB.clustersGivenK[10].map((cluster) =>
    cluster.map((index) => dataset1[index]).map((node) => node.sample)
  );

  // get "expected" results from hcluster.js
  const resultsA = hcluster()
    .distance('euclidean')
    .linkage('min')
    .posKey('value')
    .data(dataset1);

  // transform order to be in terms of sample name/id
  const orderA = resultsA.orderedNodes().map((node) => node.sample);
  // transform slice to be in terms of sample name/id
  const sliceA = resultsA
    .getClusters(10)
    .map((cluster) => cluster.map((node) => node.sample));

  console.log('Expected order:', orderA, 'Received order:', orderB);
  console.log('Expected slice:', sliceA, 'Received slice:', sliceB);

  expect(orderB).toStrictEqual(orderA);
  expect(sliceB).toStrictEqual(sliceA);
});

test('test dataset 1, max distance linkage', () => {
  // get received results from this package
  const resultsB = clusterData({
    data: dataset1,
    key: 'value',
    linkage: maxDistance,
    onProgress: null
  });

  // transform order to be in terms of sample name/id
  const orderB = resultsB.order
    .map((index) => dataset1[index])
    .map((node) => node.sample);
  // transform slice to be in terms of sample name/id
  const sliceB = resultsB.clustersGivenK[10].map((cluster) =>
    cluster.map((index) => dataset1[index]).map((node) => node.sample)
  );

  // get "expected" results from hcluster.js
  const resultsA = hcluster()
    .distance('euclidean')
    .linkage('max')
    .posKey('value')
    .data(dataset1);

  // transform order to be in terms of sample name/id
  const orderA = resultsA.orderedNodes().map((node) => node.sample);
  // transform slice to be in terms of sample name/id
  const sliceA = resultsA
    .getClusters(10)
    .map((cluster) => cluster.map((node) => node.sample));

  console.log('Expected order:', orderA, 'Received order:', orderB);
  console.log('Expected slice:', sliceA, 'Received slice:', sliceB);

  expect(orderB).toStrictEqual(orderA);
  expect(sliceB).toStrictEqual(sliceA);
});

test('test dataset 2, default settings', () => {
  // get received results from this package
  const resultsB = clusterData({
    data: dataset2,
    key: 'value',
    onProgress: null
  });

  // transform order to be in terms of signature name/id
  const orderB = resultsB.order
    .map((index) => dataset2[index])
    .map((node) => node.signature);
  // transform slice to be in terms of signature name/id
  const sliceB = resultsB.clustersGivenK[10].map((cluster) =>
    cluster.map((index) => dataset2[index]).map((node) => node.signature)
  );

  // get "expected" results from hcluster.js
  const resultsA = hcluster()
    .distance('euclidean')
    .linkage('avg')
    .posKey('value')
    .data(dataset2);

  // transform order to be in terms of signature name/id
  const orderA = resultsA.orderedNodes().map((node) => node.signature);
  // transform slice to be in terms of signature name/id
  const sliceA = resultsA
    .getClusters(10)
    .map((cluster) => cluster.map((node) => node.signature));

  console.log('Expected order:', orderA, 'Received order:', orderB);
  console.log('Expected slice:', sliceA, 'Received slice:', sliceB);

  expect(orderB).toStrictEqual(orderA);
  expect(sliceB).toStrictEqual(sliceA);
});