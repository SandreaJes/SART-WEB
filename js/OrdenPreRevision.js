/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var imgPlacaAma = new Image();
var imgPlacaBlac = new Image();
var imgPlacaExtra = new Image();
imgPlacaAma.src="./img/PlacaAmarrilla.png";
imgPlacaBlac.src="./img/PlacaBlanca.png";
imgPlacaExtra.src="./img/placaVenezolana.png";
var rolPermitido="ATC";
var option = {
		message : "",
		title : 'Sart 2.0.1',
		size : 'lg',
		subtitle : '',
		useBin : false,
		buttons: [
	        {text: 'ACEPTAR', style: 'info',   close: true, click:sc }	        
	    ]
	};

var optionSession = {
		message : "",
		title : 'Sart 2.0.1',
		size : 'lg',
		subtitle : ' Datos Faltantes',
		useBin : false,
		buttons: [
	        {text: 'OK', style: 'info',   close: true, click:scF }	        
	    ]
	};
function scF(){
	window.location.href="menuWelcome.html";
}
function sc(){ }

window.onload = function() {
	var entidad = "existenciaSession";
	var cadenaAtributos, streaming = "";
	cadenaAtributos = "";
	streaming = entidad + "|" + cadenaAtributos;	
	doAjax('./ServicioBasicoControler.do', streaming,'respExistenciaSession', 'get', 0);
}
var nroPreRevision;
function doAnulacion(posicion){	
	var d = document.getElementById('irPreRevision'+posicion)	
	var srtAtributo =  d.getAttribute("href");
	var arrAtributo = srtAtributo.split(";");
	console.log("THAT POSICION IS "+posicion)
	nroPreRevision= srtAtributo; 
	$('#modalanular').modal('show');
	document.getElementById('tituloAnulacion').innerHTML =" Especifique la razon para Anular la Placa :"+arrAtributo[2] 
}

function servAnulacion(){	
	var arrAtributo = nroPreRevision.split(";");
	var entidad = "servicioRechazo";
	var cadenaAtributos, streaming = "";
	cadenaAtributos = arrAtributo[2]+"; Anulada desde Consola ;" + "10"+ ";"+document.getElementById('descripcionAnulacion').value ;
	streaming = entidad + "|" + cadenaAtributos;	
	doAjax('./ServicioBasicoControler.do', streaming,'respServAnulacion', 'get', 0);	
}
function respServAnulacion(resp){
	console.log("response serv anulacion IS "+resp)
	
	if(resp=="0"){
		
	}else{
		var arrAtributo = nroPreRevision.split(";");
		var entidad = "setAnulacionPreRevision";
		var cadenaAtributos, streaming = "";
		cadenaAtributos = arrAtributo[0];
		streaming = entidad + "|" + cadenaAtributos;	
		doAjax('./ServicioBasicoControler.do', streaming,'respSetAnulacionPreRevision', 'get', 0);	
	}			
}

function respSetAnulacionPreRevision(resp){
	if(resp=="1"){
		alert("Se Anulado La PreRevision con Exito");
		window.location.href="OrdenPreRevision.html";	
	}else{
		alert("Disculpe, he Presentado Problemas ");
	}
}

function findOrdenPrerevision(ctxVeh) {
	
	for(var i=1;i<11;i++ ){		
		document.getElementById('turno'+i).innerHTML= "";
		document.getElementById('td'+i).innerHTML= "";
		document.getElementById('propietario'+i).innerHTML= "";	
		document.getElementById('tipoVehiculo'+i).innerHTML="";
		document.getElementById('tipoRevision'+i).innerHTML="";
		document.getElementById('condicion'+i).innerHTML="";		                   
		document.getElementById('planilla'+i).innerHTML ="";    
		document.getElementById('hora'+i).innerHTML ="";
		document.getElementById('anular'+i).innerHTML ="";
		document.getElementById('irPreRevision'+i).innerHTML ="";  
	}	
	
	var entidad = "servFindOrdenPreRevision";
	var cadenaAtributos, streaming = "";
	var ctxInspeccion;
	if (document.getElementById('ctxInspeccion').checked == true) {
		ctxInspeccion="2"
	}else{
		ctxInspeccion="1"
	}	
	cadenaAtributos = ctxVeh+";"+document.getElementById('tipoRevision').value+";"+ ctxInspeccion;
	streaming = entidad + "|" + cadenaAtributos;
	doAjax('./ServicioBasicoControler.do', streaming,'respServFindOrdenPreRevision', 'get', 0);
}

function respExistenciaSession(resp){	
	if(resp==0){
		optionSession.message ="Disculpe, su session a expirado por inactividad ..!";
		eModal.alert(optionSession);
	}else{
		var atrSeg = resp.split(";");		 
		if(rolPermitido==atrSeg[5]){
			document.getElementById("nombreUsuario").innerHTML = "   " + atrSeg[1];
			var ruta = "./imagenes/fotosEmpresa/" + atrSeg[0] + ".png";		
			document.getElementById('fotoUsuario').setAttribute('src', ruta);
			document.getElementById("identificador").value = atrSeg[0];			
		}else{
			option.message = " Disculpe, usted no Posee un ROL Autorizado para entrar en este Modulo ..!";
			eModal.alert(option);
			setTimeout(function() {scF()}, 1700);
		}		
	}	
}
function followResource(){
	  window.location.href="menuWelcome.html";
}


