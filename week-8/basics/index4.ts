// Generics Example

function swap4<T>(a: T, b: T): T[] {
  return [b, a];
}

const ans4 = swap4(2, 4);
const ans44 = swap4("2", "4");
console.log(ans4);
console.log(ans44);
