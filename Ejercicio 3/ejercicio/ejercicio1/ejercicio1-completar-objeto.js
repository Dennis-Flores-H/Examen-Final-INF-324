// primer ejercicio con three.js
// crear una geometria teniendo en cuenta el orden de los vértices
var camera, scene, renderer;
var cameraControls;
var clock = new THREE.Clock();
var ambientLight, light;

function init() {
    var canvasWidth = window.innerWidth * 0.9;
    var canvasHeight = window.innerHeight * 0.9;

    // CAMERA
    camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 80000 );
    camera.position.set(1, 1, 3);  // Ajustamos la posición de la cámara
    camera.lookAt(0, 0, 0);

    // LIGHTS
    light = new THREE.DirectionalLight( 0xFFFFFF, 0.7 );
    light.position.set( 1, 1, 1 );
    light.target.position.set(0, 0, 0);
    light.target.updateMatrixWorld()

    var ambientLight = new THREE.AmbientLight( 0x111111 );

    // RENDERER
    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setSize( canvasWidth, canvasHeight );
    renderer.setClearColor(0xFFFFFF, 1.0);  // Fondo blanco para mejorar la visibilidad

    renderer.gammaInput = true;
    renderer.gammaOutput = true;

    // Add to DOM
    var container = document.getElementById('container');
    container.appendChild( renderer.domElement );

    // CONTROLS
    cameraControls = new THREE.OrbitControls( camera, renderer.domElement );
    cameraControls.target.set(0, 0, 0);

    // OBJECT
    var migeometria = new THREE.Geometry();
    migeometria.vertices.push( new THREE.Vector3( 0.0, 0.0, 0.0 ) );   // Vértice 1
    migeometria.vertices.push( new THREE.Vector3( 0.3, 0.0, 0.0 ) );   // Vértice 2
    migeometria.vertices.push( new THREE.Vector3( 0.3, 0.3, 0.0 ) );   // Vértice 3
    migeometria.vertices.push( new THREE.Vector3( 0.0, 0.3, 0.0 ) );   // Vértice 4
    migeometria.vertices.push( new THREE.Vector3( 0.0, 0.0, -0.3 ) );  // Vértice 5
    migeometria.vertices.push( new THREE.Vector3( 0.3, 0.0, -0.3 ) );  // Vértice 6
    migeometria.vertices.push( new THREE.Vector3( 0.3, 0.3, -0.3 ) );  // Vértice 7
    migeometria.vertices.push( new THREE.Vector3( 0.0, 0.3, -0.3 ) );  // Vértice 8

    // Cara frontal (z = 0.0)
    migeometria.faces.push(new THREE.Face3(0, 1, 2));  // Triángulo 1
    migeometria.faces.push(new THREE.Face3(0, 2, 3));  // Triángulo 2

    // Cara trasera (z = -0.3)
    migeometria.faces.push(new THREE.Face3(4, 5, 6));  // Triángulo 3
    migeometria.faces.push(new THREE.Face3(4, 6, 7));  // Triángulo 4

    // Cara derecha (x = 0.3)
    migeometria.faces.push(new THREE.Face3(1, 5, 6));  // Triángulo 5
    migeometria.faces.push(new THREE.Face3(1, 6, 2));  // Triángulo 6

    // Cara izquierda (x = 0.0)
    migeometria.faces.push(new THREE.Face3(0, 3, 7));  // Triángulo 7
    migeometria.faces.push(new THREE.Face3(0, 7, 4));  // Triángulo 8

    // Cara superior (y = 0.3)
    migeometria.faces.push(new THREE.Face3(2, 3, 7));  // Triángulo 9
    migeometria.faces.push(new THREE.Face3(2, 7, 6));  // Triángulo 10

    // Cara inferior (y = 0.0)
    migeometria.faces.push(new THREE.Face3(0, 1, 5));  // Triángulo 11
    migeometria.faces.push(new THREE.Face3(0, 5, 4));  // Triángulo 12

    var material = new THREE.MeshBasicMaterial({ color: 0x0000FF, side: THREE.DoubleSide });  // Doble cara
    var miobjeto = new THREE.Mesh(migeometria, material); // Crea el objeto

    // SCENE
    scene = new THREE.Scene();
    scene.add(light);
    scene.add(ambientLight);
    scene.add(miobjeto);
}

function animate() {
    window.requestAnimationFrame( animate );
    render();
}

function render() {
    var delta = clock.getDelta();
    cameraControls.update(delta);
    renderer.render( scene, camera );
}

try {
    init();
    animate();
} catch(e) {
    var errorReport = "Your program encountered an unrecoverable error, can not draw on canvas. Error was:<br/><br/>";
    $('#container').append(errorReport + e);
}
