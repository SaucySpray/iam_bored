import { TweenMax, Expo, Sine } from 'gsap'
import { Display } from './Display'
import { landing } from '../sections'

class Loader {
    constructor(_three, _controller) {
        this.cache(_three, _controller)
        this.event()
        this.mounted()
    }

    cache(_three, _controller) {
        this.three = _three
        this.controller = _controller

        // DOM
        this.loader = document.querySelector('.loader')
        this.loaderBtn = this.loader.querySelector('.loader__btn')
        this.loaderText = this.loader.querySelector('.loader__text')
    }

    event() {
        this.loaderBtn.addEventListener('click', () => this.out())
    }

    mounted() {
        this.in()
    }

    in() {
        TweenMax.fromTo(this.loaderText, 0.8,
            {
                y: -30,
                opacity: 0,
                ease: Expo.easeOut
            },
            {
                y: 0,
                opacity: 1,
                ease: Expo.easeOut
            }
        )

        TweenMax.to(this.loaderBtn, 0.8,
            {
                opacity: 1,
                ease: Expo.easeOut
            }
        )

        TweenMax.fromTo(this.three.camera.position, 1.4,
            {
                z: 10,
                ease: Sine.easeInOut
            },
            {
                z: 5,
                ease: Sine.easeInOut
            }
        )
    }

    out() {
        landing()
        this.controller.startSong(0)
        new Display(0)

        TweenMax.to(this.loaderText, 0.4, {
            y: 30,
            opacity: 0,
            ease: Expo.easeOut
        })

        TweenMax.to(this.loader, 0.4, {
            opacity: 0,
            ease: Sine.easeOut,
            delay: 0.4
        })

        TweenMax.set(this.three.camera.position, { z: 10 })

        setTimeout(() => document.body.removeChild(this.loader), 1200)
    }
}

export { Loader }