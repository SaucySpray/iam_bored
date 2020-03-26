import { gsap, TimelineMax, Bounce } from 'gsap'
import SplitTextJS from 'split-text-js'

const landing = () => {
    const landing = document.querySelector('.landing')
    const texts = landing.querySelectorAll('.landing__text')
    const splitTexts = []

    texts.forEach(text => {
        const splitted = new SplitTextJS(text)
        splitTexts.push(splitted)
    })
    console.log(splitTexts[0].words[0])

    // Sentence
    const tl1 = new TimelineMax({ delay: 0.6 })
    tl1.staggerTo(splitTexts[0].chars, 0.6, { visibility: 'visible' }, 0.2)

    // Sentence
    const tl2 = new TimelineMax({ delay: 1.6 })
    tl2.staggerTo(splitTexts[1].chars, 1.6, {
        visibility: 'visible',
        fontVariationSettings: "'wght' " + 700
    }, 0.1)

    // Points
    const tl3 = new TimelineMax({ repeat: -1, yoyo: true, delay: 2 })
    tl3.to(splitTexts[2].chars[0], 0.1, { visibility: 'visible', delay: 0.5 })
    tl3.to(splitTexts[2].chars[1], 0.1, { visibility: 'visible', delay: 1 })
    tl3.to(splitTexts[2].chars[2], 0.5, { visibility: 'visible', delay: 1 })

    return tl1, tl2, tl3
}

export { landing }