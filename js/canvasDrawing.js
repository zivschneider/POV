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
   

ambientLight = new THREE.AmbientLight( 0x444444 );
scene.add( ambientLight );

      camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 1000);
      camera.position.set(0,0,100);
      scene.add(camera);

        window.addEventListener('resize', function() {
        var WIDTH = window.innerWidth,
        HEIGHT = window.innerHeight;
        renderer.setSize(WIDTH, HEIGHT);
        camera.aspect = WIDTH / HEIGHT;
        camera.updateProjectionMatrix(); });

        ambientLight = new THREE.AmbientLight( 0x404040);
        scene.add( ambientLight );
     

        // var mapHeight = THREE.ImageUtils.loadTexture( "/models/younghispanicwoman.jpg");
        // mapHeight.anisotropy = 0.1;
        // mapHeight.repeat.set( 1, 1 );
        // mapHeight.offset.set( 0.001, 0.04 );
        // mapHeight.wrapS = mapHeight.wrapT = THREE.RepeatWrapping;
        // mapHeight.format = THREE.RGBFormat;
        var material = new THREE.MeshPhongMaterial( { ambient: 0x000000, color: 0x000000, specular: 0xCCCCCC, shininess: 0.1} );
      


        var loader = new THREE.JSONLoader();
        loader.load( "/models/townhouse.js", function(geometry){
        mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);
        mesh.rotation.y = 200;
        mesh.rotation.x = 0;
        mesh.position.x = 0;
        mesh.position.y = 0;
        mesh.position.z = -10;  
        mesh.scale.set( 10, 10, 10 );
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        mesh.name = "Jane Doe";
        mesh.updateMatrix();
        meshObjects.push(mesh);
        console.log(mesh);
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
//  scene.add( sprite1 ); 

document.addEventListener( 'mousemove', onDocumentMouseMove, false );
document.addEventListener( 'mousedown', onDocumentMouseDown, false );  

  lighttt = new THREE.SpotLight( 0xffffff,3,100);
  lighttt.position.set( 0, 40, 0 );
  
  // lighttt.angle = 45;


  scene.add(lighttt);


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

  // var mouse3D2 = new THREE.Vector3( ( event.clientX / window.innerWidth ) * 2 - 1,  -( event.clientY / window.innerHeight ) * 2 + 1, 0.5 );                                            //z
 var mouse3D2 = new THREE.Vector3( ( event.clientX / window.innerWidth ) * 2 - 1,  -( event.clientY / window.innerHeight ) * 2 + 1, 0.5 );                                            //z
 
  var raycaster = projector.pickingRay( mouse3D2.clone(), camera );
  var intersects = raycaster.intersectObjects( meshObjects );

  // if not currently over an object
  if(!intersects.length) {
    // here we need to remove the rectangle (i.e. context1)
        for(var i=0; i<meshObjects.length;i++){
          meshObjects[i].material.color.setHex(0xCCCCCC);
           // intersects[ 0 ].object.material.color.setHex( );
 
        }    
      }
  // Detect intersection
  if ( intersects.length > 0 ) {
  // intersects[ 0 ].object.material.ambient.setHex(0xFFFF00);
         intersects[ 0 ].object.material.color.setHex(0xCCCCCC);

  if ( intersects[ 0 ].object.name ) {
    //console.log( intersects[ 0 ].object.name); /// which object did we intersect?
    if(currentAction == 'hover'){
        context1.clearRect(0,0,640,480);        
        var message = intersects[ 0 ].object.name;
        var metrics = context1.measureText(message);
        var width = metrics.width;
        // context1.fillStyle = "rgba(0,0,0,0)"; // black border
        // context1.fillRect( 0,0, width+8,20+8);
        // context1.fillStyle = "rgba(0,0,0,0.95)"; // white filler
        // context1.fillRect ( 2,10, width+4,20+4 );
        // context1.fillStyle = "rgba(255,255,255,1)"; // text color
        // context1.fillText( message, 4,20 );
        // texture1.needsUpdate = true;
      }
      else if(currentAction == 'click'){
        //alert('the current person is ' + intersects[ 0 ].object.name);
       setUpHtml(intersects[ 0 ].object.name);

 
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
    update();
    // stats.update();
    render();
    targetX = mouseX * .001;
    targetY = mouseY * .001;
    
    var delta = clock.getDelta();
    var r = clock.getElapsedTime();
   //animate the light!

  lighttt.position.set (0,0,0);
  lighttt.shadowCameraVisible = true;
  lighttt.angle = 45;
  lighttt.target.position.x = (mouseX - lighttt.position.x ) * 0.00019;
  lighttt.target.position.y = (mouseY - lighttt.position.y ) * 0.00019;
  camera.position.y += (mouseY - camera.position.y ) * -0.00000007;

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