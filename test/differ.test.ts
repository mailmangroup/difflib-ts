import { Differ } from '../src';

let d: Differ;

beforeEach(() => {
  d = new Differ();
});

describe('Differ', () => {

  test('_qformat', () => {
    const results = d._qformat('\tabcDefghiJkl\n', '\tabcdefGhijkl\n', '  ^ ^  ^      ',   '  ^ ^  ^      ');
    expect(results).toEqual([
      '- \tabcDefghiJkl\n',
      '? \t ^ ^  ^\n',
      '+ \tabcdefGhijkl\n',
      '? \t ^ ^  ^\n'
    ]);
  });

  test('_fancyReplace', () => {
    const results = d._fancyReplace(['abcDefghiJkl\n'], 0, 1, ['abcdefGhijkl\n'], 0, 1);
    expect(results).toEqual([
      '- abcDefghiJkl\n',
      '?    ^  ^  ^\n',
      '+ abcdefGhijkl\n',
      '?    ^  ^  ^\n'
    ]);
  });

  test('compare', () => {
    const results = d.compare(
      ['one\n', 'two\n', 'three\n'],
      ['ore\n', 'tree\n', 'emu\n']
    );
    expect(results).toEqual([
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

    const text1 = [
      '1. Beautiful is better than ugly.\n',
      '2. Explicit is better than implicit.\n',
      '3. Simple is better than complex.\n',
      '4. Complex is better than complicated.\n'
    ];
    const text2 = [
      '1. Beautiful is better than ugly.\n',
      '3.   Simple is better than complex.\n',
      '4. Complicated is better than complex.\n',
      '5. Flat is better than nested.\n'
    ];

    d = new Differ();
    const results2 = d.compare(text1, text2);
    expect(results2).toEqual([
      '  1. Beautiful is better than ugly.\n',
      '- 2. Explicit is better than implicit.\n',
      '- 3. Simple is better than complex.\n',
      '+ 3.   Simple is better than complex.\n',
      '?   ++\n',
      '- 4. Complex is better than complicated.\n',
      '?          ^                     ---- ^\n',
      '+ 4. Complicated is better than complex.\n',
      '?         ++++ ^                      ^\n',
      '+ 5. Flat is better than nested.\n'
    ]);
  });
});
