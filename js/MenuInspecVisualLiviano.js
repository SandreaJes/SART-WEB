var rolPermitido="IPR";
var autorizado=false;
var aprobado="";
var imgPlacaAma = new Image();
var imgPlacaBlac = new Image();
var imgPlacaExtra = new Image();
imgPlacaAma.src="./img/PlacaAmarrilla.png";
imgPlacaBlac.src="./img/PlacaBlanca.png";
imgPlacaExtra.src="./img/placaVenezolana.png";
var enabledEnse =false;
var enabledTaxi =false;
var enabledPublic =false;

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

function scN(){ }

ctxReferencia="ladoRefIzq";

function cambiarLadoRef(){
	console.log(" ctx ladoRef "+ctxReferencia)
	if(ctxReferencia=="ladoRefIzq"){
	   ctxReferencia="ladoRefDer";
	   document.getElementById("ladoRefDer").style.visibility='hidden';		
	   document.getElementById("ladoRefIzq").style.visibility='visible';	
	}else{
	   ctxReferencia="ladoRefIzq";
	   document.getElementById("ladoRefDer").style.visibility='visible';		
	   document.getElementById("ladoRefIzq").style.visibility='hidden';
	}
}

function loadResource(resource){	
	if(particionCtxLLTI==false && resource=="Particion4Liviano"){
		optionValidador.subtitle = "Inf. Faltante"
		optionValidador.message = "Disculpe, NO HA COMPLETADO el Labrado de la LLanta Izquierda ..!";
		eModal.alert(optionValidador);
		return;
	}
	
  window.location.href=resource+".html";// tipo myme of resource	  
}

var resourceExtra;
function respFijarCtxLadoRef(resp){
	if(resp==2){
		optionSession.message ="Disculpe, su session a expirado por inactividad ..!";
		optionSession.title ="Sart 2.0.1";
		eModal.alert(optionSession);		
	}else{
		 window.location.href=resourceCtx+".html";// tipo myme of resource	
	}
}

function loadResourceExtra(){
	  window.location.href=resourceExtra+".html";// tipo myme of resource	
}

var ctxLLanta;
function mountFocus(obj){
	ctxLLanta=obj;
	setTimeout(function() {findProfundidaLabrado()}, 400);		
}

