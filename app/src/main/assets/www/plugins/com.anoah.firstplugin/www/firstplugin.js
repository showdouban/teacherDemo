cordova.define("com.anoah.firstplugin.firstplugin", function(require, exports, module) {
var exec = require('cordova/exec');

var firstplugin = {
	wifi:function(success,error){
		exec(success,error,'FirstPlugin','wifi','')
	}
}
module.exports = firstplugin;  


});
