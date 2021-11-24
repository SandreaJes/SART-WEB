 /*
 * CAJA DE SUGERENCIAS
   las funciones en js, son objetos y estan aplican dos metodos los cuales sirven para sobreescri el contexto en la cual se ejecutan estan
 * Version 1.4   -   Updated: Mar. 23, 2013
 *
  */

(function($){
	$.fn.suggestColores= function(data, options) {                  
		var defaults = { 
			asHtmlID: false,
			startText: "Ingrese la Descripcion del Color aqui",
			emptyText: "No hay Colores registrado con esta Descripcion",
			preFill: {},
			limitText: "evelincita",
			selectedItemProp: "value", //name of object property
			selectedValuesProp: "value", //name of object property
			searchObjProps: "value", //comma separated list of object property names
			queryParam: "q",
			retrieveLimit: false, //number for 'limit' param on ajax request
			extraParams: "",
			matchCase: false,
			minChars: 3,
			keyDelay: 50,
			resultsHighlight: true,
			neverSubmit: false,
			selectionLimit: false,
			showResultList: true,
		  	start: function(){},
		  	selectionClick: function(elem){},
		  	selectionAdded: function(elem){},
		  	selectionRemoved: function(elem){ elem.remove(); },
		  	formatList: false, //callback function
		  	beforeRetrieve: function(string){ return string; },
		  	retrieveComplete: function(data){ return data; },
		  	resultClick: function(data){},
		  	resultsComplete: function(){}
	  	};  
	 	var opts = $.extend(defaults, options);		
		var d_type = "object";
                var tomadoProveedor ="0";
		var d_count = 0; // contiene la cantidad de item pasado al objeto jsom (cantidad de elmento mostrados en la lista)
                if(typeof data == "string") {
                        d_type = "string";
			var req_string = data;
		}else{			
                      var org_data = data;
		      for (k in data){                     
                            if (data.hasOwnProperty(k)){                                
                              d_count++;
                            }
                        }
                        //hasOwnProperty si el objeto tiene una propiedad con el nombre especificado. esto no valida si existe o no una propiedad para el objeto
		}
              
                if((d_type == "object" && d_count > 0) || d_type == "string"){                        
			return this.each(function(x){                              
				if(!opts.asHtmlID){
					x = x+""+Math.floor(Math.random()*100); //this ensures there will be unique IDs on the page if autoSuggest() is called multiple times
					var x_id = "as-input-"+x;
				} else {
					x = opts.asHtmlID;
					var x_id = x;
				}
                                
				opts.start.call(this); // sobreEscribiendo el valor del contexto this, el cual es de tipo text
				var input = $(this);
                               
				input.attr("autocomplete","off").addClass("as-input").attr("id",x_id).val(opts.startText);
				var input_focus = false;				
				// Setup basic elements and render them to the DOM
				input.wrap('<ul class="as-selections" id="as-selections-'+x+'"></ul>').wrap('<li class="as-original" id="as-original-'+x+'"></li>');
				var selections_holder = $("#as-selections-"+x);
				var org_li = $("#as-original-"+x);				
				var results_holder = $('<div class="as-results" id="as-results-'+x+'"></div>').hide();
				var results_ul =  $('<ul class="as-list"></ul>');
				var values_input = $('<input type="hidden" class="as-values" name="idColor" id="idColor" />');
				var prefill_value = "";
				if(typeof opts.preFill == "string"){					
                                         var vals = opts.preFill.split(",");
					for(var i=0; i < vals.length; i++){
						var v_data = {};
						v_data[opts.selectedValuesProp] = vals[i];
						if(vals[i] != ""){
							add_selected_item(v_data, "000"+i);	
						}		
					}
					prefill_value = opts.preFill;
				} else {					
                                        prefill_value = "";
					var prefill_count = 0;                                            
					for (k in opts.preFill){                                             
                                                if (opts.preFill.hasOwnProperty(k)){
                                                 prefill_count++;
                                             }
                                        }                                        
					if(prefill_count > 0){
						for(var i=0; i < prefill_count; i++){
							var new_v = opts.preFill[i][opts.selectedValuesProp];
							if(new_v == undefined){ new_v = ""; }
							prefill_value = prefill_value+new_v+",";
							if(new_v != ""){
								add_selected_item(opts.preFill[i], "000"+i);	
							}	
						}
					}
				}                                 
				if(prefill_value != ""){
					input.val("");
					var lastChar = prefill_value.substring(prefill_value.length-1);
					if(lastChar != ","){ prefill_value = prefill_value+","; }
					values_input.val(","+prefill_value);
					$("li.as-selection-item", selections_holder).addClass("blur").removeClass("selected");
				}
				input.after(values_input);                                
				selections_holder.click(function(){                                     
					input_focus = true;                                        
                                        tomadoProveedor="1";                                      
					input.focus();                                   
				}).mousedown(function(){ input_focus = false; }).after(results_holder);	
				var timeout = null;
				var prev = "";
				var totalSelections = 0;
				var tab_press = false;
                                var ben;
				// MANEJA EVENTOS EN EL INPUT DE LA CAJA DE SUGERENCIAS
				input.focus(function(){                                      
				      if($(this).val() == opts.startText && values_input.val() == ""){
						$(this).val("");                                               
				      } else if(input_focus){
						$("li.as-selection-item", selections_holder).removeClass("blur");
                                                   
						if($(this).val() != ""){
							results_ul.css("width",selections_holder.outerWidth());
							results_holder.show();                                                         
						}
					}
					input_focus = true;
                                        tab_press=false;                                       
					return true;
				}).blur(function(e){                                        
					if($(this).val() == "" && values_input.val() == "" && prefill_value == ""){
						$(this).val(opts.startText);
					} else if(input_focus){                                               
                                                $("li.as-selection-item", selections_holder).addClass("blur").removeClass("selected");
						results_holder.hide();
					}                                         
                                        setTimeout(verificacionTabPress,500);
				}).keydown(function(e) {
					// track last key pressed
					lastKeyPressCode = e.keyCode;
					first_focus = false;                                      
					switch(e.keyCode) {
						case 38: // up
							e.preventDefault();
							moveSelection("up");
							break;
						case 40: // down
							e.preventDefault();
							moveSelection("down");
							break;
						case 8:  // delete
							if(input.val() == ""){							
								var last = values_input.val().split(",");
								last = last[last.length - 2];
								selections_holder.children().not(org_li.prev()).removeClass("selected");
								if(org_li.prev().hasClass("selected")){
									values_input.val(values_input.val().replace(","+last+",",","));
									opts.selectionRemoved.call(this, org_li.prev());
								} else {
									opts.selectionClick.call(this, org_li.prev());
									org_li.prev().addClass("selected");		
								}
							}
							if(input.val().length == 1){
								results_holder.hide();
								 prev = "";
							}
							if($(":visible",results_holder).length > 0){
								if (timeout){ clearTimeout(timeout); }
								timeout = setTimeout(function(){ keyChange(); }, opts.keyDelay);
							}
							break;
						case 13: // return
							//tab_press = false;
                                                         tomadoProveedor="1";
                                                        // alert("entra aqui");
							var active = $("li.active:first", results_holder);                                                         
							if(active.length > 0){
								active.click();
								results_holder.hide();                                                                
							}if(opts.neverSubmit || active.length > 0){
								e.preventDefault();                                                               
							}break;
						default:
                                                       	if(opts.showResultList){
								if(opts.selectionLimit && $("li.as-selection-item", selections_holder).length >= opts.selectionLimit){
									results_ul.html('<li class="as-message">'+opts.limitText+'</li>');
									results_holder.show();
								} else {
									if (timeout){ 
                                                                            clearTimeout(timeout);
                                                                        }
									timeout = setTimeout(function(){ keyChange(); }, opts.keyDelay);
								}
							}
							break;
					}
				});				
				function keyChange() {
					// ignore if the following keys are pressed: [del] [shift] [capslock]
					if( lastKeyPressCode == 46 || (lastKeyPressCode > 8 && lastKeyPressCode < 32) ){
                                              return results_holder.hide();
                                         }					
                                        var string = input.val().replace(/[\\]+|[\/]+/g,"");
                                        string = string.toUpperCase();
                                        tomadoProveedor ="0";
					if (string == prev) return;
					prev = string;
					if (string.length >= opts.minChars) {                                                
						selections_holder.addClass("loading");
						if(d_type == "string"){ht
							var limit = "";
							if(opts.retrieveLimit){
								limit = "&limit="+encodeURIComponent(opts.retrieveLimit);
							}
							if(opts.beforeRetrieve){
								string = opts.beforeRetrieve.call(this, string);
							}
							$.getJSON(req_string+"?"+opts.queryParam+"="+encodeURIComponent(string)+limit+opts.extraParams, function(data){ 
								d_count = 0;
								var new_data = opts.retrieveComplete.call(this, data);
								for (k in new_data) 
                                                                      if (new_data.hasOwnProperty(k))
                                                                           d_count++;
								processData(new_data, string); 
							});
						} else {                                                        
							busqInicialColores(string);
                                                        if(opts.beforeRetrieve){
								string = opts.beforeRetrieve.call(this, string);
							}                                                        
						}
					} else {
						selections_holder.removeClass("loading");                                        
						results_holder.hide();
					}
				}// fin de la funcion keyChange (es decir un objeto js, el cual es acuñado al objeto global de windows
				var num_count = 0;                               
				function processData(data, query){
					if (!opts.matchCase){ 
                                             query = query.toLowerCase();
                                        }
					var matchCount = 0;
					results_holder.html(results_ul.html("")).hide();                                         
					for(var i=0;i<d_count;i++){				
						var num = i;
						num_count++;
						var forward = false;
						if(opts.searchObjProps == "value") {
							var str = data[num].value;                                                         
						} else {	
							var str = "";
							var names = opts.searchObjProps.split(",");
							for(var y=0;y<names.length;y++){
							    var name = $.trim(names[y]);
							    str = str+data[num][name]+" ";							}
						        }
						if(str){
							if (!opts.matchCase){ str = str.toLowerCase(); }				
							if(str.search(query) != -1 && values_input.val().search(","+data[num][opts.selectedValuesProp]+",") == -1){
								forward = true;
							}	
						}                                                 
						if(forward){
							var formatted = $('<li class="as-result-item" id="as-result-item-'+num+'"></li>').click(function(){
									var raw_data = $(this).data("data");
									var number = raw_data.num;
                                                                               //alert("entra forward y es: "+tab_press);
									if($("#as-selection-"+number, selections_holder).length <= 0 && tab_press==false){
										var data = raw_data.attributes;
										input.val("").focus();
										prev = "";
										add_selected_item(data, number);
										opts.resultClick.call(this, raw_data);
										results_holder.hide();
									}
									tab_press = false;
								}).mousedown(function(){ input_focus = false; }).mouseover(function(){
									$("li", results_ul).removeClass("active");
									$(this).addClass("active");
								}).data("data",{attributes: data[num], num: num_count});
							var this_data = $.extend({},data[num]);
							if (!opts.matchCase){ 
								var regx = new RegExp("(?![^&;]+;)(?!<[^<>]*)(" + query + ")(?![^<>]*>)(?![^&;]+;)", "gi");
							} else {
								var regx = new RegExp("(?![^&;]+;)(?!<[^<>]*)(" + query + ")(?![^<>]*>)(?![^&;]+;)", "g");
							}
							
							if(opts.resultsHighlight){
								this_data[opts.selectedItemProp] = this_data[opts.selectedItemProp].replace(regx,"<em>$1</em>");
							}
							if(!opts.formatList){
								formatted = formatted.html(this_data[opts.selectedItemProp]);
							} else {
								formatted = opts.formatList.call(this, this_data, formatted);	
							}
							results_ul.append(formatted);
							delete this_data;
							matchCount++;
							if(opts.retrieveLimit && opts.retrieveLimit == matchCount ){ break; }
						}
					}
					selections_holder.removeClass("loading");
					if(matchCount <= 0){
					   results_ul.html('<li class="as-message">'+opts.emptyText+'</li>');
					}
					results_ul.css("width", selections_holder.outerWidth());
					results_holder.show();
					opts.resultsComplete.call(this);
				}
                                var frmRegManual= document.getElementById("formRegistroManual");
                                function  busqInicialColores(elem){
                                    var entidad = "servFindColoresByName";
                                    var idColor = frmRegManual.color.value;
                                    var streaming="";                                    
                                    streaming= entidad + "|" + elem ;
                                    if (elem.length ==3){
                                      //  alert("envia pet sertv");

                                        busqItemBD('./ServicioBasicoControler.do',streaming,elem);
                                    }else{
                                       respBusqItem("yaCargo",elem);
                                    }                                   
                                }
                                var old_data  = [];
                                function respBusqItem(resp,elem){                                      
                                        if (resp!="yaCargo"){
                                        var respItem= resp.split("!");                                        
                                        var cadenaRespuesta="";
                                        var atributos ;
                                        d_count=0;
                                        var new_data  = [];                                      
                                        for(var i=1,len = respItem.length; i<= len -1;i++){                                        	
                                            atributos = respItem[i].split(";");                            
                                            new_data.push({value: atributos[0] , name: atributos[1]});                                            
                                            d_count++;
                                        }
                                        old_data  = new_data;
                                     }
                                     processData(old_data,elem);
                                }
                                
                              function add_selected_item(data, num){
                                        values_input.val(data[opts.selectedValuesProp]);
                                        var item = $('<li class="as-selection-item" id="as-selection-"+n></li>').click(function(){
							                       opts.selectionClick.call(this, $(this));
							                       selections_holder.children().removeClass("selected");
							                       $(this).addClass("selected");
						                }).mousedown(function(){ input_focus = false; });
					                    $(this).hide();                                       
                                        var close = $('<a id="cerrar" class="as-close">&times;</a>').click(function(){
							                        values_input.val(values_input.val().replace(","+data[opts.selectedValuesProp]+",",","));
							                        opts.selectionRemoved.call(this, item);
							                        input_focus = true;
							                        frmRegManual.descriptColor.value ="";
							                        input.show();
                                                    return false;
					                	});                                     
                                        busqPocisionData(data[opts.selectedValuesProp]);
					                    org_li.before(item.html(data[opts.selectedItemProp]).prepend(close));
					                    opts.selectionAdded.call(this, org_li.prev());	
				              }
                                function moveSelection(direction){
                                       	if($(":visible",results_holder).length > 0){
						var lis = $("li", results_holder);
						if(direction == "down"){
							var start = lis.eq(0);
						} else {
							var start = lis.filter(":last");
						}					
						var active = $("li.active:first", results_holder);
						if(active.length > 0){
							if(direction == "down"){
							start = active.next();
							} else {
								start = active.prev();
							}	
						}
						lis.removeClass("active");
						start.addClass("active");
					}
				}
					function busqPocisionData(item) {
						console.log(" item bind parameter "+item)
						console.log(" contador "+d_count)
							for (var i = 0; i < d_count; i++) {
								console.log(" id "+old_data[i].value)
								if (old_data[i].value == item) {
									console.log("entro ")
									frmRegManual.descriptColor.value = old_data[i].name;
									frmRegManual.idColor.value = item;
									console.log("entro ")
									break;
								}
							}
					}
                        function busqItemBD(url,query,elem){
                                       var myreq =   http = new XMLHttpRequest();
                                        myreq.onreadystatechange = function(){                                                                   
                                                                  if(myreq.readyState == 4){
                                                                     if(myreq.status == 200){
                                                                         //alert("viene del servidor ");
                                                                       var item = myreq.responseText;                                                                       
                                                                       respBusqItem(myreq.responseText,elem);
                                                                       return false;
                                                                     }
                                                                  }
                                        }
                                         var datos =query.split("|");
                                         var solicitud = url+'?entidad='+datos[0]+"&cadenaAtributos="+datos[1]+"&auxiliar="+datos[2];
                                         myreq.open("GET",solicitud,true);
                                         myreq.send(null);
                                }
                                function verificacionTabPress(){                                  
                                    if(tomadoProveedor=="0"){                                      
                                                                        
                                      input.hide();
                                      values_input.val("") ;
				    }
                                }
                	});// el return
		}// final de la validacion de comprobacion del objeto data el cual contiene los datos que seran filtrado en la lista de sugerencias
	}// final de la funcion suggest        
})(jQuery);
