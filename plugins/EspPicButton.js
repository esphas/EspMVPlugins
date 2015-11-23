//=============================================================================
// EspPicButton.js
//=============================================================================

/*:
 * @plugindesc Unfinished.
 * @author Esp
 *
 * @help Unfinished.
 */

 var Imported = Imported || {};
 Imported.Esp = Imported.Esp || function(){};

(function() {
if (Imported.Esp.PicButton === void 0) {
Imported.Esp.PicButton = function(){};


Imported.Esp.PicButton.Choices = [];
Imported.Esp.PicButton.Enabled = false;

var _gameinterpreterplugincommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
  _gameinterpreterplugincommand.call(this, arguments);
  if (command === 'EspPicBut') {
    switch (args[0]) {
    case 'on':
      Imported.Esp.PicButton.Choices = [];
      Imported.Esp.PicButton.Enabled = true;
      break;
    case 'off':
      Imported.Esp.PicButton.Enabled = false;
      Imported.Esp.PicButton.Choices.forEach(function(a){

      });
      break;
    default:
      Imported.Esp.PicButton.Choices[parseInt(args[1])] = [parseInt(args[2])];
      break;
    }
  }
};

var _gameinterpretercommand231 = Game_Interpreter.prototype.command231;
Game_Interpreter.prototype.command231 = function() {
  if (Imported.Esp.PicButton.Enabled) {
    var x, y;
    if (this._params[3] === 0) {
        x = this._params[4];
        y = this._params[5];
    } else {
        x = $gameVariables.value(this._params[4]);
        y = $gameVariables.value(this._params[5]);
    }
    Imported.Esp.PicButton.Choices[this._params[0]][1] = [
      this._params[0], this._params[1], this._params[2], x, y, this._params[6],
      this._params[7], this._params[8], this._params[9]
    ]
  }
  _gameinterpretercommand231.apply(this, arguments);
};


}
})();