function setFocus(obj){
	if(obj=="llDent"){	
		if(document.getElementById('profLabrDD1').value.length<1 ){
	      $("#profLabrDD1").focus();
	      return;
		}
		if(document.getElementById('profLabrDD2').value.length<1 ){
		   $("#profLabrDD2").focus();
		   return;
		}
		if(document.getElementById('profLabrDD3').value.length<1 ){
		   $("#profLabrDD3").focus();
		   return;
		}
		if(document.getElementById('profLabrDD4').value.length<1 ){
			$("#profLabrDD4").focus();
			return;
		}
		if(document.getElementById('profLabrDI1').value.length<1 ){
		      $("#profLabrDI1").focus();
		      return;
			}
			if(document.getElementById('profLabrDI2').value.length<1 ){
			   $("#profLabrDI2").focus();
			   return;
			}
			if(document.getElementById('profLabrDI3').value.length<1 ){
			   $("#profLabrDI3").focus();
			   return;
			}
			if(document.getElementById('profLabrDI4').value.length<1 ){
				$("#profLabrDI4").focus();
				return;
			}
	}else{
		
		if(document.getElementById('profLabrTD1').value.length<1 ){
		      $("#profLabrTD1").focus();
		      return;
			}
			if(document.getElementById('profLabrTD2').value.length<1 ){
			   $("#profLabrTD2").focus();
			   return;
			}
			if(document.getElementById('profLabrTD3').value.length<1 ){
			   $("#profLabrTD3").focus();
			   return;
			}
			if(document.getElementById('profLabrTD4').value.length<1 ){
				$("#profLabrTD4").focus();
				return;
			}
			if(document.getElementById('profLabrTI1').value.length<1 ){
			      $("#profLabrTI1").focus();
			      return;
				}
				if(document.getElementById('profLabrTI2').value.length<1 ){
				   $("#profLabrTI2").focus();
				   return;
				}
				if(document.getElementById('profLabrTI3').value.length<1 ){
				   $("#profLabrTI3").focus();
				   return;
				}
				if(document.getElementById('profLabrTI4').value.length<1 ){
					$("#profLabrTI4").focus();
					return;
				}
				
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
} 

function scF(){
	window.location.href="menuWelcome.html";
}
 
function sc(){
	window.location.href="menuWelcome.html";	
}
function goToMenuLiviano(){
	window.location.href="menuPrincipalSART.html";	
}

window.onload = function() {
	var entidad = "existenciaSession";
	var cadenaAtributos, streaming = "";
	cadenaAtributos = "";
	streaming = entidad + "|" + cadenaAtributos;	
	doAjax('./ServicioBasicoControler.do', streaming,'respExistenciaSession', 'get', 0);
	
}

function respExistenciaSession(resp){
	console.log('exitsession '+resp);
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
			document.getElementById("nombreUsuario").innerHTML = "   " + atrSeg[1];
			var ruta = "./imagenes/fotosEmpresa/" + atrSeg[0] + ".png";		
			document.getElementById('fotoUsuario').setAttribute('src', ruta);
			document.getElementById('fkUsuario').value=atrSeg[0];			
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

function respGetCtxPruebas(resp) {
	console.log(' getCtxP '+resp);
	if (resp.length > 2) {
		var flujoCtxPrueba = resp.split(";");
		document.getElementById('nroTurno').innerHTML = flujoCtxPrueba[3];
		document.getElementById('condicion').innerHTML = flujoCtxPrueba[4];
		document.getElementById('TIPO').innerHTML = flujoCtxPrueba[5];		
		
		if(flujoCtxPrueba[8]=="Taxis_AplTaximetro") {
			console.log('entre logica sett taximetro  ');
			var id2 = document.getElementById("fucExtras");
			var ctxBtn = document.getElementById("ctxBtn");
			ctxBtn.innerHTML ="&nbsp;&nbsp;<b> TAXI </b>&nbsp;&nbsp;&nbsp;   ";			
			resourceExtra="VisualAplicaTaximetro";			
			ctxBtn.addEventListener("click",loadResourceExtra);						
			ctxBtn.setAttribute("class", "btn-taxi");			
			id2.setAttribute('style','visibility:visible');
			enabledTaxi=true;
		}
		
		if(flujoCtxPrueba[10]=="true") {
			enabledEnse=true;
			var id2 = document.getElementById("fucExtras");			
			var ctxBtn = document.getElementById("ctxBtn");
			resourceExtra="VisualEnseLiviano";			
			ctxBtn.addEventListener("click",loadResourceExtra);			
			ctxBtn.innerHTML ="Ensenaza"
			id2.setAttribute('style','visibility:visible');
			console.log('entre logica sett ensenanza ');			   		   
		}		
		var newCanvas = document.createElement("canvas");
		newCanvas.setAttribute('width', '100%');
		newCanvas.setAttribute('height', '50%');
		newCanvas.setAttribute('id', 'canvas');
		var td = document.getElementById('nroPlaca');
		td.appendChild(newCanvas);
		var contexto = newCanvas.getContext("2d");
		contexto.beginPath();
				
		console.log('pos 9 '+flujoCtxPrueba[9]);
		console.log('pos 10 '+flujoCtxPrueba[10]);
		console.log('pos 12 '+flujoCtxPrueba[12]);
		 if (flujoCtxPrueba[12] == "N") {
		    if (flujoCtxPrueba[6] == "Particular") {
			   contexto.drawImage(imgPlacaAma, 0, 0, 100, 50);
		    } else {
			  contexto.drawImage(imgPlacaBlac, 0, 0, 100, 50);
		    }
		    var str = flujoCtxPrueba[0].substring(0, 3) + "-"+ flujoCtxPrueba[0].substring(3, 6);
			ctxPlaca = flujoCtxPrueba[0];
			contexto.font = "bold 18px sans-serif";
			contexto.fillText(str, 8, 32);
		 } else {
			    resourceExtra="VisualPublicoLiviano";	
				enabledPublic =true;
				seccionPublica=true;
				newCanvas.addEventListener("click",loadResourceExtra);
				contexto.drawImage(imgPlacaExtra, 0, 0, 100, 50);
				var str = flujoCtxPrueba[0];
				contexto.font = "bold 18px sans-serif";
				contexto.fillText(str, 7, 34);
		  }
		 contexto.closePath();	
		
		document.getElementById('nroPrueba').value = flujoCtxPrueba[1]		
		
		ctxHojaPrueba = flujoCtxPrueba[7];
		var entidad = "viewControlSectLiviano";
		var cadenaAtributos, streaming = "";
		cadenaAtributos = "";
		streaming = entidad + "|" + cadenaAtributos;	
		doAjax('./ServicioBasicoControler.do', streaming,'respViewControlSectLiviano', 'get', 0);
	} else {
		if (resp == "2") {
			options.message = "Disculpe; su SESSION DE USUARIO se ha cerrado Por Inactividad ..!";
			callFunction = "irIndex";
			eModal.alert(options);
			return;
		}
		if (resp == "0") {
			options.message = "Disculpe; he Presentado Problemas al momento de cargar Las hojas de Pruebas Pendientes.!";
		}
		eModal.alert(options);
	}
}

var particion1Liviano=false;
var particion2Liviano=false;
var particion3Liviano=false;
var particion4Liviano=false;


var particionCtxLLDD=false;
var particionCtxLLDI=false;
var particionCtxLLTD=false;
var particionCtxLLTI=false;

var seccionProfundidad=false;
var seccionEnsenaza=false;
var seccionTaximetro=false;
var seccionPublica=false;

function respViewControlSectLiviano(resp) {
	console.log("resp of particion is "+resp)
	var flujoSecction = resp.split(";");
	var secc;
	var secc2;
	var secc3;
	var secc4;
	var secc5;
	var secc7;
	var secc8;
	if (flujoSecction[0]=="1") {
		console.log('entro a settera seccion  '+resp);
		secc =document.getElementById('llDentLiviano');
		secc2=document.getElementById('llTrasLiviano');		
		secc.setAttribute("class", "st0");
		secc2.setAttribute("class", "st0");
		seccionProfundidad=true;
	}
	ctxReferencia=flujoSecction[0];
	console.log(" MI CTX. REF IS  "+ctxReferencia)
	if(ctxReferencia=="ladoRefIzq"){
	   document.getElementById("ladoRefDer").style.visibility='hidden';		
	   document.getElementById("ladoRefIzq").style.visibility='visible';	
	}else{	   
	   document.getElementById("ladoRefDer").style.visibility='visible';		
	   document.getElementById("ladoRefIzq").style.visibility='hidden';
	}

	if (flujoSecction[1] == "1") {// LOGICA PARA LA PARTICION 1
		secc = document.getElementById('AlumbradoSenDer');
		secc5 = document.getElementById('interiorLivianoDer');
		var secc10 = document.getElementById('sistFrenoDer1');
		var secc11 = document.getElementById('sistFrenoDer2');
		secc10.setAttribute("class", "st1");
		secc11.setAttribute("class", "st1");
		secc2 = document.getElementById('micasTrasDer');
		secc3 = document.getElementById('micasDelantDer');
		secc7 = document.getElementById('retrovisorDer');
		var secc9 = document.getElementById('direccion');
		var secc13 = document.getElementById('exteriorLivianoDer');
		secc13.setAttribute("class", "st1");
		secc9.setAttribute("class", "st1");
		secc8 = document.getElementById('retrovisor');
		secc.setAttribute("class", "st1");
		secc2.setAttribute("class", "st1");
		secc3.setAttribute("class", "st1");
		secc5.setAttribute("class", "st1");
		secc7.setAttribute("class", "st1");
		particion1Liviano = true;
	}
	
	if (flujoSecction[2]=="1") {
		var secc1 = document.getElementById('inferiorFoso');
		var secc2 = document.getElementById('inferiorFoso1');
		secc1.setAttribute("class", "st1");
		secc2.setAttribute("class", "st1");			
		particion3Liviano=true;		
	}
	
	if (flujoSecction[3]=="1") {		
		var secc ;				
		var secc2;
		var secc4;		
		secc2 =document.getElementById('tanqueCombustible');
		secc3 =document.getElementById('inferiorFoso1');
		secc4 =document.getElementById('inferiorFoso');
		secc2.setAttribute("class", "st1");	
		secc3.setAttribute("class", "st1");
		secc4.setAttribute("class", "st1");
		particion4Liviano=true;
		document.getElementById("ladoRefDer").style.visibility='hidden';		
		document.getElementById("ladoRefIzq").style.visibility='visible';
	}
	
	if (flujoSecction[4]=="1") {		
		var secc =document.getElementById('exteriorLivianoIzq');				
		var secc2=document.getElementById('interiorLivianoIzq');
		var secc3=document.getElementById('sistFrenoIzq2');
		var secc4=document.getElementById('retrovisorIzq');
		var secc5=document.getElementById('AlumbradoSenIzq');
		var secc6=document.getElementById('habitaculoMotor');
		var secc7=document.getElementById('baul');
		secc.setAttribute("class", "st1");
		secc2.setAttribute("class", "st1");	
		secc3.setAttribute("class", "st1");
		secc4.setAttribute("class", "st1");
		secc5.setAttribute("class", "st1");
		secc6.setAttribute("class", "st1");
		secc7.setAttribute("class", "st1");
		particion2Liviano=true;
		
	}
	
	if (flujoSecction[5]=="1") {		
		
	}
	
	if (enabledEnse==true) {
		if (flujoSecction[5]=="1") {
			var id2 = document.getElementById("fucExtras");			
			id2.classList.remove("pulsate-bck");
			seccionEnsenaza=true;			
		}
	}else{
		seccionEnsenaza=true;
	}
	
	if (enabledTaxi==true) {
		if (flujoSecction[6]=="1") {
			var id2 = document.getElementById("fucExtras");			
			id2.classList.remove("pulsate-bck");
			seccionTaximetro=true;			
		}
	}else{
		seccionTaximetro=true;
	}
	
	if (enabledPublic ==true) {
		if (flujoSecction[8]=="1") {			
			seccionPublica=true;		
		}
	}else{
		seccionPublica=true;
	}
	
	if (flujoSecction[8] =="1") {
		var secc =document.getElementById('llDentDerLiviano');		
		secc.setAttribute("class", "st1");			
		particionCtxLLDD=true;		
	}
	if (flujoSecction[9] =="1") {
		var secc =document.getElementById('llDentIzqLiviano');		
		secc.setAttribute("class", "st1");			
		particionCtxLLDI=true;
		document.getElementById("ladoRefDer").style.visibility='visible';		
		document.getElementById("ladoRefIzq").style.visibility='hidden';
		var secc1 =document.getElementById('clicExteriorLivianoIzq');		
		secc1.setAttribute("class", "st1");
	}
	if (flujoSecction[10] =="1") {
		var secc =document.getElementById('llTrasIzqLiviano');		
		secc.setAttribute("class", "st1");			
		particionCtxLLTI=true;	
	}
	if (flujoSecction[11] =="1") {
		var secc =document.getElementById('llTrasDerLiviano');		
		secc.setAttribute("class", "st1");			
		particionCtxLLTD=true;	
				
	}
	
}

function registrarComentario(){
	var entidad = "servRegObservacionPruebas";	
	var cadenaAtributos, streaming = "";
	cadenaAtributos = document.getElementById("nroPrueba").value+";"+regProfundidad+"obs"+document.getElementById("comentarios").value;
	streaming = entidad + "|" + cadenaAtributos;	
	doAjax('./ServicioBasicoControler.do', streaming,'respServFindComentarioPruebas', 'get', 0);	
}

function respServFindComentarioPruebas(resp){	
	if (resp == "2") {
		options.message = "Disculpe; su SESSION DE USUARIO se ha cerrado Por Inactividad ..!";
		callFunction = "irIndex";
		eModal.alert(options);
		return;
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
			    document.getElementById("profLabrDD1").value=flujoLabrado[0];
			    document.getElementById("profLabrDD2").value=flujoLabrado[1];
			    document.getElementById("profLabrDD3").value=flujoLabrado[2];
			    document.getElementById("profLabrDD4").value=flujoLabrado[3];			
			    document.getElementById("profLabrDI1").value=flujoLabrado[4];
			    document.getElementById("profLabrDI2").value=flujoLabrado[5];
			    document.getElementById("profLabrDI3").value=flujoLabrado[6];
			    document.getElementById("profLabrDI4").value=flujoLabrado[7];			    
			    document.getElementById("profLabrTD1").value=flujoLabrado[8];
			    document.getElementById("profLabrTD2").value=flujoLabrado[9];
			    document.getElementById("profLabrTD3").value=flujoLabrado[10];
			    document.getElementById("profLabrTD4").value=flujoLabrado[11];			
			    document.getElementById("profLabrTI1").value=flujoLabrado[12];
			    document.getElementById("profLabrTI2").value=flujoLabrado[13];
			    document.getElementById("profLabrTI3").value=flujoLabrado[14];
			    document.getElementById("profLabrTI4").value=flujoLabrado[15];			    
			    if (flujoSecction[3]!= "x") {
			    	var flujoLabradoRepuesto = flujoSecction[3].split(",");
			    		
			    }else{
					setFocus(ctxLLanta);
					return;
				}		    
			    var refThis = document.getElementById("llDentLiviano");
		//		refThis.setAttribute("class", "st0");
				var refThis1 = document.getElementById("llTrasLiviano");
			   // refThis1.setAttribute("class", "st0");
			    seccionProfundidad=true;
			    validDD=true;
			    validTD=true;
			    var entidad = "setSeccionLabradoLiviano";
				var cadenaAtributos, streaming = "";
				cadenaAtributos = "";
				streaming = entidad + "|" + cadenaAtributos;	
				doAjax('./ServicioBasicoControler.do', streaming,'respsetSeccionLabrado', 'get', 0);
			}else{
				setFocus(ctxLLanta);				
			}
		}else{
			if (flujoSecction[2]!= "x") {
				var flujoLabrado = flujoSecction[2].split(",");
				document.getElementById("profLabrDD1").value=flujoLabrado[0];
			    document.getElementById("profLabrDD2").value=flujoLabrado[1];
			    document.getElementById("profLabrDD3").value=flujoLabrado[2];
			    document.getElementById("profLabrDD4").value=flujoLabrado[3];			
			    document.getElementById("profLabrDI1").value=flujoLabrado[4];
			    document.getElementById("profLabrDI2").value=flujoLabrado[5];
			    document.getElementById("profLabrDI3").value=flujoLabrado[6];
			    document.getElementById("profLabrDI4").value=flujoLabrado[7];			    
			    document.getElementById("profLabrTD1").value=flujoLabrado[8];
			    document.getElementById("profLabrTD2").value=flujoLabrado[9];
			    document.getElementById("profLabrTD3").value=flujoLabrado[10];
			    document.getElementById("profLabrTD4").value=flujoLabrado[11];			
			    document.getElementById("profLabrTI1").value=flujoLabrado[12];
			    document.getElementById("profLabrTI2").value=flujoLabrado[13];
			    document.getElementById("profLabrTI3").value=flujoLabrado[14];
			    document.getElementById("profLabrTI4").value=flujoLabrado[15];
			    //--------------------- logica de recogida de llanta de respuesto --------------
			    
			    if (flujoSecction[3]!= "x") {
			    	var flujoLabradoRepuesto = flujoSecction[3].split(",");
			    		
			    }else{
					setFocus(ctxLLanta);
					return;
				}		    			    
			    var refThis = document.getElementById("llDentLiviano");
				//refThis.setAttribute("class", "st0");
				var refThis1 = document.getElementById("llTrasLiviano");
			    //refThis1.setAttribute("class", "st0");
			    seccionProfundidad=true;
			    validDD=true;
			    validTD=true;
			    var entidad = "setSeccionLabradoLiviano";
				var cadenaAtributos, streaming = "";
				cadenaAtributos = "";
				streaming = entidad + "|" + cadenaAtributos;	
				doAjax('./ServicioBasicoControler.do', streaming,'respsetSeccionLabrado', 'get', 0);
			}else{
				setFocus(ctxLLanta);				
			}
		}
	}
}


