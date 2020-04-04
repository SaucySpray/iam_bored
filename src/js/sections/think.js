import { gsap, TimelineMax, Sine } from 'gsap'
import SplitTextJS from 'split-text-js'

const think = () => {
    // DOM
    const think = document.querySelector('.think')
    const texts = think.querySelectorAll('.think__text')

    // Split
    const splitTexts = []
    texts.forEach(text => {
        const splitted = new SplitTextJS(text)
        splitTexts.push(splitted)
    })

    // When I'm alone, I tend to
    const tl1 = new TimelineMax({ delay: 0.6 })
    tl1.staggerTo(splitTexts[0].chars, 0.2, { visibility: 'visible' }, 0.1)
    tl1.to(splitTexts[1].words[0], 0.2, { visibility: 'visible', delay: 0.4 })
    tl1.staggerTo(splitTexts[2].chars, 0.2, { visibility: 'visible', delay: 0.6 }, 0.1)
    
    // overthink
    const tl2 = new TimelineMax({ delay: 3.8 })
    tl2.to(splitTexts[3].words[0], 0.2, { visibility: 'visible' })
    tl2.to(splitTexts[4].words[0], 0.2, { visibility: 'visible', delay: 0.1 })
    tl2.to(splitTexts[4].words[0], 0.2, { mixBlendMode: 'difference', delay: 0.1 })
    tl2.to(splitTexts[3].words[0], 0.3, { left: 0, x: '44%', y: '-30%', scale: 2, ease: Expo.easeOut, delay: 0.3 })

    return tl1, tl2
}

// fontVariationSettings: "'wght' " + 700

export { think }