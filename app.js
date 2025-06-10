require('dotenv').config();
const express = require('express');
const mysql = require('mysql');

console.log(process.env.DB_USER);

const dbUser = process.env.DB_USER;
const dbPass = process.env.DB_PASS;
const port = process.env.PORT || 3000;

console.log("DB USEER:", dbUser);
const app = express();

const db = mysql.createConnection({
	host : 'localhost',
	user: dbUser,
	password: dbPass,
	database: 'mydatabase',
})

db.connect((err)=>{
	if(err){
		console.log(`Error connecting database: ${err}`);
		throw err;
	}

	console.log('MySql connected...');
	
	const createTableSQL = `
	CREATE TABLE IF NOT EXISTS posts2(
		id INT AUTO_INCREMENT PRIMARY KEY,
		title VARCHAR(225),
		content TEXT,
		created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
		)
		`
	db.query(createTableSQL, (err, results) => {
		if(err){
			console.error('Error creating table: ', err);
		} else {
			console.log('Table created or already exists', results);
		}
		db.end();
	});	
	
	let post = {id:null, title: 'post two', content: 'This is another beautiful post'}
	let sql = 'INSERT INTO posts2 SET?';
	let query = db.query(sql, post, (err, result)=>{
		if(err) throw err;
		
		console.log('Data inserted into table',result);
		
	})
});

app.listen(port, ()=>{
	console.log(`Server started on port ${port}`);
});


