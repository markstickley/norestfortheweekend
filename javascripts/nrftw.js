(function(d){
	var banner = d.getElementById('banner');
	
	banner.className = getSeason();

	function getSeason(){
		var date = new Date(),
			month = date.getMonth()+1,
			day = date.getDay();

		if(
			(month === 3 && day >= 21)
			|| month === 4
			|| month === 5
			|| (month === 6 && day < 21)
		){
			return 'spring';
		}

		else if(
			(month === 6 && day >= 21)
			|| month === 7
			|| month === 8
			|| (month === 9 && day < 23)
		){
			return 'summer';
		}

		else if(
			(month === 9 && day >= 23)
			|| month === 10
			|| month === 11
			|| (month === 12 && day < 21)
		){
			return 'autumn';
		}

		else{
			return 'winter';
		}
	}
})(window.document);