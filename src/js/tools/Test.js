export const Test = () => {
    const ctx = new (window.AudioContext || window.webkitAudioContext)()

    const osc = ctx.createOscillator()

    osc.connect(ctx.destination)
    osc.frequency.value = 200

    osc.start(0)
    osc.stop(1)

    console.log(osc)
}