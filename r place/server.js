let canvas;
function make_canvas(n) {
    canvas = [];
    for(let i = 0; i < n; i++) {
        canvas[i] = [];
        for (let j = 0; j < n; j++) {
            canvas[i][j] = {
                r: 255,
                g: 255,
                b: 255
            }
        }
    }
}
function update_canvas(col, row, new_r, new_g, new_b) {
    canvas[row][col] = {
        r: new_r,
        g: new_g,
        b: new_b
    }
}
make_canvas(5);
let express = require("express");
let app = express();
//let path = require("path");
let port = 3000;
app.get("/", function (req, res) {
    res.status(200);
    res.send("NQMA NISHTO TUKA");
});
app.get("/map",function(req,res) {
    /*let a=[];
    for(let i=0;i<5;i++){
        for(let j=0;j<5;j++){
            a[i]=JSON.stringify([canvas[i][j].r,canvas[i][j].g,canvas[i][j].b]);
        }
    }*/
    res.send(JSON.stringify(canvas));
})
app.put("/risuvai",function(req,res){
    let x=parseInt(req.query.X),y=parseInt(req.query.Y),r=parseInt(req.query.R),g=parseInt(req.query.G),b=parseInt(req.query.B);
    if(x>=5 || y>=5 || r>=256 || g>=256 || b>=256 ||x<0 ||y<0 || r<0 || g<0 || b<0 || isNaN(x) || isNaN(y) || isNaN(r) || isNaN(g)||isNaN(b) || x+""!=req.query.X || y+""!=req.query.Y || r+""!=req.query.R || g+""!=req.query.G || b+""!=req.query.B){
        res.status(400);
    }else{
        res.status(200);
        update_canvas(x,y,r,g,b);
    }
    res.send("");
})
app.listen(port, function () {
    console.log("Listening on port: " + port);
});
//let a=JSON.stringify([1,2,3]);
//let b=JSON.parse('{"r":100,"g":100,"b":100');
//console.log(a);