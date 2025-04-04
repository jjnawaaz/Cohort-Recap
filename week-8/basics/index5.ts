// use mulitple return types

function returnItems<T, U>(a: T, b: U): [U, T] {
  return [b, a];
}

const ansss = returnItems("1", 2);
const [element1, element2] = returnItems(1, "2"); // destructuring
console.log(ansss);

console.log(element1, typeof element1);
console.log(element2, typeof element2);
