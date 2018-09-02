import {objectToCamel} from '@/utils';

describe('objectToCamel', () => {
  ;
  test('converts lisp-case to camel', () => {
    expect(objectToCamel({ 'lisp-case' : 0 })).toMatchObject({ lispCase : 0 });
  });
  test('converts snake_case', () => {
    expect(objectToCamel({ snake_case : 0 })).toMatchObject({ snakeCase : 0 });
  });

  test('converts nested objects', () => {
    expect(objectToCamel({ snake_case : { 'lisp-case' : 0 } })).toMatchObject({
      snakeCase : { lispCase : 0 }
    });
  });

  test('converts objects in arrays', ()=>{
    expect(objectToCamel([{PascalCase: 1}, {'lisp-case': [{snake_case: 0}]}]))
      .toMatchObject([{pascalCase: 1}, {lispCase: [{snakeCase: 0}]);
  });
});
