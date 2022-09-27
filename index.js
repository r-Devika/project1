var express = require('express');
var mysql = require('mysql');
var cors = require('cors');
var bodyparser = require('body-parser');
var app = express();



app.use(cors());
app.use(bodyparser.json());


app.listen('8005',()=>{
    console.log('server is running on port 8005....');
})



// mysql database connection 

var db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'Root@123',
    database:'cruddb'
});

// check db connection 
db.connect((err)=>{
    if(err) throw err;
    else
    {
        console.log('database connected ....');
    }
});


// REST API CURD

app.get('/api',(req,res)=>{
    res.send('Api working');
});


// Create data 

app.post('/api/create',(req,res)=>{

    console.log(req.PUTbody);

    // sql query 

    let sql = ` INSERT INTO crudt(id,name,code,salary,email)
                VALUES('${req.body.id}','${req.body.name}','${req.body.code}','${req.body.salary}','${req.body.email}')
               `;
    // run query 
    db.query(sql,(err,result)=>{
            if(err) throw err;
            res.send('data inserted');
    });        


});


// Read data 
app.get('/api/read',(req,res)=>{
    // sql query 
    let sql = `SELECT * FROM crudt`;
    // run query 
    db.query(sql,(err,result)=>{
        if(err) throw err;"id";
        
        res.send(result);
    });
})

// Read single data 
app.get('/api/read/:id',(req,res)=>{
    console.log(req.params.id);
    // sql query 
    let sql = `SELECT * FROM crudt
                WHERE id = '${req.params.id}'
                `;
    // run query 
    db.query(sql,(err,result)=>{
        if(err) throw err;
        res.send(result);
    });          


});

// update single data 

app.put('/api/update/:id',(req,res)=>{
        console.log(req.params.id);
        // sql query 
        let sql = `UPDATE crudt SET 
                    name = '${req.body.name}'
                    code = '${req.body.code}'
                    salary = '${req.body.salary}'
                    email = '${req.body.email}'
                    WHERE id = '${req.body.id}'
                    `;
        // run query 
        db.query(sql,(err,result)=>{
                if(err) throw err;
                res.send('data updated');
        })            
})


// delete single data 

app.delete('/api/delete/:id',(req,res)=>{

    // sql query 
    let sql = `DELETE FROM crudt 
                WHERE id = '${req.params.id}'
                `;
    //    run query 
    db.query(sql,(err,result)=>{
        if(err) throw err;
        res.send('data deleted');
    });         
});







