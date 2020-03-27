export const Horizontal = function () { // wait for document ready

    const controller = new ScrollMagic.Controller();

    const horizontalSlide = new TimelineMax()
        // animate panels
        .to("#js-slideContainer", 1, { x: "-20%" })
        .to("#js-slideContainer", 1, { x: "-40%" })
        .to("#js-slideContainer", 1, { x: "-60%" })
        .to("#js-slideContainer", 1, { x: "-80%" })


    // create scene to pin and link animation
    new ScrollMagic.Scene({
        triggerElement: "#js-wrapper",
        triggerHook: "onLeave",
        duration: "400%"
    })
    .setPin("#js-wrapper")
    .setTween(horizontalSlide)
    .addIndicators()
    .addTo(controller)
}