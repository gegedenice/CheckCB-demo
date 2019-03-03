cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/cordova-plugin-email/www/email_composer.js",
        "id": "cordova-plugin-email.EmailComposer",
        "pluginId": "cordova-plugin-email",
        "clobbers": [
            "cordova.plugins.email",
            "plugin.email"
        ]
    },
    {
        "file": "plugins/cordova-plugin-email/src/browser/EmailComposerProxy.js",
        "id": "cordova-plugin-email.EmailComposerProxy",
        "pluginId": "cordova-plugin-email",
        "runs": true
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "com.phonegap.plugins.barcodescanner": "0.6.1",
    "cordova-plugin-email": "1.2.7",
    "cordova-plugin-whitelist": "1.3.3"
}
// BOTTOM OF METADATA
});