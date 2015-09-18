var api = {
	base : "api/",

	async:function(module, endpoint, payload, completion, error){
		var req = ajax.asyncPost(api.base + module + "/" + endpoint + "/", JSON.stringify(payload), function(req){
				if(req.status != 200){
					//err out
					if(error){
						error("Server responded with HTTP "+req.status);
					}
					return;
				}

				try{
					var response = JSON.parse(req.responseText);
				}
				catch(e){
					//err out
					if(error){
						error("Failed to parse server response ("+e+"): " + req.responseText);
					}
					return;
				}
			
				completion(response);
			}, function(err){
				if(error){
					error(err);
				}
			}, "application/json");
	}
};
