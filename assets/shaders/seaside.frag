#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

uniform sampler2D u_tex0;


float personWidth = 0.001;
float personHeight = 0.006;

vec2 random2( vec2 p ) {
    return fract( sin( vec2( dot( p, vec2( 127.1, 311.7 )), dot( p, vec2( 269.5,183.3 )))) * 43758.5453 );
}
float random( vec2 p ) {
    return 0.2 + 0.1 * cos(p.x) + 0.1 * sin(p.y) + 0.8*abs(cos(u_time*0.1));
}
float rescale(float value, float newMin, float newMax, float oldMin, float oldMax){
    return ( newMax - newMin ) / ( oldMax - oldMin ) * (value - oldMin) + newMin;
}

void main() {

    vec2 normCoord = gl_FragCoord.xy / u_resolution;
    vec4 tex = texture2D(u_tex0, normCoord);
    
    float randPos = (u_time * 0.5) * cos(random(normCoord));
    vec2 randXY = random2(normCoord);

    float positionY = randXY.y + 0.001*cos(u_time);

    float dispersion = abs(dot( cos(u_time), sin(u_time*0.01) ));
    
    randPos *= dispersion;

    float distance = distance(normCoord.xy, vec2(randPos, positionY));
    distance = rescale(distance,0.,1.,0.,0.1);
    if( abs( normCoord.y - positionY) < personHeight * 20.0
           && abs( normCoord.x - randPos ) < randXY.x * 20.0){


        float darker = abs( normCoord.x - randPos );//0.1;
       // tex.xyz *= darker ;//vec4(darker,darker,darker,1.0);
        tex = mix( tex, vec4(0.0,0.0,0.0, 1.0), 1.0 - distance);
    }
    else {
       // tex = vec4( 0., 0., 0., 1. );//tex * = 0.;
    }
    gl_FragColor = tex;//smoothstep( 20.0 / u_resolution.y, -20.0 / u_resolution.y,- abs( normCoord.x - randPos ) ));

}
