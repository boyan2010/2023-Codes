// Suzdavame promenlivi
let kolkoEVisokaPlaninataNaToziX=[],dupkaRad=60,dupkaDulbochina=50,tankX,tankY,oUgul=0,bombX,bombY,dX,dY;
function init() {
    // Kodut tuk se izpulnqva vednuj v nachaloto
    for(let x=0;x<800;x++){
      //  findHeight(x);
        planina(x);
      //ravnina(x);
     //slope(x);
    }
    tankX=0;
    tankY=kolkoEVisokaPlaninataNaToziX[tankX];
}
function slope(x) {
    return kolkoEVisokaPlaninataNaToziX[x]=x;
}
function ravnina(x) {
    return kolkoEVisokaPlaninataNaToziX[x]=200;
}
function planina(x) {
    return kolkoEVisokaPlaninataNaToziX[x]=Math.tan(x)*Math.cos(x)+Math.sin(((x)/(100)))*100+200;
}
function findHeight(x) {
    return kolkoEVisokaPlaninataNaToziX[x]=Math.sin(x/50)*50+200+Math.cos(x/10)*10;
}
function drawMountain(x,y){
        context.lineTo(x,y);
        //context.fillStyle="black";
        //context.fillRect(x,canvas.height,1,-y)
}
function update() {
    // Kodut tuk se izpulnqva (okolo) 100 puti v sekunda
    bombX+=dX;
    bombY-=dY;
   // console.log(bombX,bombY);
    dY-=0.01;;
    if(Math.floor(bombY)>canvas.height-kolkoEVisokaPlaninataNaToziX[Math.floor(bombX)]){
        dX=0;
        dY=0;
        destruction(Math.floor(bombX));
        bombX=NaN;
    }
}
function destruction(x) {
    let doKudeStignah=x+dupkaRad;
    for(let i=0;i<=Math.PI;i+=Math.PI/180){
  //      if(kolkoEVisokaPlaninataNaToziX[mouseX]-Math.sin(Math.PI/2)*dupkaRad<kolkoEVisokaPlaninataNaToziX[doKudeStignah]){
            kolkoEVisokaPlaninataNaToziX[doKudeStignah]=kolkoEVisokaPlaninataNaToziX[doKudeStignah]-Math.sin(i)*dupkaRad;
          //  console.log(kolkoEVisokaPlaninataNaToziX[doKudeStignah],Math.sin(i),i,doKudeStignah);
            doKudeStignah--;
    //    }
    }
}
function draw() {
    // Tuk naprogramirai kakvo da se risuva
    context.beginPath();
    for(let x=0;x<800;x++){
        drawMountain(x,canvas.height-kolkoEVisokaPlaninataNaToziX[x]);
    }
    context.lineTo(canvas.width,0);
    context.lineTo(0,0);
    context.fillStyle="turquoise";
    context.fill();
    context.stroke();
    let tekX=tankX,tekY=canvas.height-tankY;
    let sX=tekX+20,sY=canvas.height-kolkoEVisokaPlaninataNaToziX[sX];
    let ugulSprqmoSledTochka=Math.atan2(tekY-sY,tekX-sX)+Math.PI;
    //console.log(ugulSprqmoSledTochka);
    context.save();
    context.translate(tekX,tekY-25);
    context.rotate(oUgul);
    context.fillStyle='gray';
    context.fillRect(0,0,50,10);
    context.restore();
    context.save();//
    context.translate(tekX,tekY);
    context.rotate(ugulSprqmoSledTochka);
    drawImage(box,-25,-50,50,50);
    context.restore();
    drawImage(bomb,bombX,bombY,10,10);
}
function mouseup() {
    // Pri klik s lqv buton - pokaji koordinatite na mishkata
    console.log("Mouse clicked at", mouseX, mouseY);
    //for(let i=0;i<dupkaRad;i++){
        /*if(kolkoEVisokaPlaninataNaToziX[udareni]-mouseY<10){
      //      console.log(kolkoEVisokaPlaninataNaToziX[udareni]-mouseY)
            kolkoEVisokaPlaninataNaToziX[udareni]-=10-(kolkoEVisokaPlaninataNaToziX[udareni]-mouseY);
        }*/
       // kolkoEVisokaPlaninataNaToziX[mouseX+i]-=(mouseX/(mouseX+i))*dupkaDulbochina;
        //kolkoEVisokaPlaninataNaToziX[mouseX-i]-=(mouseX/(mouseX+i))*dupkaDulbochina;
    //}
    let doKudeStignah=mouseX+dupkaRad;
    for(let i=0;i<=Math.PI;i+=Math.PI/180){
  //      if(kolkoEVisokaPlaninataNaToziX[mouseX]-Math.sin(Math.PI/2)*dupkaRad<kolkoEVisokaPlaninataNaToziX[doKudeStignah]){
            kolkoEVisokaPlaninataNaToziX[doKudeStignah]=kolkoEVisokaPlaninataNaToziX[doKudeStignah]-Math.sin(i)*dupkaRad;
            console.log(kolkoEVisokaPlaninataNaToziX[doKudeStignah],Math.sin(i),i,doKudeStignah);
            doKudeStignah--;
    //    }
    }
}
function keydown(key) {
    if(key==65){
        tankX--;
        tankY=kolkoEVisokaPlaninataNaToziX[tankX]+0;
    }
    if(key==68){
        tankX++;
        tankY=kolkoEVisokaPlaninataNaToziX[tankX]+0;
    }
    if(key==69){
        oUgul+=0.01;
    }
    if(key==81){
        oUgul-=0.01;
    }
}
function keyup(key) {
    // Pechatai koda na natisnatiq klavish
    console.log("Pressed", key);
    if(key==32){
        let tekX=tankX,tekY=canvas.height-tankY;
        bombX=tekX+  Math.cos(oUgul)*50;
        bombY=tekY- 25 +Math.sin(oUgul)*50  ;
        dX=Math.cos(oUgul);
        dY=Math.sin(-oUgul);
    }
}

