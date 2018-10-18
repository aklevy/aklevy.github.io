#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

#define EPSILON  0.01;
//#define M_PI 3.1415926535897932384626433832795;
float pi = 3.1415926535897932384626433832795;

float half_pi = 1.57079632679;


vec2 random2( vec2 p ) {
    return fract( sin( vec2( dot( p, vec2( 127.1, 311.7 )), dot( p, vec2( 269.5,183.3 )))) * 43758.5453 );
}


float randomRadius( vec2 p) {
    return 0.8 * cos(p.x) + 0.3 * sin(p.y);
}

float checkCorner(vec2 center, vec2 pos, float angleRange, float distMax, float distMin) {
	vec2 dir = vec2(1.0,0.0);
	vec2 diff = center - pos;
	
	float dist = length(diff);
	float angle = acos( dot( normalize(diff), dir));
	
	if((angle + angleRange > half_pi) 
			&& (angle - angleRange < half_pi) 
			&& pos.y >= center.y
			&& dist < distMax 
			&& dist > distMin ){
				
			return 0.03*abs(fract(dist*10. ) - 0.3);
	}
	return 0.;
}

vec4 computePattern(vec2 pos, float cellNb) {
	float angleRange = pi/3.;
	float maxDist = 0.7;
	float minDist = 0.1;
	
	vec4 color =  vec4( 0.16, 0.9, 0.9, 1. ); 
	vec4 firstColor = vec4( 0.9, 0.4, 0., 1. );
	vec4 secondColor = vec4( 0.9, 0.6, 0.6, 1. );
	
	float colorMix = checkCorner(vec2(0.5, 0.5), pos, angleRange, maxDist, minDist);
	colorMix += checkCorner(vec2(0.5, -0.5), pos, angleRange, maxDist, 0.5) ;
	if(colorMix != 0. ) {
		color = firstColor;
	}
	
	colorMix += checkCorner(vec2(0., 0.), pos, angleRange, maxDist, minDist) ;
	colorMix += checkCorner(vec2(1., 0.), pos, angleRange, maxDist, minDist) ;
	if(colorMix != 0. && color != firstColor) {
		color = secondColor;
	}
	
	return mix( vec4( 0., 1., 1., 1. ), color, smoothstep( cellNb / u_resolution.y, -cellNb / u_resolution.y, colorMix));
	
}
	
void main()
{
	float cellNb = 10.0;
    vec2 st = cellNb * gl_FragCoord.xy / u_resolution.y;

	vec2 floor_st = floor( st );
    vec2 frac_st = fract( st );
  
	
	// draw moving circles 
    gl_FragColor = computePattern(frac_st, cellNb);/*
    gl_FragColor = vec4( 0.16, 0.9, 0.9, 1. );//backgroundPattern;
    for( int y = -1; y <= 1; y++ ){
        for( int x = -1; x <= 1; x++ ){
			
            vec2 neighbor = vec2(x,y);
            vec2 idx = floor_st + neighbor.xy;
            float randRadius = randomRadius( idx );
            vec2 pointInCell = random2(idx);
            
            vec2 movingPoint = 0.5 + 0.5 * sin( log( u_time *100. ) + 6.2831 * pointInCell );
            
            vec2 vecDiff = movingPoint + neighbor - frac_st;
            float dist = length( vecDiff );
            
          
            if(	dist < randRadius){
				// draw background pattern	
                gl_FragColor = computePattern(frac_st, cellNb);
                
                return;
            }
            //else mixAlpha = dist - randRadius;
           //gl_FragColor = mix(  gl_FragColor, vec4( 0.16, 0.9, 0.9, 1. ), mixAlpha);//smoothstep( cellNb / u_resolution.y, -cellNb / u_resolution.y, mixAlpha ));
		}
	}*/
}
