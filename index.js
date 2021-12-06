import * as THREE from './js/build/three.module.js';
import {GLTFLoader} from './js/examples/jsm/loaders/GLTFLoader.js'
import { VRButton } from './js/examples/jsm/webxr/VRButton.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );



const renderer = new THREE.WebGLRenderer( { antialias: true } );
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.outputEncoding = THREE.sRGBEncoding;
renderer.xr.enabled = true;
document.body.appendChild( renderer.domElement );

document.body.appendChild(VRButton.createButton(renderer));

window.addEventListener(  'resize', onWindowResize );


const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );


const light = new THREE.HemisphereLight( 0xffffbb, 0x080820, 1 );
scene.add( light );

const loader = new GLTFLoader();

loader.load( './models/scene.gltf', 
 ( gltf ) => {

  scene.add( gltf.scene );
},
// called while loading is progressing
( xhr ) => {

  console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

},
// called when loading has errors
( error ) => {

  console.log( 'An error happened' );

});

camera.position.z = 20;
camera.position.y = 16;
camera.rotation.x = -0.3;

function onWindowResize() {

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize( window.innerWidth, window.innerHeight );
}

function animate() {
  //cube.rotation.x += 0.01;
  //cube.rotation.y += 0.01;
	// requestAnimationFrame( animate );
	// renderer.render( scene, camera );

  renderer.setAnimationLoop( render );
}

function render() {
  renderer.render(scene, camera);
}
animate();