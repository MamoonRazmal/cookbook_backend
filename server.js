const express=require('express')
const {Pool}=require("pg")
const app=express()
const port=3000;
const pool=new Pool();
require("dotenv").config();
const cors=require('cors')
app.use(cors());
app.use(express.json());
app.get("/",(req,res)=>{
res.send("this is from api")
})
app.get("/recepe",(req,res)=>{
    pool.query("select * from recepe").then(data=> res.json(data.rows)).catch(e=>res.sendStatus(500).send(e))
})
app.post("/recepe",(req,res)=>{
    const { food_name,food_ingredients,food_instruction,food_photo}=req.body;
    pool.query("insert into recepe(food_name,food_ingredients,food_instruction,food_photo) values($1,$2,$3,$4) returning *",[food_name,food_ingredients,food_instruction,food_photo]).then((data)=>res.json(data.rows)).catch((e)=>res.send(500).send(e));
})
app.delete('/recepe/:id',(req,res)=>{
    const {id}=req.params;
    pool.query("delete from recepe where id=$1",[id]).then((data)=>res.json(data.rows)).catch((e)=>res.sendStatus(500).send(e))
})

app.put("/recepe/:id",(req,res)=>{
    const {id}=req.params
    const { food_name,food_ingredients,food_instruction,food_photo}=req.body;
    pool.query("update recepe set food_name=$1,food_ingredients=$2,food_instruction=$3,food_photo=$4 where id=$5 returning *",[food_name,food_ingredients,food_instruction,food_photo,id]).then((data)=>res.json(data.rows)).catch((e)=>res.sendStatus(500).send(e))
})
    app.listen(port,()=>{
    console.log(`you are listing from http://localhost:${port}`)
})
