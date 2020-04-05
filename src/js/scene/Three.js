import * as THREE from 'three'
import CameraControls from 'camera-controls'
CameraControls.install({ THREE: THREE })
import { TweenMax, Sine, Expo } from 'gsap'
import { Interaction } from 'three.interaction'
import { Cover, Background, Lights } from './mesh'

const options = {
    alpha: false,
    fov: 75,
    camZPos: 5,
}

class Three {
    constructor(_container, _options = options) {
        this.cache(_container)
        this.setup(_options)
        this.mountWorld()
        this.resize()
        this.events()
        this.loop()

        this.three = {
            camera: this.camera,
            scene: this.scene,
            renderer: this.renderer
        }
        return this.three
    }

    cache(_container) {
        // Dom
        this.container = _container
        this.mouse = {
            x: 0,
            y: 0
        }
        this.orientation = {
            a: 0,
            b: 0,
            g: 0
        }

        // Scene
        this.camera
        this.scene
        this.renderer
        this.interaction

        // Shader
        this.loader
        this.meshUniforms
        this.bgUniforms
        this.clock
        this.delta
        this.texture1
        this.texture2
        this.progress = 0

        // Bind loop
        this.loop = this.loop.bind(this)
    }

    setup(_options) {
        this.options = _options

        // Camera
        this.camera = new THREE.PerspectiveCamera(this.options.fov, window.innerWidth / window.innerHeight, 0.1, 1000)
        this.camera.position.z = this.options.camZPos

        // Scene
        this.scene = new THREE.Scene()

        // Renderer
        this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: this.options.alpha })
        this.renderer.setSize(document.body.offsetWidth, document.body.offsetHeight)
        this.renderer.setPixelRatio(window.devicePixelRatio)
        this.renderer.domElement.classList.add('canvas')
        this.container.appendChild(this.renderer.domElement)

        // Interaction
        this.interaction = new Interaction(this.renderer, this.scene, this.camera)

        this.clock = new THREE.Clock()
        this.delta = this.clock.getDelta()
    }

    mountWorld() {
        this.coverMesh = Cover()
        this.backgroundMesh = Background()
        this.lights = Lights()
        this.scene.add(this.coverMesh, this.backgroundMesh, this.lights)
    }

    events() {
        // Responsive
        window.addEventListener('resize', () => this.resize())

        // Mouse move
        document.addEventListener('mousemove', (_e) => {
            this.mouse.x = _e.clientX
            this.mouse.y = _e.clientY

            this.scene.getObjectByName("cover").material.uniforms.u_mouse.value.x = _e.clientX
            this.scene.getObjectByName("cover").material.uniforms.u_mouse.value.y = _e.clientY

            TweenMax.to(this.camera.position, 0.4, {
                x: ((((this.mouse.x / window.innerWidth) - 0.5)) * 20) * Math.PI / 180,
                y: ((((this.mouse.y / window.innerWidth) - 0.5)) * 20) * Math.PI / 180
            })

            TweenMax.to(this.scene.getObjectByName('cover').rotation, 1.2, {
                x: ((((this.mouse.y / window.innerWidth) - 0.5)) * 30) * Math.PI / 180,
                y: ((((this.mouse.x / window.innerWidth) - 0.5)) * 30) * Math.PI / 180,
                ease: Expo.easeOut
            })
        })

        // Orientation
        window.addEventListener('deviceorientation', (event) => {
            this.orientation.a = event.alpha % 140
            this.orientation.b = event.beta % 90
            this.orientation.g = event.gamma % 140

            TweenMax.to(this.scene.getObjectByName('cover').rotation, 0.2, {
                x: (((this.orientation.b * -1) + 40) / 2) * Math.PI / 180,
                y: (this.orientation.g / 2) * Math.PI / 180,
                ease: Sine.easeOut
            })
        })
    }

    resize() {
        // Renderer update
        this.renderer.setSize(document.body.offsetWidth, document.body.offsetHeight)

        // Camera update
        this.camera.aspect = window.innerWidth / window.innerHeight
        this.camera.updateProjectionMatrix()

        // Shader update - Resolution
        this.scene.getObjectByName('cover').material.uniforms.u_resolution.value.x = this.renderer.domElement.width
        // this.scene.getObjectByName('background').material.uniforms.u_resolution.value.y = this.renderer.domElement.height
    }

    update() {
        this.delta = this.clock.getDelta()

        // Shader Update - Time
        this.scene.getObjectByName("cover").material.uniforms.u_time.value = this.clock.elapsedTime
        this.scene.getObjectByName("background").material.uniforms.u_time.value = this.clock.elapsedTime

        // Animation
        this.camera.position.x = (Math.cos(this.clock.getElapsedTime() / 2)) * 0.08
        this.camera.position.y = (Math.sin(this.clock.getElapsedTime())) * 0.08
        this.backgroundMesh.rotation.y += 0.0025
    }

    loop() {
        window.requestAnimationFrame(this.loop)

        this.update()
        this.renderer.render(this.scene, this.camera)
    }
}

export { Three }