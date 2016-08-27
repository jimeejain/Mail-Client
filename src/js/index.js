/*
    //CONCEPT 1
    normal function : function_name();
    constructor function : new function_name();
    
    //CONCEPT 2 :NOT JAVASCRIPT
    class class_name{
        class_name() { ... }    //Constructor Used to instanciate
        insatace variable;      // instance variable called class variables
        function(){ ... }       // normal functions called methods
    }
    
    //IN JAVASCRIPT
    
    function function_name(parameter ...){
        this.variable = parameter;
        this.variable2 = 3;
        //return x
    }
    var myObj = new function_name("param");
    {
        variable  : ...
        variable2 : ..
    }
    
    //For method use prototype
    function_name.prototype.methodName = function(){ .... }
    
    myobj.methodName();
*/

angular.module('mailApp',[])
.service("folderTypes",function(){
    this.inbox = 'inbox';
    this.draft = 'draft';
    this.sent = 'sent';
    this.junk = 'junk';
    this.trash = 'trash';
    
    this.getFolderKey = function(folderType){
        switch(folderType){
            case this.inbox:
                return 'inboxData';
            case this.draft:
                return 'draftData';
            case this.sent:
                return 'sentData';
            case this.junk:
                return 'junkData';
            case this.trash:
                return 'trashData';
        }
    }
})
.service("myservice",function($http){
    this.getData = function(){
        return $http({
            method:"GET",
            url:'data.json'
        });
    }    
})
.controller("mainController",function($scope,myservice,folderTypes){
    $scope.folderType = folderTypes;
    $scope.selectedMenu = $scope.folderType.inbox;
    var dataFromJson = {};
    $scope.displayData = [];
    
    $scope.selectedFolderItem = -1;
    
    $scope.openFolder = function(folderTypes){
        var jsonKey = $scope.folderType.getFolderKey(folderTypes);
        $scope.displayData = dataFromJson[jsonKey];
        $scope.selectedMenu = folderTypes;
        $scope.selectedFolderItem = -1;
    }
    $scope.folderItemSelected = function(index){
        $scope.selectedFolderItem = index;
    };
   
    $scope.starClicked = function(){
        if($scope.selectedFolderItem != -1){
            var key = $scope.folderType.getFolderKey($scope.selectedMenu);
            dataFromJson[key][$scope.selectedFolderItem].isBookmarked  = ! dataFromJson[key][$scope.selectedFolderItem].isBookmarked;
        }
    }

    //Get the data from the service
     myservice.getData().then(function(response){
         dataFromJson = response.data.data;
         $scope.openFolder($scope.folderType.inbox);
         console.log(dataFromJson.inboxData);
     },function(error){
         console.log(error);
         
     })

  
})


