//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");



const app=express();
// var item =""; ------with the help of this only one item can be added in the list.so in order to add multiple number of items make an array

let items=["Buy Food", "Cook Food"];
let workItems=[];
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true})); // use to setup bodyparser
//in order to use the static files like css, js etc use public folder
//using express we can only access the server i.e app.js and views file directly. Rest all our declare explicitly by express using public folder
app.use(express.static("public"));
app.get("/",function(req, res){
   
let day = date.getDay();

    res.render("list" , {listTitle: day , newListItems:items});
    
});
app.post("/",function(req,res){ //post request to home route
   let item= req.body.newItem;
   // this directs to app.get
   if(req.body.list === "Work"){
    workItems.push(item);
    res.redirect("/work");

}else{
    items.push(item);
    res.redirect("/");
}

});
app.get("/work",function(req,res){
    res.render("list",{listTitle : "Work List",newListItems:workItems});
});

app.get("/about",function(req,res){
    res.render("about");

});


app.listen(8000,function(){
    console.log("Server started on port 8000");
});