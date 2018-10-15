---
layout: post
title:  "Perlin Noise"
preview: /assets/preview/sequenceur-preview.png
color: "#ffe27aC0"
tags: [All, Shader]
permalink: perlinNoise

---


<p align="center">
<canvas class="glslCanvas" data-fragment-url="/assets/shaders/perlinNoise.frag"  width="700" height="500" data-textures="/assets/shaders/sahara.jpg"></canvas>
</p>
<div id="container">
</div>
    
<script src="js/three.min.js"></script>

  
 
  <script type="text/javascript">
 

window.requestAnimFrame = (function(){
      return  window.requestAnimationFrame       || 
              window.webkitRequestAnimationFrame || 
              window.mozRequestAnimationFrame    || 
              window.oRequestAnimationFrame      || 
              window.msRequestAnimationFrame     || 
              function(callback, element){
                window.setTimeout(callback, 1000 / 60);
              };
    })();


  // set the scene size
  var WIDTH = 700,
      HEIGHT = 500;
  
  // set some camera attributes
  var VIEW_ANGLE = 0,
      ASPECT = WIDTH / HEIGHT,
      NEAR = 0.1,
      FAR = 10000;
  
  // get the DOM element to attach to
  // - assume we've got jQuery to hand
  //var $container = $('#container');
  
  // create a WebGL renderer, camera
  // and a scene
  var renderer = new THREE.WebGLRenderer();
  var camera = new THREE.Camera(  VIEW_ANGLE,
                                  ASPECT,
                                  NEAR,
                                  FAR  );
  var scene = new THREE.Scene();
  
  // the camera starts at 0,0,0 so pull it back
  camera.position.z = 300;
  
  // start the renderer - set the clear colour
  // to a full black
  renderer.setClearColor(new THREE.Color(0, 1));
  renderer.setSize(WIDTH, HEIGHT);
  
  // attach the render-supplied DOM element
 // $container.append(renderer.domElement);
  
  // create the particle variables
  var particleCount = 1800,
      particles = new THREE.Geometry(),
    pMaterial = new THREE.ParticleBasicMaterial({
      color: 0xFFFFFF,
      size: 20,
      map: THREE.ImageUtils.loadTexture(
        "/assets/particle.png"
      ),
      blending: THREE.AdditiveBlending,
      transparent: true
    });
  
  // now create the individual particles
  for(var p = 0; p < particleCount; p++) {
  
    // create a particle with random
    // position values, -250 -> 250
    var pX = Math.random() * 500 - 250,
      pY = Math.random() * 500 - 250,
      pZ = 0,//Math.random() * 500 - 250,
        particle = new THREE.Vertex(
        new THREE.Vector3(pX, pY, pZ)
      );
    // create a velocity vector
    particle.velocity = new THREE.Vector3(
      0,        // x
      -Math.random(), // y
      0);       // z

    // add it to the geometry
    scene.add(particle);
    particles.vertices.push(particle);
  }
  
  // create the particle system
  var particleSystem = new THREE.ParticleSystem(
    particles,
    pMaterial);
  
  particleSystem.sortParticles = true;
  
  // add it to the scene
 //scene.add(particleSystem);
  
  // add a "floor" (plane) to the scene
/*	var geometry = new THREE.PlaneGeometry( 20, 2, 32 );
var material = new THREE.MeshBasicMaterial( {color: 0xffff00, side: THREE.DoubleSide} );
var plane = new THREE.Mesh( geometry, material );
scene.add( plane );
*/
document.body.appendChild(renderer.domElement);
  // animation loop
  function update() {
    
    // add some rotation to the system
   // particleSystem.rotation.y += 0.01;
    
   /* var pCount = particleCount;
    while(pCount--) {
      // get the particle
      var particle = particles.vertices[pCount];
      
      // check if we need to reset
      if(particle.position.y < -200) {
        particle.position.y = 200;
        particle.velocity.y = 0;
      }
      
      // update the velocity
      particle.velocity.y -= Math.random() * .1;
      
      // and the position
      particle.position.addSelf(
        particle.velocity);
    }
    
    // flag to the particle system that we've
    // changed its vertices. This is the
    // dirty little secret.
    particleSystem.geometry.__dirtyVertices = true;
    */
    renderer.render(scene, camera);
    
    // set up the next call
    requestAnimFrame(update);
  }
  requestAnimFrame(update);


  </script>

Source code: <a href="https://github.com/aklevy/aklevy.github.io/blob/master/assets/shaders/seaside.frag" >seaside.frag</a>
