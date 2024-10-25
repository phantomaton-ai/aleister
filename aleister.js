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

const has = (property, value) => object => object[property] === value;

export default function aleister(Class) {
  const comments = [];
  const options = {ecmaVersion: 2022, sourceType: 'module', onComment: comments};
  const parsed = acorn.parse(Class.toString(), options);
  const root = find('ClassBody', parsed);
  const methods = root.body.filter(has('type', 'MethodDefinition'));
  const commands = comments.filter(has('type', 'Block')).map((
    { value, start, end }
  ) => {
    const method = methods.find(m => m.start > end);
    return { method, value };
  }).filter(({ method }) => method).map(({ method, value }) => {
    const name = method.key.name;
    const { tags, description } = doctrine.parse(value, { unwrap: true });

    const parameters =
      tags.filter(has('title', 'param')).map(({ name }) => name);
    const bodname = tags.find(has('title', 'body'))?.description;
    const bodex = bodname ?
      parameters.findIndex(name => name === bodname) : -1;
    const code = tags.find(has('title', 'example')).description;
    const program = acorn.parse(code, {ecmaVersion: 2022});
    const call = find('ExpressionStatement', program).expression;
    const example = { attributes: {} };
    call.arguments.forEach(({ value }, index) => {
      if (index === bodex) example.body = value;
      else example.attributes[parameters[index]] = value;
    });
    const command = { name, description, example, parameters, bodex };
    if (bodex >= 0) command.body = true;
    return command;
  });
  return options => {
    const instance = new Class(options);
    return {
      commands: commands.map((
        { name, description, example, parameters, bodex }
      ) => ({
        name,
        description,
        example,
        execute: (attributes, body) => instance[name](
          ...parameters.map((parameter, index) => 
            index === bodex ? body : attributes[parameter]
          )
        ),
        validate: (attributes, body) => parameters.every(
          (parameter, index) =>
            index === bodex ? body : Object.hasOwn(attributes, parameter)
        )
      })),
      instance
    };
  };
}
