const express=require('express')
const fs=require('fs')
const cors=require('cors')

const app=express()
app.use(cors())


const data=JSON.parse(fs.readFileSync('student.json','utf-8'));
console.log("data is ",data)
app.get('/data',(req,res)=>{
    const query=req.query.search.toLocaleLowerCase()
    if(!query||query.length<3)
        return res.json([])
    const result=data.filter((item)=>
    item.name.toLowerCase().includes(query)).slice(0,5)
    return res.json(result)

})

 const port=5000
 app.listen(port,()=>{console.log("app is running")})