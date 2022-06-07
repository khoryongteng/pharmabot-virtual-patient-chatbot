var mysql = require('mysql');

var con = mysql.createConnection({
    host:"localhost",
    user:"hcyja1jupiter",
    password: "Ph@rm@bot123",
    database:"hcyja1ju_pharmabot",
    port:2083
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected to hcyja1jupiter database!");
    // con.query(sql, function (err, result) {
    //     if (err) throw err;
    //     console.log("Result: " + result);
    //  });
});