//let camera;
let ugul=Math.PI/2;
let dX,dY;
let ground1,ground2;
let obstacles=[];
let skorost=0.05;
let cooldown=0;
function randomInteger(i){
    return Math.floor(Math.random()*i);
}
function addLight(){
 
    // Ambient light
    const l = new THREE.AmbientLight("white", 2);
    
    scene.add(l);
}
function areColliding(Ax, Ay, Awidth, Aheight, Bx, By, Bwidth, Bheight) {
    if (Bx <= Ax + Awidth) {
        if (Ax <= Bx + Bwidth) {
            if (By <= Ay + Aheight) {
                if (Ay <= By + Bheight) {
                    return 1;
                }
            }
        }
    }
    return 0;
}
function addGround(y, length) {
    // Player texture
    let ground_texture = new THREE.TextureLoader().load("./public/images/snow.png");
    ground_texture.wrapS = THREE.RepeatWrapping;
    ground_texture.wrapT = THREE.RepeatWrapping;
    ground_texture.repeat.set(20, 1);
 
    // Create player mesh
    let ground_material = new THREE.MeshPhongMaterial({color:"white", map: ground_texture});
    let ground_geometry = new THREE.BoxGeometry(30,length,2);
    let ground = new THREE.Mesh(ground_geometry, ground_material);
 
    ground.position.set(0, y, -2);
    return ground;
}
function addPlayer() {
    // Player texture
    let player_texture = new THREE.TextureLoader().load("./public/images/chad_face.png");
    player_texture.wrapS = THREE.RepeatWrapping;
    player_texture.wrapT = THREE.RepeatWrapping;
    player_texture.repeat.set(1, 1);
 
    // Create player mesh
    let player_material = new THREE.MeshPhongMaterial({color:"white", map: player_texture});
    let player_geometry = new THREE.BoxGeometry(2,2,2);
    player = new THREE.Mesh(player_geometry, player_material);
 
    player.position.set(0, 6, 0);
    player.rotation.set(Math.PI, -Math.PI, 0);
    scene.add(player);   
}
function addObstacle(x,y){
    let ob_texture=new THREE.TextureLoader().load("./public/images/cobblestone.png");
    ob_texture.wrapS=THREE.RepeatWrapping;
    ob_texture.wrapT=THREE.RepeatWrapping;
    ob_texture.repeat.set(1, 1);
    let ob_geometry=new THREE.BoxGeometry(4,2,4);
    let ob_material=new THREE.MeshPhongMaterial({color:"gray",map:ob_texture});
    let ob=new THREE.Mesh(ob_geometry,ob_material);
    ob.position.set(x,y,2);
    return ob;
}
function init() {
    //renderer.setClearColor( 0x67f2d1, 0.5);
    renderer.domElement.addEventListener("click", async () => {
        await renderer.domElement.requestPointerLock();
    });
    addPlayer();
    camera.up.set(0,0,1);
    camera.position.set(0,14,14);
    camera.lookAt(0,6,0);
    addLight();
    ground1=addGround(1000,2000);
    ground2=addGround(3000,2000);
    scene.add(ground1,ground2);
    for(let i=20;i<4000;i+=5){
        if(randomInteger(2)){
            obstacles.push(addObstacle(randomInteger(26)-13,i));
            scene.add(obstacles[obstacles.length-1]);
        }
    }
}
let bool=false;
function update(){
    if(cooldown>0){
        cooldown-=0.01;
        //console.log(cooldown);
        skorost=0.12;
    }else{
        if(!bool){
            console.log("YOUR BOOST IS READY!")
            bool=true;
        }
        skorost=0.08;
    }
    dX=-Math.cos(ugul)*skorost;
    dY=Math.sin(ugul)*skorost;
    ground1.position.x-=dX;
    ground1.position.y-=dY;
    ground2.position.x-=dX;
    ground2.position.y-=dY;
    for(let i=0;i<obstacles.length;i++){
        obstacles[i].position.y-=dY;
        obstacles[i].position.x-=dX;
        if(areColliding(player.position.y-1,player.position.x-1,2,2,obstacles[i].position.y-2,obstacles[i].position.x-obstacles[i].geometry.parameters.width/2,4,obstacles[i].geometry.parameters.width)){
            player.position.set(-1000,-5000,0);
            console.log("GAME OVER");
            while(scene.children.length > 0){ 
                scene.remove(scene.children[0]); 
            }
            renderer.setClearColor( 0x0f0d0, 0);
        }
    }
}
function keydown(e){
    if(e.keyCode==65 && ugul<Math.PI){
        ugul+=0.05;
        player.rotation.z-=0.05;
    }
    if(e.keyCode==68 && ugul>0){
        ugul-=0.05;
        player.rotation.z+=0.05;
    }
}
function keyup(e){
    if(e.keyCode==32 && cooldown<=0){
        cooldown=10;
        bool=false;
    }
}
window.addEventListener("keydown",keydown);
window.addEventListener("keyup",keyup);