function closeAnulacionAdmision(){
	var oCapa = document.getElementById("fondoCapaAnulacionAdmision");	
	var oCap = document.getElementById("capaAnulacionAdmision"); 
	oCapa.setAttribute("class", "");
	oCap.style.display = 'none';		
}

function setAnulacionAdmision(){
  var formElement = document.getElementById("frmAnulacionAdmision");      
  formElement.submit();
}

function respServFindOrdenPreRevision(resp){
	
	console.log(" response trama  " + resp)
	var lstScalar = resp.split("]");
	var strObject;	
	var pos;
	for (i = 0; i < lstScalar.length-1; i++) {
		strObject = lstScalar[i].split(";");
		var newCanvas = document.createElement("canvas");	
		newCanvas.setAttribute('width', '90%');	
		newCanvas.setAttribute('height', '45%');
		var contexto= newCanvas.getContext("2d")
		pos= i+1;
		var td = document.getElementById('td'+pos);		
		td.appendChild(newCanvas);
		contexto.beginPath();
		if (strObject[10] == "N") {
			if (strObject[1] == "Particular") {
				contexto.drawImage(imgPlacaAma, 0, 0, 89, 44);
			} else {
				contexto.drawImage(imgPlacaBlac, 0, 0, 89, 44);
			}
			contexto.font = "bold 15px sans-serif";
			var str = strObject[0].substring(0, 3) + "-"+ strObject[0].substring(3, 6);
			contexto.fillText(str, 9, 26);
		} else {
			contexto.drawImage(imgPlacaExtra, 0, 0, 89, 44);
			var str = strObject[0];
			contexto.font = "bold 15px sans-serif";
			contexto.fillText(str, 6, 26);
		}
		contexto.closePath();		
		td = document.getElementById('propietario'+pos);
		td.innerHTML = strObject[5];
		td = document.getElementById('tipoVehiculo'+pos);
		td.innerHTML = strObject[2];
		td = document.getElementById('tipoRevision'+pos);		
		if(strObject[3]=="true"){
			td.innerHTML = "R.T.M.";	
		}else{
			td.innerHTML = "PREVENTIVA";
		}
		td = document.getElementById('condicion'+pos);		
		if(strObject[8]=="1"){
			
			td.innerHTML = "PRIMERA VEZ.";	
		}else{
			td.innerHTML = "REINSPECCION";
		}
		td = document.getElementById('turno'+pos);		
		td.innerHTML =strObject[9];		
		var print = document.createElement("i");	
		print.setAttribute("class", "bottom fa fa-print fa-3x");		
		print.setAttribute("style", "color:#000;");		
		td = document.getElementById('planilla'+pos);
		td.appendChild(print);
		td.setAttribute("href",strObject[0]);
		
		
		var trash = document.createElement("i");	
		trash.setAttribute("class", "btn btn-block fa fa-trash fa-3x icon-bar");		
		trash.setAttribute("style", "color:#000;");
		td = document.getElementById('anular'+pos);
		td.appendChild(trash);
		td.setAttribute("href",strObject[0]);
		
		var follow = document.createElement("i");	
		follow.setAttribute("class", "bottom fa fa-angle-double-right fa-3x");		
		follow.setAttribute("style", "color:#000;");
		td = document.getElementById('irPreRevision'+pos);		
		td.appendChild(follow);
		td.setAttribute("href",strObject[7]+";"+strObject[8]+";"+ strObject[0].substring(0, 3) +"-"+strObject[0].substring(3, 6) );
		var hora =strObject[4].split(" ");
		td = document.getElementById('hora'+pos);
		td.innerHTML = hora[1].substring(0, 8);		
	}	// end cycle fort	
}


function doPlanilla(p,event){
	event.preventDefault();	
	var formElement = document.getElementById("findPlaca");
	document.getElementById("data").value= p.getAttribute("href");	
	document.getElementById("entidad").value="preRevision";
	formElement.submit();
}

function doPreRevision(p,event){
	event.preventDefault();	
	var entidad = "setCertPreRevision";
	var cadenaAtributos, streaming = "";
	cadenaAtributos = p.getAttribute("href");	
	streaming = entidad + "|" + cadenaAtributos;	
	doAjax('./ServicioBasicoControler.do', streaming,'respSetCertPreRevision', 'get', 0);		
}
function respSetCertPreRevision(resp){
	if(resp==2){
		option.message = " Disculpe, su session a expirado por inactividad ..!";
		eModal.alert(option);
		setTimeout(function() {scF()}, 1700);	   			
	}else{
	   window.location.href="RegCertificacionLicencia.html";
    }
}

function menuPrincipal(){
	window.location.href="menuWelcome.html";	
}

