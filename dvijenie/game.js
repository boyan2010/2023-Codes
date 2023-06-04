// Suzdavame promenlivi
let cel = {
    x: 400,
    y: 300
}
function distance(x1, y1, x2, y2) {
    let a = x1-x2, b = y1-y2;
    return Math.sqrt(a*a + b*b);
}
function moveVPravaLiniq(cel) {

    let d = distance(this.x, this.y, cel.x, cel.y)
    this.x += this.skorost*(cel.x - this.x)/d;
    this.y += this.skorost*(cel.y - this.y)/d;
}
let brUpdates = 0;
function moveSLangurcane(cel) {

    let radius = distance(this.x, this.y, cel.x, cel.y);
    let ugul = Math.atan2(this.y - cel.y, this.x-cel.x);
 
    radius = radius - this.skorost;
    ugul += 0.05*Math.sin(brUpdates/100);
 
    this.x = cel.x + radius * Math.cos(ugul);
    this.y = cel.y + radius * Math.sin(ugul);
}
let zombie = {
    x: randomInteger(800),
    y: randomInteger(600),
    skorost: 1,
    move: [moveSLangurcane,moveVPravaLiniq][randomInteger(2)]
}
function init() {
    // Kodut tuk se izpulnqva vednuj v nachaloto
}
function update() {
    // Kodut tuk se izpulnqva (okolo) 100 puti v sekunda
    brUpdates++;
    zombie.move(cel);

}
function draw() {
    // Tuk naprogramirai kakvo da se risuva
    drawImage(femaleAction, cel.x, cel.y, 40, 40);
    drawImage(troll, zombie.x, zombie.y, 40, 40);
}
function mouseup() {
    // Pri klik s lqv buton - pokaji koordinatite na mishkata
    console.log("Mouse clicked at", mouseX, mouseY);
}
function keyup(key) {
    // Pechatai koda na natisnatiq klavish
    console.log("Pressed", key);
}

