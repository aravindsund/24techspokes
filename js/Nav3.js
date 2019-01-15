(function(){

	var button = document.getElementById('cn-button'),
    wrapper = document.getElementById('cn-wrapper'),
    overlay = document.getElementById('cn-overlay');

	var open = false;
	button.addEventListener('click', handler, false);
	wrapper.addEventListener('click', cnhandle, false);

	function cnhandle(e){
		e.stopPropagation();
	}

	function handler(e){
		if (!e) var e = window.event;
	 	e.stopPropagation();

	  	if(!open){
	    	openNav();
	  	}
	 	else{
	    	closeNav();
	  	}
	}
	function openNav(){
		open = true;
	    button.innerHTML = "-";
	    classification.add(overlay, 'on-overlay');
	    classification.add(wrapper, 'opened-nav');
	}
	function closeNav(){
		open = false;
		button.innerHTML = "+";
		classification.remove(overlay, 'on-overlay');
		classification.remove(wrapper, 'opened-nav');
	}
	document.addEventListener('click', closeNav);

})();

