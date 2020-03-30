import * as THREE from 'three'

import { landing, alone, eternity, think, about, meaning, slow, fast, care } from './sections'
const textures = ['https://i.imgur.com/CcY7wuc.jpg', 'https://i.imgur.com/sbOv46d.jpg', 'https://i.imgur.com/ZinsbDR.jpg', 'https://i.imgur.com/XrYJcVQ.jpg', 'https://i.imgur.com/3Za3uqr.jpg', 'https://i.imgur.com/yS812WZ.jpg', 'https://i.imgur.com/iBqzSTX.jpg', 'https://i.imgur.com/f11HIQw.jpg', 'https://i.imgur.com/r9RXW4z.jpg']

export class Horizontal {
    constructor(_three) {
        this.cache(_three)
        window.onload = this.mounted()
    }

    cache(_three) {
        this.three = _three
        this.meshWrapper = this.three.scene.children[0]
        this.mesh = this.three.scene.children[0].children[0]
        this.textures = textures
        this.loader = new THREE.TextureLoader()
        this.mouse = {
            x: 0,
            y: 0
        }
        this.container = document.querySelector('.horizontal')
        this.sections = this.container.querySelectorAll('.section')
        this.slides = {}
        this.slides.current = 0
        this.slides.max = 8

        this.animated = [true, false, false, false, false, false, false, false]
        this.isAnimating = false

        this.hammer = new Hammer(document.body)

        this.songs = document.querySelectorAll('.playlist__song')
    }

    mounted() {
        this.container.style.transform = ''
        landing()
        this.events()
    }

    events() {
        // Responsive
        window.addEventListener('resize', () => this.resize(this.slides))

        this.mousemove = window.addEventListener('mousemove', (_e) => {
            this.handleMouse(_e)
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
                ,100
            ),
            { passive: false }
        )

        // this.hammer.on('pan', (_e) => {
        //     _e.preventDefault()
        //     // 2 = right, 4 = left
        //     if (_e.direction == 4) {
        //         this.handleWheel(100)
        //     }
        //     else if (_e.direction == 2) {
        //         this.handleWheel(-100)
        //     }
        // })
        // .set({ threshold: 1000 })

        // document.addEventListener('wheel', (_e) => {
        //     _e.preventDefault()
        //     this.handleWheel(_e.deltaY)
        // }, { passive: false })
    }

    resize(_current) {
        const pos = -(_current.current) * (this.sections[_current.current].getBoundingClientRect().width)
        this.container.style.transform = `translateX(${pos}px)`
        // TweenMax.to(this.container, 0.6, { x: `${pos}px`, ease: Expo.easeOut })
    }

    playSong(_index) {
        console.log(_index)
        this.songs.forEach(song => {
            song.pause()
        })
        this.songs[_index].play()
    }

    handleMouse(_e) {
        this.mouse.x = _e.clientX
        this.mouse.y = _e.clientY

        TweenMax.to(this.meshWrapper.rotation, 1.2, {
            x: ((((this.mouse.y / window.innerWidth) - 0.5)) * 20) * Math.PI / 180,
            y: ((((this.mouse.x / window.innerWidth) - 0.5)) * 20) * Math.PI / 180,
            ease: Sine.easeOut
        })
    }

    handleWheel(_direction) {
        // FORWARD - Move to the right
        if(_direction > 0) {
            this.counter(true)
        }
        // BACKWARD - Move to the left
        else if(_direction < 0) {
            this.counter(false)
        }

        // PLAY
        this.playSong(this.slides.current)

        // SLIDE
        TweenMax.to(this.container, 0.6, { x: `-${this.slides.current}00vw`, ease: Expo.easeOut })

        // THREE - move mesh & change image
        TweenMax.to(this.mesh.rotation, 1.6, {
            y: this.slides.current % 2 === 0 ? (0 * (Math.PI / 180)) : (360 * (Math.PI / 180)), 
            ease: Expo.easeOut
        })
        this.three.scene.children[0].children[0].material.uniforms.u_texture_0.value = this.loader.load(this.textures[this.slides.current])

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
        if(_increase == true) {
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
    }
}