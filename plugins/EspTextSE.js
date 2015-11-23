//=============================================================================
// EspTextSE.js
//=============================================================================

/*:
 * @plugindesc Playing SE while showing text.
 * @author Esp
 *
 * @param SE Name
 * @desc Name of SE played while showing text.
 * @default Key
 *
 * @param SE Volume
 * @desc Volume of SE.
 * @default 100
 *
 * @param SE Pitch
 * @desc Pitch of SE.
 * @default 100
 *
 * @param SE Pan
 * @desc Pan of SE.
 * @default 100
 *
 * @help Plugin Command:
 *   EspTextSE pause
 *     do not play SE
 *   EspTextSE continue
 *     do play SE
 */

 var Imported = Imported || {};
 Imported.Esp = Imported.Esp || function(){};

(function() {
if (Imported.Esp.TextSE === void 0) {
Imported.Esp.TextSE = function(){};

var parameters = PluginManager.parameters("EspTextSE");
Imported.Esp.TextSE.SE = {
  name:  parameters["SE Name"],
  pitch: parameters["SE Pitch"],
  volume: parameters["SE Volume"],
  pan:   parameters["SE Pan"]
};
Imported.Esp.TextSE.ProcessingFlag = false;
Imported.Esp.TextSE.Enabled = true;

var _gameinterpreterplugincommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
  _gameinterpreterplugincommand.call(this, arguments);
  if (command === 'EspTextSE') {
    switch (args[0]) {
    case 'pause':
      Imported.Esp.TextSE.Enabled = false;
      break;
    case 'continue':
      Imported.Esp.TextSE.Enabled = true;
      break;
    }
  }
};

var _windowmessageprocesscharacter = Window_Message.prototype.processCharacter;
Window_Message.prototype.processCharacter = function() {
  _windowmessageprocesscharacter.apply(this, arguments);
  if (Imported.Esp.TextSE.ProcessingFlag && Imported.Esp.TextSE.Enabled) {
    AudioManager.playSe(Imported.Esp.TextSE.SE);
  }
};

var _windowmessageupdate = Window_Message.prototype.update;
Window_Message.prototype.update = function() {
  Imported.Esp.TextSE.ProcessingFlag = Graphics.frameCount % 3 == 0;
  _windowmessageupdate.apply(this, arguments);
  Imported.Esp.TextSE.ProcessingFlag = false;
};


}
})();
