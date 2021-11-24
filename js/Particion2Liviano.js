
var rolPermitido="IPR";
var autorizado=false;
var aprobado="";
var imgPlacaAma = new Image();
var imgPlacaBlac = new Image();
imgPlacaAma.src="./img/PlacaAmarrilla.png";
imgPlacaBlac.src="./img/PlacaBlanca.png";
var lngDefectos;
var ctxMiga=0 ;
var faseComplExterior= false;
var seccionProfundidad=false;
var options = {
		message : "",
		title : 'Sart 2.0.1',
		size : 'lg',
		subtitle : ' Datos Faltantes',
		useBin : false,
		buttons: [
	        {text: 'Finalizar', style: 'info',   close: true, click:sc },
	        
	    ]
	};
var optionValidador = {
		message : "",
		title : ' Sart 2.0.1',
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
		title : 'Sart 2.0.1',
		size : 'lg',
		subtitle : ' Inf. Session',
		useBin : false,
		buttons: [
	        {text: 'OK', style: 'warning',   close: true, click:scF }	        
	    ]
	};

function beta(e) {
	key = e.KeyCode || e.which;	
	if (key == 8 || key == 0 ) {
		return true;
	}	
	teclado = String.fromCharCode(key);
	console.log('teclado  '+teclado);
	numeros = "0123456789.";
	especiales = "8-111";
	teclado_especial = false;
	for ( var i in especiales) {
		if (key === especiales[i]) {
			teclado_especial = true;
			// break;
		}
	}
	if (numeros.indexOf(teclado) === -1 && !teclado_especial) {
		//alert (key);
		return false;
	}
}

function findProfundidaLabrado(){
	var entidad = "servFindEstadoPruebas";	
	console.log('servFindEstadoPruebas  ');
	var cadenaAtributos, streaming = "";
	cadenaAtributos = document.getElementById("nroPrueba").value;
	streaming = entidad + "|" + cadenaAtributos;	
	doAjax('./ServicioBasicoControler.do', streaming,'respServFindProfundidaLabrado', 'get', 0);	
}

function setFocus(){
if(document.getElementById('llantaRes1').value.length<1 ){
    $("#llantaRes1").focus();
    return;
	}
	if(document.getElementById('llantaRes2').value.length<1 ){
	   $("#llantaRes2").focus();
	   return;
	}
	if(document.getElementById('llantaRes3').value.length<1 ){
	   $("#llantaRes3").focus();
	   return;
	}
	if(document.getElementById('llantaRes4').value.length<1 ){
		$("#llantaRes4").focus();
		return;
	}
}	

function respServFindProfundidaLabrado(resp){	
	console.log('servFindEstadoPruebas  '+resp);		
	if (resp == "2") {
		options.message = "Disculpe; su SESSION DE USUARIO se ha cerrado Por Inactividad ..!";
		callFunction = "irIndex";
		eModal.alert(options);
		return;
	}
	if (resp.length > 3) {
		var flujoSecction = resp.split(";");
		var lstObs = flujoSecction[1].split("obs");		
		if (lstObs.length> 1) {
			regProfundidad= lstObs[0];	
			console.log('respLabrado  '+flujoSecction[2]);
			if (flujoSecction[2]!= "x") {
				var flujoLabrado = flujoSecction[2].split(",");
			    		    
			    if (flujoSecction[3]!= "x") {
			    	var flujoLabradoRepuesto = flujoSecction[3].split(",");
			    	document.getElementById("llantaRes1").value= flujoLabradoRepuesto[0];
				    document.getElementById("llantaRes2").value= flujoLabradoRepuesto[1];
				    document.getElementById("llantaRes3").value= flujoLabradoRepuesto[2];
				    document.getElementById("llantaRes4").value= flujoLabradoRepuesto[3];	
			    }else{
					setFocus();
					return;
				}		    
			    var refThis = document.getElementById("llDentLiviano");
				refThis.setAttribute("class", "st0");
				var refThis1 = document.getElementById("llTrasLiviano");
			    refThis1.setAttribute("class", "st0");
			    seccionProfundidad=true;			    		    
			}else{
				setFocus();				
			}
		}else{
			if (flujoSecction[2]!= "x") {
				var flujoLabrado = flujoSecction[2].split(",");
				

			    //--------------------- logica de recogida de llanta de respuesto --------------
			    
			    if (flujoSecction[3]!= "x") {
			    	var flujoLabradoRepuesto = flujoSecction[3].split(",");
			    	document.getElementById("llantaRes1").value= flujoLabradoRepuesto[0];
				    document.getElementById("llantaRes2").value= flujoLabradoRepuesto[1];
				    document.getElementById("llantaRes3").value= flujoLabradoRepuesto[2];
				    document.getElementById("llantaRes4").value= flujoLabradoRepuesto[3];	
			    }else{
					setFocus();
					return;
				}			    
			    seccionProfundidad=true;			    
			}else{
				setFocus();				
			}
		}
	}
}

