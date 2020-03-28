import './scss/main.scss'
import { Timeline } from './js/Timeline'
import { Grain } from './js/Grain'
import { Horizontal } from './js/Horizontal'
import { Player } from './js/Player'

new Timeline()
new Grain(document.querySelector('.grain'))
new Horizontal()
new Player()