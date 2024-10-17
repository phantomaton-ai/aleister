import * as acorn from 'acorn';
import * as doctrine from 'doctrine';

function first(array, fn) {
  for (const element of array) {
    const value = fn(element);
    if (value) return value;
  }
}

function find(type, tree) {
  if (Array.isArray(tree)) return first(tree, subtree => find(type, subtree));
  if (tree.type === type) return tree;
  if (tree.body) return find(type, tree.body);
}

export default function aleister(Class) {
  const comments = [];
  const options = {ecmaVersion: 2022, sourceType: 'module', onComment: comments};
  const parsed = acorn.parse(Class.toString(), options);
  const classbody = find('ClassBody', parsed);
  //console.log(parsed, comments);
  const candidates = comments.filter(
    ({ type }) => type === 'Block'
  ).map(({ value, start, end }) => {
    
    return doctrine.parse(value, { unwrap: true });
  });
  console.log(
    JSON.stringify(parsed, null, 2),
    comments,
    JSON.stringify(candidates, null, 2),
    classbody
  );
}
