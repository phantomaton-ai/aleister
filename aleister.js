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
  const root = find('ClassBody', parsed);
  const methods = root.body.filter(({ type }) => type === 'MethodDefinition');
  const commands = comments.filter(
    ({ type }) => type === 'Block'
  ).map(({ value, start, end }) => {
    const method = methods.find(m => m.start > end);
    return { method, value };
  }).filter(({ method }) => method).map(({ method, value }) => {
    const name = method.key.name;
    const documentation = doctrine.parse(value, { unwrap: true });
    const description = documentation.description;
    return { name, description };
  });
  console.log(
    JSON.stringify(parsed, null, 2),
    comments,
    JSON.stringify(commands, null, 2),
    root,
    methods,
    commands
  );
  return { commands };
}
