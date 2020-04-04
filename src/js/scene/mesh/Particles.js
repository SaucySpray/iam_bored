import * as THREE from 'three'
import fog from '../../../static/textures/fog.png'

export const Particles = (_ammount, _size, _color) => {
    const geometry = new THREE.Geometry()

    const material = new THREE.PointsMaterial({
        color: _color,
        size: _size,
        transparent: true,
        map: new THREE.TextureLoader().load(fog)
    })

    let x, y, z;
    _.times(_ammount, function (n) {
        x = ((Math.random() * 20) - 10);
        y = ((Math.random() * 20) - 10);
        z = ((Math.random() * 10) - 5) - 6;

        geometry.vertices.push(new THREE.Vector3(x, y, z));
    })

    const pointCloud = new THREE.PointCloud(geometry, material)
    pointCloud.name = 'particles'

    return pointCloud
}