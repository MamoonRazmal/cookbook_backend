const express=require('express')
const {Pool}=require("pg")
const app=express()
const port=3000;
const pool=new Pool();
require("dotenv").config();
const cors=require('cors')
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//app.use(logger('dev'));
app.get("/",(req,res)=>{
res.send("this is from api")
})
app.get("/recepe",(req,res)=>{
    pool.query("select * from recepe").then(data=> res.json(data.rows)).catch(e=>res.sendStatus(500).send(e))
})
app.post("/recepe",(req,res,next)=>{
    console.log("this is from recep",req.body)
    const {food_name,food_ingredients,food_instruction,food_photo}=req.body;
    console.log("this the value of food_name",food_name)
    console.log("this the value of food_ingredients",food_ingredients.toString());
    console.log("this the value of with jSON food_ingredients",food_ingredients);
    pool.query("insert into recepe(food_name,food_ingredients,food_instruction,food_photo) values($1,$2,$3,$4) returning *",[food_name.toString(),food_ingredients.toString(),food_instruction.toString(),food_photo]).then((data)=>res.json(data.rows)).catch((e)=>res.sendStatus(500))//.send(e));
})
app.delete('/recepe/:id',(req,res)=>{
    const {id}=req.params;
    pool.query("delete from recepe where id=$1",[id]).then((data)=>res.send(data.rows)).catch((e)=>res.sendStatus(500).send(e))
})

app.put("/recepe/:id",(req,res)=>{
    const {id}=req.params
    const { food_name,food_ingredients,food_instruction,food_photo}=req.body;
    pool.query("update recepe set food_name=$1,food_ingredients=$2,food_instruction=$3,food_photo=$4 where id=$5 returning *",[food_name,food_ingredients,food_instruction,food_photo,id]).then((data)=>res.json(data.rows)).catch((e)=>res.sendStatus(500))
})
    app.listen(port,()=>{
    console.log(`you are listing from http://localhost:${port}`)
})
