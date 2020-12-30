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
        this.childeNode = node
        this.childeNode.parentNode = this
    }

}

export class OrderedLinkedList {
    firstNode
    orderType
    count
    indexNode

    constructor(orderType, value) {
        this.orderType = order[orderType]
        this.count = 0
        if(value) {
            this.firstNode = new Node(value)
            this.count++
            this.indexNode = this.firstNode
        }
    }

    appenedNode(value) {
        this.count++
        // console.log("count + 1")
        if(!this.firstNode) {
            this.firstNode = new Node(value)
            this.indexNode = this.firstNode
            return
        }

        let currentNode = this.firstNode

        let parentNode = undefined
        while(currentNode && !this.orderType.rule(value, currentNode.value)) {
            parentNode = currentNode
            currentNode = currentNode.childeNode
        }

        if(currentNode===undefined) {
            currentNode=new Node(value)
        } else {
            const newNode = new Node(value)
            newNode.childeNode = currentNode
            if(parentNode) {
                parentNode.childeNode = newNode
            } else {
                this.firstNode = newNode
            }
        }
        
        if(parentNode && parentNode.childeNode===undefined) {
            parentNode.childeNode = currentNode
        }
    }

    removeFirst() {
        let node = this.firstNode
        this.firstNode = node.childeNode
        this.indexNode = this.firstNode
        
        this.count--
        // console.log("count - 1")
        // return node.value
        return node ? node.value : undefined
    }

    removeNext() {
        let node = this.indexNode
        let parent = this.indexNode.parentNode
        this.indexNode = this.indexNode && this.indexNode.childeNode ? this.indexNode.childeNode : this.firstNode
        if(parent) {
            parent.childeNode = this.indexNode
        } else {
            this.firstNode = this.indexNode
        }
        if(this.indexNode) {
            this.indexNode.parentNode = parent
        }
        if(node === this.firstNode) {
            this.firstNode = undefined
        }
        this.count--
        // console.log("count - 1")
        // return node.value
        return node
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