cordova.define("com.anoah.uninstallplugin.uninstallplugin", function(require, exports, module) {
var exec = require('cordova/exec');

var uninstallPlugin ={  
    showInfo:function(info,success,error){  
        exec(success, error, "UninstallPlugin", "showInfo", [info]);
    },  
    uninstallApp:function(success,error){  
        exec(success, error, "UninstallPlugin", "uninstallApp", ['com.crosswork']);
    }  
}  
module.exports = uninstallPlugin;  
});
