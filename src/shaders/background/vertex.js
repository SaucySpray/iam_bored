export const vertex = `
uniform vec2 u_uvRate1;

varying vec2 vUv;
varying vec2 vUv1;

void main() {
    vUv = uv;
    vUv1 = uv - 0.5;
    vUv1 *= u_uvRate1.xy;
    vUv1 += 0.5;
    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1. );
}
`