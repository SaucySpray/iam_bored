class Wheel {
    constructor(_callback) {
        this.cache(_callback)
        this.event()
    }

    cache(_callback) {
        this.callback = _callback
        this.hammer = new Hammer(document.body)
    }

    event() {
        // Wheel & Pan
        window.addEventListener('wheel',
            _.debounce(
                _.throttle((_e) => {
                    _e.preventDefault()
                    this.callback(_e.deltaY * 0.01)
                }, 1000)
                , 100
            ),
            { passive: false }
        )

        this.hammer.on('pan',
            _.debounce(
                _.throttle((_e) => {
                    this.callback(_e.deltaY * 0.01)
                }, 1000)
                , 100
            ),
            { passive: false }
        )
    }
}

export { Wheel }