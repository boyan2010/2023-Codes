let masiv=[];
function init() {
    // Kodut tuk se izpulnqva vednuj v nachalot
    for(let i=0;i<15;i++){
        masiv[i]=randomInteger(182)+439;
    }
    returnSmalestElement(masiv);
    biggestElement(masiv);
    srednoAritmetichno(masiv);
}
function returnSmalestElement(arr){
    let smallestNum=10000;
    for(let i=0;i<arr.length;i++){
        console.log(arr[i]);
        if(arr[i]<smallestNum){
            smallestNum=arr[i];
        }
    }
    console.log("The smallest element is", smallestNum);
}
function biggestElement(arr){
    let biggestNum=0;
    for(let i=0;i<arr.length;i++){
       // console.log(arr[i]);
        if(arr[i]>biggestNum){
            biggestNum=arr[i];
        }
    }
    console.log("The biggest element is", biggestNum);
}
function srednoAritmetichno(arr){
    let sbor=0;
    for(let i=0;i<arr.length;i++){
        // console.log(arr[i]);
        sbor+=arr[i];
     }
     console.log("The average is", sbor/arr.length);
}
function update() {
    // Kodut tuk se izpulnqva (okolo) 100 puti v sekunda
}
function draw() {
    // Tuk naprogramirai kakvo da se risuva
}
function mouseup() {
    // Pri klik s lqv buton - pokaji koordinatite na mishkata
    console.log("Mouse clicked at", mouseX, mouseY);
}
function keyup(key) {
    // Pechatai koda na natisnatiq klavish
    console.log("Pressed", key);
}

