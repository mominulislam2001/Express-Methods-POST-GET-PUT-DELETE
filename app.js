const express = require('express');
const fs = require('fs');
const db = require('./db.js');

const app = express();



app.use(express.json());

app.get('/',(req,res)=>{
    
    res.send("This is home page");

})
app.get('/api/students',(req,res)=>{
    
     db.getDbStudents()
     .then((students)=>{
        res.send(students);
     });
 

});



app.get('/api/students/:id',(req,res)=>{
    let id = parseInt(req.params.id);
    
    fs.readFile('./db.json','utf-8',(err,data)=>{
     
   
        const students = JSON.parse(data);
       
          const student = students.find(s=>s.id === id);
           if(!student){
             res.status(404).send("No Student Found in this ID");
          }else{
              res.send(student)
         }
       
          });
    
       
    

})
app.post('/api/students',(req,res)=>{
    

  const student = req.body;

  
  fs.readFile('./db.json','utf-8',(err,data)=>{
    
    const students = JSON.parse(data);
    
   students.push(student);
   
    fs.writeFile('./db.json',JSON.stringify(students),(err)=>{
           res.send(student)
    })

  });
  res.send("posted!!");


});

app.put('/api/students/:id',(req,res)=>{
    const id = parseInt(req.params.id);
    const updatedData = req.body;
    fs.readFile('./db.json','utf-8',(err,data)=>{
     
   
        const students = JSON.parse(data);
       
          const student = students.find(s=>s.id === id);
           if(!student){
             res.status(404).send("No Student Found in this ID");
          }else{
              const i = students.findIndex(s=>s.id===id);
              students[i] = updatedData;
              fs.writeFile('./db.json',JSON.stringify(students),(err)=>{
                res.send(updatedData)
         })
         }
       
          });

})


const port = 3000;

app.listen(port,()=>{

    console.log("listening on port", port)
});

