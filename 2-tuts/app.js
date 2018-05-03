// Constantes
var WIDTH = window.innerWidth;
var HEIGHT = window.innerHeight;
var VIEW_ANGLE = 35;
var ASPECT = WIDTH / HEIGHT;
var NEAR = 1;
var FAR = 10000;


// criando a cena, a câmera e o renderizador WebGL
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(VIEW_ANGLE,ASPECT, NEAR, FAR);
var renderer = new THREE.WebGLRenderer();

renderer.setSize(WIDTH, HEIGHT);
document.body.appendChild(renderer.domElement);

scene.add(camera);

camera.position.z = 300;

// Variáveis da esfera
var radius = 50;
var segments = 16;
var rings = 16;

var sphereMaterial = new THREE.MeshBasicMaterial({ color: 0xFFFFFF, wireframe: true});
var sphere = new THREE.Mesh(
    new THREE.SphereGeometry (radius, segments, rings), 
    sphereMaterial
);
scene.add(sphere);


function animate() {
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}
// executando a função de renderização
animate();

/**
 * Escutando os eventos do mouse e da janela.
 * Eventos de clicar, soltar e mover o mouse
 * E também o evento de redimensionar a janela
*/
function bindCallbacks() {
    // criando um objeto com todos os callbacks
    var callbacks = {
        onResize: function() {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        },
        onMouseDown: function(e) {
            mousePressed = true;
            checkIntersection(e);
        },
        onMouseMove: function(e) {
            if (mousePressed) {
                checkIntersection(e);
            }
        },
        onMouseUp: function() {
            mousePressed = false;
        },
        onSelectStart: function() {
            return false;
        }
    };
    window.addEventListener('resize', callbacks.onResize, false);
    window.addEventListener('mousedown', callbacks.onMouseDown, false);
    window.addEventListener('mousemove', callbacks.onMouseMove, false);
    window.addEventListener('mouseup', callbacks.onMouseUp, false);
    renderer.domElement.addEventListener('selectstart', callbacks.onSelectStart, false);
}

bindCallbacks();