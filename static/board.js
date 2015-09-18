var board = {
	sections:[],
	bins:[],
	items:[],
	filter:[],

	init:function(){
		api.async("section", "list", {}, function(data){
			if(data.data){
				board.sections = data.data;
				gui.recreateSections();
			}
		}, logger.console);
		
		api.async("bin", "list", {}, function(data){
			if(data.data){
				board.bins = data.data;
				gui.recreateBins();
				gui.items.additions(false);
		
				//fetch the items once the bins are there
				api.async("item", "list", {}, function(data){
					if(data.data){
						board.items = data.data;
						gui.refreshItems();
					}
				}, logger.console);
			}
		}, logger.console);
	},

	toggleSection:function(event){
		var section = event.target.getAttribute("data-id");

		if(event.shiftKey){
			board.filter.push(section);
			event.target.className = "section active";

			if(board.filter.length > 1){
				gui.items.additions(false);
			}
		}
		else{
			board.filter = [section];
			gui.items.additions(true);
			var nodes = document.getElementsByClassName("section");
			for(var i = 0; i < nodes.length; i++){
				nodes[i].className = "section";
			}	
			event.target.className = "section active";
		}

		gui.refreshItems();
	},
	
	createItem:function(section, bin, name, callback){
		api.async("item", "new", {"section":section, "bin":bin, "name":name}, function(data){
			if(data.dbinfo[1]){
				if(callback){
					callback(false);
				}
				return;
			}
			
			//insert new item into array
			board.items.push(data.item);

			if(callback){
				callback(true);	
			}
			gui.refreshItems();
		}, logger.console);
	}
};
