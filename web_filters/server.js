let express = require("express");
let app=express();
let port=7777;
let path=require("path");

app.use(express.static('public'));
app.get("/",function onGetNaklonenaCherta(req,res) {
    res.sendFile(path.join(__dirname,"nachalna_stranica.html"));
});
/*let masiv=["cursor","farm"];
for(let i of masiv){
    app.get("/"+i,function (req,res){
        res.sendFile(path.join(__dirname,'public',i+".png"));
    });
}*/

app.listen(port, function onAppListen() {
    console.log("SURVURA SLUSHA NA PORT:"+port);
});