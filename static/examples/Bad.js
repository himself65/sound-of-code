// This is an example of bad code.
let x = 1;
switch (x) {
  case 0:
    foo;
    break;
  case 1:
    foo = x; // SyntaxError for redeclaration.
    break;
}
