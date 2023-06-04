let player, player_geometry, ground1, ground2;
let skok=false;
let obstacles = [];
let curCoridor=2;
function randomInteger(i){
    return Math.floor(Math.random()*i);
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
};
function areColliding2(Ay,Aheight,By,Bheight){
    if(Ay<=By && Ay>=By-Bheight){
        return 1;
    }
    return 0;
}
function addObstacle(nomer_koridor, height, length) {
    // Трябва да добави препятствия в определения коридор
    // Височината и дължината се подават като параметри
    // Трябва това препятствия да се мърда заедно със земята (във function update)
    let ob_geometry=new THREE.BoxGeometry(length,4,height);
    let ob_material=new THREE.MeshPhongMaterial({color:"gray"});
    let ob=new THREE.Mesh(ob_geometry,ob_material);
    ob.position.set(20+randomInteger(2000),(2-nomer_koridor)*4,height/2-2);
    return ob;
}
function addGround(x, width) {
    // Player texture
    let ground_texture = new THREE.TextureLoader().load("./public/images/grass.jpg");
    ground_texture.wrapS = THREE.RepeatWrapping;
    ground_texture.wrapT = THREE.RepeatWrapping;
    ground_texture.repeat.set(20, 1);
 
    // Create player mesh
    let ground_material = new THREE.MeshPhongMaterial({color:"white", map: ground_texture});
    let ground_geometry = new THREE.BoxGeometry(width,12,2);
    let ground = new THREE.Mesh(ground_geometry, ground_material);
 
    ground.position.set(x, 0, -2);
    return ground;
}
function addLight() {
    // Point light
    const l1 = new THREE.PointLight("white", 0.4);
    l1.position.set(-1, -2, 4);
 
    // Ambient light
    const l2 = new THREE.AmbientLight("blue", 0.9);
 
    // Directional light
    const l3 = new THREE.DirectionalLight("orange", 0.7);
    l3.position.set(-4, -4, 5);
    l3.lookAt(0, 0, 0);
    
    scene.add(l1,l2,l3);
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
 
    player.position.set(8, 0, 0);
    player.rotation.set(Math.PI/2, -Math.PI/2, 0);
    scene.add(player);   
}
function init() {
    renderer.setClearColor( 0x67f2d1, 0.5);
    renderer.domElement.addEventListener("click", async () => {
        await renderer.domElement.requestPointerLock();
    });
 
    camera.up.set(0, 0, 1);
    camera.position.set(0,0,4);
    camera.lookAt(7, 0, 0);
    addLight();
    addPlayer();
    ground1 = addGround(1000, 2000);
    ground2 = addGround(3000, 2000);
    scene.add(ground1, ground2);
    for(let i=0;i<100;i++){
        obstacles.push(addObstacle(randomInteger(3)+1,randomInteger(10)+1,randomInteger(10)+1));
        scene.add(obstacles[i]);
    }
}
let t=0;
function update() {
    ground1.position.x -= 0.2;
    ground2.position.x -= 0.2;
    for(let i=0;i<obstacles.length;i++){
        obstacles[i].position.x-=0.2;
        if(/*curCoridor==2-obstacles[i].position.y/4 &&*/ areColliding(player.position.y-1,player.position.x-1,2,2,obstacles[i].position.y-2,obstacles[i].position.x-obstacles[i].geometry.parameters.width/2,4,obstacles[i].geometry.parameters.width)/* && areColliding2(player.position.x+1,2,obstacles[i].position.x+obstacles[i].geometry.parameters.width/2,obstacles[i].geometry.parameters.width)*/){
            player.position.set(-1000,5000,0);
            console.log("GAME OVER");
            curCoridor=NaN;
            while(scene.children.length > 0){ 
                scene.remove(scene.children[0]); 
            }
            renderer.setClearColor( 0x67f2d1, 0);
        }
    }
    player.position.y+=((2-curCoridor)*4-player.position.y)/25;
    camera.position.y+=((2-curCoridor)*4-camera.position.y)/25;
    if(skok){
        t+=0.02;
        if(t<Math.PI){
            player.position.z=Math.sin(t);
           // console.log(player.position.z);
        }else{
            t=0;
            skok=false;
            player.position.z=0;
        }
    }
}
function keyup(e){
    if(e.keyCode==65 && curCoridor>1){
        curCoridor--;
        //camera.position.y+=4;
    }
    if(e.keyCode==68 && curCoridor<3){
        curCoridor++;
        //camera.position.y-=4;
    }
    if(e.keyCode==32){
        if(!skok){
            skok=true;
        }
    }
}
window.addEventListener("keyup",keyup);