    // Set up the scene, camera, and renderer as global variables.
      var scene, raycaster,ray, vector, camera, renderer, mesh, mesh2, mesh3, mesh4, mesh5, containter, message;
      var particleMaterial;
      var raycaster;
      var meshObjects = [];
      var mouseX = 0, mouseY = 0;
      var targetX = 0, targetY = 0;
      var clock = new THREE.Clock();
      var windowHalfX = window.innerWidth / 2;
      var windowHalfY = window.innerHeight / 2;
      var projector, INTERSECTED;
      var sprite1;
      var canvas1, context1, texture1;
      var lighttt;
      var mouse3D2;
      var ambientLight, ambientLight2; 

container = document.createElement('div');
document.body.appendChild(container);

///////////////////////////////

    init();
    animate();

///////////////////////////////

function init() {  // Sets up the scene.
     
      scene = new THREE.Scene();
      var WIDTH = window.innerWidth,
          HEIGHT = window.innerHeight;
        
        raycaster = new THREE.Raycaster();
        projector = new THREE.Projector();
    
      // Create a renderer and add it to the DOM.
      renderer = new THREE.WebGLRenderer({antialias:true});
      renderer.setSize(WIDTH, HEIGHT);
      renderer.setClearColor(0x000000, 1);
      document.body.appendChild(renderer.domElement);
   

        camera = new THREE.PerspectiveCamera( 45, WIDTH / HEIGHT, 1, 1200 );
        camera.position.set( 0, 0, 100 );


        window.addEventListener('resize', function() {
        var WIDTH = window.innerWidth,
        HEIGHT = window.innerHeight;
        renderer.setSize(WIDTH, HEIGHT);
        camera.aspect = WIDTH / HEIGHT;
        camera.updateProjectionMatrix(); });


        var material = new THREE.MeshLambertMaterial( {ambient: 0xffffff, color: 0xCCCCCC, specular: 0xCCCCCC, shininess: 0.0} );
      
ambientLight2 = new THREE.AmbientLight( 0xFFFFCC );
scene.add( ambientLight2 );


        var loader = new THREE.JSONLoader();
        loader.load( "/models/townhouse.js", function(geometry){
        mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);
        mesh.rotation.y = 0;
        mesh.rotation.x = 0;
        mesh.position.x = 10;
        mesh.position.y = 0;
        mesh.position.z = -10;  
        mesh.scale.set( 10, 10, 10 );
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        mesh.name = "townhouse";
        mesh.updateMatrix();
        meshObjects.push(mesh);
        console.log(mesh);
      })





     var material2 = new THREE.MeshLambertMaterial( { ambient: 0xffffff, color: 0xCCCCCC, specular: 0xCCCCCC, shininess: 0.0} );
      

        var loader = new THREE.JSONLoader();
        loader.load( "/models/police.js", function(geometry){
        mesh2 = new THREE.Mesh(geometry, material2);
        scene.add(mesh2);
        mesh2.rotation.y = 0;
        mesh2.rotation.x = 0;
        mesh2.position.x = -20;
        mesh2.position.y = 0;
        mesh2.position.z = -20;  
        mesh2.scale.set( 5, 5,5 );
        mesh2.castShadow = true;
        mesh2.receiveShadow = true;
        mesh2.name = "police";
        mesh2.updateMatrix();
        meshObjects.push(mesh2);
        console.log(mesh2);
      })




     var material3 = new THREE.MeshPhongMaterial( { ambient: 0xffffff, color: 0xCCCCCC, specular: 0xCCCCCC, shininess: 0.0} );
      

        var loader = new THREE.JSONLoader();
        loader.load( "/models/police.js", function(geometry){
        mesh3 = new THREE.Mesh(geometry, material3);
        scene.add(mesh3);
        mesh3.rotation.y = 0;
        mesh3.rotation.x = 0;
        mesh3.position.x = -60;
        mesh3.position.y = 0;
        mesh3.position.z = -40;  
        mesh3.scale.set( 5, 5,5 );
        mesh3.castShadow = true;
        mesh3.receiveShadow = true;
        mesh3.name = "house";
        mesh3.updateMatrix();
        meshObjects.push(mesh3);
        console.log(mesh3);
      })




///change this one..


  canvas1 = document.createElement('canvas');
  context1 = canvas1.getContext('2d');
  context1.font = "Bold 14px Arial";
  context1.fillStyle = "rgba(0,0,0,0.95)";
  context1.fillText(message, 40, 20);
  // canvas contents will be used for a texture
  texture1 = new THREE.Texture(canvas1) 
  texture1.needsUpdate = true;
  
  var spriteMaterial = new THREE.SpriteMaterial( { map: texture1, useScreenCoordinates: true, alignment: THREE.SpriteAlignment.topLeft } );
  
  sprite1 = new THREE.Sprite( spriteMaterial );
  sprite1.scale.set(200,100,1.0);
  sprite1.position.set( 50, 50, 0 );
 scene.add( sprite1 ); 

