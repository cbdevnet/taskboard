var gui = {
	elem:function(id){
		return document.getElementById(id);
	},

	create:function(tag, text, options){
		var node = document.createElement(tag);

		if(text){
			node.textContent = text;
		}

		if(options){
			Object.keys(options).forEach(function(prop){
				node.setAttribute(prop, options[prop]);
			});
		}
		return node;
	},

	sections:{
		clear:function(){
			gui.elem("section-filter").innerHTML = "";
			gui.elem("section-filter").textContent = "Board";
		},

		create:function(id, name){
			var node = gui.create("span", name, {"class":"section", "data-id":id});
			node.onclick = board.toggleSection;
			return node;
		}
	},

	bins:{
		clear:function(){
			gui.elem("bins").innerHTML = "";
		},

		create:function(id, name){
			var node = gui.create("div", undefined, {"class":"bin", "data-id":id});
			node.appendChild(gui.create("span", name, {"class":"title"}));
			node.appendChild(gui.create("div", undefined, {"class":"item-wrapper", "data-id":id}));
			var add_item = gui.create("span", "+", {"class":"add-item", "data-id":id});
			add_item.onclick = gui.items.startEditor;
			node.appendChild(add_item);
			node.ondragover = gui.bins.drag;
			node.ondrop = gui.bins.drop;
			return node;
		},

		drag:function(ev){
			ev.preventDefault();
		},

		drop:function(ev){
			ev.preventDefault();
			var data = ev.dataTransfer.getData("text");
			var bin_node = ev.target;
			while(bin_node.className != "bin"){
				bin_node = bin_node.parentNode;
			}

			board.items.forEach(function(item){
				if(item.item_id == data){
					api.async("item", "move", {"item":item.item_id, "bin":bin_node.getAttribute("data-id")}, function(data){
						if(data.dbinfo[1]){
							window.alert("Failed to update bin: "+ JSON.stringify(data.dbinfo));
							return;
						}
						item.item_bin = bin_node.getAttribute("data-id");
						gui.refreshItems();
					}, logger.console);
				}
			});
		}
	},

	items:{
		clear:function(){
			var nodes = document.getElementsByClassName("item-wrapper");
			for(var i = 0; i < nodes.length; i++){
				nodes[i].innerHTML = "";
			}
		},

		containers:function(){
			var rv = {};
			var nodes = document.getElementsByClassName("item-wrapper");
			for(var i = 0; i < nodes.length; i++){
				rv[nodes[i].getAttribute("data-id")] = nodes[i];
			}
			return rv;
		},

		node:function(id, content){
			var node = gui.create("span", content, {"class":"item", "data-id":id, "draggable":"true"});
			node.ondragstart = gui.items.drag;
			return node;
		},

		drag:function(ev){
			ev.dataTransfer.setData("text", ev.target.getAttribute("data-id"));
		},

		startEditor:function(ev){
			ev.target.innerHTML = "";
			var editNode = gui.create("input", undefined, {"type":"text", "data-id":ev.target.getAttribute("data-id")});
			editNode.onkeydown = gui.items.editorKey;
			ev.target.appendChild(editNode);
			editNode.focus();
		},
		
		editorKey:function(ev){
			if(ev.keyCode == 13 && ev.target.value){
				board.createItem(board.filter[0], ev.target.getAttribute("data-id"), ev.target.value, function(success){
					if(success){
						var add = ev.target.parentNode;
						add.innerHTML = "";
						add.innerText = "+";
					}
					else{
						window.alert("Failed to create item");
					}
				});
			}
			else if(ev.keyCode == 27 || (ev.keyCode == 13 && !ev.target.value)){
				var add = ev.target.parentNode;
				add.innerHTML = "";
				add.innerText = "+";
			}
		},

		additions:function(enable){
			var nodes = document.getElementsByClassName("add-item");
			for(var i = 0; i < nodes.length; i++){
				nodes[i].style.display = enable ? "block" : "none";
			}
		}
	},

	recreateSections:function(){
		gui.sections.clear();
		board.sections.forEach(function(section){
			gui.elem("section-filter").appendChild(gui.sections.create(section.section_id, section.section_name));
		});
	},

	recreateBins:function(){
		gui.elem("bins").innerHTML = "";
		board.bins.forEach(function(bin){
			gui.elem("bins").appendChild(gui.bins.create(bin.bin_id, bin.bin_name));
		});
	},

	refreshItems:function(){
		gui.items.clear();
		var containers = gui.items.containers();

		board.items.forEach(function(item){
			if(!item.item_section || board.filter.indexOf(item.item_section) >= 0){
				containers[item.item_bin].appendChild(gui.items.node(item.item_id, item.item_name));
			}
		});
	}
};
