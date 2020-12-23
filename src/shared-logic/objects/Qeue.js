export class Qeue {
    fullArr
    position
    count

    constructor() {
        this.fullArr = new Array(50)
        this.position = 0
        this.count = 0
    }

    addItem(item) {
        if(this.count >= this.fullArr.length) {
            /**
             * Create function to jenerate new array
             */
        }

        this.fullArr[this.count] = item
        this.count++
    }

    release(index) {

        const arrIndex = index ? index : 0
        const item = this.fullArr[arrIndex]

        for(let i=arrIndex; i<this.count - 1; i++) {
            this.fullArr[i] = this.fullArr[i+1]
        }

        this.fullArr[this.count - 1] = undefined
        count--
        
        return item
    }
}