function randomFloat(a){
    return (Math.random()*a);
}
let z_grid=[];
let n=50,m=50;
let mesh;
function init() {
    /*renderer.domElement.addEventListener("click", async () => {
        await renderer.domElement.requestPointerLock();
    });*/
    camera.position.set(3,3,3);
    camera.lookAt(0,0,0);
    const geometry=new THREE.BufferGeometry();
    for(let j=0;j<n;j++){
        z_grid[j]=[];
        for(let i=0;i<m;i++){
            z_grid[j][i]=Math.sin(j/5)*Math.cos(i/5)*5;
        }
    }
    let coordinates=[
        -1.0, -1.0,  z_grid[0][0],
         1.0, -1.0,  z_grid[0][1],
         1.0,  1.0,  z_grid[1][1],
    
        1.0,  1.0,  z_grid[1][1],
        -1.0,  1.0,  z_grid[1][0],
        -1.0, -1.0,  z_grid[0][0]

      /*  1, -1.0, 1.0,
        3,-1.0,1.0,
        3,1.0,1.0,

        3,  1.0,  1.0,
        1,  1.0,  1.0,
        1, -1.0,  1.0,*/

    ];
    for(let j=0;j<n-1;j++){
        for(let i=0;i<m-1;i++){
            if(i!=0 || j!=0){
                coordinates.push(coordinates[0]+i*2);
                coordinates.push(coordinates[1]+j*2);
                coordinates.push(z_grid[j][i])
                coordinates.push(coordinates[3]+i*2);
                coordinates.push(coordinates[4]+j*2);
                coordinates.push(z_grid[j][i+1])
                coordinates.push(coordinates[6]+i*2);
                coordinates.push(coordinates[7]+j*2);
                coordinates.push(z_grid[j+1][i+1])
                coordinates.push(coordinates[9]+i*2);
                coordinates.push(coordinates[10]+j*2);
                coordinates.push(z_grid[j+1][i+1])
                coordinates.push(coordinates[12]+i*2);
                coordinates.push(coordinates[13]+j*2);
                coordinates.push(z_grid[j+1][i])
                coordinates.push(coordinates[15]+i*2);
                coordinates.push(coordinates[16]+j*2);
                coordinates.push(z_grid[j][i])
            }
        }
    }
    const vertices = new Float32Array(coordinates);
    geometry.setAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );
    const material = new THREE.MeshBasicMaterial( { color: 0xff0000,wireframe:false } );
    mesh = new THREE.Mesh( geometry, material );  
    const l1=new THREE.PointLight("white",0.8);
    l1.position.set(5,3,3);
    scene.add(l1,mesh);   
}
let t=0;
function update() {
    t+=0.02;
    const geometry=new THREE.BufferGeometry();
    for(let j=0;j<n;j++){
        for(let i=0;i<m;i++){
            z_grid[j][i]=Math.sin((j+t)/5)*Math.cos((i+t)/5)*5
        }
    }
    coordinates=[
        -1.0, -1.0,  z_grid[0][0],
         1.0, -1.0,  z_grid[0][1],
         1.0,  1.0,  z_grid[1][1],
    
        1.0,  1.0,  z_grid[1][1],
        -1.0,  1.0,  z_grid[1][0],
        -1.0, -1.0,  z_grid[0][0]

      /*  1, -1.0, 1.0,
        3,-1.0,1.0,
        3,1.0,1.0,

        3,  1.0,  1.0,
        1,  1.0,  1.0,
        1, -1.0,  1.0,*/

    ];
    for(let j=0;j<n-1;j++){
        for(let i=0;i<m-1;i++){
            if(i!=0 || j!=0){
                coordinates.push(coordinates[0]+i*2);
                coordinates.push(coordinates[1]+j*2);
                coordinates.push(z_grid[j][i])
                coordinates.push(coordinates[3]+i*2);
                coordinates.push(coordinates[4]+j*2);
                coordinates.push(z_grid[j][i+1])
                coordinates.push(coordinates[6]+i*2);
                coordinates.push(coordinates[7]+j*2);
                coordinates.push(z_grid[j+1][i+1])
                coordinates.push(coordinates[9]+i*2);
                coordinates.push(coordinates[10]+j*2);
                coordinates.push(z_grid[j+1][i+1])
                coordinates.push(coordinates[12]+i*2);
                coordinates.push(coordinates[13]+j*2);
                coordinates.push(z_grid[j+1][i])
                coordinates.push(coordinates[15]+i*2);
                coordinates.push(coordinates[16]+j*2);
                coordinates.push(z_grid[j][i])
            }
        }
    }
    const vertices = new Float32Array(coordinates);
    geometry.setAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );
    const material = new THREE.MeshBasicMaterial( { color: 0xff0000,wireframe:true } );
    scene.remove(mesh);
    mesh = new THREE.Mesh( geometry, material );  
    const l1=new THREE.PointLight("white",0.8);
    l1.position.set(5,3,3);
    scene.add(l1,mesh);  
}