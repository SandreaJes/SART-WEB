
var rolPermitido="IPR";
var autorizado=false;
var aprobado="";
var imgPlacaAma = new Image();
var imgPlacaBlac = new Image();
imgPlacaAma.src="./img/PlacaAmarrilla.png";
imgPlacaBlac.src="./img/PlacaBlanca.png";
var lngDefectos;
var ctxMiga=0 ;
var faseComplSistFreno= false;
var options = {
		message : "",
		title : 'Sart 2.0.0',
		size : 'lg',
		subtitle : ' Datos Faltantes',
		useBin : false,
		buttons: [
	        {text: 'Finalizar', style: 'info',   close: true, click:sc },
	        
	    ]
	};
var optionValidador = {
		message : "",
		title : ' Sart 2.0.0',
		size : 'lg',
		subtitle : ' Datos Faltantes',
		 overlayColor: "#000", 
		useBin : false,
		buttons: [
	        {text: 'Aceptar', style: 'info',   close: true, click:scN },
	        
	    ]
	};

var optionSession = {
		message : "",
		title : 'Sart 2.0.0',
		size : 'lg',
		subtitle : ' Inf. Session',
		useBin : false,
		buttons: [
	        {text: 'OK', style: 'warning',   close: true, click:scF }	        
	    ]
	};

function scN(){
		
}
function returnMenuMoto(){	
	if(faseComplSistFreno==false){
		options.message = "Disculpe; se le Recuerda que no ha Terminado de Revisar toda la Session ..!";
		eModal.alert(options);
	}else{
		var entidad = "setSeccionFrenoMoto";
		var cadenaAtributos, streaming = "";
		cadenaAtributos = "";
		streaming = entidad + "|" + cadenaAtributos;	
		doAjax('./ServicioBasicoControler.do', streaming,'respSetControlSectMoto', 'get', 0);
	}	
}
function respSetControlSectMoto(){
	window.location.href="menuInspecVisualMoto.html";
} 

function scF(){
	window.location.href="menuWelcome.html";
}
 
function sc(){
	window.location.href="menuInspecVisualMoto.html";	
}
window.onload = function() {
	var entidad = "existenciaSession";
	var cadenaAtributos, streaming = "";
	cadenaAtributos = "";
	streaming = entidad + "|" + cadenaAtributos;	
	doAjax('./ServicioBasicoControler.do', streaming,'respExistenciaSession', 'get', 0);
}
function respExistenciaSession(resp){	
	if(resp==0){
		optionSession.message ="Disculpe, su session a expirado por inactividad ..!";
		optionSession.title ="Sart 2.0";
		eModal.alert(optionSession);		
	}else{
		var atrSeg = resp.split(";");
		var arrRol = rolPermitido.split(";");
		for(index = 0;  index < arrRol.length;  index++) {			
	        if(arrRol[index]==atrSeg[5]){
	        	autorizado=true;
	        }
	    }		
		if(autorizado==true){			
			var entidad = "getCtxPruebas";
			var cadenaAtributos, streaming = "";
			cadenaAtributos = "";
			streaming = entidad + "|" + cadenaAtributos;	
			doAjax('./ServicioBasicoControler.do', streaming,'respGetCtxPruebas', 'get', 0);			
		}else{
			options.message = " Disculpe, usted no Posee un ROL Autorizado para entrar en este Modulo ..!";
			eModal.alert(options);
			setTimeout(function() {scF()}, 1700);
		}
	}
}
function changeCtxMiga(){
	clearTable();
	var allLink = document.getElementsByTagName('a');   
	if(ctxMiga==allLink.length){
		console.log('Reiniciando Carrusel Miga  ');
		ctxMiga=0;
		faseComplSistFreno= true;
		console.log('Seccion Terminada ');
	}
	ctxMiga++;
	console.log('Valor Miga actual '+ctxMiga);
	linkMiga = document.getElementById(ctxMiga);
	linkMiga.className = "ctxMiga";	
	callCtxMiga();
}

function clearTable(){
   var elmtTable = document.getElementById('responseDefectos');   
   elmtTable.innerHTML = "";
   elmtTable.innerHTML = "<tbody> </tbody>"; 
   var allLink = document.getElementsByTagName('a');   
   for (var x=0; x<allLink.length; x++) {
	   allLink[x].className = "";	   
   }   
}

function callCtxMiga(){   
   var entidad = "servCtxShowDefectos";
   var cadenaAtributos, streaming = "";
   cadenaAtributos = document.getElementById('nroPrueba').value +";4;1;"+ctxMiga;		
   streaming = entidad + "|" + cadenaAtributos;
   doAjax('./ServicioBasicoControler.do', streaming,'respCtxShowDefectos', 'get', 0);
}
function callCtxMigaDef(objCtx){
	clearTable();
	linkMiga = document.getElementById(objCtx);
	linkMiga.className = "ctxMiga";
	var entidad = "servCtxShowDefectos";
	var cadenaAtributos, streaming = "";
	cadenaAtributos = document.getElementById('nroPrueba').value +";4;1;"+objCtx;		
	streaming = entidad + "|" + cadenaAtributos;	
	doAjax('./ServicioBasicoControler.do', streaming,'respCtxShowDefectos', 'get', 0);
}

