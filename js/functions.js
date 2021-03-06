function loadJSON(callback) {   
//o arquivo sendo local tem acesso negado no Chrome e IE
//no caso deles seria preciso o uso de um servidor
   var data_file = 'data/potions.json';
   var http_request = new XMLHttpRequest();
   try{
      // Opera, Firefox, Chrome, Safari
      http_request = new XMLHttpRequest();
   }catch (e){
      // IE
      try{
         http_request = new ActiveXObject("Msxml2.XMLHTTP");
      }catch (e) {
         try{
            http_request = new ActiveXObject("Microsoft.XMLHTTP");
         }catch (e){
            alert("Your browser broke!");
            return false;
         }
      }
   }
   http_request.open("GET", data_file, true);
   http_request.overrideMimeType("application/json");
   http_request.onreadystatechange  = function(){
      if (http_request.readyState == 4)
      {
		callback(http_request.responseText);
      }
   }
   
   http_request.send(null);
  
 }
 
 function callLightbox(output){
	document.getElementById('white_content').innerHTML=output;
	document.getElementById('white_content').style.display='block';
	document.getElementById('black_overlay').style.display='block';
	document.getElementById('close_lightbox').onclick = function () {
		 closeLightbox();
	 };
}

function closeLightbox(){
	
	document.getElementById('white_content').style.display='none';
	document.getElementById('black_overlay').style.display='none';
}

function createProd(callback){
var produtos;
	//CRIA AS DIVS DOS PRODUTOS DINAMICAMENTE
	loadJSON(function(response) {

		var actual_JSON = JSON.parse(response);
	
		for (var i in actual_JSON.potions){
			var newElement = document.createElement('div');
			newElement.id = actual_JSON.potions[i].id;
			newElement.className = "prod";
			newElement.innerHTML = 
			'<img src="images/' + actual_JSON.potions[i].image + '">'+
			'<div class="caption">'+
			'<b>'+ actual_JSON.potions[i].name + ' - </b>'+
			'<span>$'+ actual_JSON.potions[i].price + '</span></div>';
		
			document.getElementById("produtos").appendChild(newElement);
		}
		produtos = document.querySelectorAll(".prod");
		 if (typeof callback === "function") {   
			callback(produtos);    
		}
	});


	   
}

function bindLightbox(produtos){

		for (var i = produtos.length - 1;  i >= 0;  --i) {
			document.getElementById(produtos[i].id).onclick = function () {
				var myid = this.id;
				var newContent = "";
				
				newContent+='<div id="close_lightbox">X</div>';
				
				loadJSON(function(response) {
					var actual_JSON = JSON.parse(response);
					var actual_Potion = actual_JSON.potions[myid];
					var actual_Ing = actual_JSON.potions[myid].ingredients;
					
					newContent+='<img src="images/' + actual_Potion.image + '">';
					newContent+='<div class="description">';
					newContent+='<p class="feature_titles">'+ actual_Potion.name + '</p>';
					newContent+='<p class="feature_titles">Use/Effect:</p>';
					newContent+='<p class="feature_desc">'+ actual_Potion.effect + '</p>';
					newContent+='<p class="feature_titles">Ingredients:</p>';
					newContent+='<ul>';

					for (var j in actual_Ing){
						newContent+='<li>'+ actual_Ing[j] + '</li>';
					}
					
					newContent+='</ul><br/>';
					newContent+='<p class="feature_titles nomargin_padding">Price:</p>';
					newContent+='<p class="feature_desc price_value">$'+ actual_Potion.price + '</p>';
					newContent+='</div>';
					newContent+='<div class="add_cart">ADD TO CART</div>'
					//ABRE A LIGHTBOX	
					callLightbox(newContent);
					});
				
					
			};	
		}
}