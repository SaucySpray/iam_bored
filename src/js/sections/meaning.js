import { TweenMax, TimelineMax } from 'gsap'
import SplitTextJS from 'split-text-js'

const meaning = () => {
    // DOM
    const meaning = document.querySelector('.meaning')
    const wrapper = meaning.querySelector('.section--wrapper')
    const texts = meaning.querySelectorAll('.meaning__text')

    // Split
    const splitTexts = []
    texts.forEach(text => {
        const splitted = new SplitTextJS(text)
        splitTexts.push(splitted)
    })

    // Sentence
    const tl1 = new TimelineMax({ delay: 0.6 })
    tl1.staggerTo(splitTexts[0].chars, 0.2, { visibility: 'visible' }, 0.1)
    tl1.staggerTo(splitTexts[1].chars, 0.2, { visibility: 'visible' }, 0.1)
    tl1.staggerTo(splitTexts[2].chars, 0.2, { visibility: 'visible' }, 0.1)

    // Points
    const tl2 = new TimelineMax({ repeat: -1, yoyo: true, delay: 3 })
    tl2.to(splitTexts[3].chars[0], 0.1, { visibility: 'visible', delay: 0.25 })
    tl2.to(splitTexts[3].chars[1], 0.1, { visibility: 'visible', delay: 0.5 })
    tl2.to(splitTexts[3].chars[2], 0.5, { visibility: 'visible', delay: 0.5 })

    return tl1, tl2
}

// fontVariationSettings: "'wght' " + 700

export { meaning }