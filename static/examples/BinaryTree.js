//This is a brief example, introduce the binary search tree
//This is a node class, they are the basic element make a tree.
class Node {
    //this creates a new node with the parent, right child and left child is null.
    constructor(value) {
        this.value = value;
        this.parent = null;
        this.left = null;
        this.right = null;
    }
}

//A binary search tree can be efficient to search
class BSTree {
    constructor() {
        this.root = null;
    }

    //This method use to insert a new node into the tree.
    //There is three case here
    //1. The tree is empty, we simply add node to the root
    //2. The value is smaller, we go to the left
    //3. everything, we go to the right
    insert(value){
        const node = new Node(value);
        if(!this.root){
            this.root = node;
            return this;
        }
        let current = this.root;
        while(true){
            if (node.value < current.value) {
                if (!current.left) {
                    current.left = node;
                    node.parent = current;
                    return this;
                }
                current = current.left;
            } else {
                if (!current.right) {
                    current.right = node;
                    node.parent = current;
                    return this;
                }
                current = current.right;
            }
        }
    }

    //This print method will travel the tree level(depth) by level
    printTree(){
        if(!this.root){
            console.log("This is empty");
            return;
        }

        //we use a first in first out queue here, thanks the dynamic array manipulation
        //we can use an array to implement our FIFO queue.
        const queue = [this.root];
        let index = 0;
        //We also can think the tree as an array, therefore, for node i, the index can be
        //Left Child is at position 2i.
        //Right Child is at position 2i + 1.
        //Parent Node (if it exists) is at position i/2 (integer division).
        while(queue.length){
            const current = queue.shift();
            console.log("index: " + index + ",value: " + current.value);
            index++;

            if(current.left){
                queue.push(current.left);
            }
            if(current.right){
                queue.push(current.right);
            }
        }
    }

    //Delete a node in the BST can be tricked, there is three scenarios could occur.
    //1. the node with no left child, then we can simply remove it from parents.
    //2. the node has one child, remove it and link the child to its parents.
    //3. the node has two children, we can do either:
    //(a). replace the node with the node have maximum value in the left subtree
    //(b). replace the node with the node have minimum value in the right subtree
    //And we are use recursive approach here, note we also can use recursive to do search in the BST.
    delete(value) {
        this.root = this._deleteRecursively(this.root, value);
    }

    _deleteRecursively(root, value) {
        if (!root) return root;  // base case: value not found in the tree

        //if the value we are looking for is smaller than the current node,
        // we look left, otherwise we look right.
        if (value < root.value) {
            root.left = this._deleteRecursively(root.left, value);
        } else if (value > root.value) {
            root.right = this._deleteRecursively(root.right, value);
        } else {
            // node with only one child or no child
            if (!root.left) return root.right;
            if (!root.right) return root.left;

            // node with two children: smallest value in the right subtree
            root.value = this._minValue(root.right);

            // delete the smallest child in the right subtree
            root.right = this._deleteRecursively(root.right, root.value);
        }
        return root;
    }

    //The left most node is the smallest value in the BST, this method will travel
    //through the tree and return the smallest value.
    _minValue(node) {
        let current = node;
        while (current.left !== null) {
            current = current.left;
        }
        return current.value;
    }
}

//here is a demo, feel free to play around.
const bst = new BSTree();
bst.insert(10);
bst.insert(5);
bst.insert(15);
bst.insert(17);

bst.printTree();
console.log();

bst.delete(10);
bst.printTree();