import './scss/main.scss'
import { Controller } from './js/Controller'
import { Grain } from './js/Grain'
import { Horizontal } from './js/Horizontal'
import { Player } from './js/Player'
import { Three } from './js/Three'
import p5sound from './js/p5sound'

new Grain(document.querySelector('.grain'))
new Player()
const three = new Three(document.querySelector('.threejs'), { alpha: true, fov: 75, camZPos: 5 })
new Horizontal(three)
p5sound
// new Controller(three)