

/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4,
maxerr: 50, node: true */
/*global */
(function () {
    "use strict";
    var exec = require('child_process').exec;

    function runLuaCode(filePath){
        exec('lua "'+filePath+'"', function (error, stdout, stderr) {
            // output is in stdout
            console.log(stdout);
        });
    }

    function init(domainManager) {
        if (!domainManager.hasDomain("lua")) {
            domainManager.registerDomain("lua", {major: 0, minor: 1});
        }
        domainManager.registerCommand(
            "lua", // domain name
            "runLuaCode", // command name
            runLuaCode, // command handler function
            false, // this command is synchronous in Node
            "Run Lua code",
            [{name: "filePath", // parameters
              type: "string",
              description: "Lua file path"}],
            [{name: "data", // return
              type: "object",
              description: "Return"}]
        );
    }
    exports.init = init;
}());
