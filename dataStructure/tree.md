## 概念
树是一种非顺序的数据存储结构，是一种分层数据的抽象模型，主要的用途为快速查找数据。

### 相关术语

- 根节点，位于树顶部的节点为根节点，他是没有父节点的。树中的每个元素都成为节点，节点又可以分成内部节点
和外部节点。至少有一个子节点的节点称为内部节点，没有子元素的节点为外部节点，也可以叫做叶子节点。
- 子树，子树是由某个节点以及他的后代节点构成。
- 节点有深度的概念，深度值也是他的祖先节点的数量。
- 树的高度，也叫做树的深度，根节点为第0层，后续的子节点逐渐加一。

### 二叉树和二叉查找树

- 二叉树的子节点最多只能有两个，一个是左侧节点，一个是右侧节点。这样的数据存储形式有助于我们从树中查找、删除、插入某些节点。
在计算机科学中应用十分广泛。
- 二叉查找树（BST）是二叉树的一种，但是他只允许左侧节点存储比父节点的值小的数据，右侧节点只能存储比父节点大或者相等的数据。

#### 实现

- 节点的构造类（Node）
- 二叉查找树的构造类（BinarySearchTree）

```javascript
// 节点构造函数
class Node {
    constructor(key) {
        this.key = key;
        this.left = null;
        this.right = null;
    }
}
// 二叉查找树构造函数
class BinarySearchTree {
    constructor() {
        this.root = null;
    }
    // 插入方法
    insert(key) {
        const insertNode = (node, newNode) => {
            if (node.key > newNode.key) {
                // 如果插入的值小于当前节点的值，需要判读当前节点的左侧节点是否为null,是的话直接赋值，否则继续递归
                if (node.left === null) {
                    node.left = newNode;
                } else {
                    insertNode(node.left, newNode);
                }
            } else {
                if (node.right === null) {
                    node.right = newNode;
                } else {
                    insertNode(node.right, newNode);
                }
            }
        };
        const newNode = new Node(key);
        // 如果当前根节点为null，则证明当前树是空的，因此直接复制即可。
        if (this.root === null) {
            this.root = newNode;
        } else {
            insertNode(this.root, newNode);
        }
    }
    // 中序遍历
    inOrderTraverse(callback) {
        const inOrderTraverseNode = (node, callback) => {
            if (node !== null) {
                inOrderTraverseNode(node.left, callback);
                callback(node.key);
                inOrderTraverseNode(node.right, callback);
            }
        };
        inOrderTraverseNode(this.root, callback);
    }
    // 先序遍历
    preOrderTraverse(callback) {
        const preOrderTraverseNode = (node, callback) => {
            if (node !== null) {
                callback(node.key);
                preOrderTraverseNode(node.left, callback);
                preOrderTraverseNode(node.right, callback);
            }
        };
        preOrderTraverseNode(this.root, callback);
    }
    // 后序遍历
    postOrderTraverse(callback) {
        const postOrderTraverseNode = (node, callback) => {
            if (node !== null) {
                postOrderTraverseNode(node.left, callback);
                postOrderTraverseNode(node.right, callback);
                callback(node.key);
            }
        };
        postOrderTraverseNode(this.root, callback);
    }
    min() {
        const minNode = (node) => {
            if (node) {
                while (node && node.left !== null) {
                    node = node.left;
                }
                return node.key;
            }
            return null;
        };
        return minNode(this.root);
    }
    max() {
        const maxNode = (node) => {
            if (node) {
                while (node && node.right !== null) {
                    node = node.right;
                }
                return node.key;
            }
            return null;
        };
        return maxNode(this.root);
    }
    search(key) {
        const searchNode = (node, key) => {
            if (node === null) {
                return false;
            }
            if (node.key < key) {
                return searchNode(node.right, key);
            }
            if (node.key > key) {
                return searchNode(node.left, key);
            }
            return true;
        };
        return searchNode(this.root, key);
    }
    remove(key) {
        const findMinNode = (node) => {
            if (node === null) {
                return null;
            }
            while (node && node.left !== null) {
                node = node.left;
            }
            return node;
        };
        const removeNode = (node, key) => {
            if (node === null) {
                return null;
            }
            if (key > node.key) {
                node.right = removeNode(node.right, key);
                return node;
            }
            if (key < node.key) {
                node.left = removeNode(node.left, key);
                return node;
            }
            // 删除值与当前节点值相同的情况下
            if (node.left === null && node.right === null) {
                node = null;
                return node;
            }
            if (node.left === null) {
                node = node.right;
                return node;
            }
            if (node.right === null) {
                node = node.left;
                return node;
            }
            // 当前节点 有后序的子节点。
            const rightMinNode = findMinNode(node.right);
            node.key = rightMinNode.key;
            node.right = removeNode(node.right, key);
            return node;
        };
        this.root = removeNode(this.root, key);
    }
}
```

说明：
- BinarySearchTree.insert(key)，这个方法向树中插入某个数据，数据插入需要符合二叉查找树的数据存储规则。
这里递归执行insertNode方法，直到找到合适的位置存储该数据。
