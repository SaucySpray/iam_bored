import sound00 from '../../static/sounds/00_trunk.mp3'
import sound01 from '../../static/sounds/01_golden-cage.mp3'
import sound02 from '../../static/sounds/02_maia-mixed.mp3'
import sound03 from '../../static/sounds/03_bent-your-mind.mp3'
import sound04 from '../../static/sounds/04_yeah-right.mp3'
import sound05 from '../../static/sounds/05_mexico.mp3'
import sound06 from '../../static/sounds/06_hello.mp3'
import sound07 from '../../static/sounds/07_sprites.mp3'
import sound08 from '../../static/sounds/08_about-a-girl.mp3'
export const sounds = [sound00, sound01, sound02, sound03, sound04, sound05, sound06, sound07, sound08]

import image00 from '../../static/images/00_trunk.jpg'
import image01 from '../../static/images/01_golden-cage.jpg'
import image02 from '../../static/images/02_maia-mixed.jpg'
import image03 from '../../static/images/03_bent-your-mind.jpg'
import image04 from '../../static/images/04_yeah-right.jpg'
import image05 from '../../static/images/05_mexico.jpg'
import image06 from '../../static/images/06_hello.jpg'
import image07 from '../../static/images/07_sprites.jpg'
import image08 from '../../static/images/08_about-a-girl.jpg'
export const images = [image00, image01, image02, image03, image04, image05, image06, image07, image08]

import texture00 from '../../static/textures/00.jpg'
import texture01 from '../../static/textures/01.jpg'
import texture02 from '../../static/textures/02.jpg'
import texture03 from '../../static/textures/03.jpg'
import texture04 from '../../static/textures/04.jpg'
import texture05 from '../../static/textures/05.jpg'
import texture06 from '../../static/textures/06.jpg'
import texture07 from '../../static/textures/07.jpg'
import texture08 from '../../static/textures/08.jpg'
export const textures = [texture00, texture01, texture02, texture03, texture04, texture05, texture06, texture07, texture08]

export const artist = ['Kings of leon', 'The Whitest Boy Alive', 'Bonobo', 'Crystal Places', 'Joji', 'BRNS', 'Clairo', '1991', 'Nirvana']
export const names = ['Trunk', 'Golden cage', 'Maia - mixed', 'Bent your mind', 'YEAH RIGHT', 'Mexico', 'Hello?', 'Sprites', 'About a girl']
export const links = [
    'https://open.spotify.com/track/3TC1g3YgznXQLEW4hyZr3Q?si=ZU0stco0Q4KspdBhvUC48A',
    'https://open.spotify.com/track/6L4ZU09mKnKaPq25xWHht6?si=YQ1n0Gc2TPyE5I3pBti19w',
    'https://open.spotify.com/track/4tUA0XgKiEigUywHbtkdLX?si=drsoZq3UTZaDukPm1isadw',
    'https://open.spotify.com/track/2HzIdqa2b7g4EPV2LmLZYQ?si=1QMx4SZyRXOtBd2tDnwNRQ',
    'https://open.spotify.com/track/1VGzxJnVQND7Cg5H5wGj14?si=nlfzkXu6SsW0CEYGV73J2A',
    'https://open.spotify.com/track/3Auh49LuW0UQdEsAdXxrJe?si=tg8mAo98QQSB1RB6zYCrcw',
    'https://open.spotify.com/track/7qwt4xUIqQWCu1DJf96g2k?si=SQGyUZtYQCKDUF6Bp5hQYA',
    'https://open.spotify.com/track/6k52BWUtebggXAoGZjzKVX?si=ec8ISJPYTY-0ByyXNDCMgw',
    'https://open.spotify.com/track/55yvzYuvJYG2RUEnMK78tr?si=_J-x4-QQRk-cYq7n89-W7g',
]

export const assets = {
    artist: artist,
    names :names,
    links: links,
    sounds: sounds,
    images: images
}

function importAllImages(r, array) {
    const allImages = r.keys().map(r)

    allImages.forEach(src => {
        const image = new Image()

        image.src = src

        array.push(image)
    })
}

function importAllSounds(r, array) {
    const allSounds = r.keys().map(r)

    allSounds.forEach(src => {
        const sound = new Audio()

        sound.src = src

        array.push(sound)
    })
}

const soundsArray = []
importAllImages(require.context('../../static/sounds/'), soundsArray)
const imagesArray = []
importAllImages(require.context('../../static/images/'), imagesArray)
const texturesArray = []
importAllImages(require.context('../../static/textures/'), texturesArray)