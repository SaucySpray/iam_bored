import './scss/main.scss'
import { Timeline } from './js/Timeline'
import { Grain } from './js/Grain'
import { Horizontal } from './js/Horizontal'

new Timeline()
new Grain(document.querySelector('.grain'))
new Horizontal()