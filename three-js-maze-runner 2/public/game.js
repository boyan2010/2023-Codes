let ground;
let coin_geom,coin_mat,coin,coins=[];
let nag=true;
let maze;
let igrach_geom,igrach_mat,igrach,igrach_ugul=0;
let c_texture;
function randomInteger(i){
    return Math.floor(Math.random()*i);
}
function coinSpawn(){
    for(let i = 0; i < maze.length; i++) {
        coins[i]=[];
        for(let j = 0; j < maze[i].length; j++) {
            if (maze[i][j]==2){
                coins[i][j]=new THREE.Mesh(coin_geom,coin_mat);
                coins[i][j].position.set(i - maze.length / 2 + 0.5,j - maze.length / 2 + 0.5, 1);
                scene.add(coins[i][j]);
            }
        }
    }
}
function init() {
   // Adjust camera
    camera.position.set(-5,-5,3);
    camera.lookAt(0, 0, 0);
    camera.up.set(0, 1, 0);
    // We will use the same geometry for all boxes
    // Meshes can be scaled to change size
    const box_geom = new THREE.BoxGeometry( 1, 1, 1 );
    
    // Grass texture
    const grass_texture = new THREE.TextureLoader().load("./public/images/grass.jpg");
    grass_texture.wrapS = THREE.RepeatWrapping;
    grass_texture.wrapT = THREE.RepeatWrapping;
    grass_texture.repeat.set(3, 3);
    c_texture = new THREE.TextureLoader().load("./public/images/chad.jpg");
    c_texture.wrapS = THREE.RepeatWrapping;
    c_texture.wrapT = THREE.RepeatWrapping;
    c_texture.repeat.set(3, 3);

    // Iron wall texture
    const iron_texture = new THREE.TextureLoader().load("./public/images/iron.jpg");
    iron_texture.wrapS = THREE.RepeatWrapping;
    iron_texture.wrapT = THREE.RepeatWrapping;
    iron_texture.repeat.set(1, 1);

    const grass_mat = new THREE.MeshPhongMaterial({ color: "white", map: grass_texture});

    // Create ground
    ground = new THREE.Mesh(box_geom, grass_mat);
    ground.scale.set(10, 10, 1);

    maze = [
        [1, 1, 1, 0, 1],
        [1, 1, 1, 0, 1],
        [1, 0, 0, 0, 1],
        [1, 0, 1, 1, 1],
        [1, 0, 1, 0, 1],
        [1, 0, 0, 0, 1],
        [1, 0, 1, 1, 1],
        [0, 0, 1, 1, 1],

    ]
    let maze_walls = [];
    let maze_wall_material = new THREE.MeshPhongMaterial({color: "white", map: iron_texture});
    for(let i = 0; i < maze.length; i++) {
        maze_walls[i] = [];
        for(let j = 0; j < maze[i].length; j++) {
            if (maze[i][j]) {
                maze_walls[i][j] = new THREE.Mesh(box_geom, maze_wall_material);
                maze_walls[i][j].position.set(i - maze.length / 2 + 0.5, j - maze.length / 2 + 0.5, 1);
                scene.add(maze_walls[i][j]);
            }else{
                let r=randomInteger(2);
                if(r){
                    maze[i][j]=2;
                }
            }
        }
    }
    // Point light
    const l1 = new THREE.PointLight("white", 0.4);
    l1.position.set(-1, -2, 4);

    // Ambient light
    const l2 = new THREE.AmbientLight("white", 0.7);

    // Directional light
    const l3 = new THREE.DirectionalLight("orange", 0.7);
    l3.position.set(-4, -4, 5);
    l3.lookAt(0, 0, 0);
    coin_geom=new THREE.CylinderGeometry(0.5,0.5,0.2,8,1,false,0,2*Math.PI);
    coin_mat=new THREE.MeshPhongMaterial({color:"white",map:iron_texture});
    for(let i = 0; i < maze.length; i++) {
        coins[i]=[];
        for(let j = 0; j < maze[i].length; j++) {
            if (maze[i][j]==2){
                coins[i][j]=new THREE.Mesh(coin_geom,coin_mat);
                coins[i][j].position.set(i - maze.length / 2 + 0.5,j - maze.length / 2 + 0.5, 1);
                scene.add(coins[i][j]);
            }
        }
    }
    //coinSpawn();
    // Add all objects to scene
    scene.add(l1, l2, l3, ground);
    igrach_geom=geometryType(3);
    igrach_mat=new THREE.MeshPhongMaterial({color:"white",map:c_texture});
    igrach=new THREE.Mesh(igrach_geom,igrach_mat);
    igrach.position.set(-3.5,-0.5,1);
    scene.add(igrach);
}
function geometryType(id){
    switch(id){
        case 0:
            return new THREE.BoxGeometry(1,1,5);
        case 1:
            return new THREE.CylinderGeometry(1,3,2,30);
        case 2:
            return new THREE.SphereGeometry(1,10,10,0,Math.PI);
        case 3:
            return new THREE.DodecahedronGeometry(0.5,0);
        case 4:
            return new THREE.TorusKnotGeometry(4.313,0.1,168,6,3,4);
        default:
            return new THREE.BoxGeometry(1,1,1);
    }
}
function addBasicGeometryShape(id){
    const basicGeom=geometryType(id);
    const basicMat=new THREE.MeshPhongMaterial({color:"white"});
    const shape=new THREE.Mesh(basicGeom,basicMat);
    shape.position.set(0,0,3);
    scene.add(shape)
}
let t=0;
function update() {
    t+=0.1;
   // controls.update();
    //console.log(coins.length);
    for(let i=0;i<maze.length;i++){
        //console.log(coins[i]);
        for(let j=0;j<maze[i].length;j++){
            if(maze[i][j]==2){
                coins[i][j].rotation.z+=0.01;
                coins[i][j].position.z+=Math.sin(t)/30;
            }
        }
    }
   // coin.rotation.z+=0.05;
    //coin.position.z+=Math.sin(t)/20;
    /*if(nag){
        coin.position.z+=0.025;
    }else{
        coin.position.z-=0.025;
    }
    if(nag && coin.position.z>2){
        nag=false;
    }
    if(!nag && coin.position.z<1){
        nag=true;
    }*/
    // cube.rotation.x += 0.01;
    // cube.rotation.y += 0.01;
}
function onKeyUp(e){
    if(e.keyCode>47 && e.keyCode<57){
        camera.position.set(e.keyCode-49,2,3)
    }
    if(e.keyCode==50){
        camera.position.set(0,0,10);
    }
    camera.up.set(0,0,1);
    camera.lookAt(0,0,1);
}
function onKeyDown(e){
    if(e.keyCode==87){
        igrach.position.x+=Math.cos(igrach_ugul)/10;
        igrach.position.y+=Math.sin(igrach_ugul)/10;
    }
    if(e.keyCode==65){
        igrach_ugul-=0.1;
        igrach.rotation.z=igrach_ugul;
    }
    if(e.keyCode==83){
        igrach.position.x-=Math.cos(igrach_ugul)/10;
        igrach.position.y-=Math.sin(igrach_ugul)/10;
    }
    if(e.keyCode==68){
        igrach_ugul+=0.1;
        igrach.rotation.z=igrach_ugul;
    }
}
window.addEventListener("keyup",onKeyUp);
window.addEventListener("keydown",onKeyDown)