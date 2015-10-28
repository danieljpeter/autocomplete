({
    getAllRecords : function(component) {
        var action = component.get("c.getAllRecords");
        action.setParams({"objectName": component.get("v.objectName"), 
                          "searchField": component.get("v.searchField")}); 
                       
        action.setCallback(this, function(a){
            var allRecords = a.getReturnValue();
            console.log('allRecords');
            console.log(allRecords);
            component.set("v.allRecords", allRecords);
        });
         $A.enqueueAction(action);
    },  
    clientSearch : function(component) {
		var matchedRecords = [];
		var searchText = component.find("searchInput").get("v.value").toLowerCase();
        var allRecords = component.get("v.allRecords");
        var startsWith = component.get("v.startsWith");
		var minChars = 1;
		
        if (searchText.length >= minChars) {
            //loop through all the records and find any which match
            for (var i=0; i<allRecords.length; i++) {
                var record = allRecords[i];
                var nameLcase = record[1].toLowerCase();
                var location = nameLcase.indexOf(searchText);
                
                if (startsWith) {
                    if (location == 0) {
                    	matchedRecords.push(record);   
                    }  
                } else {
                    if (location != -1) {
                    	matchedRecords.push(record);   
                    }                     
                }
            }            
        }

        console.log(matchedRecords);
        component.set("v.matchedRecords", matchedRecords);
    },  
    serverSearch : function(component) {
		var searchText = component.find("searchInput").get("v.value");
		var startsWith = false;
        
		var minChars = 1;        
        
        if (searchText.length >= minChars) {
            var action = component.get("c.searchRecords");
            action.setParams({"objectName": component.get("v.objectName"), 
                              "searchField": component.get("v.searchField"),
                              "searchTerm": searchText,
                              "startsWith": startsWith}); 
                           
            action.setCallback(this, function(a){
                var records = a.getReturnValue();
                console.log('records');
                console.log(records);
                component.set("v.matchedRecords", records);
            });
            $A.enqueueAction(action);          
        } else {
        	component.set("v.matchedRecords", []);   
        }       
    }    
})