//This is a brief example to introduce Linked List
//Linked-list is a fundamental data structure, the pro of this structure is the dynamic size adjust,
//we can easily grow or shrink the list, also it have less cost for insert or delete item, since we don't
//need to shift the item in the list as the array. But the con is linked-list can be eaten up lot of
//memory space compare to the array.
//but understand the Linked-list is great because we can use it to implementing other structure like
//stack, queue and hashtable etc. They are really usefully.

//this node is use for the one direction linked-list since it only pointer to it successor
class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

//a one direction linked-list only allow us travel from head
class LinkedList {
  constructor() {
    this.head = null;
    this.size = 0;
  }

  //prepend allow us to add a node at beginning of linked-list
  prepend(value) {
    const node = new node(value);
    //if this list is empty, we point the head to our new node,
    //else we point next to the current head for our new node, then put set our new node as head
    if (!this.head) {
      this.head = node;
    } else {
      node.next = this.head;
      this.head = node;
    }
    //increase the size
    this.size++;
  }

  //we append a new node at end of the list
  append(value) {
    const node = new Node(value);

    //if the list is empty, then we just set the head of the list to the new node
    if (!this.head) {
      this.head = node;
    } else {
      //else we iterate through the list till the last node in the list, then
      //we point the next from last node to our new node.
      let current = this.head;
      while (current.next) {
        current = current.next;
      }
      current.next = node;
    }
    //increase the size
    this.size++;
  }

  //this function return the node with match value
  search(value) {
    //check if the list is empty
    if (!this.head) {
      console.log("empty list!");
      return null;
    }
    let current = this.head;
    //travel through the list till find the match node
    while (current) {
      if (current.value === value) {
        return current;
      } else {
        current = current.next;
      }
    }
    console.log("item not found");
    return null;
  }

  //this function remove the first node find in the list match the value
  remove(value) {
    if (!this.head) {
      console.log("empty list!");
      return null;
    }
    let current = this.head;
    //we record the previous node, so we can link the previous node to the next nod of current node.
    let previous = null;
    while (current) {
      if (current.value === value) {
        //if previous is null, then means the head node is the node we are looking for
        //therefore, we just simply set the list head to the next node.
        //otherwise, we set the next node from previous node to the next node of current node.
        if (!previous) {
          this.head = current.next;
        } else {
          previous.next = current.next;
        }
        //decrease the list size
        this.size--;
        return current;
      }
      previous = current;
      current = current.next;
    }
    console.log("item not found");
    return null;
  }

  //this just simply travel through the list and print each node in ordered.
  print() {
    if (!this.head) {
      console.log("empty list");
      return;
    }
    let current = this.head;
    let result = [];
    while (current) {
      result.push(current.value);
      current = current.next;
    }
    console.log(result.join("->"));
  }

  //simply get the size of the list
  getSize() {
    return this.size;
  }
}

let list = new LinkedList();
list.append(1);
list.append(2);
list.append(3);
list.print(); // 1 -> 2 -> 3

console.log(list.search(2));
list.remove(2);
list.print();

//this is node, but for bidirectional list, therefore, it has two pointer, one is point to the successor
//one is predecessor
class DNode {
  constructor(value) {
    this.value = value;
    this.next = null;
    this.previous = null;
  }
}

//this is bidirectional list, which we travel from either head or tail.
class DoubleLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  //we add a new node at beginning of the list
  //pretty much similar as the one way linked-list, except we also need set the previous node of the
  //head to our new node
  prepend(value) {
    let node = new DNode(value);
    if (!this.head) {
      this.head = node;
      this.tail = node;
    } else {
      this.head.previous = node;
      node.next = this.head;
      this.head = node;
    }
    this.size++;
  }

  //same as one way linked-list, except also have to change tail pointer.
  append(value) {
    let node = new DNode(value);
    if (!this.head) {
      this.head = node;
      this.tail = node;
    } else {
      node.previous = this.tail;
      this.tail.next = node;
      this.tail = node;
    }
    this.size++;
  }

  //remove a node has found as first match with given value
  remove(value) {
    if (!this.head) {
      console.log("empty list");
      return null;
    }
    let current = this.head;
    while (current) {
      if (current.value === value) {
        //if there is a previous node, then we just link the previous and next node.
        //else we just set the head pointer to the next node
        if (current.previous) {
          current.previous.next = current.next;
        } else {
          this.head = current.next;
        }
        //if there is a next node, then we just link the previous and next node.
        //else we just set the tail pointer to the previous node.
        if (current.next) {
          current.next.previous = current.previous;
        } else {
          this.tail = current.previous;
        }

        this.size--;
        return current;
      }
      current = current.next;
    }
    console.log("item not found");
    return null;
  }

  //this travel the list from beginning to the end.
  search(value) {
    if (!this.head) {
      console.log("empty list");
      return null;
    }
    let current = this.head;
    while (current) {
      if (current.value === value) {
        return current;
      }
      current = current.next;
    }
    console.log("item not found");
    return null;
  }

  //print the whole list.
  print() {
    if (!this.head) {
      console.log("empty list");
      return;
    }
    let current = this.head;
    let result = [];
    while (current) {
      result.push(current.value);
      current = current.next;
    }
    console.log(result.join("<->"));
  }

  //return the size of the list
  getSize() {
    return this.size;
  }
}

let dLinkedList = new DoubleLinkedList();
dLinkedList.append(1);
dLinkedList.append(2);
dLinkedList.append(3);
dLinkedList.print(); //1 <-> 2 <-> 3

console.log(dLinkedList.search(2));
dLinkedList.remove(2);
dLinkedList.print();
