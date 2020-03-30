import { gsap, TimelineMax, Sine } from 'gsap'
import SplitTextJS from 'split-text-js'

const alone = () => {
    // DOM
    const alone = document.querySelector('.alone')
    const texts = alone.querySelectorAll('.alone__text')

    // Split
    const splitTexts = []
    texts.forEach(text => {
        const splitted = new SplitTextJS(text)
        splitTexts.push(splitted)
    })

    // I've been
    const tl1 = new TimelineMax({ delay: 0.6 })
    tl1.staggerTo(splitTexts[0].chars, 0.2, { visibility: 'visible' }, 0.1)

    // alone
    const tl2 = new TimelineMax()
    tl1.to(splitTexts[1].words[0], 0.2, { visibility: 'visible', delay: 0.4 })
    tl1.to(splitTexts[1].words[0], 0.4, { position: 'absolute', x: '100%', ease: Sine.easeOut, delay: 0.6 })
    tl1.staggerTo(splitTexts[1].chars, 0.2, { fontVariationSettings: "'wght' " + 200 }, 0.1)
    tl1.to(splitTexts[1].words[0], 0.2, { scale: 0.5, ease: Sine.easeOut })

    // In my apartment, for
    const tl3 = new TimelineMax({ delay: 0.2 })
    tl1.staggerTo(splitTexts[2].chars, 0.2, { visibility: 'visible' }, 0.1)
    tl1.staggerTo(splitTexts[3].chars, 0.2, { visibility: 'visible' }, 0.1)

    // 2 weeks weeks
    const tl4 = new TimelineMax({ delay: 0.2 })
    tl1.to(splitTexts[4].chars, 0.2, { visibility: 'visible', scale: 2.5, y: '55%', ease: Sine.easeOut })
    tl1.to(splitTexts[4].chars, 0.1, { color: '#fff', delay: 0.2 })
    tl1.staggerTo(splitTexts[5].chars, 0.2, { visibility: 'visible', fontVariationSettings: "'wght' " + 200, ease: Sine.easeOut, delay: -0.1 }, 0.1)
    tl1.staggerTo(splitTexts[6].chars, 0.2, { visibility: 'visible', fontVariationSettings: "'wght' " + 200, ease: Sine.easeOut, delay: -0.4 }, 0.1)

    return tl1, tl2, tl3, tl4
}

// fontVariationSettings: "'wght' " + 700

export { alone }