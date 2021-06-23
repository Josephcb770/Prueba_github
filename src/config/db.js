const mysql=require('mysql');
const connection = mysql.createConnection({
	host : process.env.DB_HOST,
	user : process.env.DB_USER,
	database : process.env.DB_DATABASE
})

connection.connect((error)=>{
	if(error){
		console.log("este error se presenta " + error)
		return;
	}
	console.log("conectados exitosamente a la base de datos")
})

module.exports=connection;