import { gsap, TimelineMax, Expo, Power0 } from 'gsap'
import SplitTextJS from 'split-text-js'

const eternity = () => {
    // DOM
    const eternity = document.querySelector('.eternity')
    const texts = eternity.querySelectorAll('.eternity__text')

    // Split
    const splitTexts = []
    texts.forEach(text => {
        const splitted = new SplitTextJS(text)
        splitTexts.push(splitted)
    })

    // but it
    const tl1 = new TimelineMax({ delay: 0.6 })
    tl1.staggerTo(splitTexts[0].chars, 0.6, { visibility: 'visible' }, 0.2)

    // feels
    const tl2 = new TimelineMax({ repeat: -1, delay: 1.8 })
    tl2.to(splitTexts[1].words[0], 0.3, { visibility: 'visible', scale: 1.3, fontVariationSettings: "'wght' " + 700, ease: Bounce.easeInOut })
    tl2.to(splitTexts[1].words[0], 0.15, { visibility: 'visible', scale: 1.1, fontVariationSettings: "'wght' " + 500, ease: Bounce.easeInOut })
    tl2.to(splitTexts[1].words[0], 0.15, { visibility: 'visible', scale: 1.3, fontVariationSettings: "'wght' " + 700, ease: Bounce.easeInOut })
    tl2.to(splitTexts[1].words[0], 0.3, { visibility: 'visible', scale: 1, fontVariationSettings: "'wght' " + 200, ease: Bounce.easeInOut })

    // like
    const tl3 = new TimelineMax({ delay: 0.6 })
    tl1.staggerTo(splitTexts[2].chars, 0.6, { visibility: 'visible' }, 0.2)

    // eternity
    const tl4 = new TimelineMax({ delay: 0.6 })
    tl1.staggerTo(splitTexts[3].chars, 1, {
        visibility: 'visible',
        stagger: {
            amount: 4,
            ease: Expo.easeOut
        },
    }, 0.1)

    // eternity wave
    const tl5 = new TimelineMax()
    tl5.staggerTo(splitTexts[3].words, 4, {
        fontVariationSettings: `'wght' ${200}`,
        stagger: {
            amount: 4,
            ease: Power0.easeOut
        },
        delay: -4.5
    }, 0.1)
    tl5.staggerTo(splitTexts[3].words, 4, {
        fontVariationSettings: `'wght' ${700}`,
        stagger: {
            amount: 4,
            ease: Power0.easeOut
        },
        delay: 0.2
    }, 0.1)

    // Scene
    // const scene = new ScrollMagic.Scene({
    //     duration: '50%',
    //     triggerHook: 0,
    //     offset: 0.1
    // })
    // scene.addIndicators({ name: "eternity", colorEnd: "#FF0000" })

    // const sceneTl = new TimelineMax()
    // sceneTl.to(wrapper, 0, { position: 'fixed', opacity: [1, 0] })
    // scene.setTween(sceneTl)

    return tl1, tl2, tl3, tl4, tl5
}

// fontVariationSettings: "'wght' " + 700

export { eternity }