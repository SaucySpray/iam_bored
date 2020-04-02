import './scss/main.scss'

import { Grain } from './js/tools/Grain'
import { Wheel } from './js/tools/Wheel'
import { Horizontal } from './js/tools/Horizontal'
import { Player } from './js/Player'
import { Three } from './js/scene/Three'
// import p5sound from './js/p5sound'

new Grain(document.querySelector('.grain'))
// new Player()
export const three = new Three(document.querySelector('.threejs'), { alpha: true, fov: 75, camZPos: 5 })
new Horizontal(three)