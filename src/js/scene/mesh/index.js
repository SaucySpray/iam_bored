import * as THREE from 'three'
import { Cover } from './Cover'
import { Background } from './Background'
import { Lights } from './Lights'

const meshWrapper = new THREE.Object3D()
meshWrapper.add(Cover(), Background())

export { Cover, Background, Lights, meshWrapper }