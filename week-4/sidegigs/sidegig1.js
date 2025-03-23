let obj = [
  {
    name: "Junaid",
    age: 25,
  },
  {
    name: "Raman",
    age: 21,
  },
  {
    name: "Naman",
    age: 31,
  },
  {
    name: "Suhan",
    age: 55,
  },
];

let newArr = obj.map((value) => {
  if (value.age > 25) {
    return {
      name: value.name,
      age: value.age,
      isAllowed: true,
    };
  } else {
    return {
      name: value.name,
      age: value.age,
      isAllowed: false,
    };
  }
});

console.log(newArr);

const filtered = newArr.filter((value) => !value.isAllowed);
console.log(filtered);
