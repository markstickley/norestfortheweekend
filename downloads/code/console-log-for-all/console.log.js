if(!('console' in window) || !('log' in window.console)){
	window.console = function(){
		var r = {},
		glow,
		$,
		logpanel,
		enabled=false;

		r.enable = function(){
			enabled=true;
		};

		r.disable = function(){
			enabled=false;
			if(logpanel){
				logpanel.destroy();
			}
		};

		r.clear = function(){
			logpanel.empty();
		};

		r.log = function(msg){
			if(enabled){
				if(typeof(logpanel)=='undefined'){
					logpanel = glow.dom.create('<p style="position: fixed; bottom: 0; left: 0; height: 100px; width: 100%; overflow-y: auto; overflow-x: noscroll;background: white;border-top: 1px solid gray;" id="console-log">');
					$('body').append(logpanel);
					$('body').css('padding-bottom','100px');
					if(glow.env.ie && glow.env.ie<=6){ //little hack to keep it at the bottom of the IE window
						$('#console-log').css('position','absolute');
						setInterval(function(){
							logpanel.css('height','99px');
							logpanel.css('height','100px');
						},250);
					}
				}
				logpanel.append([msg,""].join(''));
				logpanel[0].scrollTop = logpanel[0].scrollHeight;
			}
		};

		r.init = function(g){
			glow = g;
			$ = glow.dom.get;
		};

		return r;
	}();

	console.init(glow);
}