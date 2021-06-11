import {
  _arrayCmp,
  getCloseMatches,
  _countLeading,
  IS_LINE_JUNK,
  IS_CHARACTER_JUNK,
  _formatRangeUnified,
  unifiedDiff,
  _formatRangeContext,
  contextDiff,
  ndiff,
  restore
} from '../src';
import { KEYWORDS } from './keywords';

describe('general', () => {

  test('_arrayCmp', () => {
    expect(_arrayCmp([1, 2], [1, 2])).toEqual(0);
    expect(_arrayCmp([1, 2, 3], [1, 2, 4])).toBeLessThan(0);
    expect(_arrayCmp([1], [1, 2])).toBeLessThan(0);
    expect(_arrayCmp([2, 1], [1, 2])).toBeGreaterThan(0);
    expect(_arrayCmp([2, 0, 0], [2, 3])).toBeLessThan(0);
    expect(_arrayCmp([2, 0, 0], [2, 3])).toBeLessThan(0);
    expect(_arrayCmp([], [1])).toBeLessThan(0);
    expect(_arrayCmp([1], [])).toBeGreaterThan(0);
    expect(_arrayCmp([], [])).toEqual(0);
  });

  test('getCloseMatches', () => {
    expect(getCloseMatches('appel', ['ape', 'apple', 'peach', 'puppy']))
      .toEqual(['apple', 'ape']);

    expect(getCloseMatches('wheel', KEYWORDS)).toEqual(['when', 'while']);
    expect(getCloseMatches('accost', KEYWORDS)).toEqual(['const']);
  });

  test('_countLeading', () => {
    expect(_countLeading('   abc', ' ')).toEqual(3);
  });

  test('IS_LINE_JUNK', () => {
    expect(IS_LINE_JUNK('\n')).toEqual(true);
    expect(IS_LINE_JUNK('  #   \n')).toEqual(true);
    expect(IS_LINE_JUNK('hello\n')).toEqual(false);
  });

  test('IS_CHARACTER_JUNK', () => {
    expect(IS_CHARACTER_JUNK(' ')).toEqual(true);
    expect(IS_CHARACTER_JUNK('\t')).toEqual(true);
    expect(IS_CHARACTER_JUNK('\n')).toEqual(false);
    expect(IS_CHARACTER_JUNK('x')).toEqual(false);
  });

  test('_formatRangeUnified', () => {
    expect(_formatRangeUnified(1, 2)).toEqual('2');
    expect(_formatRangeUnified(1, 3)).toEqual('2,2');
    expect(_formatRangeUnified(1, 4)).toEqual('2,3');
  });

  test('_unifiedDiff', () => {
    expect(
      unifiedDiff(
        'one two three four'.split(' '),
        'zero one tree four'.split(' '), {
          fromfile: 'Original',
          tofile: 'Current',
          fromfiledate: '2005-01-26 23:30:50',
          tofiledate: '2010-04-02 10:20:52',
          lineterm: ''
        }
      )
    ).toEqual([
      '--- Original\t2005-01-26 23:30:50',
      '+++ Current\t2010-04-02 10:20:52',
      '@@ -1,4 +1,4 @@',
      '+zero',
      ' one',
      '-two',
      '-three',
      '+tree',
      ' four'
    ]);
  });

  test('_formatRangeContext', () => {
    expect(_formatRangeContext(1, 2)).toEqual('2');
    expect(_formatRangeContext(1, 3)).toEqual('2,3');
    expect(_formatRangeContext(1, 4)).toEqual('2,4');
  });

  test('contextDiff', () => {
    const a = ['one\n', 'two\n', 'three\n', 'four\n'];
    const b = ['zero\n', 'one\n', 'tree\n', 'four\n'];
    expect(contextDiff(a, b, { fromfile: 'Original', tofile: 'Current' }))
      .toEqual([
        '*** Original\n',
        '--- Current\n',
        '***************\n',
        '*** 1,4 ****\n',
        '  one\n',
        '! two\n',
        '! three\n',
        '  four\n',
        '--- 1,4 ----\n',
        '+ zero\n',
        '  one\n',
        '! tree\n',
        '  four\n'
      ]);
  });

  test('ndiff', () => {
    const a = ['one\n', 'two\n', 'three\n'];
    const b = ['ore\n', 'tree\n', 'emu\n'];
    expect(ndiff(a, b))
      .toEqual([
        '- one\n',
        '?  ^\n',
        '+ ore\n',
        '?  ^\n',
        '- two\n',
        '- three\n',
        '?  -\n',
        '+ tree\n',
        '+ emu\n'
      ]);
  });

  test('restore', () => {
    const a = ['one\n', 'two\n', 'three\n'];
    const b = ['ore\n', 'tree\n', 'emu\n'];
    const diff = ndiff(a, b);
    expect(restore(diff, 1))
      .toEqual([
        'one\n',
        'two\n',
        'three\n'
      ]);
    expect(restore(diff, 2))
      .toEqual([
        'ore\n',
        'tree\n',
        'emu\n'
      ]);
    expect(() => { restore(diff, 3); }).toThrow();
  });
});
