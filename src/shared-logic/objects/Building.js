export class Building {

    context
    position
    floorDimentions
    floors
    elevatorPosition

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

    sleep = (milliseconds) => {
        return new Promise(resolve => setTimeout(resolve, milliseconds))
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

    animateMove(destiny) {
        if(!this.elevatorPosition) {
            throw new Error("You did not build the bulding \n you can not move elevator that do not exists")
        }
        if(typeof destiny !== "number") {
            throw new Error("destiny must be a number")
        }
        if(destiny > this.floors || destiny < 1) {
            throw new Error("elevator must be in the range of floors")
        }

        let condition, growth
        const startLocation = (this.position.y-this.elevatorPosition)/this.floorDimentions.height
        if(startLocation === destiny) {
            return
        }
        else if(startLocation < destiny) {
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
            if(condition(location, destiny)) {
                window.requestAnimationFrame(moveElevator)
            }
        }
        window.requestAnimationFrame(moveElevator)
    }
}