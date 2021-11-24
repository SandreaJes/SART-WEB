
var eve;
var iframe;
window.onload = function() {	   
	var entidad = "servFindOrdenBienvenida";
	var cadenaAtributos, streaming = "";
	cadenaAtributos = "";
	streaming = entidad + "|" + cadenaAtributos;	
	doAjax('./ServicioBasicoControler.do', streaming,'respServFindOrdenBienvenida', 'get', 0);	
}

function respServFindOrdenBienvenida(resp){			
	var atrSeg = resp.split("&%");	
	document.getElementById("ordenBienvenida").innerHTML = "   " + atrSeg[0];	
	document.getElementById("ordenContrato").innerHTML = "   " + atrSeg[1];
}

