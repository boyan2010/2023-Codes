// Images for buildings/ arrows
const kartinki = [arrowRight, arrowDownRight, arrowDown, arrowDownLeft, arrowLeft, arrowUpLeft, arrowUp, arrowUpRight, explosion1, building[3]];
 
// Dvumeren masiv (2d array)
let tipNaKletka;
let w, h, squareW, squareH;
let itemKartinki = [bird, bee, cherry];
let itemX, itemY, itemType, itemCount, dX, dY, timer;
let itemSize;
let itemSpeed;
let spawnerX = [],
    spawnerY = [];
 
function init() {
    tipNaKletka = []; w = 6; h = 4; squareW = canvas.width / w; squareH = canvas.height / h;
    itemX = [];
    itemY = [];
    itemType = [];
    dX = [];
    dY = [];
    timer = [];
    itemCount = 0;
    itemSize = squareW / 3;
    itemSpeed = 2;
 
    // Create 2d array tipNaKletka
    // Suzdavame dvumerniq masiv tipNaKletka
    for (let i = 0; i < w; i++) {
        tipNaKletka[i] = [];
        for (let j = 0; j < h; j++) {
            tipNaKletka[i][j] = randomInteger(8);
        }
    }
    for (let i = 0; i < 0; i++) {
        itemX[i] = randomInteger(canvas.width);
        itemY[i] = randomInteger(canvas.height);
        itemType[i] = randomInteger(itemKartinki.length);
        dX[i] = 0;
        dY[i] = 0;
        timer[i] = 0;
        itemCount++;
    }
}
let t = 0;
function update() {
    t++;
    for (let i = 0; i < w; i++) {
        for (let j = 0; j < h; j++) {
            if (t % 40 == 0 && tipNaKletka[i][j] == 8) {
                itemX[itemCount] = (i + 0.5) * squareW - itemSize / 2;
                itemY[itemCount] = (j + 0.5) * squareH - itemSize / 2;
                dX[itemCount] = 0;
                dY[itemCount] = 0;
                timer[itemCount] = 0;
                itemType[itemCount] = 0;
                itemCount++;
            }
            if (tipNaKletka[i][j] == 9) {
                let brResursi = 0;
                for (let h = 0; h < itemCount; h++) {
                    if (timer[h] <= 0 && itemType[h] == 0 && areColliding(itemX[h], itemY[h], itemSize, itemSize, i * squareW, j * squareH, squareW, squareH)) {
                        brResursi++;
                    }
                }
                if (brResursi >= 2) {
                    itemX[itemCount] = (i + 0.5) * squareW - itemSize / 2;
                    itemY[itemCount] = (j + 0.5) * squareH - itemSize / 2;
                    dX[itemCount] = 0;
                    dY[itemCount] = 0;
                    timer[itemCount] = 0;
                    itemType[itemCount] = 1;
                    itemCount++;
                    for (let h = 0; h < itemCount - 1 && brResursi > 0; h++) {
                        if (timer[h] <= 0 && itemType[h] == 0 && areColliding(itemX[h], itemY[h], itemSize, itemSize, i * squareW, j * squareH, squareW, squareH)) {
                            itemX[h] = NaN;
                            brResursi--;
                        }
                    }
                }
            }
            for (let h = 0; h < itemCount; h++) {
                if (timer[h] <= 0 && areColliding(itemX[h], itemY[h], itemSize, itemSize, i * squareW, j * squareH, squareW, squareH)) {
                    let squareDiag = Math.sqrt(squareH * squareH + squareW * squareW);
                    if (itemType[h] == 1 && tipNaKletka[i][j] == 9) {
                        dX[h] = itemSpeed;
                        dY[h] = 0;
                        timer[h] = squareW / itemSpeed;
                    }
                    if (tipNaKletka[i][j] == 0 || tipNaKletka[i][j] == 8) {
                        dX[h] = itemSpeed;
                        dY[h] = 0;
                        timer[h] = squareW / itemSpeed;
                    }
                    if (tipNaKletka[i][j] == 1) {
                        dX[h] = itemSpeed;
                        dY[h] = itemSpeed;
                        timer[h] = squareDiag / (Math.sqrt(2) * itemSpeed);
                    }
                    if (tipNaKletka[i][j] == 2) {
 
                        dX[h] = 0;
                        dY[h] = itemSpeed;
 
                        timer[h] = squareH / itemSpeed;
                    }
                    if (tipNaKletka[i][j] == 3) {
                        dX[h] = -itemSpeed;
                        dY[h] = itemSpeed;
                        timer[h] = squareDiag / (Math.sqrt(2) * itemSpeed);
 
                    }
                    if (tipNaKletka[i][j] == 4) {
                        dX[h] = -itemSpeed;
 
                        dY[h] = 0;
                        timer[h] = squareW / itemSpeed;
                    }
                    if (tipNaKletka[i][j] == 5) {
                        dX[h] = -itemSpeed;
                        dY[h] = -itemSpeed;
                        timer[h] = squareDiag / (Math.sqrt(2) * itemSpeed);
                    }
                    if (tipNaKletka[i][j] == 6) {
                        dX[h] = 0;
                        dY[h] = -itemSpeed;
                        timer[h] = squareH / itemSpeed;
                    }
                    if (tipNaKletka[i][j] == 7) {
                        dY[h] = -itemSpeed;
                        dX[h] = itemSpeed;
                        timer[h] = squareDiag / (Math.sqrt(2) * itemSpeed);
                    }
                }
            }
        }
    }
    for (let h = 0; h < itemCount; h++) {
        if (timer[h] <= 0) {
            dX[h] = 0;
            dY[h] = 0;
        } else {
            timer[h]--;
            itemX[h] += dX[h];
            itemY[h] += dY[h];
        }
    }
}
 
function draw() {
    // Draw 2d table
    for (let i = 0; i < w; i++) {
        for (let j = 0; j < h; j++) {
            drawImage(kartinki[tipNaKletka[i][j]], i * squareW, j * squareH, squareW, squareH);
        }
    }
    for (let h = 0; h < itemCount; h++) {
        drawImage(itemKartinki[itemType[h]], itemX[h], itemY[h], itemSize, itemSize);
    }
}
function mouseup() {
    // Reda i kolonata, na koito e kliknato
    // Row, column that has been clicked
    let kliknatKol = Math.floor(mouseX / squareW);
    let kliknatRed = Math.floor(mouseY / squareH);
    console.log(kliknatKol, kliknatRed)
 
    // Dali sme kliknali vurhu strelka
    // Check if the clicked cell contains an arrow
    if (tipNaKletka[kliknatKol][kliknatRed] < 8) {
        // 0 -> 1 -> 2 -> 3 .... -> 6 -> 7 -> 0 -> 1 -> 2 -> 3 -> 4 -> .... -> 6 -> 7 -> 0 -> ....
        tipNaKletka[kliknatKol][kliknatRed] = (tipNaKletka[kliknatKol][kliknatRed] + 1) % 8;
    }
}
function keyup(key) {
    let kliknatKol = Math.floor(mouseX / squareW);
    let kliknatRed = Math.floor(mouseY / squareH);
    if (key == 32) {
        tipNaKletka[kliknatKol][kliknatRed] = 8;
    }
    if (key == 66) {
        tipNaKletka[kliknatKol][kliknatRed] = 9;
    }
}
 