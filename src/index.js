import './scss/main.scss'

import { Assets } from './js/tools/Assets'
import { Grain } from './js/tools/Grain'
import { Controller } from './js/tools/Controller'
import { Loader } from './js/tools/Loader'
import { CreateSection } from './js/tools/CreateSection'
import { Three } from './js/scene/Three'
// import p5sound from './js/p5sound'

window.onload = () => {
    console.log('assets loaded 🤠')
    new Grain(document.querySelector('.grain'))
    const three = new Three(document.querySelector('.threejs'), { alpha: true, fov: 75, camZPos: 5 })
    const controls = new Controller(three)
    new Loader(three, controls)

    // Test
    // const test = {
    //     username: 'Alex',
    //     link: 'https://open.spotify.com/playlist/4kIvSX8fD3BLy5q2k4MK4Y?si=G5i-8KvHSB6X8haW5oiQGg',
    //     text: 'Hello World'
    // }
    // new CreateSection(test, controls)
}

console.log('iam-bored.me was coded during long nights & weekends because I was bored to be home without any goals... Music & code was the only thing available, so I tryed to use all the skills Ive earned theses past 3 years to create something cool. Hope you find it cool too!')