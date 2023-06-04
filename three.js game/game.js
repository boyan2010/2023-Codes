

const scene=new THREE.Scene();
const camera= new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight,0.1,1000);
const renderer= new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth,window.innerHeight);
window.addEventListener("resize",function(){
    renderer.setSize(window.innerWidth,window.innerHeight);
});
document.body.appendChild(renderer.domElement);
function randomInteger(i){
    return  Math.floor(Math.random()*i);
}
function setupGameField(){
    let lab=[];
    for(let i=0;i<10;i++){
        lab[i]=[];
        for(let j=0;j<10;j++){
            lab[i][j]=randomInteger(2);
        }
    }
    const geometry=new THREE.BoxGeometry(1,1,1);
    const material=new THREE.MeshPhongMaterial({color:"green"});
    for(let i=0;i<10;i++){
        for(let j=0;j<10;j++){
            if(lab[i][j]==1){
                const cube=new THREE.Mesh(geometry,material);
                cube.position.set(i-4.5,j-4.5,0);
                scene.add(cube);
            }
        }
    }
    /*const cube = new THREE.Mesh(geometry,material);
    camera.position.z=5;
    const c2=new THREE.Mesh(geometry,material);
    const c3=new THREE.Mesh(geometry,material);
    c2.position.set(1,1,0);
    c3.position.set(-3,1,0);*/
    const ground_geometry=new THREE.BoxGeometry(10,10,1);
    const ground_material=new THREE.MeshPhongMaterial({color:"brown"});
    const ground = new THREE.Mesh(ground_geometry,ground_material);
    ground.position.set(0,0,-1);
    const ambient_light=new THREE.AmbientLight("black",5);
    ambient_light.position.set(0,2,3);
    const light1=new THREE.PointLight("white", 1);
    light1.position.set(0,2,3);
    scene.add(ground,ambient_light,light1);
}
setupGameField();
function update(){
    //cube.rotation.x+=0.01;
    //cube.rotation.y+=0.01;
    camera.position.set(5,5,5);
    camera.lookAt(0,0,0);
    camera.up.set(0,0,1);
}
function redraw(){
    requestAnimationFrame(redraw);
    renderer.render(scene,camera);

}
redraw();
setInterval(update,10);