// import { Scene, PerspectiveCamera, WebGLRenderer, BoxGeometry, Mesh, MeshBasicMaterial, LineBasicMaterial, Geometry, Line, Vector3 } from 'three';

// var scene = new Scene();
// // var camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// var camera = new PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 500);
// camera.position.set(0, 0, 100);
// camera.lookAt(0, 0, 0)

// var renderer = new WebGLRenderer();
// renderer.setSize(window.innerWidth, window.innerHeight);
// document.body.appendChild(renderer.domElement);

// // var geometry = new BoxGeometry(1, 1, 1);
// // var material = new MeshBasicMaterial({ color: 0x00ff00 });
// // var cube = new Mesh(geometry, material);
// // scene.add(cube);

// //create a blue LineBasicMaterial
// var material = new LineBasicMaterial({ color: 0x0000ff });

// var geometry = new Geometry();
// geometry.vertices.push(new Vector3(-10, 0, 0));
// geometry.vertices.push(new Vector3(0, 10, 0));
// geometry.vertices.push(new Vector3(10, 0, 0));
// var line = new Line(geometry, material);
// scene.add(line)

// // camera.position.z = 5;

// function animate() {
//     requestAnimationFrame(animate);

//     // cube.rotation.x += 0.01;
//     // cube.rotation.y += 0.01;
//     renderer.render(scene, camera);
// }
// animate();