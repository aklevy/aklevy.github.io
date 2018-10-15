#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;

uniform float u_time;
uniform sampler2D u_tex0;


float random (in vec2 st) {
    return fract(sin(u_time *u_time *0.01+  dot(st.xy,
                         vec2(12.9898,78.233)))
                 * 43758.5453123);
}
float randFloat(float x) {
    return fract( sin(x)* 1.0);
}
vec2 random2( vec2 p ) {
    return fract( sin( vec2( dot( p, vec2( 127.1, 311.7 )), dot( p, vec2( 269.5,183.3 )))) * 43758.5453 );
}

float noise (in vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);

    // Four corners in 2D of a tile
    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));

    // Smooth Interpolation

    // Cubic Hermine Curve.  Same as SmoothStep()
    vec2 u = f*f*(3.0-2.0*f);
    // u = smoothstep(0.,1.,f);

    // Mix 4 coorners percentages
    return mix(a, b, u.x) +
            (c - a)* u.y * (1.0 - u.x) +
            (d - b) * u.x * u.y;
}
vec4 blur13(vec2 uv, vec2 direction) {
  vec4 color = vec4(0.0);
  vec2 off1 = vec2(1.411764705882353) * direction / u_resolution;
  vec2 off2 = vec2(3.2941176470588234) * direction / u_resolution;
  vec2 off3 = vec2(5.176470588235294) * direction / u_resolution;
  color += texture2D(u_tex0, uv) * 0.1964825501511404;
  color += texture2D(u_tex0, uv + off1 ) * 0.2969069646728344;
  color += texture2D(u_tex0, uv - off1 ) * 0.2969069646728344;
  color += texture2D(u_tex0, uv + off2 ) * 0.09447039785044732;
  color += texture2D(u_tex0, uv - off2 ) * 0.09447039785044732;
  color += texture2D(u_tex0, uv + off3 ) * 0.010381362401148057;
  color += texture2D(u_tex0, uv - off3 ) * 0.010381362401148057;
  return color;
}
vec2 dune(vec2 pos){
    vec2 windDir = vec2(1.0,0.0);
    float windSpeed = 0.5;
    float windHeight = 0.8;
    float slope = 30.0;

    vec2 moved;
    float dx = windDir.x  * windSpeed * u_time * 0.01;
    moved.x = pos.x + dx;

    if(pos.y < windHeight){
        moved.y = pos.y + sin( slope ) * dx ;
    }
    else{ // slip face
        moved.y = pos.y - sin( slope ) * dx ;
    }
    return moved;
}

void main()
{
   /* vec2 st = gl_FragCoord.xy / u_resolution.xy;
    float mouseX = u_mouse.x/u_resolution.x;

    vec2 pos = vec2( 100.0 * st  );  
    float n = noise(pos);

    vec2 floor_st = floor( st );
    vec2 frac_st = fract( st );

    vec4 tex = texture2D(u_tex0, st);
    vec4 texMod = blur13(st, vec2(1.0,1.0));//texture2D(u_tex0, random2(st * n));

  

    vec3 mixed = mix(tex.rgb, texMod.rgb, smoothstep(0. ,1. , randFloat(u_time ) ));// st.x - n));//smoothstep(0. ,1. , mouseX ));//randFloat(sin(u_time)) ) );// mix(vec3(n), tex.rgb, smoothstep(0. ,1. , sin(u_time) ) );
    vec3 mixedNoise = mix(texMod.rgb, mixed, smoothstep(0. ,1. , n));
     gl_FragColor = vec4(mixedNoise, 1.0);
*/
    vec2 movedPos = dune(gl_FragCoord.xy / u_resolution.xy);
    
    gl_FragColor = vec4(movedPos.x,movedPos.y,0.0,1.0);
    
  //  gl_FragColor = vec4(movedPos.x, movedPos.y, 0.0, 1.0);
    
    
}