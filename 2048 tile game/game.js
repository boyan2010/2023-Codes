// Suzdavame promenlivi
let g=5,blokcheta=[],dadenoBlokche=Math.pow(2,randomInteger(7)+1),clicknataKol,brZapulneniRedove=[];
function init() {
    // Kodut tuk se izpulnqva vednuj v nachaloto
    for(let i=0;i<g;i++){
        blokcheta[i]=[];
        brZapulneniRedove[i]=0;
        for(let j=0;j<g;j++){
            blokcheta[i][j]=0;
        }
    }
}
function update() {
    // Kodut tuk se izpulnqva (okolo) 100 puti v sekunda
}
function draw() {
    // Tuk naprogramirai kakvo da se risuva
    let gol=canvas.height/g;
    for(let i=0;i<g;i++){
        for(let j=0;j<g;j++){
            context.strokeRect(i*gol,j*gol,gol,gol);
        }
    }
    for(let i=0;i<g;i++){
        for(let j=0;j<g;j++){
            if(blokcheta[i][j]>0){
                let kolkoCifri=1,copy=blokcheta[i][j];
                while(copy>0){
                    kolkoCifri++;
                    copy=Math.floor(copy/10);
                }
                context.fillStyle=`rgb(`+(Math.floor(blokcheta[i][j]/2)*6)%255+`,`+(Math.floor(blokcheta[i][j]/2)*6)%255+`,`+(Math.floor(dadenoBlokche/2)*6)%255+`)`;
                context.fillRect(i*gol,j*gol,gol,gol);
                context.fillStyle="black";
                context.font=Math.floor(gol/(kolkoCifri-1))+"px Courier New";
                context.fillText(blokcheta[i][j],i*gol,j*gol);
            }
        }
    }
    context.strokeRect(canvas.height,3*gol,gol,gol);
    let kolkoCifri=1,copy=dadenoBlokche;
    while(copy>0){
        kolkoCifri++;
        copy=Math.floor(copy/10);
    }
 //   console.log(kolkoCifri-1);
     context.fillStyle=`rgb(`+(Math.floor(dadenoBlokche/2)*6)%255+`,`+(Math.floor(dadenoBlokche/2)*6)%255+`,`+(Math.floor(dadenoBlokche/2)*6)%255+`)`;
    console.log(Math.floor(dadenoBlokche/2));
    context.fillRect(canvas.height,3*gol,gol,gol);
    context.fillStyle="black";
    context.font=Math.floor(gol/(kolkoCifri-1))+"px Courier New";
   // console.log(Math.floor(gol/kolkoCifri))
    context.fillText(dadenoBlokche,canvas.height,3*gol);
}
function mouseup() {
    // Pri klik s lqv buton - pokaji koordinatite na mishkata
    console.log("Mouse clicked at", mouseX, mouseY);
    let gol=canvas.height/g;
    clicknataKol=Math.floor(mouseX/gol);
    console.log(clicknataKol);
    whenClicked(clicknataKol);
}
function whenClicked(kol) {
    let red=brZapulneniRedove[kol];
    blokcheta[kol][red]=dadenoBlokche;
    dadenoBlokche=Math.pow(2,randomInteger(7)+1);
    brZapulneniRedove[kol]++;
    combine(kol,red,blokcheta[kol][red]);
}
function combine(kol,red,staraCifra) {
    let gol=canvas.height/g;
    for(let i=0;i<Math.floor(canvas.height/gol)-1;i++){
        let brComb=0;
        let isOtDolu=false;
     //   console.log(kol,Math.floor(canvas.height/gol)-1)
        if(kol<Math.floor(canvas.height/gol)-1){
            if(blokcheta[kol+1][red]==staraCifra){
                brComb++;
                blokcheta[kol+1][red]=0;
      //      blokcheta[kol+1].splice(red,1);
                brZapulneniRedove[kol+1]--;
            }
        }
        if(kol>0){
            if(blokcheta[kol-1][red]==staraCifra){
                brComb++;
                blokcheta[kol-1][red]=0;
            //blokcheta[kol-1].splice((red),1);
                brZapulneniRedove[kol-1]--;
            }
        }
        if( red>0){
            if(blokcheta[kol][red-1]==staraCifra){
                brComb++;
                isOtDolu=true;
                blokcheta[kol][red]=0;
                //blokcheta[kol].splice((red),1);
                brZapulneniRedove[kol]--;
            }
        }
        if(isOtDolu==false){
            blokcheta[kol][red]*=Math.pow(2,brComb);
            staraCifra=blokcheta[kol][red];
        }else{
            blokcheta[kol][red-1]*=Math.pow(2,brComb);
            red--;
            staraCifra=blokcheta[kol][red];
            console.log(red);
        }
    }
}
function keyup(key) {
    // Pechatai koda na natisnatiq klavish
    console.log("Pressed", key);
}

