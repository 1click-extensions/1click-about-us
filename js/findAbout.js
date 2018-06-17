var abouts = {
		exac:["about","אודות","company"],
		partially:["about us","about company","our company","our team"]
	},	
	allLinks = document.getElementsByTagName('a'),
	foundLink = false;
for(var i=0; i < allLinks.length; i++){
	var link = allLinks[i],
	text = link.innerText
	text =text ? text.toLowerCase().trim().replace(/\t{0,}/,'') : '';
	console.log(text);
	var found = abouts.exac.indexOf(text) > -1;
	if(!found){
		abouts.partially.forEach(function(tryText){
			if(text.indexOf(tryText)  > -1){
				found = true;
			}
		});
	}
	
	if(found){
		foundLink = true;
		link.setAttribute('target','_blank');
		
		link.style.border  = "3px solid red";
		link.style.fontSize = "20px";
		link.scrollIntoView();
		link.click();
		//console.log(link);
		chrome.runtime.sendMessage({
			action: 'injectJs'
		});
		break;
	}
	

}

if(!foundLink){
	alert(chrome.i18n.getMessage("we_could_not_find_link"));
	for(var i=0; i < allLinks.length; i++){
		var link = allLinks[i];
		link.addEventListener('click', function(e){
			var _this = this;
			if(!_this.clickedAlready){
				e.preventDefault();
				this.timeO = setTimeout(function(){
					console.log('click');
					_this.clickedAlready = true;
					_this.click();
				},700);
			}
		});
		link.addEventListener('dblclick', function(e){
			e.preventDefault();
			clearTimeout(this.timeO);
			chrome.runtime.sendMessage({
				action : "save link",
				origin: location.origin,
				title: this.innerText,
			  });
			alert(chrome.i18n.getMessage("sent_thank_you"));
		});
	}
}