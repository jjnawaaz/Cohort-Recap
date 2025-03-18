let arr = [1, 2, 3, 4, 5, 6];

arr.forEach((e, i) => {
  if (e % 2 == 0) {
    arr[i] = e * 2;
  }
});

console.log(arr);

let newArr = arr.filter((e) => e % 2 == 0);
console.log(newArr);

delete arr[2];

console.log(arr);
