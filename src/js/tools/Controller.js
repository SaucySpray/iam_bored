import * as THREE from 'three'
import _ from 'lodash'
import { TweenMax, Sine, Expo } from 'gsap'
import Hammer from 'hammerjs'
import { landing, alone, eternity, think, about, meaning, slow, fast, care } from '../sections'
import { assets, sounds, textures } from './Assets'
import { Display } from './Display'

class Controller {
    constructor(_three) {
        this.cache(_three)
        this.mounted()
    }

    cache(_three) {
        // Three inherit
        this.three = _three
        this.bgMesh = this.three.scene.getObjectByName("background")
        this.meshWrapper = this.three.scene.getObjectByName("coverWrapper")
        this.mesh = this.three.scene.getObjectByName("cover")
        this.loader = new THREE.TextureLoader()

        // DOM
        this.container = document.querySelector('.horizontal')
        this.sections = this.container.querySelectorAll('.section')
        this.spotify = document.querySelector('.spotify__img__g')
        this.mouse = {
            x: 0,
            y: 0
        }
        this.orientation = {
            a: 0,
            b: 0,
            g: 0
        }
        this.hammer = new Hammer(document.body)

        // Variables
        this.slides = {
            current: 0,
            max: 8
        }
        this.animated = [true, false, false, false, false, false, false, false]
        this.isAnimating = false
        this.loop = this.loop.bind(this)
    }

    mounted() {
        this.container.style.transform = ''
        this.events()
        this.setupAudio()
        this.resize(this.slides)
    }

    events() {
        // Responsive
        window.addEventListener('resize', () => this.resize(this.slides))

        this.mousemove = window.addEventListener('mousemove', (_e) => {
            this.mouse.x = _e.clientX
            this.mouse.y = _e.clientY
        })

        // Wheel & Pan
        window.addEventListener('wheel',
            _.debounce(
                _.throttle((_e) => {
                    _e.preventDefault()
                    if(!document.querySelector('.loader')) {
                        this.handleWheel(_e.deltaY)
                    }
                }, 1600)
                , 100
            ),
            { passive: false }
        )

        this.hammer.on('pan',
            _.debounce(
                _.throttle((_e) => {
                    if (_e.direction == 4 && !document.querySelector('.loader')) {
                        this.handleWheel(-100)
                    }
                    else if (_e.direction == 2 && !document.querySelector('.loader')) {
                        this.handleWheel(100)
                    }
                }, 1600)
                , 100
            ),
            { passive: false }
        )
    }

    resize(_current) {
        const pos = -(_current.current) * (this.sections[_current.current].getBoundingClientRect().width)
        this.container.style.transform = `translateX(${pos}px)`

        if (window.innerWidth < 480) {
            TweenMax.to(this.meshWrapper.scale, 0.4, { x: 0.7, y: 0.7, ease: Sine.easeOut })
        }
        else if (window.innerWidth > 480) {
            TweenMax.to(this.meshWrapper.scale, 0.4, { x: 1, y: 1, ease: Sine.easeOut })
        }
    }

    setupAudio() {
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
    }

    startSong(_current) {
        const current = _current
        this.audioElement.src = sounds[current]
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
            scale = (this.frequencyData[i] * 0.01) / 2
        }

        TweenMax.to(this.mesh.scale, 0.1, {
            x: scale + 1.2,
            y: scale + 1.2,
            ease: Sine.easeInOut
        })
    }

    handleWheel(_direction) {
        // FORWARD - Move to the right
        if (_direction > 0) {
            this.counter(true)
        }
        // BACKWARD - Move to the left
        else if (_direction < 0) {
            this.counter(false)
        }

        // PLAY
        this.startSong(this.slides.current)
        new Display(this.slides.current)

        // SLIDE
        TweenMax.to(this.container, 0.4, { x: `-${this.slides.current}00vw`, ease: Expo.easeInOut, delay: 0.3 })

        // THREE - move mesh & change image
        TweenMax.to(this.bgMesh.material.uniforms.u_progress, 1.2, {
            value: this.slides.current % 2 === 0 ? 2.2 : 3.7,
            ease: Expo.easeInOut,
            delay: -0.2
        })
        if (this.slides.current % 2 === 0) {
            this.three.scene.getObjectByName('background').material.uniforms.u_texture1.value = this.loader.load(textures[this.slides.current])
        }
        else {
            this.three.scene.getObjectByName('background').material.uniforms.u_texture0.value = this.loader.load(textures[this.slides.current])
        }

        TweenMax.to(this.meshWrapper.rotation, 1.0, {
            y: _direction > 0 ? '+=' + 360 * (Math.PI / 180) : '-=' + 360 * (Math.PI / 180),
            ease: Expo.easeInOut
        })
        TweenMax.to(this.mesh.material.uniforms.u_texture_0, 0, {
            value: this.loader.load(assets.images[this.slides.current]),
            delay: 0.4
        })

        if (this.slides.current == 0 || this.slides.current == 1 || this.slides.current == 5) {
            this.spotify.style.fill = "#131313"
        }
        else {
            this.spotify.style.fill = "#FFFFFF"
        }

        // ANIMATE
        if (!this.animated[this.slides.current]) {
            switch (this.slides.current) {
                case 0:
                    landing()
                    break;
                case 1:
                    alone()
                    break;
                case 2:
                    eternity()
                    break;
                case 3:
                    think()
                    break;
                case 4:
                    about()
                    break;
                case 5:
                    meaning()
                    break;
                case 6:
                    slow()
                    break;
                case 7:
                    fast()
                    break;
                case 8:
                    care()
                    break;
                default: break;
            }
            this.animated[this.slides.current] = true
        }
    }

    counter(_increase) {
        let counter = this.slides.current

        // Increase
        if (_increase == true) {
            counter++
            if (counter >= 0 && counter <= this.slides.max) {
                this.slides.current = counter
            }
            else if (counter > this.slides.max) {
                counter = 0
                this.slides.current = counter
            }
        }
        // Decrease
        else {
            counter--
            if (counter >= 0) {
                this.slides.current = counter
            }
            else if (counter < 0) {
                counter = this.slides.max
                this.slides.current = counter
            }
        }

        this.container.setAttribute('data-current', this.slides.current)
    }
}

export { Controller }