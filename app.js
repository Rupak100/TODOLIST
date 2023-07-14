const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const app = express();

//using body Parser for parsing the data 
app.use(bodyParser.urlencoded({extended:true}));
//to use the css in our project public folder is needed 
app.use(express.static("public"))
//using ejs
app.set("view engine", "ejs");







//for mongoose :
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/toDoListDB');

//mongoose schema :
const List = mongoose.model('List', {
    name: String
   
  
  });
  const ltem1=new List({name:"WElcome to To Do List"})
  const ltem2=new List({name:"<--press for delete"})
  


const defaultItems=[ltem1,ltem2];

//////////-----ending if mongoose -----////////////

app.get("/", function (req, res) {
    //getting the date of today
    var today = new Date();
    
    var day = "";
    //schema for date
    var option={
        weekday:"long",
        day:"numeric",
        month:"long"
    }
    day=today.toLocaleDateString("en-IN",option);
    List.find({})
        .then(function (lists) {
            if (lists.length === 0) {
                List.insertMany(defaultItems

                ).then(() => console.log("Success")).catch(function (err) {
                    console.log(err);
                });
                res.redirect("/");
            }
            else {

                res.render("list", { listTitle: day, textList: lists });
            }

        })
        .catch(function (err) {
            console.log(err);
        });
});
app.post("/", function (req, res) {
    var text = req.body.myinput;

    const workItem = new List({
        name: text
    })

    workItem.save();
    res.redirect("/");

});

app.post("/delete", (req, res) => {
    // console.log(req.body.checkbox);
    List.deleteOne({ _id: req.body.checkbox }).then(() => console.log("Success")).catch(function (err) {
        console.log(err)
    });
    res.redirect("/")
})


app.get("/work",function(req,res){
   
    res.render("list", { listTitle:"Work List",textList:lists });
    
});
app.post("/work",function(req,res){
    var workin=req.body.myinput;
      works.push(workin);
    // console.log(text);
    res.redirect("/work");
    // res.send(text);
    // console.log(texts)
});

app.listen(3000, function () {
    console.log("Server started at port 3000");
});