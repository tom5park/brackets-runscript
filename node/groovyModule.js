/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4,
maxerr: 50, node: true */
/*global */
(function () {
    "use strict";
	var spawn 	= require('child_process').spawn;
    function runGroovyCode(code, config){
		var groovy 	= spawn(config.cmd, ['-e', code], {});
		groovy.stdin.setEncoding('utf8');
		groovy.stdout.setEncoding('utf8');
		groovy.stdout.on('data', function(data){
			var ss = data.split('\n');
			for(var i = 0; i < ss.length; i++) {
				var s = ss[i];
				if(s) console.log(s);
			}
		});
		groovy.stderr.on('data', function(data){
			console.log(data.toString());
		});
    }

    function init(domainManager) {
        if (!domainManager.hasDomain("groovy")) {
            domainManager.registerDomain("groovy", {major: 0, minor: 1});
        }
        domainManager.registerCommand(
            "groovy", // domain name
            "runGroovyCode", // command name
            runGroovyCode, // command handler function
            false, // this command is synchronous in Node
            "Run Groovy code",
            [{name: "code", // parameters
              type: "string",
              description: "Groovy code"}],
            [{name: "data", // return
              type: "object",
              description: "Return"}]
        );
    }
    exports.init = init;
}());
