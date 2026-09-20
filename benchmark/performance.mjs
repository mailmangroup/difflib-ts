import { performance } from 'node:perf_hooks';
import { Differ, SequenceMatcher } from '../dist/index.js';

const median = (values) => {
  const sorted = [...values].sort((a, b) => a - b);
  return sorted[Math.floor(sorted.length / 2)];
};

const benchmark = (name, run, iterations = 10) => {
  for (let i = 0; i < 3; i++) run();
  const samples = [];
  for (let i = 0; i < iterations; i++) {
    const start = performance.now();
    run();
    samples.push(performance.now() - start);
  }
  console.log(`${name}: ${median(samples).toFixed(2)} ms`);
};

const uniqueA = Array.from({ length: 10_000 }, (_, index) => `token-${index}`);
const uniqueB = uniqueA.slice();
uniqueB[5_000] = 'changed-token';

benchmark('ratio: 10k mostly unique tokens', () => {
  new SequenceMatcher(null, uniqueA, uniqueB).ratio();
});

const disjointB = Array.from({ length: 10_000 }, (_, index) => `other-${index}`);
benchmark('ratio: 10k disjoint unique tokens', () => {
  new SequenceMatcher(null, uniqueA, disjointB).ratio();
});

benchmark('quickRatio: 10k mostly unique tokens', () => {
  new SequenceMatcher(null, uniqueA, uniqueB).quickRatio();
});

benchmark('realQuickRatio: 10k mostly unique tokens', () => {
  new SequenceMatcher(null, uniqueA, uniqueB).realQuickRatio();
});

const repeatedBefore = Array(1_000).fill('0123456789\n');
const repeatedAfter = Array(1_000).fill('01234a56789\n');
benchmark('Differ: 1k repeated modified lines', () => {
  new Differ().compare(repeatedBefore, repeatedAfter);
});