function scN(){
		
}
function returnMenuLiviano(){	
	if(faseComplExterior==false){
		options.message = "Disculpe; se le Recuerda que no ha Terminado de Revisar toda la Session ..!";
		eModal.alert(options);
	}else{
		var entidad = "setParticion2Liviano";
		var cadenaAtributos, streaming = "";
		cadenaAtributos = "";
		streaming = entidad + "|" + cadenaAtributos;	
		doAjax('./ServicioBasicoControler.do', streaming,'respSetParticion1Liviano', 'get', 0);
	}	
}

function respSetParticion1Liviano(){
	window.location.href="menuInspecVisuaLiviano.html";
} 

function scF(){
	window.location.href="menuWelcome.html";
}
 
function sc(){
	window.location.href="menuInspecVisuaLiviano.html";	
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
		optionSession.title ="Sart 2.0.1";
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
	console.log('lng Migas  '+allLink.length);
	if(ctxMiga==allLink.length){
		console.log('Reiniciando Carrusel Miga  ');
		ctxMiga=0;
		faseComplExterior= true;
		if(seccionProfundidad==true){			
			returnMenuLiviano();	
		}else{
			optionValidador.subtitle = "Inf. Faltante Labrado"
			optionValidador.message = "Disculpe, Falta Informacion en la Profundidad de Labrado...!";
			eModal.alert(optionValidador);
			return;
		}
		
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

var ctxLLanta="";
function cargaProfundidad(obj) {
	console.log(' entre en logica de validar existan valores en las respectivas llantas ');
	var cxtll1;
	var cxtll2;
	var cxtll3;
	var cxtll4;
	var validDatos =true;	
		console.log(' entre en logica de validar existan valores en las respectivas llantas ');
	
		if (document.getElementById('aplicLabrado').checked == true) {
			var entidad = "SectControlLabrado";
			var cadenaAtributos, streaming = "";		
			cadenaAtributos = document.getElementById("nroPrueba").value+"/"+ obj+",N/A"+",N/A"+",N/A"+",N/A"+"!N/A";
			console.log(' is '+cadenaAtributos);
			streaming = entidad + "|" + cadenaAtributos;		
			doAjax('./ServicioBasicoControler.do', streaming,'respSerPersitProfLabrado', 'get', 0);	
			
		}else{
			cxtll1= document.getElementById("llantaRes1");
			cxtll2= document.getElementById("llantaRes2");
			cxtll3= document.getElementById("llantaRes3");
			cxtll4= document.getElementById("llantaRes4");
			if (cxtll1.value.length == 0) {	
				validDatos=false;			
			}
			
			if (cxtll2.value.length == 0) {			
				validDatos=false;
			}		
			if (cxtll3.value.length == 0) {			
				validDatos=false;
			}		
			if (cxtll4.value.length == 0) {			
				validDatos=false;
			}
			
			if (validDatos == false) {
				optionValidador.subtitle = "Inf. Faltante Labrado"
				optionValidador.message = "Disculpe, Falta Informacion en la Profundidad de Labrado...!";
				eModal.alert(optionValidador);
				return;
			}
			//** LOGICA DE TRASERA DERECHA
			var ctxMinLL;
			if (parseFloat(cxtll1.value)< parseFloat(cxtll2.value)) {
				ctxMinLL=cxtll1.value;
				console.log('cxtll1  is menor '+ctxMinLL);
			}else{
				ctxMinLL=cxtll2.value;
				console.log('cxtll2 is menor '+ctxMinLL);
			}
			
			if (parseFloat(ctxMinLL)> parseFloat(cxtll3.value)) {
				ctxMinLL=cxtll3.value;
			}
			console.log('txtTraTD   menor is '+ctxMinLL);
			if (parseFloat(ctxMinLL)> parseFloat(cxtll4.value)) {
				ctxMinLL=cxtll4.value;		
			}
			console.log('ctxMinLL  menor is '+ctxMinLL);
			//** FIN DE LOGICA DEL MINIMO EN ctxLlanta
		    //minDD+"$"+minDI+"$"+minTD+"$"+minTI+"$"+"$"+minLLResp	
			var entidad = "SectControlLabrado";
			var cadenaAtributos, streaming = "";		
			cadenaAtributos = document.getElementById("nroPrueba").value+"/"+ obj+","+ cxtll1.value+","+cxtll2.value+","+cxtll3.value+","+cxtll4.value+"!"+ctxMinLL;
			console.log(' is '+cadenaAtributos);
			streaming = entidad + "|" + cadenaAtributos;		
			doAjax('./ServicioBasicoControler.do', streaming,'respSerPersitProfLabrado', 'get', 0);		
		}
		
		   
}

function respSerPersitProfLabrado(resp) {
	optionValidador.title = "Sart 2.0.1";
	console.log(' voy a setter seccionLabrado'+resp);	
	
	seccionProfundidad=true;
	var entidad = "setSeccionLabradoLiviano";
	var cadenaAtributos, streaming = "";
	cadenaAtributos = "";
	streaming = entidad + "|" + cadenaAtributos;	
	doAjax('./ServicioBasicoControler.do', streaming,'respsetSeccionLabrado', 'get', 0);
	
	if(faseComplExterior==true){
		returnMenuLiviano();
	}	
}

function respsetSeccionLabrado(resp) {
	console.log('response settLabrado seccionLabrado '+resp);	
}


function callCtxMiga(){   
   var entidad = "servCtxShowDefectos";
   var cadenaAtributos, streaming = "";
   cadenaAtributos = document.getElementById('nroPrueba').value +";1;2;"+ctxMiga;// el primero es la Tipodelvehiculo 		
   streaming = entidad + "|" + cadenaAtributos;
   doAjax('./ServicioBasicoControler.do', streaming,'respCtxShowDefectos', 'get', 0);
}
function callCtxMigaDef(objCtx){
	clearTable();
	linkMiga = document.getElementById(objCtx);
	linkMiga.className = "ctxMiga";
	var entidad = "servCtxShowDefectos";
	var cadenaAtributos, streaming = "";
	cadenaAtributos = document.getElementById('nroPrueba').value +";1;2;"+objCtx;		
	streaming = entidad + "|" + cadenaAtributos;	
	doAjax('./ServicioBasicoControler.do', streaming,'respCtxShowDefectos', 'get', 0);
}

function respGetCtxPruebas(resp) {	
	if (resp.length > 2) {
		var flujoCtxPrueba = resp.split(";");		
		var newCanvas = document.createElement("canvas");		
		newCanvas.setAttribute('width', '225%');
		newCanvas.setAttribute('height', '125%');
		newCanvas.setAttribute('id', 'canvas');
		var td = document.getElementById('placaRecepcion');
		td.appendChild(newCanvas);
		var contexto = newCanvas.getContext("2d");
		contexto.beginPath();
		if (flujoCtxPrueba[6] == "Particular") {
			contexto.drawImage(imgPlacaAma,0,0,229,127);
		} else {
			contexto.drawImage(imgPlacaBlac, 0, 0, 229,127);
		}
		document.getElementById('nroPrueba').value = flujoCtxPrueba[1]
		var str = flujoCtxPrueba[0].substring(0, 3) + "-" + flujoCtxPrueba[0].substring(3, 6);
		ctxPlaca = flujoCtxPrueba[0];
		contexto.font = "bold 47px sans-serif";
		contexto.fillText(str, 23, 78);
		contexto.closePath();
		ctxHojaPrueba = flujoCtxPrueba[7];
		var entidad = "viewControlSectLiviano";
		var cadenaAtributos, streaming = "";
		cadenaAtributos = "";
		streaming = entidad + "|" + cadenaAtributos;	
		doAjax('./ServicioBasicoControler.do', streaming,'respViewControlSectLiviano', 'get', 0);
		findProfundidaLabrado();
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

function respViewControlSectLiviano(resp) {
	console.log('Validando finish of seccion  '+resp);
	var flujoSecction = resp.split(";");
	if (flujoSecction[2]=="1") {
		faseComplExterior= true;
	}
	changeCtxMiga();
}


function respCtxShowDefectos(resp) {
	if (resp == "2") {
		options.message = "Disculpe; su SESSION DE USUARIO se ha cerrado Por Inactividad ..!";		
		eModal.alert(options);
		setTimeout(function() {sc()}, 1700);
		return;
	}
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
	var lngDefecto	= parseInt((lstDefectos.length-1))* 69;	
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
