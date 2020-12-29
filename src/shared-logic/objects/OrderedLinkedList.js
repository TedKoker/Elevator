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

    constructor(value) {
        this.value = value
    }

    appendChild(node) {
        this.childeNode = node
    }

}

export class OrderedLinkedList {
    firstNode
    orderType
    count
    indexNode

    constructor(orderType, value) {
        this.orderType = order[orderType]
        if(value) {
            this.firstNode = new Node(value)
            this.count++
            this.indexNode = this.firstNode
        }
    }

    appenedNode(value) {

        if(!this.firstNode) {
            this.firstNode = new Node(value)
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
        this.count++
    }

    removeFirst() {
        let node = this.firstNode
        this.firstNode = node.childeNode
        this.indexNode = this.firstNode

        return node.value
    }

    removeNext() {
        let node = this.indexNode
        this.indexNode = this.indexNode.childeNode

        return node.value
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