// Basic Three.js setup
let scene, camera, renderer;
let heartMesh;

// Function to create a full heart shape
function createHeartShape() {
  const heartShape = new THREE.Shape();
  
  // Define the heart shape using a parametric function
  const x = (t) => 16 * Math.pow(Math.sin(t), 3);
  const y = (t) => 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t);
  
  const points = [];
  for (let t = 0; t <= 2 * Math.PI; t += 0.1) {
    points.push(new THREE.Vector2(x(t), y(t)));
  }
  
  heartShape.setFromPoints(points);

  const geometry = new THREE.ShapeGeometry(heartShape);
  const material = new THREE.MeshLambertMaterial({ color: 0xe91e63 });
  heartMesh = new THREE.Mesh(geometry, material);
  heartMesh.scale.set(0, 0, 0); // Start small for blooming animation
  scene.add(heartMesh);
}

// Initialize the scene, camera, and renderer
function init() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 5;

  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  // Lighting
  const light = new THREE.PointLight(0xffffff, 1, 100);
  light.position.set(10, 10, 10);
  scene.add(light);

  // Create the heart shape
  createHeartShape();

  // Render loop
  animate();
}

// Bloom⬤