// criando a cena
var scene = new THREE.Scene();
var WIDTH = window.innerWidth;
var HEIGHT = window.innerHeight;

// criando câmera em perspectiva
// - Campo de visão (FOV)
// - Relação do aspecto (aspect ratio com o tamanho da janela)
// - Plano de recorde próximo (limite de renderização próximo)
// - Plano de recorte afastado (limite de renderização distante)
var camera = new THREE.PerspectiveCamera(75, WIDTH / HEIGHT, 0.1, 1000);

// criando objeto de renderização WebGL
var renderer = new THREE.WebGLRenderer();
renderer.setSize(WIDTH, HEIGHT);
// atribuindo ao DOM e ao body do html
document.body.appendChild(renderer.domElement);
// alterando o fundo da cena
renderer.setClearColor(0x6B8E23);

// Criando objeto 3D de um cilindro, carregando apenas a "matemática do objeto"
// - raio do topo
// - raio do fundo
// - altura
// - número de segmentos de altura
var geometry = new THREE.CylinderGeometry(5, 5, 20, 32);
// criando material do objeto, definindo exibição de wireframee
// var material = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true });
// criando textura de uma imagem
var texture = new THREE.MeshLambertMaterial({ map: THREE.ImageUtils.loadTexture("madeira1.jpg") });
// atribuindo o material ao objeto
var cylinder = new THREE.Mesh(geometry, texture);
// adicionando o objeto na cena
scene.add(cylinder);

// criando ponto de luz
var pointLight = new THREE.PointLight(0xffffff);
// definindo posição da luz
pointLight.position.x = 50;
pointLight.position.y = 100;
pointLight.position.z = 130;
// adicionando luz na cena
scene.add(pointLight);

// definindo a posição da câmera
camera.position.z = 50;
// definindo a cena e a câmera utilizada
renderer.render(scene, camera);

// função para controlar a renderização da cena
function animate() {
    // definindo a cena e acâmera utilizada
    renderer.render(scene, camera);
    
    // alterando valores dos eixos para executar algum movimento
    cylinder.rotation.z += 0.01;
    cylinder.rotation.y += 0.01;
    cylinder.rotation.x += 0.01;
    
    // executando recursivamente
    requestAnimationFrame(animate);
}
// executando a função de renderização
animate();