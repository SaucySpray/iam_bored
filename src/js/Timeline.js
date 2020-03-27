// import { gsap, TimelineMax } from 'gsap'
// import ScrollMagic from 'scrollmagic'
import { landing, alone, eternity, think, about, meaning, slow, fast } from './sections'

class Timeline {
    constructor() {
        this.cache()
        this.mounted()
    }

    cache() {
        this.controller = new ScrollMagic.Controller({ addIndicators: true })
    }

    mounted() {
        this.landing = landing()

        this.alone = alone()

        this.eternity = eternity()

        this.think = think()

        this.about = about()

        // document.addEventListener('keypress', (_e) => {
        //     switch (_e.key) {
        //         case "2":
        //             document.querySelectorAll('.test--2>*').forEach(el => el.style.visibility = 'visible')
        //             this.alone = alone()
        //             break;
        //         case "3":
        //             document.querySelectorAll('.test--3>*').forEach(el => el.style.visibility = 'visible')
        //             this.eternity = eternity()
        //             break;
        //         case "4":
        //             document.querySelectorAll('.test--4>*').forEach(el => el.style.visibility = 'visible')
        //             this.think = think()
        //             break;
        //         case "5":
        //             document.querySelectorAll('.test--5>*').forEach(el => el.style.visibility = 'visible')
        //             this.about = about().play()
        //             break;
        //         default:
        //             break;
        //     }
        // })
    }
}

export { Timeline }