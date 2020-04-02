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