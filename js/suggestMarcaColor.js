function autocomplete(inp, arr) {
  /*the autocomplete function takes two arguments,
  the text field element and an array of possible autocompleted values:*/	
  var currentFocus;
  /* execute a function when someone writes in the text field:*/
  
      var a, b, i;
      /*close any already open lists of autocompleted values*/      
      closeAllLists();
     
      currentFocus = -1;
      /*create a DIV element that will contain the items (values):*/
     
      a = document.createElement("DIV");
      a.setAttribute("id", this.id + "autocomplete-listM");
      a.setAttribute("class", "autocomplete-itemsM");
     
      /*append the DIV element as a child of the autocomplete container:*/      
      inp.parentNode.appendChild(a);      
      console.log(" lng recogido "+arr.length );
      /*for each item in the array...*/
      for (i = 0; i < arr.length; i++) {    	  
        /* data[num].valuecheck if the item starts with the same letters as the text field value:*/
    	    
         /*create a DIV element for each matching element:*/        	
          b = document.createElement("DIV");
          b.setAttribute("id","listM"+i);
          
          /*make the matching letters bold:*/
          b.innerHTML = "<strong>" + arr[i].name.substr(0, inp.value.length) + "</strong>";
          
          
          b.innerHTML += arr[i].name.substr(inp.value.length);          
          /*insert a input field that will hold the current array item's value:*/
          b.innerHTML += "<input type='hidden' value='" + arr[i].name + "' name='" + arr[i].value + "'>";
          
          /*execute a function when someone clicks on the item value (DIV element):*/
          b.addEventListener("click", function(e) {
              /*insert the value for the autocomplete text field:*/        	  
              inp.value = this.getElementsByTagName("input")[0].value;
              document.getElementById("idMarca").value=this.getElementsByTagName("input")[0].name;
              inp.classList.add("autocomplete-activeM");
              /*close the list of autocompleted values,
              (or any other open lists of autocompleted values:*/
              closeAllLists();
          });          
          a.appendChild(b);
          
        
      }

  /*execute a function presses a key on the keyboard:*/
  inp.addEventListener("keydown", function(e) {
      var x = document.getElementById(this.id + "autocomplete-listM");
      if (x) x = x.getElementsByTagName("div");
      if (e.keyCode == 40) {
        /*If the arrow DOWN key is pressed,
        increase the currentFocus variable:*/
        currentFocus++;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode == 38) { //up
        /*If the arrow UP key is pressed,
        decrease the currentFocus variable:*/
        currentFocus--;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode == 13) {
        /*If the ENTER key is pressed, prevent the form from being submitted,*/
        e.preventDefault();
        if (currentFocus > -1) {
          /*and simulate a click on the "active" item:*/
          if (x) x[currentFocus].click();
        }
      }
  });
  function addActive(x) {
    /*a function to classify an item as "active":*/
    if (!x) return false;
    /*start by removing the "active" class on all items:*/
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = (x.length - 1);
    /*add class "autocomplete-active":*/
    x[currentFocus].classList.add("autocomplete-activeM");
  }
  function removeActive(x) {
    /*a function to remove the "active" class from all autocomplete items:*/
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-activeM");
    }
  }
  
  
  function closeAllLists(elmnt) {
    /*close all autocomplete lists in the document,
    except the one passed as an argument:*/
    var x = document.getElementsByClassName("autocomplete-itemsM");
    for (var i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }
  /*execute a function when someone clicks in the document: HTMLDivElement*/
  document.addEventListener("click", function (e) {	  
  console.log(" click from " + e.target.id);
		if (e.target.id == "marca" || e.target.id.startsWith("listM")) {
			var p = e.target.innerHTML;
			if (p.startsWith("<strong>")) {
				console.log(" click from DivElemnt");
			} else {
				document.getElementById("marca").value = "";
				document.getElementById("idMarca").value = "";
				console.log(" click NOT from DivElemnt");
			}
			closeAllLists(e.target);
		}
  });
}

