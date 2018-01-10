/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global define, $, brackets */
/*
    In Brackets, all js files are modules handled by requirejs.
    Leave it that way to conform to Brackets coding standards.
*/
define(function (require, exports, module) {
    'use strict';

    var CommandManager = brackets.getModule("command/CommandManager"),
        Menus          = brackets.getModule("command/Menus"),
        DocumentManager = brackets.getModule("document/DocumentManager"),
        EditorManager = brackets.getModule("editor/EditorManager"),
        ExtensionUtils = brackets.getModule("utils/ExtensionUtils"),
        NodeDomain = brackets.getModule("utils/NodeDomain"),
        KeyBindingManager = brackets.getModule("command/KeyBindingManager");

    var RUN_SCRIPT_NAME   = "Run Script as JS",
        RUN_SCRIPT_COMMAND_ID  = "runscript.runjs",
        RUN_SCRIPT_PYTHON_NAME  = "Run Script as Python",
        RUN_SCRIPT_PYTHON_COMMAND_ID  = "runscript.runpython",
        RUN_SCRIPT_PHP_NAME  = "Run Script as PHP",
        RUN_SCRIPT_PHP_COMMAND_ID  = "runscript.runPHP",
        RUN_SCRIPT_RUBY_NAME  = "Run Script as Ruby",
        RUN_SCRIPT_RUBY_COMMAND_ID  = "runscript.runRuby",
        RUN_SCRIPT_LUA_NAME  = "Run Script as Lua",
        RUN_SCRIPT_LUA_COMMAND_ID  = "runscript.runLua",
        RUN_SCRIPT_PERL_NAME  = "Run Script as Perl",
        RUN_SCRIPT_PERL_COMMAND_ID  = "runscript.runPerl",
		RUN_SCRIPT_GROOVY_NAME  = "Run Script as Groovy",
        RUN_SCRIPT_GROOVY_COMMAND_ID  = "runscript.runGroovy",
        RUN_SCRIPT_QUICKRUN_NAME  = "Quick Run",
        RUN_SCRIPT_QUICKRUN_COMMAND_ID  = "runscript.quickrun";

    function runjs() {
        var editor = EditorManager.getCurrentFullEditor();
        var selectedText = editor.getSelectedText();
        if (selectedText === '') {
            selectedText = DocumentManager.getCurrentDocument().getText();
        }
        console.log(eval(selectedText));
    }

    function runpython() {
        var pythonDomain = new NodeDomain("python", ExtensionUtils.getModulePath(module, "node/pythonModule"));
        var editor = EditorManager.getCurrentFullEditor();
        var selectedText = editor.getSelectedText();
        if (selectedText === '') {
            selectedText = DocumentManager.getCurrentDocument().getText();
        }

        pythonDomain.exec('runPythonCode', selectedText);
    }

    function runphp() {
        var phpDomain = new NodeDomain("php", ExtensionUtils.getModulePath(module, "node/phpModule"));
        var editor = EditorManager.getCurrentFullEditor();
        var selectedText = editor.getSelectedText();
        if (selectedText === '') {
            selectedText = DocumentManager.getCurrentDocument().getText();
        }

        var path = ExtensionUtils.getModulePath(module);

        brackets.fs.writeFile(path + 'code.php', selectedText, "utf8", function(err) {
            if(err){
                console.log(err);
            }
            else{
                phpDomain.exec('runPHPCode', path + 'code.php');
            }
        });

    }

    function runruby() {
        var rubyDomain = new NodeDomain("ruby", ExtensionUtils.getModulePath(module, "node/rubyModule"));
        var editor = EditorManager.getCurrentFullEditor();
        var selectedText = editor.getSelectedText();
        if (selectedText === '') {
            selectedText = DocumentManager.getCurrentDocument().getText();
        }

        var path = ExtensionUtils.getModulePath(module);

        brackets.fs.writeFile(path + 'code.rb', selectedText, "utf8", function(err) {
            if(err){
                console.log(err);
            }
            else{
                rubyDomain.exec('runRubyCode', path + 'code.rb');
            }
        });

    }

	function runlua() {
        var luaDomain = new NodeDomain("lua", ExtensionUtils.getModulePath(module, "node/luaModule"));
        var editor = EditorManager.getCurrentFullEditor();
        var selectedText = editor.getSelectedText();
        if (selectedText === '') {
            selectedText = DocumentManager.getCurrentDocument().getText();
        }

        var path = ExtensionUtils.getModulePath(module);

        brackets.fs.writeFile(path + 'code.lua', selectedText, "utf8", function(err) {
            if(err){
                console.log(err);
            }
            else{
                luaDomain.exec('runLuaCode', path + 'code.lua');
            }
        });

    }

    function runperl() {
        var perlDomain = new NodeDomain("perl", ExtensionUtils.getModulePath(module, "node/perlModule"));
        var editor = EditorManager.getCurrentFullEditor();
        var selectedText = editor.getSelectedText();
        if (selectedText === '') {
            selectedText = DocumentManager.getCurrentDocument().getText();
        }

        var path = ExtensionUtils.getModulePath(module);

        brackets.fs.writeFile(path + 'code.pl', selectedText, "utf8", function(err) {
            if(err){
                console.log(err);
            }
            else{
                perlDomain.exec('runPerlCode', path + 'code.pl');
            }
        });

    }
	
	function rungroovy() {
        var groovyDomain = new NodeDomain("groovy", ExtensionUtils.getModulePath(module, "node/groovyModule"));
		var path = ExtensionUtils.getModulePath(module, "node/TerminalDomain");
        var editor = EditorManager.getCurrentFullEditor();
        var selectedText = editor.getSelectedText();
        if (selectedText === '') {
            selectedText = DocumentManager.getCurrentDocument().getText();
        }
        groovyDomain.exec('runGroovyCode', selectedText);
    }

    function quickRun(){
        var currentDoc = DocumentManager.getCurrentDocument(),
            langName = currentDoc.language.getName();
        switch (langName) {
            case 'JavaScript':
                runjs();
                break;
            case 'Ruby':
                runruby();
                break;
			 case 'Lua':
                runlua();
                break;
            case 'PHP':
                runphp();
                break;
            case 'Python':
                runpython();
                break;
            case 'Perl':
                runperl();
                break;
			case 'Groovy':
                rungroovy();
                break;	
        }
    }

    CommandManager.register(RUN_SCRIPT_NAME, RUN_SCRIPT_COMMAND_ID, runjs);
    CommandManager.register(RUN_SCRIPT_PYTHON_NAME, RUN_SCRIPT_PYTHON_COMMAND_ID, runpython);
    CommandManager.register(RUN_SCRIPT_PHP_NAME, RUN_SCRIPT_PHP_COMMAND_ID, runphp);
    CommandManager.register(RUN_SCRIPT_RUBY_NAME, RUN_SCRIPT_RUBY_COMMAND_ID, runruby);
    CommandManager.register(RUN_SCRIPT_LUA_NAME, RUN_SCRIPT_LUA_COMMAND_ID, runlua);
    CommandManager.register(RUN_SCRIPT_PERL_NAME, RUN_SCRIPT_PERL_COMMAND_ID, runperl);
	CommandManager.register(RUN_SCRIPT_GROOVY_NAME, RUN_SCRIPT_GROOVY_COMMAND_ID, rungroovy);
    CommandManager.register(RUN_SCRIPT_QUICKRUN_NAME, RUN_SCRIPT_QUICKRUN_COMMAND_ID, quickRun);

    Menus.getContextMenu(Menus.ContextMenuIds.EDITOR_MENU).addMenuDivider();
    Menus.getContextMenu(Menus.ContextMenuIds.EDITOR_MENU).addMenuItem(RUN_SCRIPT_COMMAND_ID);
    Menus.getContextMenu(Menus.ContextMenuIds.EDITOR_MENU).addMenuItem(RUN_SCRIPT_PYTHON_COMMAND_ID);
    Menus.getContextMenu(Menus.ContextMenuIds.EDITOR_MENU).addMenuItem(RUN_SCRIPT_PHP_COMMAND_ID);
    Menus.getContextMenu(Menus.ContextMenuIds.EDITOR_MENU).addMenuItem(RUN_SCRIPT_RUBY_COMMAND_ID);
    Menus.getContextMenu(Menus.ContextMenuIds.EDITOR_MENU).addMenuItem(RUN_SCRIPT_LUA_COMMAND_ID);
    Menus.getContextMenu(Menus.ContextMenuIds.EDITOR_MENU).addMenuItem(RUN_SCRIPT_PERL_COMMAND_ID);
	Menus.getContextMenu(Menus.ContextMenuIds.EDITOR_MENU).addMenuItem(RUN_SCRIPT_GROOVY_COMMAND_ID);

    KeyBindingManager.addBinding(RUN_SCRIPT_QUICKRUN_COMMAND_ID, 'F12');

});
