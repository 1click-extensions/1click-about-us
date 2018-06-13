var abouts = {
		exac:["about","אודות"],
		partially:["about us","about company","our company","our team"]
	},	
	allLinks = document.getElementsByTagName('a');
for(var i=0; i < allLinks.length; i++){
	var link = allLinks[i],
	text = link.innerText
	text =text ? text.toLowerCase().trim().replace(/\t{0,}/,'') : '';
	//console.log(text);
	var found = abouts.exac.indexOf(text) > -1;
	if(!found){
		abouts.partially.forEach(function(tryText){
			if(text.indexOf(tryText)  > -1){
				found = true;
			}
		});
	}
	
	if(found){
		link.setAttribute('target','_blank');
		link.click();
		link.style.border  = "3px solid red";
		link.style.fontSize = "20px";
		link.scrollIntoView();
		console.log(link);
		break;
	}
	

}