function respGetCtxPruebas(resp) {
	if (resp == "2") {
		options.message = "Disculpe; su SESSION DE USUARIO se ha cerrado Por Inactividad ..!";		
		eModal.alert(options);
		setTimeout(function() {sc()}, 1700);
		return;
	}
	if (resp.length > 2) {
		var flujoCtxPrueba = resp.split(";");		
		var newCanvas = document.createElement("canvas");		
		newCanvas.setAttribute('width', '130%');
		newCanvas.setAttribute('height', '65%');
		newCanvas.setAttribute('id', 'canvas');
		var td = document.getElementById('placaRecepcion');
		td.appendChild(newCanvas);
		var contexto = newCanvas.getContext("2d");
		contexto.beginPath();
		if (flujoCtxPrueba[6] == "Particular") {
			contexto.drawImage(imgPlacaAma,0,0,132,67);
		} else {
			contexto.drawImage(imgPlacaBlac, 0, 0, 132,67);
		}
		document.getElementById('nroPrueba').value = flujoCtxPrueba[1]
		var str = flujoCtxPrueba[0].substring(0, 3) + "-" + flujoCtxPrueba[0].substring(3, 6);
		ctxPlaca = flujoCtxPrueba[0];
		contexto.font = "bold 24px sans-serif";
		contexto.fillText(str, 15, 43);
		contexto.closePath();
		ctxHojaPrueba = flujoCtxPrueba[7];
		var entidad = "viewControlSectMoto";
		var cadenaAtributos, streaming = "";
		cadenaAtributos = "";
		streaming = entidad + "|" + cadenaAtributos;	
		doAjax('./ServicioBasicoControler.do', streaming,'respViewControlSectMoto', 'get', 0);		
	} else {
		if (resp == "2") {
			options.message = "Disculpe; su SESSION DE USUARIO se ha cerrado Por Inactividad ..!";
			callFunction = "irIndex";
			eModal.alert(options);
			return;
		}
		if (resp == "0") {
			options.message = "Disculpe; he Presentado Problemas Consulte a Equipo Soporte Tecnico ..!";
		}
		eModal.alert(options);
	}
}

function respViewControlSectMoto(resp) {
	console.log('Validando finish of seccion  '+resp);
	var flujoSecction = resp.split(";");
	if (flujoSecction[0]=="1") {
		faseComplSistFreno= true;
	}
	changeCtxMiga();
}


function respCtxShowDefectos(resp) {	
	console.log("response "+resp);
	var lstDefectos = resp.split("$");
	var tblDefectos =  document.getElementById('responseDefectos');
	var body = tblDefectos.tBodies[0];
	var arrDefecto;
	var trDefectos;
	var tdFila;
	var textoCelda;	
	var chEstado;	
	for(index = 0;  index < lstDefectos.length-1;  index++) {		
		arrDefecto = lstDefectos[index].split(";");
		trDefectos = document.createElement("tr");
		tdFila = document.createElement("td");
		chEstado = document.createElement("INPUT");
		tdFila.setAttribute("id", "defecto"+index);
		chEstado.setAttribute("type", "checkbox");
		chEstado.setAttribute("id", "estado"+index);
		if(arrDefecto[4]=="1"){			
			chEstado.setAttribute("checked", "checked");
			tdFila.className = "mark";			
        }else{        	
        	chEstado.removeAttribute('checked');
        	tdFila.className = "";
        }		
		chEstado.setAttribute('onclick','changeEdoDefecto('+index+')');
		chEstado.setAttribute('value',arrDefecto[0]);		
		textoCelda = document.createTextNode(arrDefecto[1]);
		tdFila.appendChild(textoCelda);
		trDefectos.appendChild(tdFila);		
		tdFila = document.createElement("td");
		tdFila.appendChild(chEstado);
		trDefectos.appendChild(tdFila);	
		body.appendChild(trDefectos);		
    }
	var contenedor =  document.getElementById('ContenedorPrincipal');	
	var lngDefecto	= parseInt((lstDefectos.length-1))* 72;	
	var heigtCont= parseInt(lngDefecto)+325;	
	contenedor.style.height = heigtCont+'px';
	lngDefectos = parseInt((lstDefectos.length-1));	
}

var posEstado;
function changeEdoDefecto(index) {	
	var chckEstado =  document.getElementById("estado"+index);
	var entidad = "servSetDefectoPrueba";
	var cadenaAtributos, streaming = "";
	posEstado= index;
	if (chckEstado.checked) {		
		cadenaAtributos = "add"+";"+document.getElementById('nroPrueba').value +";"+chckEstado.value;				
	}else{
		cadenaAtributos = "remove"+";"+document.getElementById('nroPrueba').value +";"+chckEstado.value;
	}		
	streaming = entidad + "|" + cadenaAtributos;
	doAjax('./ServicioBasicoControler.do', streaming,'respSetDefectoPrueba', 'get', 0);
}

function respSetDefectoPrueba(resp) {
	var tdDefecto =  document.getElementById("defecto"+posEstado);
	if(resp=="1") { // fue agregada	
		tdDefecto.className = "mark";
	}
	if(resp=="2") {	// fue eliminada
		tdDefecto.className = "";
	}	
	if(resp=="0") {	// error en la transaccion
		tdDefecto.className = "errorT";
	}	
}