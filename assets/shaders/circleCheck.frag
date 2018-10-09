#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

vec2 random2( vec2 p ) {
    return fract( sin( vec2( dot( p, vec2( 127.1, 311.7 )), dot( p, vec2( 269.5,183.3 )))) * 43758.5453 );
}

float randomRadius( vec2 p ) {
    return 0.2 + 0.1 * cos(p.x) + 0.1 * sin(p.y) + 0.8*abs(cos(u_time*0.1));
}


void main()
{
    float cellNb = 20.0;
    vec2 st = cellNb * gl_FragCoord.xy / u_resolution.y;
  
    vec2 floor_st = floor( st );
    vec2 frac_st = fract( st );
    
    float randRadius = randomRadius( floor_st );
    float minDist = randRadius;
    
    vec3 col = vec3( 1, 1, 1 );
    gl_FragColor = vec4( 0.9, 0.4, 0., 1. );
    
    for( int y = -1; y <= 1; y++ ){
        for( int x = -1; x <= 1; x++ ){
            
            vec2 neighbor = vec2(x,y);
            vec2 idx = floor_st + neighbor.xy;
            vec2 pointInCell = random2(idx);
            
            vec2 movingPoint = 0.5 + 0.5 * sin( u_time * 0.1 * log( u_time * u_time ) + 6.2831 * pointInCell );
            
            vec2 vecDiff = movingPoint + neighbor - frac_st;
            float dist = length( vecDiff );
            
            vec4 newColor = vec4( minDist, minDist * 0.1, minDist * 0.3, 1. );
                
            if(mod( idx.x, 4. ) == 0.0 && mod( idx.y, 8. ) == 0. ){
                    
                newColor = cos( u_time + idx.x + idx.y ) + vec4( minDist, minDist * 0.1, 1. - minDist * 0.1, 1. );
            
            } else if( mod(idx.x, 7. ) == 0.0 && mod(idx.y, 3. ) == 0.){
                    
                newColor = cos( u_time + idx.x + idx.y ) + vec4( minDist * 0.7, minDist * 0.1, minDist * 0.5, 1. );
            } 
            
           gl_FragColor = mix( gl_FragColor, newColor, smoothstep( cellNb / u_resolution.y, -cellNb / u_resolution.y, dist - minDist ));
         }
    }

    
}