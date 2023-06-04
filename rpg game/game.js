// Suzdavame promenlivi 
endlessCanvas=true;
let player={
    x: 400,
    y: 300,
    ime: "Gubern",
    skorost: 5,
    shir: 80,
    vis: 100,
    brStotinki: 0,
    jivoti: 100
};
let itemi=[];
let inventory=[];
let showInventory=false;
function init() {
    // Kodut tuk se izpulnqva vednuj v nachaloto
    for(let i=0;i<30;i++){
        itemi[i]={
            kartinka: gem[randomInteger(10)],
            ime: "Gemche",
            opisanie: "Mnogo Polezno Neshto",
            x: randomInteger(1870),
            y: randomInteger(1270),
            vis: 30,
            shir: 30,
        };
    }
   //for(let i=0;i<32;i++){
   //     inventory[i]={};
   //}
    //canvas.width=1900;
    //canvas.height=1300;
}
function addedToInventory() {
    for(let i=0;i<itemi.length;i++){
        if(areColliding(400, 300, player.shir, player.vis,itemi[i].x-player.x,itemi[i].y-player.y,itemi[i].shir,itemi[i].vis)){
                inventory.push(itemi[i]);
            itemi[i].x=randomInteger(1870);
            itemi[i].y=randomInteger(1270);

        }
    }
}
function update() {
    // Kodut tuk se izpulnqva (okolo) 100 puti v sekunda
    if(isKeyPressed[68]){
        player.x+=player.skorost;
    }
    if(isKeyPressed[65]){
        player.x-=player.skorost;
    }
    if(isKeyPressed[87]){
        player.y-=player.skorost;
    }
    if(isKeyPressed[83]){
        player.y+=player.skorost;
    }
    addedToInventory();
}
function drawItemi() {
    for(let i=0;i<itemi.length;i++){
        drawImage(itemi[i].kartinka,itemi[i].x-player.x,itemi[i].y-player.y,itemi[i].shir,itemi[i].vis);
    }
}
function hoveredOverItem(obj,whereIsLocated) {
    //console.log("Hovered over", obj);
    context.font='30px Courier New';
    context.fillStyle='orange'
    context.fillRect(100+(whereIsLocated%5)*50-100,100+(Math.floor(whereIsLocated/5))*50-100,350,100);
    context.fillStyle='black'
    context.fillText(obj.ime,100+(whereIsLocated%5)*50-100,100+(Math.floor(whereIsLocated/5))*50-100)
    context.fillText(obj.opisanie,100+(whereIsLocated%5)*50-100,100+(Math.floor(whereIsLocated/5))*50-100+30)
}
function showInv() {
    for(let i=0;i<inventory.length;i++){
        if(inventory[i].kartinka!=null){
         //   console.log(i);
            drawImage(inventory[i].kartinka,100+(i%5)*50,100+(Math.floor(i/5))*50,50,50);
       //   console.log(inventory[i])
        }
    }
    for(let i=0;i<inventory.length;i++){
        if(areColliding(mouseX,mouseY,1,1, 100+(i%5)*50,100+(Math.floor(i/5))*50,50,50)) {
            hoveredOverItem(inventory[i],i);
        }
    }
}
function draw() {
    // Tuk naprogramirai kakvo da se risuva
    drawImage(backForest, -player.x, -player.y, 1900, 1300);
    drawImage(troll, 400, 300, player.shir, player.vis);
    context.font='30px Courier New';
    context.fillText(player.ime,400,300-30);
    context.fillText("Stotinki:"+player.brStotinki,400,300-60);
    context.fillText("HP:"+player.jivoti,400,300-90);
    drawItemi();
    if(showInventory){
        showInv();
    }
}
function mouseup() {
    // Pri klik s lqv buton - pokaji koordinatite na mishkata
    console.log("Mouse clicked at", mouseX, mouseY);
}
function keyup(key) {
    // Pechatai koda na natisnatiq klavish
    console.log("Pressed", key);
    if(key==73){
        showInventory= !showInventory;
    }
}

