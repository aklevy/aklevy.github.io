#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

vec2 random2( vec2 p ) {
	return fract( sin( vec2( dot( p, vec2( 269.5,183.3 )) * 43758.5453, dot( p, vec2( 127.1, 311.7 )))));
}

float randomRadius( vec2 p) {
	return 0.3 * cos(p.x) + 0.8 * sin(p.y);
}

float distanceTo(vec2 pos, vec2 center ){
	return length(pos- center);
}

vec4 computePattern(vec2 pos, float cellNb) {
	
	float maxDist = 0.7;
	float minDist = 0.1;
	
	vec4 goldColor =  vec4( 1.0, 0.84, 0., 1. ); 
	vec4 color;
	vec4 firstColor = vec4( 0.19, 0.43, 0.91, 1. );
	vec4 secondColor = vec4( 0.09, 0.21, 0.46, 1. );
	color = firstColor;
	float dist = 0.;
	
	float distanceToBottom = distanceTo(pos, vec2(0.5, -0.5));
	
	float distanceToLeftBottom = distanceTo(pos, vec2(0., 0.));
	float distanceToLeft = distanceTo(pos, vec2(0., 0.5));

	float distanceToRightBottom = distanceTo(pos, vec2(1., 0.));
	float distanceToRight = distanceTo(pos, vec2(1., 0.5));

	float distanceToCenter = distanceTo(pos, vec2(0.5, 0.2));
	float distanceToTop = distanceTo(pos, vec2(0.5, 0.7));

	if(distanceToBottom < 0.7 ) {	
		dist = distanceToBottom; 
		color = firstColor;
	} else if(distanceToLeftBottom < 0.5) {
		dist = distanceToLeftBottom;
		color = secondColor;
	} else if(distanceToRightBottom < 0.5) {
		dist = distanceToRightBottom;
		color = secondColor;
	} else if(distanceToCenter < 0.5 ) {
		dist = distanceToCenter;
		color = firstColor;
	}  else if(distanceToLeft < 0.5) {
		dist = distanceToLeft;
		color = secondColor;
	} else if(distanceToRight < 0.5) {
		dist = distanceToRight;
		color = secondColor;
	} else if(distanceToTop < 0.4 ) {
		dist = distanceToTop;
		color = firstColor;
	} 
	
	float colorMix = 0.03*abs(fract(dist*10. ) - 0.3);
	
	return mix( color, goldColor, smoothstep( cellNb / u_resolution.y, -cellNb / u_resolution.y, colorMix));
}

void main()
{
	float cellNb = 10.0;
	vec2 st = cellNb * gl_FragCoord.xy / u_resolution.y;

	vec2 floor_st = floor( st );
	vec2 frac_st = fract( st );
  	
	gl_FragColor = vec4( 0.1, 0.19, 0.37, 1. );
	float time = u_time * 0.2 * log( u_time *100. );

	// draw moving circles 
	for( int y = -1; y <= 1; y++ ){
		for( int x = -1; x <= 1; x++ ){
			
			vec2 neighbor = vec2(x,y);
			vec2 idx = floor_st + neighbor.xy;
			float randRadius = randomRadius( idx );
			vec2 pointInCell = random2(idx);
			
			vec2 movingPoint = 0.5 + 0.5 * sin( time + 6.2831 * pointInCell );
			
			vec2 vecDiff = movingPoint + neighbor - frac_st;
			float dist = length( vecDiff );
			
		  
			 if(	(dist - randRadius ) < 0.001){
				 vec4 pattern = computePattern(frac_st, cellNb);
				 
				// draw background pattern	
				gl_FragColor = mix(   gl_FragColor, pattern,smoothstep( - 1.0 - randRadius , dist - 0.2, dist - randRadius ));
				
				return;
			}
		}
	}
}
