//import * as THREE from 'three'
import * as THREE from 'three'
import CameraControls from 'camera-controls'
CameraControls.install({ THREE: THREE })

class Controller {
    constructor(_camera, _dom) {
        const controller = new CameraControls(_camera, _dom)

        // Settings
        controller.minAzimuthAngle = 25 * Math.PI / 180
        controller.maxAzimuthAngle = 35 * Math.PI / 180
        controller.minPolarAngle = 65 * Math.PI / 180
        controller.maxPolarAngle = 75 * Math.PI / 180
        controller.enable = false

        this.mouse = {
            x: 0,
            y: 0
        }

        controller.rotateTo(
            35 * Math.PI / 180,
            65 * Math.PI / 180,
            true
        )

        window.addEventListener('mousemove', event => {
            this.mouse.x = event.clientX
            this.mouse.y = event.clientY

            controller.rotate(
                ((((this.mouse.x / window.innerWidth) - 0.5) ) * 50) * Math.PI / 180,
                ((((this.mouse.y / window.innerWidth) - 0.5) ) * 50) * Math.PI / 180,
                true
            )
        })

        window.addEventListener('keydown', event => {
            console.log(event.code)
        })

        return controller
    }
}

export { Controller }