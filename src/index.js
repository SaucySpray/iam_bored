import './scss/main.scss'

import { Assets } from './js/tools/Assets'
import { Grain } from './js/tools/Grain'
import { Controller } from './js/tools/Controller'
import { Loader } from './js/tools/Loader'
import { Three } from './js/scene/Three'
// import p5sound from './js/p5sound'

window.onload = () => {
    console.log('loaded')
    new Grain(document.querySelector('.grain'))
    const three = new Three(document.querySelector('.threejs'), { alpha: true, fov: 75, camZPos: 5 })
    const controls = new Controller(three)
    new Loader(three, controls)
}