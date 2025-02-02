const express=require("express");
const getconnect=require("./dbconnect");
const getConnect=require("./dbconnect2");
const bcrypt = require('bcryptjs');
const path = require("path");
const { title } = require("process");
const app=express();
app.use(express.urlencoded({extended:false}))
app.get("/blog",async(req,res)=>{
  let col=await getConnect();
  let records=await col.find({}).toArray();
  res.render("blog",{records});
});

app.set("view engine","ejs")
app.use(express.static(path.join(__dirname,'public')));
app.set("views",path.join(__dirname,"views"));
app.get("/signup",(req,res)=>{
    res.render("signup");
});
app.get("/login",(req,res)=>{
    res.render("login");
});
app.get('/create',(req,res)=>{
    res.render("create");
});
app.get("/home",(req,res)=>{
  res.render("home")
});
app.post("/insertres",async(req,res)=>{
     gname=req.body.gname;
     gemail=req.body.gemail;
     gpassword=req.body.gpassword;
  
    let collection=await getconnect();
    let re=collection.insertOne
    ({fullname:gname,email:gemail,password:gpassword});
    let records=await collection.find({}).toArray();
    res.render("create");
});
app.post("/find",async(req,res)=>{
  try {
    let collection=await getconnect();
    const check=await collection.findOne({fullname:req.body.gname})
    if(check.password===req.body.gpassword){
      res.render("create")
    }
    else{
      res.send("wrong password")
    }
    
  } catch (error) {
    res.send("wrong details")
  }
});
app.get("/blog",(req,res)=>{
  res.render("blog");
})
app.get("/submit-blog",async(req,res)=>{
  let title=req.query.title;
  let content=req.query.content;
  let col=await getConnect();
  let r=col.insertOne
  ({title:title,content:content});
  let records=await col.find({}).toArray();

})
app.get("/deletedata",async(req,res)=>{
  let title=req.query.title;
  let col=await getConnect();
  let r=col.deleteOne({title:title});
  let records=await col.find({}).toArray();
  res.render("blog",{records})
  
})
app.get("/updatedata",async(req,res)=>{
  let title=req.query.title;
  let col=await getConnect();
  let rec=await col.find({title:title}).toArray();
  res.render("updatedata",{rec})

});
app.get("/updateres",async(req,res)=>{
  let title=req.query.title;
  let content=req.query.content;
  let col=await getConnect();
  let r=col.updateOne
  ({title:title},{$set:{title:title,content:content}});
  let records=await col.find({}).toArray();
  res.render("blog",{records});

});


app.listen(5000,()=>{
    console.log("Server Is Running")
});