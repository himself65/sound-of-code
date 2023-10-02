// Functions Example
let a = 1;
let b = 2;

let c = function () {
  console.log(b);
  main();
};

// Run the main function
main();

function main() {
  console.log(a);
  c();
}
