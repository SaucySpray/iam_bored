import { TweenMax, TimelineMax, Sine, Expo } from 'gsap'
import SplitTextJS from 'split-text-js'

const slow = () => {
    // DOM
    const slow = document.querySelector('.slow')
    const wrapper = slow.querySelector('.section--wrapper')
    const texts = slow.querySelectorAll('.slow__text')

    // Split
    const splitTexts = []
    texts.forEach(text => {
        const splitted = new SplitTextJS(text)
        splitTexts.push(splitted)
    })

    // time look so
    const tl1 = new TimelineMax({ delay: 0.6 })
    tl1.staggerTo(splitTexts[0].chars, 0.1, { visibility: 'visible' }, 0.1)

    // Sentence
    tl1.to(splitTexts[1].words, 0.4, {
        opacity: 1,
        ease: Sine.easeIn
    })
    tl1.fromTo(splitTexts[1].words, 0.8,
        {
            letterSpacing: '1px',
            fontVariationSettings: "'wght' " + 200,
            ease: Sine.easeOut,
            delay: 1.2
        },
        {
            letterSpacing: '22px',
            fontVariationSettings: "'wght' " + 700,
            ease: Sine.easeOut
        }
    )

    // in my brain
    tl1.staggerTo(splitTexts[2].chars, 0.1, { visibility: 'visible', delay: -0.2 }, 0.1)

    // slow
    const tl2 = new TimelineMax({ delay: 3.4, repeat: -1, yoyo: true })
    tl2.staggerFromTo(splitTexts[1].chars, 1.8,
        {
            letterSpacing: '22px',
            fontVariationSettings: "'wght' " + 700,
            ease: Expo.easeInOut,
            delay: 0.9
        },
        {
            letterSpacing: '1px',
            fontVariationSettings: "'wght' " + 200,
            ease: Expo.easeInOut
        },
        0.1
    )

    return tl1
}

// fontVariationSettings: "'wght' " + 700

export { slow }