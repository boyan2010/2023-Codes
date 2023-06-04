// Suzdavame promenlivi
let stavi=[],baseX=400,baseY=300,selectedC,clicked=false,s="Forward kinematics";
for(let i=0;i<2;i++){
    let stava={
        ugulSOx:randomInteger(Math.PI*2),
        dulj:randomInteger(300)
    };
    stavi.push(stava);
}
function distance(x1,x2,y1,y2) {
    return Math.sqrt((x1-x2)*(x1-x2)+(y1-y2)*(y1-y2));
}
function init() {
    // Kodut tuk se izpulnqva vednuj v nachaloto
}
function update() {
    // Kodut tuk se izpulnqva (okolo) 100 puti v sekunda
    if(s=="Forward kinematics"){
        if(clicked){
            if(isKeyPressed[65]){
                stavi[selectedC].ugulSOx+=0.01;
            }
            if(isKeyPressed[68]){
                stavi[selectedC].ugulSOx-=0.01;
            }
        }
    }else{
        console.log(Math.atan2(mouseY-baseY,mouseX-baseX));
    }
}
function draw() {
    // Tuk naprogramirai kakvo da se risuva
    context.beginPath();
    context.arc(baseX,baseY,10,0,Math.PI*2);
    context.fillStyle='turquoise';
    context.fill();
    context.stroke();
    let starUg=0,starX=baseX,starY=baseY;
    for(let i=0;i<stavi.length;i++) {
        context.moveTo(starX,starY);
        let novUg=starUg-Math.PI/2+stavi[i].ugulSOx;
        let novX=starX+stavi[i].dulj*Math.cos(novUg);
        let novY=starY+stavi[i].dulj*Math.sin(novUg);
        context.lineTo(novX,novY);
        context.stroke();
        starX=novX;
        starY=novY;
        starUg=novUg;

    }
    starUg=0;
    starX=baseX;
    starY=baseY;
    for(let i=0;i<stavi.length;i++){
        let novUg=starUg-Math.PI/2+stavi[i].ugulSOx;
        let novX=starX+stavi[i].dulj*Math.cos(novUg);
        let novY=starY+stavi[i].dulj*Math.sin(novUg);
        context.beginPath();
        context.arc(novX,novY,10,0,Math.PI*2);
        context.fillStyle='turquoise';
        context.fill();
        context.stroke();
        starX=novX;
        starY=novY;
        starUg=novUg;
    }
}
function mouseup() {
    // Pri klik s lqv buton - pokaji koordinatite na mishkata
    console.log("Mouse clicked at", mouseX, mouseY);
    if(s=="Forward kinematics"){
        let starUg=0,starX=baseX,starY=baseY;
        for(let i=0;i<stavi.length;i++){
            let novUg=starUg-Math.PI/2+stavi[i].ugulSOx;
            let novX=starX+stavi[i].dulj*Math.cos(novUg);
            let novY=starY+stavi[i].dulj*Math.sin(novUg);
            if(distance(mouseX,novX,mouseY,novY)<10){
                clicked=true;
                selectedC=i;
            }
            starX=novX;
            starY=novY;
            starUg=novUg;
        }
    }
}
function keyup(key) {
    // Pechatai koda na natisnatiq klavish
    console.log("Pressed", key);
    if(key==77){
        if(s=="Forward kinematics"){
            s="Inverse kinematics";
        }else{
            s="Forward kinematics";
        }
    }
}

