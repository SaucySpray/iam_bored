import * as THREE from 'three'

import { landing, alone, eternity, think, about, meaning, slow, fast, care } from './sections'

const songs = [
    { artist: 'Kings of leon', song: 'Trunk', texture: 'https://i.imgur.com/sbOv46d.jpg', link: 'https://open.spotify.com/track/3TC1g3YgznXQLEW4hyZr3Q?si=ZU0stco0Q4KspdBhvUC48A'}, 
    { artist: 'The Whitest Boy Alive', song: 'Golden cage', texture: 'https://i.imgur.com/CcY7wuc.jpg', link: 'https://open.spotify.com/track/6L4ZU09mKnKaPq25xWHht6?si=YQ1n0Gc2TPyE5I3pBti19w'}, 
    { artist: 'Bonobo', song: 'Maia - Mixed', texture: 'https://i.imgur.com/ZinsbDR.jpg', link: 'https://open.spotify.com/track/4tUA0XgKiEigUywHbtkdLX?si=drsoZq3UTZaDukPm1isadw'}, 
    { artist: 'Crystal places', song: 'Bent your mind', texture: 'https://i.imgur.com/XrYJcVQ.jpg', link: 'https://open.spotify.com/track/2HzIdqa2b7g4EPV2LmLZYQ?si=1QMx4SZyRXOtBd2tDnwNRQ'}, 
    { artist: 'Joji', song: 'YEAH RIGHT', texture: 'https://i.imgur.com/3Za3uqr.jpg', link: 'https://open.spotify.com/track/1VGzxJnVQND7Cg5H5wGj14?si=nlfzkXu6SsW0CEYGV73J2A'}, 
    { artist: 'BRNS', song: 'Mexico', texture: 'https://i.imgur.com/yS812WZ.jpg', link: 'https://open.spotify.com/track/3Auh49LuW0UQdEsAdXxrJe?si=tg8mAo98QQSB1RB6zYCrcw'}, 
    { artist: 'Clairo', song: 'Hello?', texture: 'https://i.imgur.com/iBqzSTX.jpg', link: 'https://open.spotify.com/track/7qwt4xUIqQWCu1DJf96g2k?si=SQGyUZtYQCKDUF6Bp5hQYA'}, 
    { artist: '1991', song: 'Sprites', texture: 'https://i.imgur.com/f11HIQw.jpg', link: 'https://open.spotify.com/track/6k52BWUtebggXAoGZjzKVX?si=ec8ISJPYTY-0ByyXNDCMgw'}, 
    { artist: 'Nirvana', song: 'About a girl', texture: 'https://i.imgur.com/r9RXW4z.jpg', link: 'https://open.spotify.com/track/55yvzYuvJYG2RUEnMK78tr?si=_J-x4-QQRk-cYq7n89-W7g'}
]

export class Horizontal {
    constructor(_three) {
        this.cache(_three)
        window.onload = this.mounted()
    }

    cache(_three) {
        this.three = _three
        this.meshWrapper = this.three.scene.children[0]
        this.mesh = this.three.scene.children[0].children[0]
        this.loader = new THREE.TextureLoader()
        this.mouse = {
            x: 0,
            y: 0
        }
        this.container = document.querySelector('.horizontal')
        this.sections = this.container.querySelectorAll('.section')
        this.display = document.querySelector('.player__display')
        this.slides = {}
        this.slides.current = 0
        this.slides.max = 8

        this.animated = [true, false, false, false, false, false, false, false]
        this.isAnimating = false

        this.hammer = new Hammer(document.body)

        this.songs = document.querySelectorAll('.playlist__song')
        this.songs.forEach(sound => sound.volume = 0.05)
    }

    mounted() {
        this.container.style.transform = ''
        landing()
        this.setDisplay()
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
    }

    resize(_current) {
        const pos = -(_current.current) * (this.sections[_current.current].getBoundingClientRect().width)
        this.container.style.transform = `translateX(${pos}px)`
        // TweenMax.to(this.container, 0.6, { x: `${pos}px`, ease: Expo.easeOut })
    }

    playSong(_index) {
        this.songs.forEach(song => {
            song.pause()
            song.currentTime = 0
        })
        this.songs[_index].volume = 0.2
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
        // this.playSong(this.slides.current)
        this.setDisplay()

        // SLIDE
        TweenMax.to(this.container, 0.6, { x: `-${this.slides.current}00vw`, ease: Expo.easeOut })

        // THREE - move mesh & change image
        TweenMax.to(this.mesh.rotation, 1.6, {
            y: this.slides.current % 2 === 0 ? (0 * (Math.PI / 180)) : (360 * (Math.PI / 180)), 
            ease: Expo.easeOut
        })
        this.mesh.material.uniforms.u_texture_0.value = this.loader.load(songs[this.slides.current].texture)

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

    setDisplay(){
        this.display.querySelector('.player__display__title').innerHTML = ''
        this.display.querySelector('.player__display__title').innerHTML = songs[this.slides.current].song
        this.display.querySelector('.player__display__artist').innerHTML = ''
        this.display.querySelector('.player__display__artist').innerHTML = songs[this.slides.current].artist
        this.display.querySelector('.player__display__link>a').href = songs[this.slides.current].link
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

        this.container.setAttribute('data-current', this.slides.current)
    }
}