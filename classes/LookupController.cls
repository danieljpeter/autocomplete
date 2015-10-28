public with sharing class LookupController {

    
    @AuraEnabled
    public static List<List<String>> getAllRecords(String objectName, String searchField) {
        String query = 'SELECT Id, ' + searchField + ' FROM ' + objectName + ' ORDER BY ' + searchField + ' LIMIT 50000';
        system.debug(query);

        List<List<String>> allRecords = new List<List<String>>();
        
        for (sObject s: Database.query(query)) {
            allRecords.add(new List<String>{s.get('Id')+'', s.get(searchField)+''});
        }
        return allRecords;
    }
    
    @AuraEnabled
    public static List<List<String>> searchRecords(String objectName, String searchField, String searchTerm, Boolean startsWith) {
        String searchClause;
        if (startsWith) {
            searchClause = searchTerm + '%';    
        } else {
           searchClause = '%' + searchTerm + '%';  
        }
        
        String query =  'SELECT Id, ' + searchField + ' ' +
                        'FROM ' + objectName + ' ' +
                        'WHERE ' + searchField + ' LIKE \'' + searchClause + '\' ' +
                        'ORDER BY ' + searchField + ' ' +
                        'LIMIT 50000';

        system.debug(query);
        
        List<List<String>> records = new List<List<String>>();
        
        for (sObject s: Database.query(query)) {
            records.add(new List<String>{s.get('Id')+'', s.get(searchField)+''});
        }        
        
		return records;
    }    
}