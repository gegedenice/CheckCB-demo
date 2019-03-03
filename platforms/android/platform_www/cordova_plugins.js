cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
  {
    "id": "com.phonegap.plugins.barcodescanner.barcodescanner",
    "file": "plugins/com.phonegap.plugins.barcodescanner/www/barcodescanner.js",
    "pluginId": "com.phonegap.plugins.barcodescanner",
    "clobbers": [
      "plugins.barcodeScanner"
    ]
  },
  {
    "id": "cordova-plugin-email.EmailComposer",
    "file": "plugins/cordova-plugin-email/www/email_composer.js",
    "pluginId": "cordova-plugin-email",
    "clobbers": [
      "cordova.plugins.email",
      "plugin.email"
    ]
  }
];
module.exports.metadata = 
// TOP OF METADATA
{
  "com.phonegap.plugins.barcodescanner": "0.6.1",
  "cordova-plugin-email": "1.2.7",
  "cordova-plugin-whitelist": "1.3.3"
};
// BOTTOM OF METADATA
});