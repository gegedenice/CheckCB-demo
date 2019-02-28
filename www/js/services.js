angular.module('app.services', [])

.factory('barcodeScanner', function ($rootScope) {
    return {
      scan: function (onSuccess, onError, options) {
        cordova.plugins.barcodeScanner.scan(function () {
          var that = this,
            args = arguments;
  
          if (onSuccess) {
            $rootScope.$apply(function () {
              onSuccess.apply(that, args);
            });
          }
        }, function () {
          var that = this,
            args = arguments;
  
          if (onError) {
            $rootScope.$apply(function () {
              onError.apply(that, args);
            });
          }
        },
        {
          preferFrontCamera : false, // iOS and Android
            showFlipCameraButton : true, // iOS and Android
            showTorchButton : true, // iOS and Android
            torchOn: false, // Android, launch with the torch switched on (if available)
            saveHistory: true, // Android, save scan history (default false)
            prompt : "Placer un code-barre dans la zone de scan", // Android
            resultDisplayDuration: 500, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
            //formats : "QR_CODE,PDF_417", // default: all but PDF_417 and RSS_EXPANDED
            orientation : "portrait", // Android only (portrait|landscape), default unset so it rotates with the device
            disableAnimations : true, // iOS
            disableSuccessBeep: false // iOS and Android
        });
      }
    };
  })

  .factory('serviceGetItem', ['$http', function ($http) {
    return{
      /*fonction de récupération du fichier json*/
      cbApi: function(url){
        return $http.get(url);
      },
      docNumber: function(data){
        var docNumber = data.z30_doc_number;
            return docNumber;
        },
        bib: function(data){
          var bib = data.z30_sub_library;
              return bib;
          },
         loc: function(data){
            var loc = data.z30_collection;
                return loc;
            },
       cote: function(data){
          var cote = data.z30_call_no;
              return cote;
          },
       barcode: function(data){
            var barcode = data.z30_barcode;
                return barcode;
            },
       status: function(data){
            var status = data.z30_item_status;
                return status;
            },
      loans: function(data){
        var loans = data.z30_no_loans;
            return loans;
        },
      lastReturn: function(data){
          var lastReturn = data.z30_date_last_return;
              return lastReturn;
          },
       entryDate: function(data){
            var entryDate = data.z30_open_date;
                return entryDate;
            }
    }
  }])
  .factory('serviceGetItems', ['$http', function ($http) {
    return{
      itemsApi: function(url){
        return $http.get(url);
      }
    }
  }])
  .factory('serviceGetMarcoai', ['$http', function ($http) {
    return{
      docNumApi: function(url){
        return $http.get(url);
      },
      title: function(data){
           var title = data.filter(function (item) {
            return item.id == "200";
          })
          .map(function (item) {
            return item.subfield;
          })
               return title;
           },
       ppn: function(data){
                var ppn = data.filter(function (item) {
                 return item.id == "003";
               })
               .map(function (item) {
                 return item.subfield;
               })
                    return ppn;
                }
    }}])  
    .factory('serviceGetSudocLocs', ['$http', function ($http) {
      return{
        multiwhere: function(url){
          return $http.get(url);
        },
        libraries: function(data){
          var locs = [];
          $.each(data, function( i, item ) {
              locs.push({shortname:item.shortname,rcr:item.rcr,latitude:item.latitude,logitude:item.longitude}) ;
          });
          return locs;
          } 
      }}])   
.service('BlankService', [function(){

}]);