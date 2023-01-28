const fs = require('fs');

const getDbStudents =()=>{
    return new Promise((resolve,reject)=>{

        fs.readFile('./db.json','utf-8',(err,data)=>{
     
   
         const students = JSON.parse(data);
        
           resolve(students);
        
           });
    });
}


module.exports.getDbStudents = getDbStudents();
