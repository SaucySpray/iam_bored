import goldenCage from '../static/audio/golden-cage.mp3'
import trunk from '../static/audio/trunk.mp3'
import maiaMixed from '../static/audio/maia-mixed.mp3'
import bentYourMind from '../static/audio/bent-your-mind.mp3'
import yeahRight from '../static/audio/yeah-right.mp3'
import mexico from '../static/audio/mexico.mp3'
import hello from '../static/audio/hello.mp3'
import sprites from '../static/audio/sprites.mp3'
import aboutAGirl from '../static/audio/about-a-girl.mp3'

import goldenCageImage from '../static/images/golden-cage.jpg'
import ragooImage from '../static/images/ragoo.jpg'
import maiaMixedImage from '../static/images/maia-mixed.jpg'
import bentYourMindImage from '../static/images/bent-your-mind.jpg'
import yeahRightImage from '../static/images/yeah-right.jpg'
import mexicoImage from '../static/images/mexico.jpg'
import helloImage from '../static/images/hello.jpg'
import spritesImage from '../static/images/sprites.jpg'
import aboutAGirlImage from '../static/images/about-a-girl.jpg'

class Player {
    constructor() {
        this.cache()
        this.events()
        this.mounted()
    }

    cache() {
        // Get UI
        this.container = document.querySelector('.container')
        this.sections = document.querySelectorAll('.section')
        this.player = document.querySelector('.player')
        this.display = document.querySelector('.player__display')
        this.displayClose = document.querySelector('.player__display__close')

        // Get songs & containers
        this.songs = [trunk, goldenCage, maiaMixed, bentYourMind, yeahRight, mexico, hello, sprites, aboutAGirl]
        this.domSongs = document.querySelectorAll('.playlist__song')

        // Set attributes
        for(let i=0; i<this.domSongs.length; i++) {
            this.domSongs[i].src = `${this.songs[i]}`
        }
    }

    events() {
        this.displayClose.addEventListener('click', () => {
            this.player.classList.remove('player--active')
        })
    }

    mounted() {

    }
}

export { Player }