function findComentario(){
	var entidad = "servFindEstadoPruebas";	
	console.log('servFindEstadoPruebas  ');
	var cadenaAtributos, streaming = "";
	cadenaAtributos = document.getElementById("nroPrueba").value;
	streaming = entidad + "|" + cadenaAtributos;	
	doAjax('./ServicioBasicoControler.do', streaming,'respServFindComentarioPruebas', 'get', 0);	
}

var regProfundidad="";
function respServFindComentarioPruebas(resp){
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
			document.getElementById("comentarios").value= lstObs[1]; 
		}
	}
}

function cerrarPrueba(){
	
	var envClosePrueba=true;
	
	if (particionCtxLLDI==false) {		
		envClosePrueba=false;
	}
	
    if (particionCtxLLTI==false) {		
		
		envClosePrueba=false;
	}
	
	if (particion1Liviano==false) {
		envClosePrueba=false;
		
	}
	
	if (particion2Liviano==false) {
		envClosePrueba=false;
		
	}
	
	if (particion3Liviano==false) {
		envClosePrueba=false;
		
	}
	
	
	
	if (particion4Liviano==false) {
		envClosePrueba=false;		
	}
	
	
	if (seccionEnsenaza==false) {
		envClosePrueba=false;
		
	}
	
	
	if (seccionTaximetro==false) {
		envClosePrueba=false;
		
	}
	
	if (seccionPublica==false) {		
		envClosePrueba=false;
	}
	
	if (envClosePrueba==false) {
		optionValidador.message = "Disculpe; No ha REVISADO Completamente el Vehiculo.!";
		optionValidador.subtitle = " Validacion"
		eModal.alert(optionValidador);	
	}else{
		var entidad = "setCierrePrueba";
		var cadenaAtributos, streaming = "";
		cadenaAtributos = document.getElementById("nroPrueba").value+";"+document.getElementById("fkUsuario").value;
		streaming = entidad + "|" + cadenaAtributos;
		doAjax('./ServicioBasicoControler.do', streaming,'respSetCierrePrueba', 'get', 0);
	}
}

