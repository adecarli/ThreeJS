// Constantes
var WIDTH = window.innerWidth;
var HEIGHT = window.innerHeight;
var VIEW_ANGLE = 35;
var ASPECT = WIDTH / HEIGHT;
var NEAR = 1;
var FAR = 10000;
// Variáveis do sistema
var mousePressed = false;
var DISPLACEMENT = 0.15;


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

/**
 * Verifica se o clique do mouse ocorreu dentro da área da esfera, ou seja,
 * se o clique foi na superfície do objeto 3D.
 * Se foi, executa a função responsável por 'distorcer' a superfície.
 * 
 * Para esta verificação, compara as coordenadas do clique com a localização 
 * do objeto 3D.
 * 
 * @param {Evento} e Recebe como parâmetro o objeto do evento disparado
 */
 function checkIntersection(e) {
    var mouseX = e.offsetX || e.clientX;
    var mouseY = e.offsetY || e.clientY;
     
    var vector = new THREE.Vector3(
        (mouseX / window.innerWidth) * 2 - 1,
        -(mouseY / window.innerHeight) * 2 + 1,
        0.5);
    
    // é necessário este "unproject".
    // ele nos dará a direção correta do raio para detecção de colisão
    // e como estamos usando um novo projector, não afetará visualmente o projetor principal
    // este apenas nos auxilia com os cálculos
    projector.unprojectVector(vector, camera);
    // criar um raio com base na posição atual da câmera
    // assim sabemos a face que está virada para a câmera no momento
    var raycaster = new THREE.Raycaster(camera.position, vector.sub(camera.position).normalize());
    intersects = raycaster.intersectObject(sphere);
    
    // se o raio tiver intersecção com a superfície
    // executa a função para distorcer
    if (intersects.length) {
        displaceFace(intersects[0].face, DISPLACEMENT);
    }
 }