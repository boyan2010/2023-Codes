let x=10,y=10;
let pole=[];
let kudeKliknahX=-1,kudeKliknahY=-1;
let dulj=[];

let queue=[];
let visited=[];
function init() {
    for(let i=0;i<y;i++){
        pole[i]=[];
        dulj[i]=[];
        visited[i]=[];
        for(let j=0;j<x;j++){
            pole[i][j]=randomInteger(2);//1-stena,0-prazno
            dulj[i][j]=-1;
            visited[i][j]=false;
        }
    }
}
function bfs(){
    let t=0;
    while(queue.length>0)
    {
        //let pair={
        //};
        let a=queue[0].first;
        let b=queue[0].second;
        //console.log(a,b)
        if(a>0 && pole[a-1][b]==0 && !visited[a-1][b])
        {
            //console.log(0);
            queue.push({first:a-1,
                second:b});
            dulj[a-1][b]=dulj[a][b]+1;
            visited[a-1][b]=true;            
            //console.log("HELLO");
        }
        if(a<y-1 && pole[a+1][b]==0 && !visited[a+1][b])
        {
            //a++;
            queue.push({first:a+1,
                second:b});
            //console.log(1);
            dulj[a+1][b]=dulj[a][b]+1;
            visited[a+1][b]=true;
           // a--;
        }
        if(b>0 && pole[a][b-1]==0 && !visited[a][b-1])
        {
            //b--;
            //console.log(a,b);
            queue.push({first:a,
                second:b-1});
           // console.log(queue[queue.length-1])
            //console.log(2);
            dulj[a][b-1]=dulj[a][b]+1;
            visited[a][b-1]=true;
           // b++;
        }
        if(b<x-1 && pole[a][b+1]==0 && !visited[a][b+1])
        {
            //b++;
            queue.push({first:a,
                second:b+1});
            //console.log(3);
            dulj[a][b+1]=dulj[a][b]+1;
            visited[a][b+1]=true;
            //b--;
        }
        //queue.splice(0,1);
        queue.shift();
        //console.log(queue.length);
        //console.log(queue[queue.length-1])
        //console.log(queue[0].first,queue[0].second)
        t++;
    }
}
function update() {
    // Kodut tuk se izpulnqva (okolo) 100 puti v sekunda
}
function draw() {
    for(let i=0;i<y;i++){
        for(let j=0;j<x;j++){
            if(pole[i][j]){
                drawImage(box,j*60,i*60,60,60);
            }
        }
    }
    if(kudeKliknahX!=-1 && kudeKliknahY!=-1){
        for(let i=0;i<y;i++){
            for(let j=0;j<x;j++){
                if(pole[i][j]==0){
                    context.fillStyle="black";
                    context.font="60px Courier New"
                    context.fillText(dulj[i][j],j*60, i*60)
                }
            }
        }
    }
    for(let i=0;i<y;i++){
        context.moveTo(0,i*60);
        context.lineTo(600,i*60);
        context.stroke();
    }
    for(let i=0;i<x;i++){
        context.moveTo(i*60,0);
        context.lineTo(i*60,600);
        context.stroke();
    }
}
function mouseup() {
}
function keyup(key) {

}
function mouseup(){
    kudeKliknahX=Math.floor(mouseX/60);
    kudeKliknahY=Math.floor(mouseY/60);
    console.log(kudeKliknahX,kudeKliknahY)
    for(let i=0;i<y;i++){
        for(let j=0;j<x;j++){
            visited[i][j]=false;
            dulj[i][j]= -1;
        }
    }
    if(kudeKliknahX!=-1 && kudeKliknahY!=-1 && pole[kudeKliknahY][kudeKliknahX]==0){
        dulj[kudeKliknahY][kudeKliknahX]=0;
        queue.push({first:kudeKliknahY,
            second:kudeKliknahX});
        //console.log(queue[0].first,queue[0].second)
        visited[kudeKliknahY][kudeKliknahX]=true;
        //queue.splice(0,queue.length)
        bfs();
    }
}
