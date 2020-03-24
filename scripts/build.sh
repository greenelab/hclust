rm -rf build
mkdir build
npx babel ./src/hclust.js --out-file ./build/hclust.min.js
