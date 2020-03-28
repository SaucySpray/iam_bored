import goldenCage from '../static/audio/golden-cage.mp3'
import ragoo from '../static/audio/ragoo.mp3'
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
        this.mounted()
    }

    cache() {
        // Get UI
        this.container = document.querySelector('.container')
        this.sections = document.querySelectorAll('.section')
        this.player = document.querySelector('.player')
        this.bar = this.player.querySelector('.player__bar')
        this.barInner = this.bar.querySelector('.player__bar__inner')

        // Get songs & containers
        this.songs = [goldenCage, ragoo, maiaMixed, bentYourMind, yeahRight, mexico, hello, sprites, aboutAGirl]
        this.domSongs = document.querySelectorAll('.playlist__song')

        // Set attributes
        for(let i=0; i<this.domSongs.length; i++) {
            this.domSongs[i].src = `${this.songs[i]}`
        }
    }

    events() {
        window.addEventListener('wheel', () => {
            console.log(this.container.style.transform)
            for(let i=0; i<this.sections.length; i++) {
                if(this.container.style.transform) {

                }
            }
        })
    }

    mounted() {

    }
}

export { Player }