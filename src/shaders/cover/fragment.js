export const fragment = `
varying vec2 vUv;
varying float vWave;
uniform sampler2D u_texture_0;

void main() {
    float wave = vWave * 0.5;

    float r = texture2D(u_texture_0, vUv ).r;
    float g = texture2D(u_texture_0, vUv ).g;
    float b = texture2D(u_texture_0, vUv + wave).b;

    vec3 texture = vec3(r, g, b);
    gl_FragColor = vec4(texture, 1.);
}
`