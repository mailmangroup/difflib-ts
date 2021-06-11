import { SequenceMatcher } from '../src';

describe('SequenceMatcher', () => {

  test('setSeqs', () => {
    const s = new SequenceMatcher();
    s.setSeqs('abcd', 'bcde');
    expect(s.ratio()).toEqual(0.75);
  });

  test('setSeq1', () => {
    const s = new SequenceMatcher(null, 'abcd', 'bcde');
    expect(s.ratio()).toEqual(0.75);
    s.setSeq1('bcde');
    expect(s.ratio()).toEqual(1.0);
  });

  test('setSeq2', () => {
    const s = new SequenceMatcher(null, 'abcd', 'bcde');
    expect(s.ratio()).toEqual(0.75);
    s.setSeq2('abcd');
    expect(s.ratio()).toEqual(1.0);
  });

  test('findLongestMatch', () => {
    const isjunk = (x: string) => x === ' ';
    let s = new SequenceMatcher(isjunk, ' abcd', 'abcd abcd');
    let m = s.findLongestMatch(0, 5, 0, 9);
    expect(m).toEqual([1, 0, 4]);

    s = new SequenceMatcher(null, 'ab', 'c');
    m = s.findLongestMatch(0, 2, 0, 1);
    expect(m).toEqual([0, 0, 0]);
  });

  test('getMatchingBlocks', () => {
    let s = new SequenceMatcher(null, 'abxcd', 'abcd');
    let ms = s.getMatchingBlocks();
    expect(ms).toEqual([[0, 0, 2], [3, 2, 2], [5, 4, 0]]);

    const isjunk = (x: string) => x === ' ';
    s = new SequenceMatcher(isjunk, 'private Thread currentThread;', 'private volatile Thread currentThread;');
    ms = s.getMatchingBlocks();
    expect(ms).toEqual([[0, 0, 8], [8, 17, 21], [29, 38, 0]]);
  });

  test('getOpcodes', () => {
    let s = new SequenceMatcher(null, 'qabxcd', 'abycdf');
    expect(s.getOpcodes()).toEqual([
      ['delete' , 0, 1, 0, 0],
      ['equal'  , 1, 3, 0, 2],
      ['replace', 3, 4, 2, 3],
      ['equal'  , 4, 6, 3, 5],
      ['insert' , 6, 6, 5, 6]
    ]);

    const isjunk = (x: string) => x === ' ';
    s = new SequenceMatcher(isjunk, 'private Thread currentThread;', 'private volatile Thread currentThread;');
    expect(s.getOpcodes()).toEqual([
      ['equal', 0, 8, 0, 8],
      ['insert', 8, 8, 8, 17],
      ['equal', 8, 29, 17, 38]
    ]);
  });

  test('getGroupedOpcodes', () => {
    const a = [...Array(40).keys()].map(String);
    const b = a.slice();
    b.splice(8, 0, 'i');
    b[20] += 'x';
    b.splice(23, 5);
    b[30] += 'y';

    const s = new SequenceMatcher(null, a, b);
    expect(s.getGroupedOpcodes()).toEqual([
      [
        [ 'equal'  , 5 , 8  , 5 , 8 ],
        [ 'insert' , 8 , 8  , 8 , 9 ],
        [ 'equal'  , 8 , 11 , 9 , 12 ]
      ],
      [
        [ 'equal'   , 16 , 19 , 17 , 20 ],
        [ 'replace' , 19 , 20 , 20 , 21 ],
        [ 'equal'   , 20 , 22 , 21 , 23 ],
        [ 'delete'  , 22 , 27 , 23 , 23 ],
        [ 'equal'   , 27 , 30 , 23 , 26 ]
      ],
      [
        [ 'equal'   , 31 , 34 , 27 , 30 ],
        [ 'replace' , 34 , 35 , 30 , 31 ],
        [ 'equal'   , 35 , 38 , 31 , 34 ]
      ]
    ]);
  });

  test('ratio', () => {
    let s = new SequenceMatcher(null, 'abcd', 'bcde');
    expect(s.ratio()).toEqual(0.75);

    const isjunk = (x: string) => x === ' ';
    s = new SequenceMatcher(isjunk, 'private Thread currentThread;', 'private volatile Thread currentThread;');
    expect(s.ratio().toPrecision(3)).toEqual('0.866');
  });

  test('quickRatio', () => {
    const s = new SequenceMatcher(null, 'abcd', 'bcde');
    expect(s.quickRatio()).toEqual(0.75);
  });

  test('realQuickRatio', () => {
    const s = new SequenceMatcher(null, 'abcd', 'bcde');
    expect(s.realQuickRatio()).toEqual(1.0);
  });
});
