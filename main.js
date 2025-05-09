import Tree from "./binarySearchTree.js";

function getRandomArray(length = 15) {
    const arr = [];
    while (arr.length < length) {
        const rand = Math.floor(Math.random() * 100);
        if (!arr.includes(rand)) arr.push(rand);
    }
    return arr;
}

const randomArray = getRandomArray();
const bst = new Tree(randomArray);

console.log("Initial tree (balanced):");
bst.prettyPrint();

console.log("Is balanced?", bst.isBalanced());

console.log("\nLevel order:");
bst.levelOrder(node => console.log(node.data));

console.log("\nPreorder:");
bst.preOrder(node => console.log(node.data));

console.log("\nInorder:");
bst.inOrder(node => console.log(node.data));

console.log("\nPostorder:");
bst.postOrder(node => console.log(node.data));

// to make it unbalanced
bst.insert(110);
bst.insert(120);
bst.insert(130);
bst.insert(140);

console.log("\nTree after unbalancing:");
bst.prettyPrint();
console.log("Is balanced?", bst.isBalanced());

// gonna rebalance
bst.rebalance();
console.log("\nTree after rebalancing:");
bst.prettyPrint();
console.log("Is balanced?", bst.isBalanced());

// do traversals again
console.log("\nLevel order:");
bst.levelOrder(node => console.log(node.data));
console.log("\nPreorder:");
bst.preOrder(node => console.log(node.data));
console.log("\nInorder:");
bst.inOrder(node => console.log(node.data));
console.log("\nPostorder:");
bst.postOrder(node => console.log(node.data));
