// User type as type
type User = {
  name: string;
  age: Number;
};

function swap3(details: User): User {
  return details;
}

const ans2 = swap3({
  name: "Junaid",
  age: 27,
});

console.log(ans2);
