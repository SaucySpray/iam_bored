import { landing, alone, eternity, think, about, meaning, slow, fast, care } from './sections'

export class Horizontal {
    constructor() {
        this.cache()
        window.onload = this.mounted()
    }

    cache() {
        this.container = document.querySelector('.horizontal')
        this.sections = this.container.querySelectorAll('.section')
        this.slides = {}
        this.slides.current = 0
        this.slides.max = 8

        this.animated = [true, false, false, false, false, false, false, false]
        this.isAnimating = false

        this.hammer = new Hammer(document.body)
    }

    mounted() {
        this.container.style.transform = ''
        landing()
        this.events()
    }

    events() {
        this.hammer.on('pan', (_e) => {
            _e.preventDefault()
            // 2 = right, 4 = left
            if (_e.direction == 4) {
                this.handleWheel(100)
            }
            else if (_e.direction == 2) {
                this.handleWheel(-100)
            }
        })

        document.addEventListener('wheel', (_e) => {
            _e.preventDefault()
            this.handleWheel(_e.deltaY)
        }, { passive: false })

        window.addEventListener('resize', () => this.resize(this.slides))
    }

    resize(_current) {
        const pos = -(_current.current) * (this.sections[_current.current].getBoundingClientRect().width)
        this.container.style.transform = `translateX(${pos}px)`
        // TweenMax.to(this.container, 0.6, { x: `${pos}px`, ease: Expo.easeOut })
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

        console.log(`-${this.slides.current}00vw`)
        TweenMax.to(this.container, 0.6, { x: `-${this.slides.current}00vw`, ease: Expo.easeOut })

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
                default:
                    break;
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