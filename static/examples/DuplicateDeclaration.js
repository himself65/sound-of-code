// This is an example of bad code.
let x = 1;
switch (x) {
  case 0:
    let foo;
    break;
  case 1:
    let foo; // SyntaxError for redeclaration.
    break;
}
