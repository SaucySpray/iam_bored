import { gsap, TimelineMax } from 'gsap'
import ScrollMagic from 'scrollmagic'
import { landing, alone, eternity, think, about, meaning, slow, fast } from './sections'

class Timeline {
    constructor() {
        this.mount()
    }

    mount() {
        console.log('timeline')
        document.addEventListener('click', () => {
            document.querySelector('.landing').style.visibility = 'visible'
            landing()
        })
    }
}

export { Timeline }