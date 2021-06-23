const connection = require("../../config/db");
const bcryptjs=require('bcryptjs')
validacion=false


module.exports= app => {
	app.get('/', (req,res) => {

		if (req.session.loggedin){
			res.render('../views/index.ejs', {
				login:true,
				name: req.session.name
			});
		} else {
			res.render('../views/index.ejs', {
				login:false,
				name: "por favor inicie sesion"
			});
		}
	})

	app.get('/login', (req,res)=>{
		res.render('../views/login.ejs')
	})

	app.get('/login2', (req,res)=>{
		res.render('../views/login2.ejs')
	})

	app.get('/mascotas', (req,res)=>{
		res.render('../views/index_mascotas.ejs')
	})

	app.get('/donaciones', (req,res)=>{
		res.render('../views/donaciones.ejs')
	})

	app.get('/adopta', (req,res)=>{
		res.render('../views/adopta.ejs')
	})

	app.get('/mascotas_estraviadas', (req,res)=>{
		res.render('../views/mascotas_estraviadas.ejs')
	})

	app.get('/register', (req,res)=>{
		res.render('../views/register.ejs')
	})

	app.get('/sobre_nosotros', (req,res)=>{
		res.render('../views/sobre_nosotros.ejs')
	})
	
	app.get('/registro', (req,res)=>{
		res.render('../views/registro.ejs')
	})

	app.get('/logout', (req,res)=> {
		req.session.destroy(() => {
			res.redirect('/');
		})
	})

	

	app.post('/registro', async(req,res) => {
		const {input_documento, input_fecha_de_nacimiento, firstName, email, direccion, pass, phone, pass1} = req.body;
		console.log(req.body);
		console.log(input_documento);
		let inputReContrasena = await bcryptjs.hash(pass, 8);
		if (validacion===false){
						res.render('../views/registro.ejs', {
						alert: true,
						alertTitle: "Registration",
						alertMessage: "successful Registration",
						alertIcon: "success",
						showConfirmButton: false,
						timer: 1500,
						ruta:'registro'
					});
			connection.query ("INSERT INTO usuario SET ?", {
				documento: input_documento,
				nombre: firstName,
				telefono: phone,
				correo_electronico: email,
				fecha_de_nacimiento: input_fecha_de_nacimiento,
				direccion: direccion,
				contrasena: inputReContrasena
			}, async (error, results)=>{
				if (error){
					console.log(error);
				} else{
					res.render('../views/registro.ejs', {
						alert: true,
						alertTitle: "Registration",
						alertMessage: "successful Registration",
						alertIcon: "success",
						showConfirmButton: false,
						timer: 1500,
						ruta:'registro'
					});
				}
			})	
		} else {
				res.render('../views/registro.ejs', {
						alert: true,
						alertTitle: "error",
						alertMessage: "Error al registrarse",
						alertIcon: "error",
						showConfirmButton: false,
						timer: 1500,
						ruta:'registro'
					});
			};
		});	
	app.post('/auth', async (req,res)=> {
		const {input_documento,pass} = req.body;
		let passwordHaash = await bcryptjs.hash(pass, 8);
		if (input_documento && pass){
			connection.query('SELECT * FROM usuario WHERE documento = ?',[input_documento], async(err, results)=>{
				console.log(results);
				if (results.length === 0 || !(await bcryptjs.compare(pass,results[0].contrasena))){
					res.render('../views/login2.ejs', {
						alert: true,
						alertTitle:"Error",
						alertMessage: "error",
						alertIcon: "error",
						showConfirmButton:true,
						timer: 3000,
						ruta: ''
					});
				} else {
					req.session.loggedin = true;
					req.session.name = results[0].name;
					req.session.Rol=results[0].Rol;
					res.render('../views/login2.ejs', {
						alert:true,
						alertTitle:"Correcto",
						alertMessage: "success",
						alertIcon: "success",
						showConfirmButton:true,
						timer: 3000,
						ruta: '/'
					})
				}
			})
		}
	})
}

