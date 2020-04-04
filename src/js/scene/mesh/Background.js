import * as THREE from 'three'
import { vertex, fragment } from '../../../shaders/background'
import { textures } from '../../tools/Assets'

export const Background = () => {
    const geometry = new THREE.PlaneBufferGeometry(36, 18, 64, 64)
    const geometry2 = new THREE.BoxBufferGeometry(12, 6, 34)
    const geometry3 = new THREE.CylinderBufferGeometry(10, 5, 40, 32, 8, false)

    const uniforms = {
        u_time: {
            type: 'f',
            value: 1.0
        },
        u_mouse: {
            type: 'v2',
            value: new THREE.Vector2()
        },
        u_resolution: {
            type: 'v2',
            value: new THREE.Vector2()
        },
        u_pixels: {
            type: 'v2',
            value: new THREE.Vector2(window.innerWidth, window.innerHeight)
        },
        u_accel: {
            type: 'v2',
            value: new THREE.Vector2(0.5, 2)
        },
        u_progress: {
            type: 'f', value: 2.2
        },
        u_current: {
            type: 'float',
            value: 0
        },
        u_uvRate1: {
            value: new THREE.Vector2(1, 1)
        },
        u_texture0: {
            type: 'sampler2D',
            value: new THREE.TextureLoader().load(textures[0])
        },
        u_texture1: {
            type: 'sampler2D',
            value: new THREE.TextureLoader().load(textures[0])
        }
    }

    const material = new THREE.ShaderMaterial({
        uniforms: uniforms,
        vertexShader: vertex,
        fragmentShader: fragment,
        side: THREE.BackSide
    })

    const material2 = new THREE.MeshStandardMaterial({
        color: 0x13577a,
        emissive: 0x93762a,
        side: THREE.BackSide,
        roughness: 0,
        metalness: 0.3
    })

    const mesh = new THREE.Mesh(geometry3, material)
    mesh.position.z = -12
    mesh.rotation.x = 90 * (Math.PI / 180)
    mesh.name = 'background'

    return mesh
}