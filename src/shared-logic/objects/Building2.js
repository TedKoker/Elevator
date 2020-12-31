import {OrderedLinkedList} from './OrderedLinkedList'

export class Building2 {
    context
    position
    floorDimentions
    floors
    elevatorPosition
    elevatorMove
    upList
    downList
    currentList

    constructor(canvas, position, floorDimentions, floors) {
        if(!(canvas instanceof HTMLCanvasElement)) {
            throw new Error("canvas must be canvas Element")
        }
        if(!position || !position.x || !position.y) {
            throw new Error("position must contain x and y")
        }
        if(!floorDimentions || !floorDimentions.width || !floorDimentions.height) {
            throw new Error("floor dimention must contain width and height")
        }
        if(!floors || typeof floors!=="number") {
            throw new Error("floors must be a number")
        }

        this.context = canvas.getContext("2d")
        this.position = position
        this.floorDimentions = floorDimentions
        this.floors = floors
        this.elevatorMove = false
        this.upList = new OrderedLinkedList("minFirst")
        this.downList = new OrderedLinkedList("maxFirst")
    }

    build(elevatorPosition) {
        if(elevatorPosition > this.floors || elevatorPosition < 1) {
            throw new Error("elevator must be in the range of floors")
        }
        for(let i=0; i<this.floors; i++) {
            this.buildFloor(i + 1)
        }
        if(!elevatorPosition) {
            elevatorPosition = 1
        }
        this.elevatorPosition = this.position.y - elevatorPosition*this.floorDimentions.height
        this.buildElveator(this.elevatorPosition)
    }

    buildFloor(floorNumber) {
        const {x, y} = this.position
        const {width, height} = this.floorDimentions
        this.context.beginPath()
        this.context.rect(x, y - floorNumber*height, width, height)
        this.context.stroke()
    }

    clearFloor(floorNumber) {
        const {x, y} = this.position
        const {width, height} = this.floorDimentions
        this.context.clearRect(x-1, y-floorNumber*height, width+2, height)
    }

    buildElveator(location) {
        const {x, y} = this.position
        const {width, height} = this.floorDimentions
        this.context.fillStyle = "red"
        this.context.fillRect(x, location, width, height)
    }

    clearElevator(location) {
        const {x, y} = this.position
        const {width, height} = this.floorDimentions
        this.context.clearRect(x-1, location, width+2, height)
    }

    answerCall(call) {
        if(call && call.goingUp) {
            this.upList.appenedNode(call.destination)
        } else if(call) {
            this.downList.appenedNode(call.destination)
        }
        if(!this.currentList) {
            this.currentList = this.upList.firstNode ? this.upList : this.downList
        }
        // if(this.currentList.count === 0) {
        //     this.currentList = this.currentList===this.upList ? this.downList : this.upList
        // }
        if(!this.elevatorMove && this.currentList.count > 0) {
            let nextFloor = this.currentList.removeNext()
            console.log(this.currentList)
            console.log(nextFloor)
            if(!nextFloor) { // && !nextFloor.childeNode
                this.currentList = this.currentList===this.upList ? this.downList : this.upList
                console.log("switch lists")
            }
            /////////////////////////////////////////////
            // if(nextFloor) {
            //     this.manageCall(call || {destination: nextFloor.value, goingUp: this.currentList===this.upList})
            // }
            this.manageCall(call || {destination: nextFloor.value, goingUp: this.currentList===this.upList})
        }
    }

    manageCall(call) {
        const floor = (this.position.y-this.elevatorPosition)/this.floorDimentions.height
        if(!this.elevatorMove && floor !==call.destination) {
            this.animateMove(call)
        } else if(this.elevatorMove) {
            this.animateDoor(call)
        } else {
            this.answerCall()
        }
    }

    animateMove(call) {
        this.elevatorMove = true
        let condition, growth
        const startLocation = (this.position.y-this.elevatorPosition)/this.floorDimentions.height
        if(startLocation < call.destination) {
            condition = (current, final) => {return current < final}
            growth = -1
        } else {
            condition = (current, final) => {return current > final}
            growth = 1
        }
        const moveElevator = () => {
            this.elevatorPosition+=growth
            const location = (this.position.y-this.elevatorPosition)/this.floorDimentions.height
            this.clearFloor(Math.floor(location))
            this.clearFloor( Math.ceil(location))
            this.clearElevator(location)
            this.buildFloor(Math.floor(location))
            this.buildFloor(Math.ceil(location))
            this.buildElveator(this.elevatorPosition)

            if(condition(location, call.destination)) {
                window.requestAnimationFrame(moveElevator)
            } else {
                this.manageCall(call)
            }
        }
         window.requestAnimationFrame(moveElevator)
    }

    animateDoor(call) {
        let growth = 1
        let open = true
        const {x} = this.position
        const {width, height} = this.floorDimentions

        const doorAction = () => {
            if(growth <= width) {
                this.context.fillStyle = open ? "green" : "red"
                if(open) {
                    this.context.fillRect(x ,this.elevatorPosition , growth, height)
                } else {
                    this.context.fillRect(x + width ,this.elevatorPosition , -growth, height)
                }
                growth+=1
                window.requestAnimationFrame(doorAction)
            } else if (open) {
                console.log("point to choose if call.callPoint is true")
                setTimeout(() => {
                    growth = 1
                    open = false
                    window.requestAnimationFrame(doorAction)
                }, 1000)
            } else {
                this.elevatorMove = false
                this.manageCall(call)
            }
        }

        window.requestAnimationFrame(doorAction)
    }
}