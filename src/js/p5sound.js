import { three } from '../index'

import trunk from '../static/audio/trunk.mp3'
import goldenCage from '../static/audio/golden-cage.mp3'
import maiaMixed from '../static/audio/maia-mixed.mp3'
import BentYourMind from '../static/audio/bent-your-mind.mp3'
import yeahRight from '../static/audio/yeah-right.mp3'
import mexico from '../static/audio/mexico.mp3'
import hello from '../static/audio/hello.mp3'
import sprites from '../static/audio/sprites.mp3'
import aboutAGirl from '../static/audio/about-a-girl.mp3'
import { Line } from 'three'

let amp, fft, threeScene = null
let vol, spectrum = 0
let volHistory = []
let colors = []
let mysounds = []

const sketch = (p5) => {
    window.myp5 = p5;
    p5.setup = setup;
    p5.windowResized = windowResized;
    p5.preload = preload;
    p5.draw = draw;
}

function windowResized() {
    myp5.resizeCanvas(window.innerWidth, window.innerHeight);
}

function preload() {
    myp5.soundFormats('mp3')
    myp5.masterVolume(0.2)
    mysounds.push(myp5.loadSound(trunk))
    mysounds.push(myp5.loadSound(goldenCage))
    mysounds.push(myp5.loadSound(maiaMixed))
    mysounds.push(myp5.loadSound(BentYourMind))
    mysounds.push(myp5.loadSound(yeahRight))
    mysounds.push(myp5.loadSound(mexico))
    mysounds.push(myp5.loadSound(hello))
    mysounds.push(myp5.loadSound(sprites))
    mysounds.push(myp5.loadSound(aboutAGirl))
}

function setup() {
    threeScene = three
    amp = new p5.Amplitude()
    fft = new p5.FFT(0, 2048)
    myp5.createCanvas(window.innerWidth, window.innerHeight)

    colors.push(myp5.color(3, 201, 169)) // Green
    colors.push(myp5.color(155, 89, 182)) // Purple
    colors.push(myp5.color(34, 167, 240)) // Blue
    colors.push(myp5.color(249, 105, 14)) // Orange
    colors.push(myp5.color(252, 236, 1)) // Yellow
    colors.push(myp5.color(246, 71, 71)) // Red
    colors.push(myp5.color(0, 0, 0)) // Black
    colors.push(myp5.color(255, 255, 255)) // White
}

function draw() {
    vol = amp.getLevel()
    spectrum = fft.analyze()
    volHistory.push(vol)

    // Background
    let current = document.querySelector('[data-current]').dataset.current

    if (!mysounds[current].isPlaying()) {
        mysounds.forEach(sound => {
            sound.stop()
        })
        mysounds[current].play()
    }

    // if(current == 0) {
    //     myp5.background(colors[4])
    // }
    // else if (current == 1) {
    //     myp5.background(colors[6])
    //     // myp5.background(myp5.lerpColor(colors[4], colors[6], amt))
    // }
    // else if (current == 2) {
    //     myp5.background(colors[2])
    // }
    // else if (current == 3) {
    //     myp5.background(colors[0])
    // }
    // else if (current == 4) {
    //     myp5.background(colors[5])
    // }
    // else if (current == 5) {
    //     myp5.background(colors[6])
    // }
    // else if (current == 6) {
    //     myp5.background(colors[0])
    // }
    // else if (current == 7) {
    //     myp5.background(colors[1])
    // }
    // else if (current == 8) {
    //     myp5.background(colors[3])
    // }

    // Draw line
    // myp5.stroke(255)
    // myp5.noFill()
    // myp5.beginShape()
    // for(let i=0; i<volHistory.length; i++) {
    //     let y = myp5.map(volHistory[i], 0, 1, myp5.height / 2, 0)
    //     myp5.vertex(i, y)
    // }
    // myp5.endShape()

    // if(volHistory.length > myp5.width) {
    //     volHistory.splice(0, 1)
    // }

    // Draw
    myp5.beginShape()
    for (let i=0; i<spectrum.length; i++) {
        let amp = spectrum[i]
        let y = myp5.map(amp, 0, spectrum.length, myp5.height / 2, 0)
        // myp5.line(i, myp5.height / 2, i, y)
        myp5.vertex(i, y)
    }
    myp5.stroke(255)
    myp5.noFill()
    myp5.endShape()

    // Animate mesh
    TweenMax.to(threeScene.scene.children[0].children[0].scale ,0.1, {
        x: 1.1 + vol, y: 1.1 + vol, ease: Sine.easeInOut
    })
}

new p5(sketch)