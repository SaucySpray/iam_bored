import { TweenMax, TimelineMax } from 'gsap'
import SplitTextJS from 'split-text-js'

const fast = () => {
    // DOM
    const fast = document.querySelector('.fast')
    const wrapper = fast.querySelector('.section--wrapper')
    const texts = fast.querySelectorAll('.fast__text')

    // Split
    const splitTexts = []
    texts.forEach(text => {
        const splitted = new SplitTextJS(text)
        splitTexts.push(splitted)
    })

    // Sentence
    const tl1 = new TimelineMax({ delay: 0.6 })
    tl1.staggerTo(splitTexts[0].chars, 0.05, { visibility: 'visible' }, 0.05)
    tl1.staggerTo(splitTexts[1].chars, 0.05, { visibility: 'visible' }, 0.05)
    tl1.staggerTo(splitTexts[2].chars, 0.05, { visibility: 'visible' }, 0.05)
    tl1.staggerTo(splitTexts[3].chars, 0.05, { visibility: 'visible' }, 0.05)
    tl1.staggerTo(splitTexts[4].chars, 0.05, { visibility: 'visible' }, 0.05)

    return tl1
}

// fontVariationSettings: "'wght' " + 700

export { fast }