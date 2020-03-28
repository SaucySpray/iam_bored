import { landing, alone, eternity, think, about, meaning, slow, fast } from './sections'

class Timeline {
    constructor() {
        this.cache()
        this.mounted()
    }

    cache() {
        this.controller = new ScrollMagic.Controller({ addIndicators: true })
    }

    mounted() {
        
    }
}

export { Timeline }