function respSetCierrePrueba(resp) {
	optionValidador.title = "Sart 2.0.1";
	if (resp == 1 ) {		
		optionValidador.subtitle = "Confirmacion De Recepcion"
		optionValidador.message = "se ha CERRADO la Prueba Sensorial de una Manera Exitosa...!";
		
	} else {
		optionValidador.subtitle = "Problemas Encontrados"
		optionValidador.message = "Disculpe; he Presentado Problemas al Momento de CERRAR la Prueba Sensorial ..!";	
	}	
	eModal.alert(optionValidador);
	setTimeout(function() {goToMenuLiviano()},1000);
}

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
var validDD=false;
var validTD=false;
var ctxLLanta="";
function cargaProfundidad(obj) {
	var refThis = document.getElementById(obj);
	var cxtll1;
	var cxtll2;
	var cxtll3;
	var cxtll4;
	var validDatos =true;
	
	if(particion1Liviano == false){
		optionValidador.subtitle = "Inf. Faltante"
		optionValidador.message = "Disculpe, NO HA COMPLETADO la parte Interior de la Inspeccion Visual";
		eModal.alert(optionValidador);
		return;
	}	
	if(particionCtxLLDD==false && obj =="ctxLLTD"){
		optionValidador.subtitle = "Inf. Faltante"
		optionValidador.message = "Disculpe, NO HA COMPLETADO el Labrado de la LLanta Delantera Derecha ..!";
		eModal.alert(optionValidador);
		return;
	}	
	
	if (obj == "ctxLLDD") {
		cxtll1= document.getElementById("profLabrDD1");
		cxtll2= document.getElementById("profLabrDD2");
		cxtll3= document.getElementById("profLabrDD3");
		cxtll4= document.getElementById("profLabrDD4");	
	}
	
	if (obj == "ctxLLDI") {
		cxtll1= document.getElementById("profLabrDI1");
		cxtll2= document.getElementById("profLabrDI2");
		cxtll3= document.getElementById("profLabrDI3");
		cxtll4= document.getElementById("profLabrDI4");	
	}
	
	if (obj == "ctxLLResp") {
		cxtll1= document.getElementById("llantaRes1");
		cxtll2= document.getElementById("llantaRes2");
		cxtll3= document.getElementById("llantaRes3");
		cxtll4= document.getElementById("profLabrDI4");	
	}	
	
	if (obj == "ctxLLTI") {
		cxtll1= document.getElementById("profLabrTI1");
		cxtll2= document.getElementById("profLabrTI2");
		cxtll3= document.getElementById("profLabrTI3");
		cxtll4= document.getElementById("profLabrTI4");
	}	
	
	if (obj == "ctxLLTD") {
		cxtll1= document.getElementById("profLabrTD1");
		cxtll2= document.getElementById("profLabrTD2");
		cxtll3= document.getElementById("profLabrTD3");
		cxtll4= document.getElementById("profLabrTD4");	
	}
	
	console.log(' entre en logica de validar existan valores en las respectivas llantas ');
		
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

function respSerPersitProfLabrado(resp) {
	optionValidador.title = "Sart 2.0.1";
	console.log(' voy a setter seccionLabrado'+resp);	
	
	if (resp == "1" ) {
		seccionProfundidad=true;
		var entidad = "setSeccionLabradoLiviano";
		var cadenaAtributos, streaming = "";
		cadenaAtributos = "";
		streaming = entidad + "|" + cadenaAtributos;	
		doAjax('./ServicioBasicoControler.do', streaming,'respsetSeccionLabrado', 'get', 0);
	}
	
	if (resp =="ctxLLDD") {		
		window.location.href="Particion2Liviano.html";		
	}
	if (resp =="ctxLLTD") {		
		window.location.href="Particion3Liviano.html";		
	}
	if (resp =="ctxLLTI") {		
		window.location.href="Particion4Liviano.html";		
	}
	if (resp =="ctxLLDI") {		
		window.location.href="menuInspecVisuaLiviano.html";		
	}
			
}

function respsetSeccionLabrado(resp) {
	console.log('response settLabrado seccionLabrado '+resp);	
}