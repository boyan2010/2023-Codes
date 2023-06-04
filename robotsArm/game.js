// Suzdavame promenlivi
let stavi=[];
let areYouMoving=false;
let indC=-1;
function distance(x1,x2,y1,y2) {
    return Math.sqrt((x1-x2)*(x1-x2)+(y1-y2)*(y1-y2));
}
for(let i=0;i<10;i++){
    let stava= {
        x:randomInteger(790),
        y:randomInteger(590),
        ugulSprqmoPred:randomInteger(Math.PI),
    }
    stavi.push(stava);
    if(i>0) {
        stavi[i].dulj=distance(stavi[i-1].x,stavi[i].x,stavi[i-1].y,stavi[i].y);
    }else{
        stavi[i].dulj=0;
    }
}
function init() {
    // Kodut tuk se izpulnqva vednuj v nachaloto
}
function update() {
    // Kodut tuk se izpulnqva (okolo) 100 puti v sekunda
    if(areYouMoving){
        stavi[indC].x=mouseX;
        stavi[indC].y=mouseY;
    }
}
function draw() {
    // Tuk naprogramirai kakvo da se risuva
    for(let i=0;i<stavi.length;i++){
        //context.lineWidth="10px";
        context.beginPath();
        if(i>0){
            context.moveTo(stavi[i-1].x,stavi[i-1].y);
            context.lineTo(stavi[i].x,stavi[i].y);
        }
        context.strokeStyle='red';
        context.stroke();
    }
    for(let i=0;i<stavi.length;i++){
        context.beginPath();
        context.arc(stavi[i].x,stavi[i].y,10,0,Math.PI*2);
        context.fillStyle='turquoise';
        context.fill();
        context.stroke();
    }
}
function mouseup() {
    // Pri klik s lqv buton - pokaji koordinatite na mishkata
    console.log("Mouse clicked at", mouseX, mouseY);
    if(areYouMoving==false) {
        for(let i=0;i<stavi.length;i++){
            if(distance(mouseX,stavi[i].x,mouseY,stavi[i].y)<10){
                areYouMoving=true;
                indC=i;
            }
        }
    }else{
        areYouMoving=false;
    }
}
function mousedown() {
   /* for(let i=0;i<stavi.length;i++){
        while(distance(mouseX,stavi[i].x,mouseY,stavi[i].y)<10){
            stavi[i].x=mouseX;
            stavi[i].y=mouseY;
        }
    }*/
}
function keyup(key) {
    // Pechatai koda na natisnatiq klavish
    console.log("Pressed", key);
}

