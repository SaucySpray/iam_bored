export const fragment = `
#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359

// Uniforms
uniform float u_time;
uniform float u_progress;
uniform vec2 u_mouse;
uniform sampler2D u_texture0;
uniform sampler2D u_texture1;
uniform vec2 u_pixels;
uniform vec2 u_accel;

// Vertex binds
varying vec2 vUv;
varying vec2 vUv1;

// Functions
vec2 mirrored(vec2 v) {
    vec2 m = mod( v, 2.0 );
    return mix( m, 2.0 - m, step( 1.0, m ) );
}

float tri(float p) {
    return mix( p, 1.0 - p, step( 0.5, p ) ) * 2.0;
}

float stroke(float x, float s, float w) {
    float d = step(s, x + w * .5) - step(s, x - w * .5);
    return clamp(d, 0., 1.);
}

// Render
void main() {
    vec2 uv = gl_FragCoord.xy / u_pixels.xy;
    
    float offset = cos(uv.y * PI) * .15;
    float wall = stroke(uv.x, .5, cos(u_time * 2.) / 2.);
    float p = cos(u_progress / 1.5) + .5;
    
    float delayValue = p * 7.0 - uv.y * 1.0 + uv.x - 1.0;
    // p * wall
    
    delayValue = clamp( delayValue, 0.0, 1.0 );
    
    vec2 translateValue = p + delayValue * u_accel;
    vec2 translateValue1 = vec2( -0.5, 1. ) * translateValue;
    vec2 translateValue2 = vec2( -0.5, 1. ) * (translateValue - 1.0 - u_accel);
    
    vec2 w = sin( sin( u_progress ) * vec2( 0, 0.3 ) + vUv.yx * vec2( 0, 4. ) ) * vec2( 0, 0.5 );
    vec2 xy = w * ( tri( p ) * 0.5 + tri( delayValue ) * 0.5 );
    
    vec2 uv1 = vUv1 + translateValue1 + xy;
    vec2 uv2 = vUv1 + translateValue2 + xy;
    
    vec4 rgba1 = texture2D( u_texture0, mirrored( uv1 ) );
    vec4 rgba2 = texture2D( u_texture1, mirrored( uv2 ) );
    vec4 rgba = mix( rgba1, rgba2, delayValue );
    
    gl_FragColor = rgba;
}
`