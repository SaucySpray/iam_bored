import * as THREE from 'three'

const options = {
    alpha: false,
    fov: 75,
    camZPos: 5,
}

const textures = ['https://i.imgur.com/CcY7wuc.jpg', 'https://i.imgur.com/sbOv46d.jpg', 'https://i.imgur.com/ZinsbDR.jpg', 'https://i.imgur.com/XrYJcVQ.jpg', 'https://i.imgur.com/3Za3uqr.jpg', 'https://i.imgur.com/yS812WZ.jpg', 'https://i.imgur.com/iBqzSTX.jpg', 'https://i.imgur.com/f11HIQw.jpg', 'https://i.imgur.com/r9RXW4z.jpg']

class Three {
    constructor(_container, _options = options, _textures = textures) {
        this.cache(_container, _textures)
        this.setup(_options)
        this.playground()
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

    cache(_container, _textures) {
        // Dom
        this.container = _container
        this.textures = _textures
        this.mouse = {
            x: 0,
            y: 0
        }

        // Scene
        this.camera
        this.scene
        this.renderer

        // Shader
        this.loader
        this.uniforms
        this.clock
        this.delta
        this.texture1
        this.texture2

        // Bind loop
        this.loop = this.loop.bind(this)

        // Returned objects
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

        // Shader
        this.loader = new THREE.TextureLoader()
        this.uniforms = {
            u_time: {
                type: 'f',
                value: 1.0
            },
            u_resolution: {
                type: 'v2',
                value: new THREE.Vector2()
            },
            u_mouse: {
                type: 'v2',
                value: new THREE.Vector2()
            },
            u_current: {
                type: 'float',
                value: 0
            },
            u_accel: {
                type: 'v2',
                value: new THREE.Vector2(0.5, 2)
            },
            u_texture_0: {
                type: 'sampler2D',
                value: this.loader.load(this.textures[0])
            }
        }
        // for(let i=0; i<this.textures.length; i++) {
        //     this.uniforms[`u_texture_${i}`] = {}
        //     this.uniforms[`u_texture_${i}`].type = 'sampler2D'
        //     this.uniforms[`u_texture_${i}`].value = this.loader.load(this.textures[i])
        // }
        this.clock = new THREE.Clock()
        this.delta = this.clock.getDelta()
    }

    events() {
        // Responsive
        window.addEventListener('resize', () => this.resize())

        // Shader Update - Mouse Position
        document.addEventListener('mousemove', (_e) => {
            this.mouse.x = _e.clientX
            this.mouse.y = _e.clientY

            this.uniforms.u_mouse.value.x = _e.clientX
            this.uniforms.u_mouse.value.y = _e.clientY
        })
    }

    resize() {
        // Renderer update
        this.renderer.setSize(document.body.offsetWidth, document.body.offsetHeight)

        // Camera update
        this.camera.aspect = window.innerWidth / window.innerHeight
        this.camera.updateProjectionMatrix()

        // Shader update - Resolution
        this.uniforms.u_resolution.value.x = this.renderer.domElement.width
        this.uniforms.u_resolution.value.y = this.renderer.domElement.height
    }

    update() {
        this.delta = this.clock.getDelta()

        // Shader Update - Time
        this.uniforms.u_time.value = this.clock.elapsedTime

        // Animation
        // this.camera.rotation.z += 0.005
    }

    loop() {
        window.requestAnimationFrame(this.loop)

        this.update()
        this.renderer.render(this.scene, this.camera)
    }

    playground() {
        let geometry = new THREE.PlaneBufferGeometry(3.5, 3.5, 64, 64)

        let material = new THREE.ShaderMaterial({
            uniforms: this.uniforms,
            vertexShader: document.querySelector('#vertexShader').textContent,
            fragmentShader: document.querySelector('#fragmentShader').textContent,
            wireframe: false,
            side: THREE.DoubleSide
        })

        this.mesh = new THREE.Mesh(geometry, material)

        this.meshWrapper = new THREE.Object3D()
        this.meshWrapper.add(this.mesh)

        this.scene.add(this.meshWrapper)
    }
}

export { Three }