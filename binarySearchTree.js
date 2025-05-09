class Node {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

class Tree {
    constructor(array) {
        const sorted = [...new Set(array)].sort((a, b) => a - b);
        this.root = this.buildTree(sorted);
    }

    buildTree(array) {
        if (array.length === 0) return null;
        const mid = Math.floor(array.length / 2);
        const node = new Node(array[mid]);
        node.left = this.buildTree(array.slice(0, mid));
        node.right = this.buildTree(array.slice(mid + 1));
        return node;
    }

    insert(value, root = this.root) {
        if (!root) return new Node(value);
        if (value < root.data) {
            root.left = this.insert(value, root.left);
        } else if (value > root.data) {
            root.right = this.insert(value, root.right);
        }
        return root;
    }

    deleteItem(value, root = this.root) {
        if (!root) return null;
        if (value < root.data) {
            root.left = this.deleteItem(value, root.left);
        } else if (value > root.data) {
            root.right = this.deleteItem(value, root.right);
        } else {
            // Case 1: No child
            if (!root.left && !root.right) return null;

            // Case 2: One child
            if (!root.left) return root.right;
            if (!root.right) return root.left;

            // Case 3: Two children
            let minRight = root.right;
            while (minRight.left) minRight = minRight.left;
            root.data = minRight.data;
            root.right = this.deleteItem(minRight.data, root.right);
        }
        return root;
    }

    find(value, root = this.root) {
        if (!root) return null;
        if (value === root.data) return root;
        if (value < root.data) return this.find(value, root.left);
        return this.find(value, root.right);
    }

    levelOrder(callback) {
        if (typeof callback !== 'function') throw new Error("Callback required.");
        const queue = [this.root];
        while (queue.length) {
            const node = queue.shift();
            callback(node);
            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }
    }

    inOrder(callback, root = this.root) {
        if (typeof callback !== 'function') throw new Error("Callback required.");
        if (!root) return;
        this.inOrder(callback, root.left);
        callback(root);
        this.inOrder(callback, root.right);
    }

    preOrder(callback, root = this.root) {
        if (typeof callback !== 'function') throw new Error("Callback required.");
        if (!root) return;
        callback(root);
        this.preOrder(callback, root.left);
        this.preOrder(callback, root.right);
    }

    postOrder(callback, root = this.root) {
        if (typeof callback !== 'function') throw new Error("Callback required.");
        if (!root) return;
        this.postOrder(callback, root.left);
        this.postOrder(callback, root.right);
        callback(root);
    }

    height(node = this.root) {
        if (!node) return -1;
        const leftHeight = this.height(node.left);
        const rightHeight = this.height(node.right);
        return Math.max(leftHeight, rightHeight) + 1;
    }

    depth(value, node = this.root, currentDepth = 0) {
        if (!node) return null;
        if (value === node.data) return currentDepth;
        if (value < node.data) return this.depth(value, node.left, currentDepth + 1);
        return this.depth(value, node.right, currentDepth + 1);
    }

    isBalanced(root = this.root) {
        if (!root) return true;
        const leftHeight = this.height(root.left);
        const rightHeight = this.height(root.right);
        const diff = Math.abs(leftHeight - rightHeight);
        return diff <= 1 && this.isBalanced(root.left) && this.isBalanced(root.right);
    }

    rebalance() {
        const values = [];
        this.inOrder(node => values.push(node.data));
        this.root = this.buildTree(values);
    }

    prettyPrint(node = this.root, prefix = "", isLeft = true) {
        if (node === null) return;
        if (node.right !== null) {
            this.prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
        }
        console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
        if (node.left !== null) {
            this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
        }
    }
}

export default Tree;