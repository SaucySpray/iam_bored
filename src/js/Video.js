class Video {
    constructor() {
        // DOM Elements
        this.$menuElements = document.querySelectorAll('.js-menu-el')

        // Settings
        this.settings = {
            accel: 0.01,
            scrollpos: 0,
            delay: 0,
            frames: 50,
            duration: 500,
            count: 0
        }
        this.controller = new ScrollMagic.Controller()
        this.isAppeard = false
        this.videoBackground = document.querySelector('.video__bg')

        // Home
        this.home = {}
        this.home.dom = document.querySelector('.home')
        this.home.images = []

        // About
        this.about = {}
        this.about.dom = document.querySelector('.about')
        this.about.images = []

        // Experts
        this.expert01 = {}
        this.expert01.dom = document.querySelector('.expert01')
        this.expert01.images = []
        this.expert02 = {}
        this.expert02.dom = document.querySelector('.expert02')
        this.expert02.images = []
        this.expert03 = {}
        this.expert03.dom = document.querySelector('.expert03')
        this.expert03.images = []
        this.expert04 = {}
        this.expert04.dom = document.querySelector('.expert04')
        this.expert04.images = []

        // Clients
        this.clients = {}
        this.clients.dom = document.querySelector('.clients')
        this.clients.images = []

        // Hyperspace
        this.hyperspace = {}
        this.hyperspace.images = []

        // Scenes
        this.scenes = []
        document.querySelectorAll('.scene').forEach(scenes => {
            const scene = new ScrollMagic.Scene({
                duration: this.settings.duration,
                triggerElement: `.${scenes.classList[0]}`,
                triggerHook: 0,
            })
            // .addIndicators({
            //     name: scenes.classList[0],
            //     colorTrigger: 'white',
            //     colorStart: 'white',
            //     colorEnd: 'white',
            // })
            .setClassToggle(`.${scenes.classList[0]}`, 'test')
            .addTo(this.controller)

            this.scenes.push(scene)
        })

        // Animation
        this.createImagesArrays()
        this.scenes.forEach(scene => {
            this.videoAnimation(scene, this.settings)
        })

        // Tweens
        this.fadeInUp('.header')
        this.scenes[0].setTween(this.fadeInOutUp('.home__wrapper'))
        this.scenes[1].setTween(this.fadeInOutRight('.about__wrapper'))
        this.scenes[2].setTween(this.fadeInOutRight('.expert01__wrapper'))
        this.scenes[3].setTween(this.fadeInOutRight('.expert02__wrapper'))
        this.scenes[4].setTween(this.fadeInOutRight('.expert03__wrapper'))
        this.scenes[5].setTween(this.fadeInOutRight('.expert04__wrapper'))
        this.scenes[6].setTween(this.fadeInOutRight('.clients__wrapper'))
        this.scenes[7].setTween(this.fadeInOutDown('.contact__wrapper'))

        // Observer
        this.observerOptions = {
            root: document.body,
            rootMargin: '0px',
            threshold: 0.5
        }
        this.observer = new IntersectionObserver((event) => {
            event.forEach(e => {
                if(e.intersectionRatio > 0.5) {
                    switch (e.target.classList[0]) {
                        case 'home':
                            this.settings.count = 0
                            break;
                        case 'about':
                            this.settings.count = 1
                            break;
                        case 'expert01':
                            this.settings.count = 2
                            break;
                        case 'expert02':
                            this.settings.count = 3
                            break;
                        case 'expert03':
                            this.settings.count = 4
                            break;
                        case 'expert04':
                            this.settings.count = 5
                            break;
                        case 'clients':
                            this.settings.count = 6
                            break;
                        case 'contact':
                            this.settings.count = 7
                            break;
                        default:
                            break;
                    }
                    console.log(e.target.classList[0] + ' count : ' + this.settings.count)
                }
            })
        }, { threshold: 0.5 })
        this.observeScenes(document.querySelectorAll('.scene'))
    }

    importAll(r, array) {
        const allImages = r.keys().map(r)

        allImages.forEach(src => {
            const image = new Image()

            image.src = src

            array.push(image)
        })
    }

    createImagesArrays() {
        // this.importAll(require.context('../assets/images/home/', false, /\.(png|jpe?g|svg)$/), this.home.images)
        // this.importAll(require.context('../assets/images/about/', false, /\.(png|jpe?g|svg)$/), this.about.images)
        // this.importAll(require.context('../assets/images/expert01/', false, /\.(png|jpe?g|svg)$/), this.expert01.images)
        // this.importAll(require.context('../assets/images/expert02/', false, /\.(png|jpe?g|svg)$/), this.expert02.images)
        // this.importAll(require.context('../assets/images/expert03/', false, /\.(png|jpe?g|svg)$/), this.expert03.images)
        // this.importAll(require.context('../assets/images/expert04/', false, /\.(png|jpe?g|svg)$/), this.expert04.images)
        // this.importAll(require.context('../assets/images/clients/', false, /\.(png|jpe?g|svg)$/), this.clients.images)
        // this.importAll(require.context('../assets/images/hyperspace/', false, /\.(png|jpe?g|svg)$/), this.hyperspace.images)
    }

    observeScenes(_scenes) {
        _scenes.forEach(scene => {
            this.observer.observe(scene)
        })
    }

    videoAnimation(_scene, _settings) {
        _scene.on('update', (event) => {
            _settings.scrollpos = event.scrollPos / 10
            let index = Math.ceil(event.scrollPos / 10) % 50

            // console.log(_scene + ' : ' + _number + ' -> ' + index)
            // console.log(Math.ceil(event.scrollPos / 10))

            this.$menuElements.forEach(el => el.classList.remove('js-menu-active'))

            // Top*
            if (this.settings.count === 0 && _settings.scrollpos === 0) {
                this.fadeInUp('.transition__scroller')
                // console.log('test')
            }
            // Home
            else if (_settings.scrollpos > 0 && _settings.scrollpos < 50) {
                this.videoBackground.src = this.home.images[index].src
                this.fadeOutDown('.transition__scroller')
                // console.log('home')
            }
            // About
            else if (_settings.scrollpos > 100 && _settings.scrollpos < 150) {
                this.videoBackground.src = this.about.images[index].src
                this.fadeOutDown('.transition__scroller')
                // console.log('about')
            }
            // Expert01
            else if (_settings.scrollpos > 200 && _settings.scrollpos < 250) {
                this.videoBackground.src = this.expert01.images[index].src
                this.fadeOutDown('.transition__scroller')
                // console.log('expert')
            }
            // Expert02
            else if (_settings.scrollpos > 300 && _settings.scrollpos < 350) {
                this.videoBackground.src = this.expert02.images[index].src
                this.fadeOutDown('.transition__scroller')
                // console.log('expert')
            }
            // Expert03
            else if (_settings.scrollpos > 400 && _settings.scrollpos < 450) {
                this.videoBackground.src = this.expert03.images[index].src
                this.fadeOutDown('.transition__scroller')
                // console.log('expert')
            }
            // Expert04
            else if (_settings.scrollpos > 500 && _settings.scrollpos < 550) {
                this.videoBackground.src = this.expert04.images[index].src
                this.fadeOutDown('.transition__scroller')
                // console.log('expert')
            }
            // Clients
            else if (_settings.scrollpos > 600 && _settings.scrollpos < 650) {
                this.videoBackground.src = this.clients.images[index].src
                this.fadeOutDown('.transition__scroller')
                // console.log('clients')
            }
            // Contact
            else if (_settings.scrollpos > 700 && _settings.scrollpos < 750) {
                this.videoBackground.src = this.clients.images[0].src
            }
            // Hyperspace
            else if (
                _settings.scrollpos > 50 && _settings.scrollpos < 100 || 
                _settings.scrollpos > 150 && _settings.scrollpos < 200 || 
                _settings.scrollpos > 250 && _settings.scrollpos < 300 || 
                _settings.scrollpos > 350 && _settings.scrollpos < 400 || 
                _settings.scrollpos > 450 && _settings.scrollpos < 500 || 
                _settings.scrollpos > 550 && _settings.scrollpos < 600 ||
                _settings.scrollpos > 650 && _settings.scrollpos < 700
            ){
                this.videoBackground.src = this.hyperspace.images[index].src
                // console.log('black')
            }

            return _settings.scrollpos
        })
    }

    expertFadeInOut(_target) {
        const target = document.querySelector(_target)
        const targets = target.querySelectorAll('.expert__section')
        let tl

        for (let i = 0; i < targets.length; i++) {
            tl = new TimelineMax({ delay: i * 2 })
            tl.to(targets[i], 0.2, { opacity: 1, y: 0 })
            tl.to(targets[i], 0.7, { opacity: 1, y: 0 })
            tl.to(targets[i], 0.25, { opacity: 0, y: 100, ease: Power4.easeInOut })
            tl.to(targets[i], 0.25, { position: 'relative' })
        }

        return tl
    }

    fadeInOutUp(_target) {
        let tl = new TimelineMax()
        tl.set(_target, { opacity: 0, y: 100, position: 'fixed' })
        tl.to(_target, 0.2, { opacity: 1, y: 0 })
        tl.to(_target, 0.7, { opacity: 1, y: 0 })
        tl.to(_target, 0.25, { opacity: 0, y: 100, ease: Power4.easeInOut })
        tl.to(_target, 0.1, { position: 'relative' })

        return tl
    }

    fadeInOutDown(_target) {
        let tl = new TimelineMax()
        tl.set(_target, { opacity: 0, y: 100 })
        tl.to(_target, 0.2, { opacity: 1, y: 0 })
        tl.to(_target, 0.7, { opacity: 1, y: 0 })
        tl.to(_target, 0.25, { opacity: 0, y: 100, ease: Power4.easeInOut })

        return tl
    }

    fadeInUp(_target) {
        let tl = new TimelineMax()
        tl.set(_target, { opacity: 0, y: 50 })
        tl.to(_target, 0.1, { opacity: 1, y: 0 })

        return tl
    }

    fadeOutDown(_target) {
        let tl = new TimelineMax()
        tl.set(_target, { opacity: 1, y: 0 })
        tl.to(_target, 0, { opacity: 0, y: 50 })

        return tl
    }

    fadeInOutRight(_target) {
        let tl = new TimelineMax()
        tl.set(_target, { opacity: 0, x: 100, position: 'fixed' })
        tl.to(_target, 0.2, { opacity: 1, x: 0 })
        tl.to(_target, 0.7, { opacity: 1, x: 0 })
        tl.to(_target, 0.25, { opacity: 0, x: 100, ease: Power4.easeInOut })
        tl.to(_target, 0.1, { position: 'relative' })

        return tl
    }
}

export { Video }