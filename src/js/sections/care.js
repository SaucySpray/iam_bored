import SplitTextJS from 'split-text-js'

const care = () => {
    // DOM
    const care = document.querySelector('.care')
    const texts = care.querySelectorAll('.care__text')

    // Split
    const splitTexts = []
    texts.forEach(text => {
        const splitted = new SplitTextJS(text)
        splitTexts.push(splitted)
    })

    // Sentence
    // const tl1 = new TimelineMax({ delay: 0.6 })
    // tl1.staggerTo(splitTexts[0].chars, 0.6, { visibility: 'visible' }, 0.2)

    // Sentence
    // const tl2 = new TimelineMax({ delay: 1.6 })
    // tl2.staggerTo(splitTexts[1].chars, 1.6, { visibility: 'visible' }, 0.1)

    return tl1, tl2
}

// fontVariationSettings: "'wght' " + 700

export { care }