function servRemoveActiveM(x) {
	  x.classList.remove("autocomplete-activeM");
	  document.getElementById("idMarca").value= "";
	  document.getElementById("marca").value= "";
}
/*An array containing all the country names in the world:*/
var posCharc=false;
function servFindMarca(obj) {
	console.log(" load methodos Marca");
	if(obj.value.length==2) {	
		var entidad = "servFindMarcaByName";
	    var streaming="";  
	    var cadenaAtributos, streaming = "";
		cadenaAtributos = obj.value;
		streaming = entidad + "|" + cadenaAtributos;	
		doAjax('./ServicioBasicoControler.do', streaming,'respTakeMarca', 'get', 0);    
	 }
	if(obj.value.length==3) {	
		var entidad = "servFindMarcaByName";
	    var streaming="";  
	    var cadenaAtributos, streaming = "";
		cadenaAtributos = obj.value;
		streaming = entidad + "|" + cadenaAtributos;	
		doAjax('./ServicioBasicoControler.do', streaming,'respTakeMarca', 'get', 0);    
 }
 if(obj.value.length==4) {	
	 var entidad = "servFindMarcaByName";
	    var streaming="";  
	    var cadenaAtributos, streaming = "";
		cadenaAtributos = obj.value;
		streaming = entidad + "|" + cadenaAtributos;	
		doAjax('./ServicioBasicoControler.do', streaming,'respTakeMarca', 'get', 0);    
	 }
 if(obj.value.length==5) {	
	 var entidad = "servFindMarcaByName";
	    var streaming="";  
	    var cadenaAtributos, streaming = "";
		cadenaAtributos = obj.value;
		streaming = entidad + "|" + cadenaAtributos;	
		doAjax('./ServicioBasicoControler.do', streaming,'respTakeMarca', 'get', 0);    
	 }
 if(obj.value.length==6) {	
	 var entidad = "servFindMarcaByName";
	    var streaming="";  
	    var cadenaAtributos, streaming = "";
		cadenaAtributos = obj.value;
		streaming = entidad + "|" + cadenaAtributos;	
		doAjax('./ServicioBasicoControler.do', streaming,'respTakeMarca', 'get', 0);    
	 }
 if(obj.value.length==7) {	
	 var entidad = "servFindMarcaByName";
	    var streaming="";  
	    var cadenaAtributos, streaming = "";
		cadenaAtributos = obj.value;
		streaming = entidad + "|" + cadenaAtributos;	
		doAjax('./ServicioBasicoControler.do', streaming,'respTakeMarca', 'get', 0);    
	 }
 if(obj.value.length==8) {	
	 var entidad = "servFindMarcaByName";
	    var streaming="";  
	    var cadenaAtributos, streaming = "";
		cadenaAtributos = obj.value;
		streaming = entidad + "|" + cadenaAtributos;	
		doAjax('./ServicioBasicoControler.do', streaming,'respTakeMarca', 'get', 0);    
	 }
  if(obj.value.length==9) {
	  var entidad = "servFindMarcaByName";
	    var streaming="";  
	    var cadenaAtributos, streaming = "";
		cadenaAtributos = obj.value;
		streaming = entidad + "|" + cadenaAtributos;	
		doAjax('./ServicioBasicoControler.do', streaming,'respTakeMarca', 'get', 0);    
	 }
  if(obj.value.length==10) {
	  var entidad = "servFindMarcaByName";
	    var streaming="";  
	    var cadenaAtributos, streaming = "";
		cadenaAtributos = obj.value;
		streaming = entidad + "|" + cadenaAtributos;	
		doAjax('./ServicioBasicoControler.do', streaming,'respTakeMarca', 'get', 0);    
	 }  
}

function respTakeMarca(resp){
	 if (resp!="yaCargo"){
		    var respItem= resp.split("!");                                        
		    var cadenaRespuesta="";
		    var atributos ;
		    d_count=0;
		    var countries = [];		    
		    for(var i=0,len = respItem.length; i< len -1;i++){                                        	
		        atributos = respItem[i].split(";");		        
		        countries.push({value: atributos[0] , name: atributos[1]});       
		    }
		    autocomplete(document.getElementById("marca"), countries);    
		  }
	
}


/*initiate the autocompleteColores Logic Busssinees function on the "myColor" element,*/



