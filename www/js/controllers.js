angular.module('app.controllers', [])
  
.controller('cameraPageCtrl', ['$scope', '$http','$window', '$stateParams', '$rootScope','barcodeScanner',
function ($scope, $http, $window, $stateParams, $rootScope, barcodeScanner) {
        $scope.$on('$stateChangeSuccess', function (event, fromState) {
          if (fromState.name === "cameraPage") {
          barcodeScanner.scan(function (result) { 
            $scope.value = result.text;
            $window.location.href = '#/result/'+$scope.value;
                  });
          }
        });
           
}])

.controller('resultPageCtrl', ['$scope', '$http', '$stateParams', 'serviceGetItem', 'serviceGetItems', 'serviceGetMarcoai', 'serviceGetSudocLocs', 'alephCbUrl', 'alephItemsUrl', 'alephMarcoaiUrl', 'sudocMultiwhereUrl', 
function ($scope, $http, $stateParams, serviceGetItem, serviceGetItems, serviceGetMarcoai, serviceGetSudocLocs, alephCbUrl, alephItemsUrl, alephMarcoaiUrl, sudocMultiwhereUrl) {
$scope.cb = $stateParams.cb;
//pour ce cb
serviceGetItem.cbApi(alephCbUrl+$scope.cb)
.then(function(response) {
  var pad = "000000000"
  var resultForCb = $.xml2json($.parseXML(response.data)).z30;
  console.log(resultForCb)
  $scope.docNumber = pad.substring(0, pad.length - (serviceGetItem.docNumber(resultForCb)).length) + serviceGetItem.docNumber(resultForCb)
  $scope.cote = serviceGetItem.cote(resultForCb)
  $scope.bib = serviceGetItem.bib(resultForCb)
  $scope.loc = serviceGetItem.loc(resultForCb)
  $scope.barcode = serviceGetItem.barcode(resultForCb)
  $scope.status = serviceGetItem.status(resultForCb)
  $scope.loans = serviceGetItem.loans(resultForCb)
  $scope.lastReturn = serviceGetItem.lastReturn(resultForCb)
  $scope.entryDate = serviceGetItem.entryDate(resultForCb)
  //pour les autres ex
serviceGetItems.itemsApi(alephItemsUrl+$scope.docNumber)
.then(function(response) {
 $scope.exs = []
  var resultForAllCbs = $.xml2json($.parseXML(response.data)).item_data
  return othersExs = resultForAllCbs
  .filter(function (item) {
    return item.barcode != $scope.cb;
  })
  .map(function (item) {
    return {
      others: serviceGetItem.cbApi(alephCbUrl+item.barcode)
.then(function(response) {
var resultForOthersCb = $.xml2json($.parseXML(response.data)).z30;
$scope.exs.push({'bib':serviceGetItem.bib(resultForOthersCb),'loc':serviceGetItem.loc(resultForOthersCb),'cote':serviceGetItem.cote(resultForOthersCb),'barcode':serviceGetItem.barcode(resultForOthersCb),'prets':serviceGetItem.loans(resultForOthersCb),'retour':serviceGetItem.lastReturn(resultForOthersCb),'statut':serviceGetItem.status(resultForOthersCb)})
$scope.nbExs = $scope.exs.length
})
    }
  })  
})
//pour les données bib
serviceGetMarcoai.docNumApi(alephMarcoaiUrl+$scope.docNumber)
.then(function(response) {
  var resultForMarcoai = $.xml2json($.parseXML(response.data)).record.metadata.oai_marc.varfield;
  $scope.title = serviceGetMarcoai.title(resultForMarcoai)[0].text
  $scope.ppn = serviceGetMarcoai.ppn(resultForMarcoai)[0].text.split("http://www.sudoc.fr/").pop()
  //pour les locs Sudoc
  serviceGetSudocLocs.multiwhere(sudocMultiwhereUrl + $scope.ppn + "&format=text/json")
  .then(function(response) {
    var resultAllLocs = response.data.sudoc.query.result.library
    if(Array.isArray(resultAllLocs)) {
      $scope.libraries = serviceGetSudocLocs.libraries(resultAllLocs)
      $scope.countSudoc = $scope.libraries.length
      $scope.librariesPaca = $scope.libraries.filter(function (item) {
        return item.rcr.startsWith("06") || item.rcr.startsWith("83") || item.rcr.startsWith("13") || item.rcr.startsWith("84") || item.rcr.startsWith("98")
      })
      $scope.countSudocPaca = $scope.librariesPaca.length
    }
    else {
      $scope.countSudoc = "1";
        $scope.libraries = JSON.parse('[{"longitude":"'+resultAllLocs.longitude+'","shortname":"'+resultAllLocs.shortname+'","latitude":"'+resultAllLocs.latitude+'","rcr":"'+resultAllLocs.rcr+'"}]');
      }
  })

$scope.save = function(){
  var counter = localStorage.length;
  localStorage.setItem("checkcb"+counter+1, JSON.stringify({"counter":"checkcb"+counter+1,"cb":$scope.cb,"cote": $scope.cote,"title":$scope.title,"prets":$scope.loans,"nbExsAleph":$scope.nbExs,"nbExsSudoc":$scope.countSudoc}))
 
}
});
	});
}])
   
.controller('listPageCtrl', ['$scope', '$stateParams', '$ionicModal', 'emailComposer', '$sce',
function ($scope, $stateParams, $ionicModal, emailComposer, $sce) {
 $scope.get = function(){
  $scope.localStorageResults = []
  var keys = Object.keys(localStorage)
  for(var i=0;i<keys.length;i++){
      var key = keys[i];

      $scope.localStorageResults.push(JSON.parse(localStorage[key]));
  }
  return $scope.localStorageResults
}
$scope.mail = function(){
  var body = $scope.localStorageResults.map(function(item) {
    return $sce.trustAsHtml("CB : "+item.cb+"; Titre : "+item.title+"; prêts : "+item.prets)
  })
  console.log(body)
  emailComposer.mail(body.join("  ----  "))
};
$scope.delete = function(id){
  localStorage.removeItem(id)
}
$scope.deleteAll = function(){
  localStorage.clear()
}
$scope.$watch(function () { return Object.keys(localStorage).length },function(newVal,oldVal){
  if(oldVal!=newVal){ 
    $scope.get()
 }
})
$ionicModal.fromTemplateUrl('templates/suppressConfirmModal.html', {
  scope: $scope,
  animation: 'slide-in-up',
}).then(function(modal) {
  $scope.modal = modal;
});
$scope.openModal = function() {
  $scope.modal.show();
};
$scope.closeModal = function() {
  $scope.modal.hide();
};
}])
      
.controller('homeCtrl', ['$scope', '$stateParams', 
function ($scope, $stateParams) {
}])
 
