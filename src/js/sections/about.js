import { gsap, TimelineMax, Sine, Bounce } from 'gsap'
import SplitTextJS from 'split-text-js'

const about = () => {
    // DOM
    const about = document.querySelector('.about')
    const carousel = about.querySelector('.about__carousel')
    const texts = about.querySelectorAll('.about__text')

    // Split
    const splitTexts = []
    texts.forEach(text => {
        const splitted = new SplitTextJS(text)
        splitTexts.push(splitted)
    })

    // about
    const tl1 = new TimelineMax({ delay: 0.6 })
    tl1.staggerTo(splitTexts[0].chars, 0.6, { visibility: 'visible' }, 0.2)

    // points
    const tl2 = new TimelineMax({ repeat: -1, yoyo: true, delay: 2 })
    tl2.to(splitTexts[1].chars[0], 0.1, { visibility: 'visible', delay: 0.5 })
    tl2.to(splitTexts[1].chars[1], 0.1, { visibility: 'visible', delay: 1 })
    tl2.to(splitTexts[1].chars[2], 0.5, { visibility: 'visible', delay: 1 })

    // Carousel
    const tl3 = new TimelineMax({ delay: 1.6 })

    // Love
    tl3.to(splitTexts[2].words[0], 0.1, { visibility: 'visible' })
    tl3.to(splitTexts[3].words[0], 0.1, { visibility: 'visible', transformOrigin: "left bottom", delay: 0.2 })
    tl3.to(splitTexts[3].words[0], 0.6, { rotate: 45, ease: Bounce.easeOut, delay: 0.2 })

    //Life
    tl3.to(carousel, 0.4, { y: '-28%', ease: Sine.easeInOut, delay: 0.9 })
    tl3.staggerTo(splitTexts[4].chars, 0.4, { opacity: 1, y: 10, ease: Bounce.easeOut, delay: -0.2 }, 0.1)

    // Blood
    tl3.to(carousel, 0.4, { y: '-56%', ease: Sine.easeInOut, delay: 2.2 })
    tl3.staggerTo(splitTexts[5].chars, 0.4, 
    {
        opacity: 1, y: -15, ease: Power1.easeIn, onComplete() {
            TweenMax.to(this.target, 0.3, { y: 0, ease: Power3.easeOut, delay: 0.05 });
        }
    }, 0.1)

    // Types
    tl3.to(carousel, 0.4, { y: '-82%', ease: Sine.easeInOut, delay: 1.4 })
    tl3.staggerTo(splitTexts[6].chars, 0.6, { visibility: 'visible' }, 0.2)

    tl3.to(carousel, 0.3, { y: '0%', ease: Sine.easeInOut, delay: 1.8 })
    tl3.to(splitTexts[3].words[0], 0.6, { rotate: 50, ease: Bounce.easeOut, delay: -0.1 })

    return tl1, tl2, tl3
}

// fontVariationSettings: "'wght' " + 700

export { about }