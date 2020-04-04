import { sounds } from '../tools/Assets'

class Audio {
    constructor(_three) {
        this.cache(_three)
        this.event()
    }

    cache(_three) {
        this.three = _three
        this.mesh = this.three.scene.getObjectByName('cover')

        // DOM
        this.audioElement = document.querySelector('#audio')
        this.current = document.querySelector('.horizontal').dataset.current
        this.audioElement.src = sounds[this.current]

        // Audio API
        this.audioCtx = new (window.AudioContext || window.webkitAudioContext)()
        this.analyser = this.audioCtx.createAnalyser()

        this.source = this.audioCtx.createMediaElementSource(this.audioElement)
        this.source.connect(this.analyser)
        this.source.connect(this.audioCtx.destination)

        this.bufferLength = this.analyser.frequencyBinCount
        this.frequencyData = new Uint8Array(this.bufferLength)

        this.audioElement.volume = .5

        // Variables
        this.playing = false

        // Bind loop
        this.loop = this.loop.bind(this)
    }

    event() {
        this.audioElement.addEventListener('playing', () => this.playing = true)
        this.audioElement.addEventListener('pause', () => this.playing = false)
        this.audioElement.addEventListener('ended', () => this.playing = false)

        document.addEventListener('click', () => {
            this.start()
        })
    }

    start() {
        this.current = document.querySelector('.horizontal').dataset.current
        this.audioElement.src = sounds[this.current]
        const audio = this.audioElement

        if (audio.paused) {
            audio.play()
            this.rafId = requestAnimationFrame(this.loop)

        } else {
            audio.pause()
            cancelAnimationFrame(this.rafId)
            this.frequencyData = new Uint8Array(this.bufferLength)
        }
    }

    loop() {
        this.rafId = requestAnimationFrame(this.loop)

        let scale = 0

        this.analyser.getByteFrequencyData(this.frequencyData)
        for (let i = 0; i < 64; i++) {
            scale = (this.frequencyData[i] * 0.01) / 4
        }

        TweenMax.to(this.mesh.scale, 0.1, {
            x: 1 + scale,
            y: 1 + scale,
            ease: Sine.easeInOut
        })
    }
}

export { Audio }