function autocompleteColores(inp, arr) {
	  /*the autocomplete function takes two arguments,
	  the text field element and an array of possible autocompleted values:*/	
	  var currentFocus;
	  /* execute a function when someone writes in the text field:*/
	  
	  
	  
	      var a, b, i;
	      /*close any already open lists of autocompleted values*/      
	      closeAllLists();
	     
	      currentFocus = -1;
	      /*create a DIV element that will contain the items (values):*/
	     
	      a = document.createElement("DIV");
	      a.setAttribute("id", this.id + "autocomplete-listC");
	      a.setAttribute("class", "autocomplete-itemsC");
	     
	      /*append the DIV element as a child of the autocomplete container:*/      
	      inp.parentNode.appendChild(a);      
	      console.log(" lng recogido "+arr.length );
	      /*for each item in the array...*/
	      for (i = 0; i < arr.length; i++) {    	  
	        /* data[num].valuecheck if the item starts with the same letters as the text field value:*/
	    	    
	         /*create a DIV element for each matching element:*/        	
	          b = document.createElement("DIV");
	          b.setAttribute("id","listC"+i);
	          
	          /*make the matching letters bold:*/
	          b.innerHTML = "<strong>" + arr[i].name.substr(0, inp.value.length) + "</strong>";
	          
	          
	          b.innerHTML += arr[i].name.substr(inp.value.length);          
	          /*insert a input field that will hold the current array item's value:*/
	          b.innerHTML += "<input type='hidden' value='" + arr[i].name + "' name='" + arr[i].value + "'>";
	          
	          /*execute a function when someone clicks on the item value (DIV element):*/
	          b.addEventListener("click", function(e) {
	              /*insert the value for the autocomplete text field:*/        	  
	              inp.value = this.getElementsByTagName("input")[0].value;
	              document.getElementById("idColor").value=this.getElementsByTagName("input")[0].name;
	              inp.classList.add("autocomplete-activeC");
	              /*close the list of autocompleted values,
	              (or any other open lists of autocompleted values:*/
	              closeAllLists();
	          });          
	          a.appendChild(b);
	          
	        
	      }

	  /*execute a function presses a key on the keyboard:*/
	  inp.addEventListener("keydown", function(e) {
	      var x = document.getElementById(this.id + "autocomplete-listC");
	      if (x) x = x.getElementsByTagName("div");
	      if (e.keyCode == 40) {
	        /*If the arrow DOWN key is pressed,
	        increase the currentFocus variable:*/
	        currentFocus++;
	        /*and and make the current item more visible:*/
	        addActive(x);
	      } else if (e.keyCode == 38) { //up
	        /*If the arrow UP key is pressed,
	        decrease the currentFocus variable:*/
	        currentFocus--;
	        /*and and make the current item more visible:*/
	        addActive(x);
	      } else if (e.keyCode == 13) {
	        /*If the ENTER key is pressed, prevent the form from being submitted,*/
	        e.preventDefault();
	        if (currentFocus > -1) {
	          /*and simulate a click on the "active" item:*/
	          if (x) x[currentFocus].click();
	        }
	      }
	  });
	  function addActive(x) {
	    /*a function to classify an item as "active":*/
	    if (!x) return false;
	    /*start by removing the "active" class on all items:*/
	    removeActive(x);
	    if (currentFocus >= x.length) currentFocus = 0;
	    if (currentFocus < 0) currentFocus = (x.length - 1);
	    /*add class "autocomplete-active":*/
	    x[currentFocus].classList.add("autocomplete-activeC");
	  }
	  function removeActive(x) {
	    /*a function to remove the "active" class from all autocomplete items:*/
	    for (var i = 0; i < x.length; i++) {
	      x[i].classList.remove("autocomplete-activeC");
	    }
	  }
	  
	  
	  function closeAllLists(elmnt) {
	    /*close all autocomplete lists in the document,
	    except the one passed as an argument:*/
	    var x = document.getElementsByClassName("autocomplete-itemsC");
	    for (var i = 0; i < x.length; i++) {
	      if (elmnt != x[i] && elmnt != inp) {
	        x[i].parentNode.removeChild(x[i]);
	      }
	    }
	  }
	  /*execute a function when someone clicks in the document: HTMLDivElement*/
	  document.addEventListener("click", function (e) {
		  console.log(" epa click from " + e.target.id);
		if (e.target.id == "color" || e.target.id.startsWith("listC")) {
			var p = e.target.innerHTML;
			if (p.startsWith("<strong>")) {
				console.log(" click from DivElemnt");
			} else {
				document.getElementById("color").value = "";
				document.getElementById("idColor").value = "";
				console.log(" click NOT from DivElemnt");
			}
			closeAllLists(e.target);
		} 
	  });
	}

	function servRemoveActive(x) {
		  x.classList.remove("autocomplete-activeC");
		  document.getElementById("color").value= "";
		  document.getElementById("idColor").value= "";
	}
	/*An array containing all the country names in the world:*/
	var posCharc=false;
	function servFindColores(obj,evt) {	
		console.log(" load methodos Colores");
		if(obj.value.length==2) {	
			var entidad = "servFindColoresByName";	    
		    var streaming="";  
		    var cadenaAtributos, streaming = "";
			cadenaAtributos = obj.value;
			streaming = entidad + "|" + cadenaAtributos;	
			doAjax('./ServicioBasicoControler.do', streaming,'respTakeColores', 'get', 0);    
		 }
		if(obj.value.length==3) {	
			var entidad = "servFindColoresByName";    
		    var streaming="";  
		    var cadenaAtributos, streaming = "";
			cadenaAtributos = obj.value;
			streaming = entidad + "|" + cadenaAtributos;	
			doAjax('./ServicioBasicoControler.do', streaming,'respTakeColores', 'get', 0);    
		 }
		if(obj.value.length==4) {	
		var entidad = "servFindColoresByName";    
	    var streaming="";  
	    var cadenaAtributos, streaming = "";
		cadenaAtributos = obj.value;
		streaming = entidad + "|" + cadenaAtributos;	
		doAjax('./ServicioBasicoControler.do', streaming,'respTakeColores', 'get', 0);    
	 }
	 if(obj.value.length==5) {	
			var entidad = "servFindColoresByName";	    
		    var streaming="";  
		    var cadenaAtributos, streaming = "";
			cadenaAtributos = obj.value;
			streaming = entidad + "|" + cadenaAtributos;	
			doAjax('./ServicioBasicoControler.do', streaming,'respTakeColores', 'get', 0);    
		 }
	 if(obj.value.length==6) {	
			var entidad = "servFindColoresByName";	    
		    var streaming="";  
		    var cadenaAtributos, streaming = "";
			cadenaAtributos = obj.value;
			streaming = entidad + "|" + cadenaAtributos;	
			doAjax('./ServicioBasicoControler.do', streaming,'respTakeColores', 'get', 0);    
		 }
	 if(obj.value.length==7) {	
			var entidad = "servFindColoresByName";  
		    var streaming="";  
		    var cadenaAtributos, streaming = "";
			cadenaAtributos = obj.value;
			streaming = entidad + "|" + cadenaAtributos;	
			doAjax('./ServicioBasicoControler.do', streaming,'respTakeColores', 'get', 0);    
		 }
	 if(obj.value.length==8) {	
			var entidad = "servFindColoresByName";   
		    var streaming="";  
		    var cadenaAtributos, streaming = "";
			cadenaAtributos = obj.value;
			streaming = entidad + "|" + cadenaAtributos;	
			doAjax('./ServicioBasicoControler.do', streaming,'respTakeColores', 'get', 0);    
		 }
	 if(obj.value.length==9) {	
			var entidad = "servFindColoresByName";	    
		    var streaming="";  
		    var cadenaAtributos, streaming = "";
			cadenaAtributos = obj.value;
			streaming = entidad + "|" + cadenaAtributos;	
			doAjax('./ServicioBasicoControler.do', streaming,'respTakeColores', 'get', 0);    
		 }
	  if(obj.value.length==10) {
			var entidad = "servFindColoresByName";   
		    var streaming="";  
		    var cadenaAtributos, streaming = "";
			cadenaAtributos = obj.value;
			streaming = entidad + "|" + cadenaAtributos;	
			doAjax('./ServicioBasicoControler.do', streaming,'respTakeColores', 'get', 0);    
		 }
	  if(obj.value.length==11) {
			var entidad = "servFindColoresByName";	    
		    var streaming="";  
		    var cadenaAtributos, streaming = "";
			cadenaAtributos = obj.value;
			streaming = entidad + "|" + cadenaAtributos;	
			doAjax('./ServicioBasicoControler.do', streaming,'respTakeColores', 'get', 0);    
		 }
	  if(obj.value.length==12) {
			var entidad = "servFindColoresByName";	    
		    var streaming="";  
		    var cadenaAtributos, streaming = "";
			cadenaAtributos = obj.value;
			streaming = entidad + "|" + cadenaAtributos;	
			doAjax('./ServicioBasicoControler.do', streaming,'respTakeColores', 'get', 0);    
		 }
	  if(obj.value.length==13) {
			var entidad = "sesrvFindColoresByName";	    
		    var streaming="";  
		    var cadenaAtributos, streaming = "";
			cadenaAtributos = obj.value;
			streaming = entidad + "|" + cadenaAtributos;	
			doAjax('./ServicioBasicoControler.do', streaming,'respTakeColores', 'get', 0);    
		 }
	  if(obj.value.length==14) {
			var entidad = "servFindColoresByName";	    
		    var streaming="";  
		    var cadenaAtributos, streaming = "";
			cadenaAtributos = obj.value;
			streaming = entidad + "|" + cadenaAtributos;	
			doAjax('./ServicioBasicoControler.do', streaming,'respTakeColores', 'get', 0);    
		 }
	  if(obj.value.length==15) {
			var entidad = "servFindColoresByName";	    
		    var streaming="";  
		    var cadenaAtributos, streaming = "";
			cadenaAtributos = obj.value;
			streaming = entidad + "|" + cadenaAtributos;	
			doAjax('./ServicioBasicoControler.do', streaming,'respTakeColores', 'get', 0);    
		 }  
	}

	function respTakeColores(resp){
		 if (resp!="yaCargo"){
			    var respItem= resp.split("!");                                        
			    var cadenaRespuesta="";
			    var atributos ;
			    d_count=0;
			    var countries = [];		    
			    for(var i=0,len = respItem.length; i< len -1;i++){                                        	
			        atributos = respItem[i].split(";");		        
			        countries.push({value: atributos[0] , name: atributos[1]});       
			    }
			    autocompleteColores(document.getElementById("color"), countries);    
			  }
		
	}


	/*initiate the autocomplete function on the "myInput" element, and pass along the countries array as possible autocomplete values:*/





