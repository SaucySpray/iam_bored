class CreateSection {
    constructor(_form, _controller) {
        this.cache(_form)
        this.container.appendChild(this.addSection(_controller))
    }

    cache(_form) {
        this.form = _form
        // console.log(
        //     'twitter :', this.form.username,
        //     'playlist :', this.form.link,
        //     'message :', this.form.text,
        // )
        this.container = document.querySelector('.horizontal')
        this.display = document.querySelector('.display')
    }

    addSection(_controller) {
        const section = document.createElement('section') 
        section.classList.add('section', 'horizontal__container', 'user-section', 'z1')
        const wrapper = document.createElement('div') 
        wrapper.classList.add('section--wrapper', 'horizontal__wrapper')
        section.appendChild(wrapper)

        // H2 -> message
        const message = document.createElement('h2')
        // If text.words.length > 3, add new section
        message.classList.add('text', 'user-section__text', 'user-section__text--1')
        message.innerText = this.form.text
        wrapper.appendChild(message)

        // a>svg -> twitter
        const twitter = document.createElement('a')
        twitter.classList.add('twitter', 'user-section__twitter')
        twitter.src = this.form.link
        twitter.innerText = this.form.username
        wrapper.appendChild(twitter)

        // Increment slides count
        const currentWidth = this.container.getBoundingClientRect().width
        const newWidth = (Math.round(currentWidth * 0.001) + 1) * 100
        this.container.style.width = `${newWidth}vw`
        _controller.slides.max++

        // Create new display
        const displayEl = document.createElement('div')
        displayEl.classList.add('display__el', `display__el--${_controller.slides.max}`)
        const displayWrapper = document.createElement('div')
        displayWrapper.classList.add('row', 'display__wrapper')
        displayEl.appendChild(displayWrapper)

        const displayTextLeft = document.createElement('h2')
        displayTextLeft.classList.add('display__text', 'display__text__left')
        displayTextLeft.innerText = this.form.username
        const displayTextRight = document.createElement('h2')
        displayTextRight.classList.add('display__text', 'display__text__right')
        displayTextRight.innerText = this.form.username

        displayWrapper.appendChild(displayTextLeft)
        displayWrapper.appendChild(displayTextRight)

        this.display.appendChild(displayEl)

        return section
    }
}

export { CreateSection }