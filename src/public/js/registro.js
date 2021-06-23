var contrasenas=[]
var correos=[]
var firstNames=[]
var lastNames=[]
var phones=[]

function validarCorreo()
{
	var getCorreo=document.getElementById('inputCorreo')
	var correo=getCorreo.value

	if (correo.indexOf(".")==-1)
	{
		alert("No es un correo valido")
		return false
	}

	else if (correo.indexOf(" ")!=-1)
	{
		alert("No es un correo valido")
		return false
	}

	else if (correo.indexOf("@")==-1)
	{
		alert("No es un correo valido")
		return false
	}

	else 
	{
		let inicio=correo.indexOf("@")
        if (inicio<3)
        {
     	    alert("No es un correo valido")
        }

        else 
        {
     	  let indicadora=false
     	  for (let i=inicio;i<correo.length-2;i++)
     	  {
     	 	  if (correo[i]=".")
     		  {
     			  indicadora=true
     		  }
     	  }
          return indicadora
        }
    }
}

function compararContrasena()
{
	var getContrasena=document.getElementById('inputContrasena')
	var contrasena=getContrasena.value
	
	var getReContrasena=document.getElementById('inputReContrasena')
	var reContrasena=getReContrasena.value
	
	if (contrasena==reContrasena)
	{
		return true
	}
	
	else 
	{
		alert("Las contraseñas no son iguales")
		return false
	}
}

function compararCorreo()
{
	var getCorreo=document.getElementById('inputCorreo')
	if (correos.includes(getCorreo.value))
	{
		alert("El correo ya esta registrado")
		return false
	}
	else 
	{
		return true
	}
}



function validarDatos()
{
	var getContrasena=document.getElementById('inputContrasena')
	var getReContrasena=document.getElementById('inpuReContrasena')
	var getCorreo=document.getElementById('inputCorreo')
	if (validarCorreo() && compararContrasena() && compararCorreo())
	{
		var name1=document.getElementById('firstName')
		var name2=document.getElementById('lastName')
		var getphone=document.getElementById('phone')
		correos.push(getCorreo.value)
		contrasenas.push(getContrasena.value)
		firstNames.push(name1.value)
		lastNames.push(name2.value)
		phones.push(getphone.value)


	}
	var datos=[firstNames,lastNames,correos,contrasenas,phones]
	console.log(datos)
}



