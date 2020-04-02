class Wheel {
    constructor() {
        this.cache()
        this.event()

        return this.value
    }

    cache() {
        this.hammer = new Hammer(document.body)
        this.value = 0
    }

    event() {
        // Wheel & Pan
        window.addEventListener('wheel',
            _.debounce(
                _.throttle((_e) => {
                    _e.preventDefault()
                    this.value = _e.deltaY * 0.01
                }, 1000)
                , 100
            ),
            { passive: false }
        )

        this.hammer.on('pan',
            _.debounce(
                _.throttle((_e) => {
                    this.value = _e.deltaY * 0.01
                }, 1000)
                , 100
            ),
            { passive: false }
        )
    }
}

export { Wheel }