import "./styles.css";
import * as THREE from "three";

let scene = new THREE.Scene();
scene.background = new THREE.Color(0xdfdfdf);

let playerCar = Car();
scene.add(playerCar);

//setting lights
let ambientLight = new THREE.AmbientLight(0xffffff, 0.6); //setting color and intensity of light
scene.add(ambientLight);

let dirLight = new THREE.DirectionalLight(0xffffff, 0.6); //setting color and intensity of light
dirLight.position.set(100, -300, 400); // x,y,x determine the direction the light is shining
scene.add(dirLight);

//setting camera - using Orthographic so all objects appear the same distance

let aspectRatio = window.innerWidth / window.innerHeight;
let cameraWidth = 150;
let cameraHeight = cameraWidth / aspectRatio;

let camera = new THREE.OrthographicCamera(
  cameraWidth / -2, //left
  cameraWidth / 2, // right
  cameraHeight / 2, // top
  cameraHeight / -2, //bottom
  0, // near plane
  1000 // far plane
);
camera.position.set(200, -200, 10); //sets camera position along x,y,z axis
camera.up.set(0, 0, 1); // Z axis points upwards
camera.lookAt(0, 0, 0); //camera looks towards 0,0,0 co-ordinates

//setting renderer
let renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.render(scene, camera);
document.body.appendChild(renderer.domElement); //adds render to HTML

function Car() {
  let car = new THREE.Group();

  let backWheel = Wheel(); //calling the wheel function and assigning it as the backwheel
  backWheel.position.x = -18; //position set at the back of the car.
  car.add(backWheel);

  let frontWheel = Wheel(); //calling the wheel function ad assigning it as the front wheel
  frontWheel.position.x = 18; //position set at the front of the car
  car.add(frontWheel);

  let main = new THREE.Mesh(
    new THREE.BoxBufferGeometry(60, 30, 15), //the body of the car
    new THREE.MeshLambertMaterial({ color: 0x00ca96 }) //set color to a blue
  );
  main.position.z = 12;
  car.add(main);

  let carFrontTexture = getCarFrontTexture();
  carFrontTexture.center = new THREE.Vector2(0.5, 0.5);
  carFrontTexture.rotation = Math.PI / 2;

  let carBackTexture = getCarFrontTexture();
  carFrontTexture.center = new THREE.Vector2(0.5, 0.5);
  carFrontTexture.rotation = Math.PI / 2;

  let carRightSideTexture = getCarSideTexture();

  let carLeftSideTexture = getCarSideTexture();
  carLeftSideTexture.flipY = false;

  let cabin = new THREE.Mesh(new THREE.BoxBufferGeometry(33, 24, 12), [
    new THREE.MeshLambertMaterial({ map: carFrontTexture }),
    new THREE.MeshLambertMaterial({ map: carBackTexture }),
    new THREE.MeshLambertMaterial({ map: carLeftSideTexture }),
    new THREE.MeshLambertMaterial({ map: carRightSideTexture }),
    new THREE.MeshLambertMaterial({ color: 0xffffff }),
    new THREE.MeshLambertMaterial({ color: 0xffffff })
  ]);
  cabin.position.x = -6;
  cabin.position.z = 25.5;
  car.add(cabin);
  return car;
}

function Wheel() {
  //creating a function for the wheels to save time
  let wheel = new THREE.Mesh(
    new THREE.BoxBufferGeometry(12, 33, 12), //wheels are made form simple rectangles, as the user will not see under the car
    new THREE.MeshLambertMaterial({ color: 0x333333 }) //assigning the rectangle a dark grey color
  );
  wheel.position.z = 6; //defining the wheel position
  return wheel;
}

function getCarFrontTexture() {
  let canvas = document.createElement("canvas");
  canvas.width = 64;
  canvas.height = 32;
  let context = canvas.getContext("2d");

  context.fillStyle = "#ffffff";
  context.fillRect(0, 0, 64, 32);

  context.fillStyle = "#666666";
  context.fillRect(8, 8, 48, 24);

  return new THREE.CanvasTexture(canvas);
}

function getCarSideTexture() {
  let canvas = document.createElement("canvas");
  canvas.width = 128;
  canvas.height = 32;
  let context = canvas.getContext("2d");

  context.fillStyle = "#ffffff";
  context.fillRect(0, 0, 128, 32);

  context.fillStyle = "#666666";
  context.fillRect(10, 8, 38, 24);
  context.fillRect(58, 8, 60, 24);

  return new THREE.CanvasTexture(canvas);
}
