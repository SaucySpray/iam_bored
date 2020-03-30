const p5 = require("p5")

const s = ( sketch ) => {
    let x = 100
    let y = 100

    sketch.setup = () => {
        sketch.createCanvas(window.innerWidth, window.innerHeight)
    }

    sketch.windowResized = () => {
        resizeCanvas(window.innerWidth, window.innerHeight)
    }

    sketch.draw = () => {
        for (let i = 0; i < 100; i++) {
            sketch.background(255)
            sketch.noFill()
            sketch.stroke(0)

            sketch.beginShape()
            for (var x = 0; x < sketch.width; x++) {
                var nx = sketch.map(x, sketch.height / 1, sketch.width, 10, 1)
                var y = sketch.height * sketch.noise(nx)
                sketch.vertex(x, y)
            }
            sketch.endShape()

            sketch.time++
            sketch.strokeWeight(0.25)
        }
    }
}

// let myp5 = new p5(s)