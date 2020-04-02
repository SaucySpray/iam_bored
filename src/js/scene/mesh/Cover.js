import * as THREE from 'three'
import { vertex, fragment } from '../../../shaders/cover'
import { images } from '../../tools/Assets'

export const Cover = () => {
    const uniforms = {
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
            value: new THREE.TextureLoader().load(images[0])
        }
    }

    const geometry = new THREE.PlaneBufferGeometry(3.5, 3.5, 64, 64)

    const material = new THREE.ShaderMaterial({
        uniforms: uniforms,
        vertexShader: vertex,
        fragmentShader: fragment,
        side: THREE.DoubleSide
    })

    const mesh = new THREE.Mesh(geometry, material)
    mesh.name = 'cover'

    // Create an Object3D to wrap & animate
    const meshWrapper = new THREE.Object3D()
    meshWrapper.add(mesh)
    meshWrapper.name = 'coverWrapper'

    return meshWrapper
}