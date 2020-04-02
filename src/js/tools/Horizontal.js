import * as THREE from 'three'

import { landing, alone, eternity, think, about, meaning, slow, fast, care } from '../sections'

import { assets, images, textures } from '../tools/Assets'

export class Horizontal {
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
        this.display = document.querySelector('.player__display')
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

        this.songs = document.querySelectorAll('.playlist__song')
        this.songs.forEach(sound => sound.volume = 0.05)
    }

    mounted() {
        this.container.style.transform = ''
        landing()
        this.setDisplay()
        this.events()
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
                    this.handleWheel(_e.deltaY)
                }, 1000)
                , 100
            ),
            { passive: false }
        )

        this.hammer.on('pan',
            _.debounce(
                _.throttle((_e) => {
                    console.log('mobile throttle')
                    if (_e.direction == 4) {
                        this.handleWheel(-100)
                    }
                    else if (_e.direction == 2) {
                        this.handleWheel(100)
                    }
                }, 1000)
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
        else if (window.innerWidth < 480) {
            TweenMax.to(this.meshWrapper.scale, 0.4, { x: 1, y: 1, ease: Sine.easeOut })
        }
    }

    playSong(_index) {
        this.songs.forEach(song => {
            song.pause()
            song.currentTime = 0
        })
        this.songs[_index].volume = 0.2
        this.songs[_index].play()
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
        this.playSong(this.slides.current)
        this.setDisplay()

        // SLIDE
        TweenMax.to(this.container, 0.6, { x: `-${this.slides.current}00vw`, ease: Expo.easeOut })

        // THREE - move mesh & change image
        TweenMax.to(this.bgMesh.material.uniforms.u_progress, 0.4, {
            value: this.slides.current % 2 === 0 ? 2.2 : 3.7,
            ease: Expo.easeInOut
        })
        if (this.slides.current % 2 === 0) {
            this.three.scene.getObjectByName('background').material.uniforms.u_texture1.value = this.loader.load(textures[this.slides.current])
        }
        else {
            this.three.scene.getObjectByName('background').material.uniforms.u_texture0.value = this.loader.load(textures[this.slides.current])
        }

        TweenMax.to(this.meshWrapper.rotation, 1.6, {
            y: this.slides.current % 2 === 0 ? (0 * (Math.PI / 180)) : (360 * (Math.PI / 180)),
            ease: Expo.easeOut
        })
        this.mesh.material.uniforms.u_texture_0.value = this.loader.load(assets.images[this.slides.current])

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

    setDisplay() {
        this.display.querySelector('.player__display__title').innerHTML = ''
        this.display.querySelector('.player__display__title').innerHTML = assets.sounds[this.slides.current]
        this.display.querySelector('.player__display__artist').innerHTML = ''
        this.display.querySelector('.player__display__artist').innerHTML = assets.artist[this.slides.current]
        this.display.querySelector('.player__display__link>a').href = assets.links[this.slides.current]
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