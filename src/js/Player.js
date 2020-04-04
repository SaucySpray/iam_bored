import SplitTextJS from 'split-text-js'

export const Display = (_current) => {
    // DOM
    const display = document.querySelector('.display')
    const displayEl = document.querySelectorAll('.display__el')
    const wrapper = document.querySelectorAll('.row.display__wrapper')
    const leftTexts = display.querySelectorAll('.display__text__left')
    const rightTexts = display.querySelectorAll('.display__text__right')

    // Split
    const splitLeftTexts = []
    const splitRightTexts = []
    leftTexts.forEach(text => {
        const splitted = new SplitTextJS(text)
        splitLeftTexts.push(splitted)
    })
    rightTexts.forEach(text => {
        const splitted = new SplitTextJS(text)
        splitRightTexts.push(splitted)
    })

    // Remove class
    for (let i = 0; i < displayEl.length; i++) {
        if (displayEl[i].classList.contains('display--active')) {
            displayEl[i].classList.remove('display--active')
        }
    }
    displayEl[_current].classList.add('display--active')

    // Animate
    const tl = new TimelineMax({delay: 0.4})

    // tl.fromTo(
    //     wrapper[_current],
    //     0.4,
    //     {
    //         opacity: 0,
    //         rotation: 70,
    //         ease: Expo.easeOut
    //     },
    //     {
    //         opacity: 1,
    //         rotation: 0,
    //         ease: Expo.easeOut
    //     }
    // )

    tl.staggerFromTo(
        splitLeftTexts[_current].chars,
        0.4,
        {
            y: -100,
            opacity: 0,
            ease: Expo.easeInOut
        },
        {
            y: 0,
            opacity: 1,
            ease: Expo.easeInOut
        },
        0.1
    )

    tl.staggerFromTo(
        splitRightTexts[_current].chars,
        0.2,
        {
            y: 100,
            opacity: 0,
            ease: Expo.easeOut
        },
        {
            y: 0,
            opacity: 1,
            ease: Expo.easeOut
        },
        0.1,
        '-=0.4'
    )

    tl.fromTo(
        displayEl[_current],
        0.2,
        {
            y: 0,
            opacity: 1,
            ease: Expo.easeOut,
            delay: 0.2
        },
        {
            y: 20,
            opacity: 0,
            ease: Expo.easeOut,
            delay: 0.2
        }
    )
}