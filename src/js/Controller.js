const textures = ['https://i.imgur.com/CcY7wuc.jpg', 'https://i.imgur.com/sbOv46d.jpg', 'https://i.imgur.com/ZinsbDR.jpg', 'https://i.imgur.com/XrYJcVQ.jpg', 'https://i.imgur.com/3Za3uqr.jpg', 'https://i.imgur.com/yS812WZ.jpg', 'https://i.imgur.com/iBqzSTX.jpg', 'https://i.imgur.com/f11HIQw.jpg', 'https://i.imgur.com/r9RXW4z.jpg']

class Controller {
    constructor(_three) {
        this.cache(_three)
    }

    cache(_three) {
        this.three = _three
        this.mouse = {
            x: 0,
            y: 0
        }
    }

    events() {
        window.addEventListener('mousemove', (_e) => {
            this.mouse.x = _e.clientX 
            this.mouse.y = _e.clientY
        })
    }
}

export { Controller }