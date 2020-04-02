import * as THREE from 'three'

export const Lights = () => {
    const rectLight = new THREE.RectAreaLight(0xffffff, 60, 4, 2)
    // rectLight.rotation.y = 180 * (Math.PI / 180)
    rectLight.position.set(0, -1, -18)
    rectLight.lookAt(0, 0, 0)

    return rectLight
}