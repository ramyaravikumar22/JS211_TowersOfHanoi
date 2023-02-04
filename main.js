'use strict';

const assert = require('assert');
const readline = require('readline');
//import assert from 'assert';
//import readline from 'readline';
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
}); 

//define an object

let stacks = {
  a: [4, 3, 2, 1],
  b: [],
  c: []
};

// Start here. What is this function doing?
// This function is printing the array values to the console by referring the keys within the object stacks.
const printStacks = () => {
  console.log("a: " + stacks.a);
  console.log("b: " + stacks.b);
  console.log("c: " + stacks.c);
};
// Call the function printStacks() to print the initial values of arrays to console
//printStacks()


// Next, what do you think this function should do?
// This is function which can move the last element of first array (arr1) to the second array (arr2)
const movePiece = (arr1, arr2) => {
  // console.log("\nInside movePiece()\n", "arr1: " + arr1, "\narr2: " + arr2);
  arr2.push(arr1.pop());
 // console.log(movePiece)
};


// Before you move, should you check if the move it actually allowed? Should 3 be able to be stacked on 2
// index(src_array_last_element, init_arr) > index(dst_array_last_element, init_arr) when (dest_array.length > 0)
const isLegal = (arr1, arr2) => {
  // Your code here
  console.log("\nLast element of arr1: " + arr1[arr1.length - 1])
  console.log("\nLast element of arr2: " + arr2[arr2.length - 1])
  if (arr1[arr1.length - 1]) { //last thing in arr1 is truthy
    if(arr1[arr1.length - 1] < arr2[arr2.length - 1] || arr2[arr2.length - 1] == undefined) {
      return(true);
    } else {
      return(false);
    }
  } else {
    return false;
  }
}

/*
// Function call to isLegal to check the functionality
 const x = [4, 3, 2];
 const y = [1];
 const z = [5];
console.log("Move from X to Y: " + isLegal(x,y));
console.log("Move from X to Z: " + isLegal(x,z));
 */


// What is a win in Towers of Hanoi? When should this function run? - A win in Towers of Hanoi is.. 
// ..when the length of endStack is same as startStack and the elements are arranged in the same order
const checkForWin = (stacks) => {
  if(stacks.a.length == 0 && (stacks.b.length ==0 || stacks.c.length ==0)) {  
    console.log("\nFinal State of Stacks:\n");
    printStacks();
    stacks.a = stacks.b.map((x) => x);
    stacks.b = [];
    stacks.a = stacks.c.map((x) => x);
    stacks.c = [];
    console.log("\n\nRESET State of Stacks:\n");
    printStacks();
    return(true);
  } else {
    return(false);
  }
};

// When is this function called? What should it do with its argument?
const towersOfHanoi = (startStack, endStack) => {
  var iter = 0;
  console.log("\n--------------------------\nVariable values within towersOfHanoi()\n");
  console.log("startStack is: " + startStack, "\nendStack is: " + endStack);
  console.log("startStack Value is: " + stacks[startStack], "\nendStack Value is: " + stacks[endStack]);
  console.log(isLegal(stacks[startStack], stacks[endStack]))
  // movePiece(stacks[startStack], stacks[endStack]);
  if (isLegal(stacks[startStack], stacks[endStack])) {
    movePiece(stacks[startStack], stacks[endStack]);
    if(checkForWin(stacks)) {            //if player won the game alert as won and return to new game
      console.log("\n  YOU HAVE WON \n");
      // window.alert("\nWISH TO RESTART?");
    }
 }
  else {
    getPrompt();  
  } 

};

const getPrompt = () => {
  printStacks();
  rl.question('\nstart stack: ', (startStack) => {
    rl.question('end stack: ', (endStack) => {
      var stackLength = stacks[startStack].length;
      towersOfHanoi(startStack, endStack);
      getPrompt(); //calling itself - looping until check for win and exits the game
    });
  });
};

// Tests

if (typeof describe === 'function') {

  describe('#towersOfHanoi()', () => {
    it('should be able to move a block', () => {
      towersOfHanoi('a', 'b');
      assert.deepEqual(stacks, { a: [4, 3, 2], b: [1], c: [] });
    });
  });

  describe('#isLegal()', () => {
    it('should not allow an illegal move', () => {
      stacks = {
        a: [4, 3, 2],
        b: [1],
        c: []
      };
      assert.equal(isLegal(stacks.a, stacks.b), false); //key values of the objects are defined as stacks.a, stacks.b, stacks.c
    });
    it('should allow a legal move', () => {
      stacks = {
        a: [4, 3, 2, 1],
        b: [],
        c: []
      };
      assert.equal(isLegal(stacks.a, stacks.c), true);
    });
  });

  describe('#checkForWin()', () => {
    it('should detect a win', () => {
      stacks = { a: [], b: [4, 3, 2, 1], c: [] };
      assert.equal(checkForWin(stacks), true); //calling the object stacks  
      stacks = { a: [1], b: [4, 3, 2], c: [] };
      assert.equal(checkForWin(stacks), false);
    });
  });

} else {

  getPrompt();

};


/*
//my test code - understanding logic
var iter = 0;

var init = ["a", "b", "c", "d"];
var final = [ ];
//mapping array from init to init_orig
var init_orig = init.map((x) => x);

// Towers of Hanoi Function
function runHanoi(num, src, dst) {
  // Define an intermediate/auxillary array
  var aux = [ ];
  if (num == 1) {
    move(src, dst);
    iter++;
  } 
  else {
    //move(init, inter)
    //num = num - 1;
    runHanoi(num - 1, src, aux, dst)
    move(src, dst)  
    iter++;
    //move(inter, final)
    //num = num - 1;
    runHanoi(num - 1, aux, dst, src)
    
  }
}

// Move last element from arr1 to arr2
function move(arr1, arr2) {
  arr2.push(arr1.pop());
  console.log(move);
}

// Function Call to runHanoi()
runHanoi(init.length, init, final);

// Length of initial/source array
var init_length = init_orig.length;
// Expected Iterations
var exp_iters = 2 ** init_length - 1;

// Verifying my output
console.log("\n\nAfter Run\n\ninit_orig:" + init_orig, "\ninit:" + init, "\nfinal:" + final, "\n\ninit_length:" + init_length, "\n\nexpected_iters:" + exp_iters, '\nactual_iters:' + iter);
*/
