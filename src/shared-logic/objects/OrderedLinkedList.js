const order = {
    maxFirst: {
        name: "maxFirst",
        rule: (value, node) => {
            return value > node
        }
    },
    minFirst: {
        name: "minFirst",
        rule: (value, node) => {
            return value < node
        }
    }
}


class Node {

    value
    childeNode
    parentNode

    constructor(value) {
        this.value = value
    }

    appendChild(node) {
        let child
        if(this.childeNode) {
            child = this.childeNode
        }
        this.childeNode = node
        this.childeNode.parentNode = this
        if(child) {
            /////////////
            child.parentNode = node
            /////////////
            this.childeNode.childeNode = child
        }
    }

    removeChild() {
        if(!this.childeNode) {
            console.log("there is not childnode to remove")
            return
        }

        let node = this.childeNode
        if(node.childeNode) {
            this.childeNode = node.childeNode
            node.childeNode.parentNode = this
        } else {
            this.childeNode = undefined
        }
    }

    removeParent() {
        if(!this.parentNode) {
            console.log("there is not parentNode to remove")
            return
        }
        let node = this.parentNode
        if(node.parentNode) {
            this.parentNode = node.parentNode
            node.parentNode.childeNode = this
        } else {
            this.parentNode = undefined
        }
    }

}

/**
 * If same value node added, do not add it!!
 */

export class OrderedLinkedList {
    firstNode
    orderType
    count
    indexNode
    linkedListFinishedLoop

    constructor(orderType, value) {
        this.orderType = order[orderType]
        this.count = 0
        this.linkedListFinishedLoop = false
        if(value) {
            this.firstNode = new Node(value)
            this.count++
        }
    }

    appenedNode(value) {
        this.count++

        if(!this.firstNode) {
            this.firstNode = new Node(value)
            return
        }

        let currentNode = this.firstNode
        let parentNode = undefined

        while(currentNode && !this.orderType.rule(value, currentNode.value)) {
            if(value === currentNode.value) {
                return
            }
            parentNode = currentNode
            currentNode = currentNode.childeNode
        }
        if(parentNode) {
            parentNode.appendChild(new Node(value))
        } else {
            let node = new Node(value)
            node.appendChild(this.firstNode)
            this.firstNode = node
        }
    }

    removeFirst() {
        let node = this.firstNode
        this.firstNode = node.childeNode
        this.indexNode = this.firstNode
        
        this.count--

        return node ? node.value : undefined
    }

    removeNext() {
        if(!this.firstNode) {
            return undefined
        }

        if(!this.indexNode) {
            this.indexNode = this.firstNode
        }

        let node = this.indexNode

        this.indexNode = this.indexNode.childeNode

        if(node.childeNode) {
            if(node === this.firstNode) {
                this.firstNode = node.childeNode
            }
            node.childeNode.removeParent()
        } else if(node.parentNode) {
            node.parentNode.removeChild()
        } else {
            this.firstNode = undefined
        }

        this.count--

        return node
    }

    getIndexNode() {
        if(!this.indexNode) {
            this.indexNode = this.firstNode
        }

        return this.indexNode
    }

    backIndex() {
        if(!this.firstNode) {
            return
        }

        if(!this.indexNode) {
            this.indexNode = this.firstNode
            return
        }

        this.indexNode = this.indexNode.parentNode
    }

    print() {
        let currentNode = this.firstNode
        let output = ""
        while(currentNode) {
            output+=`${currentNode.value}, `
            currentNode = currentNode.childeNode
        }

        console.log(output)
    }
}