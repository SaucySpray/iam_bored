import { gsap, TimelineMax, Sine } from 'gsap'
import SplitTextJS from 'split-text-js'

const landing = () => {
    // DOM
    const landing = document.querySelector('.landing')
    const wrapper = landing.querySelector('.section--wrapper')
    const texts = landing.querySelectorAll('.landing__text')

    // Split
    const splitTexts = []
    texts.forEach(text => {
        const splitted = new SplitTextJS(text)
        splitTexts.push(splitted)
    })

    // Sentence
    const tl1 = new TimelineMax({ delay: 0.6 })
    tl1.staggerTo(splitTexts[0].chars, 0.6, { visibility: 'visible' }, 0.2)

    // Sentence
    const tl2 = new TimelineMax({ delay: 1.6 })
    tl2.staggerTo(splitTexts[1].chars, 1.6, { visibility: 'visible' }, 0.1)

    // Points
    const tl3 = new TimelineMax({ repeat: -1, yoyo: true, delay: 2.3 })
    tl3.to(splitTexts[2].chars[0], 0.1, { visibility: 'visible', delay: 0.25 })
    tl3.to(splitTexts[2].chars[1], 0.1, { visibility: 'visible', delay: 0.5 })
    tl3.to(splitTexts[2].chars[2], 0.5, { visibility: 'visible', delay: 0.5 })

    return tl1, tl2, tl3
}

// fontVariationSettings: "'wght' " + 700

export { landing }