// document.addEventListener( 'mousemove', onDocumentMouseMove, false );
// document.addEventListener( 'mousedown', onDocumentMouseDown, false );  

  lighttt = new THREE.SpotLight( 0xffffff,3,100);
  lighttt.position.set( 0, 40, 0 );
 lighttt.angle = 65;


       ambientLight = new THREE.AmbientLight( 0xCCCCCC);
       
       ambientLight.position.set(0,100,100);
       scene.add( ambientLight);
      // console.log(ambientLight);
  
    scene.add(lighttt);
   
    // CONTROLS

    window.controls = new THREE.PointerLockControls( camera );
    window.controls.enabled = true;
    scene.add( window.controls.getObject() );

    // window.controls = new THREE.FirstPersonControls( camera, $('canvas')[0] );

}

//////// this works well - the color of the mesh changes and we log a point in space
function onDocumentMouseDown( event ) {

  event.preventDefault();
  handleMoustEvent(event,'click');

}



function update (){
}

///move camera with mouseMove


function onDocumentMouseMove(event) {
  event.preventDefault();
  handleMoustEvent(event,'hover');
}

// function to handle a mouse click or hover
// takes the mouse event and an action... action can be 'click' or 'hover'

function handleMoustEvent(event,action){

  var currentAction = action; // will be 'click' or 'hover'

  mouseX = ( event.clientX - windowHalfX ) * 2 - 1;
  mouseY = ( event.clientY - windowHalfY ) * 2 + 1; 


// mouseX = event.clientX;
// mouseY = event.clientY;
 var mouse3D2 = new THREE.Vector3( ( event.clientX / window.innerWidth ) * 2 - 1,  -( event.clientY / window.innerHeight ) * 2 + 1, 0.5 );                                            //z
 
  var raycaster = projector.pickingRay( mouse3D2.clone(), camera );
  var intersects = raycaster.intersectObjects( meshObjects );

  // if not currently over an object
  if(!intersects.length) {
    // here we need to remove the rectangle (i.e. context1)
        for(var i=0; i<meshObjects.length;i++){
          // meshObjects[i].material.color.setHex(0xCCCCCC);
          // intersects[ 0 ].object.material.color.setHex( );
 
        }    
      }
  // Detect intersection
  if ( intersects.length > 0 ) {
  // intersects[ 0 ].object.material.ambient.setHex(0xFFFF00);
 // intersects[ 0 ].object.material.color.setHex(0xCCCCCC);

  if ( intersects[ 0 ].object.name ) {
    //console.log( intersects[ 0 ].object.name); /// which object did we intersect?
    if(currentAction == 'hover'){
        context1.clearRect(0,0,640,480);        
        var message = intersects[ 0 ].object.name;
        var metrics = context1.measureText(message);
        var width = metrics.width;
        context1.fillStyle = "rgba(0,0,0,0)"; // black border
        context1.fillRect( 0,0, width+8,20+8);
        context1.fillStyle = "rgba(0,0,0,0.95)"; // white filler
        context1.fillRect ( 2,10, width+4,20+4 );
        context1.fillStyle = "rgba(255,255,255,1)"; // text color
        context1.fillText( message, 4,20 );
        texture1.needsUpdate = true;
      }
      else if(currentAction == 'click'){
          intersects[ 0 ].object.material.color.setHex(0xFF0000);


 
      }
    }
   projector.unprojectVector( mouse3D2, camera );
   mouse3D2.sub( camera.position);                
   mouse3D2.normalize();
   var raycaster = new THREE.Raycaster( camera.position, mouse3D2 );
   sprite1.position.set( event.clientX, event.clientY - 60, 60,10 );
}
}


function animate() {
    requestAnimationFrame(animate);
    // generateGround();
    // controls.update(clock.getDelta())
    window.controls.update();
    // stats.update();
    update();
    render();
    targetX = mouseX * .001;
    targetY = mouseY * .001;
    
   //animate the light!

  lighttt.position.set (0,0,0);
  lighttt.shadowCameraVisible = true;
  lighttt.angle = 45;
  lighttt.target.position.x = (mouseX - lighttt.position.x ) * 0.00019;
  lighttt.target.position.y = (mouseY - lighttt.position.y ) * 0.00019;

  // camera.position.y += (mouseY - camera.position.y ) * -0.00000007;

    } 


function applyColor( geo, h, s, v ) {

        for ( var j = 0, jl = geo.faces.length; j < jl; j ++ ) {

          geo.faces[ j ].color.setHSV( h, s, v );

        }
}
function render() {
renderer.render( scene, camera); 
    
   }

function onWindowResize( event ) {
        SCREEN_WIDTH = window.innerWidth;
        SCREEN_HEIGHT = window.innerHeight;
        renderer.setSize( SCREEN_WIDTH, SCREEN_HEIGHT );
        camera.aspect = SCREEN_WIDTH / SCREEN_HEIGHT;
        camera.updateProjectionMatrix();
      }
