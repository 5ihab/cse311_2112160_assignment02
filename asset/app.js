const port = 3000;

const mysql = require("mysql");
const express = require("express");
const cors = require('cors');
let app = express();
app.use(cors());
app.use(express.json());


let sql_linker = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'assignment_2'
});
sql_linker.connect(
    function(err){
        if(err){
            console.log(err);
        } 
        else{
            console.log('Connected successfully.');
        }
    }
);
app.listen(port, 
    function(){
    console.log("Server running on port " + port + "...");
    }
);
app.post("/api/login", function(req, res){
    let login_data = {
        email: req.body.email,
        password: req.body.password
    }
    const query =  `SELECT *
                    FROM profile p
                    WHERE p.email = "${login_data.email}" AND p.password = "${login_data.password}";`;
    sql_linker.query(query,
        function (err, result){
            if(err){
                console.log(err);
                res.json({error: err,});
            }else{
                console.log(result);
                res.json({result: result,});
            }
        }
    )
})
app.post('/api/profile', function (req, res) {
    const account_data = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        gender: req.body.gender,
        dob: req.body.dob,
        email: req.body.email,
        password: req.body.password,
        pfp: req.body.pfp
    };
    const query =  `INSERT into profile (first_name, last_name, gender, dob, email, password, pfp)
                    VALUES ('${account_data.first_name}', '${account_data.last_name}', '${account_data.gender}', '${account_data.dob}', '${account_data.email}', '${account_data.password}', '${account_data.pfp}');`;
    
    console.log(query);
    sql_linker.query(query,
        function(err, result){
            if(err){
                res.json({
                    error: err,
                })
            }else{
                console.log(result);
                res.json({
                    result: result,
                })
            }
        }
    );
})

app.get('/api/profile', function(req, res){
    email = req.query.email;
    const query =  `SELECT p.first_name, p.last_name, p.gender, p.dob, p.email
                    FROM profile p
                    WHERE p.email = "${email}";`;
    sql_linker.query(query, function(err, result){
        if(err){
            console.log(err);
            res.json({error: err},);
        } else {
            res.json({result: result[0],});
        }
    });
});



app.put('/api/update', function(req, res){
    const update_data = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        gender: req.body.gender,
        dob: req.body.dob,
        email: req.body.email,
        old_email: req.body.old_email,
        pfp: req.body.pfp
    };
    const query =  `UPDATE profile
                    SET first_name = '${update_data.first_name}', 
                    last_name = '${update_data.last_name}', 
                    gender = '${update_data.gender}', 
                    dob = '${update_data.dob}', 
                    email = '${update_data.email}', 
                    pfp = '${update_data.pfp}'
                    WHERE email = '${update_data.old_email}';`;

    sql_linker.query(query, function(err, result){
        if(err){
            res.json({error: err,});
        } else {
            console.log(result);
            res.json({result: result,});
        }
    });
})



app.delete("/api/profile", function(req, res){
    const query =   `DELETE FROM profile
                     WHERE email = '${req.body.email}';`;
    sql_linker.query(query, function(err, result){
        if(err){
            console.log(err);
            res.json({error: err,});
        } else {
            console.log(result);
            res.json({result: result});
        }
    });
})
