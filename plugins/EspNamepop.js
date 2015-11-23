//=============================================================================
// EspNamepop.js
//=============================================================================

/*:
 * @plugindesc Display the names of noted events on the top of them.
 * @author Esp
 *
 * @help Note in event:
 *    namepop
 * and the name of the evnet will be displayed.
 *
 * If the position of the namepop is not suitable, you can note as:
 *    namepop<X_offset, Y_offset>
 * X and Y offsets must be integers and can be negetive.
 */

 var Imported = Imported || {};
 Imported.Esp = Imported.Esp || function(){};

(function() {
if (Imported.Esp.Namepop === void 0) {
Imported.Esp.Namepop = function(){};


var _spritecharacterinitialize = Sprite_Character.prototype.initialize;
Sprite_Character.prototype.initialize = function() {
    _spritecharacterinitialize.apply(this, arguments);
    this.createEspNamepop(arguments[0]);
};

Sprite_Character.prototype.createEspNamepop = function(char) {
  if (char instanceof Game_Event) {
    var matchreg = /namepop\s*(?:<\s*(\-)?(\d+)\s*,\s*(\-)?(\d+)\s*>)?/i
    var result = char.event().note.match(matchreg);
    if (result != null) {
      var xoffs = (result[1] === void 0 ? 1 : -1) * (result[2] || 0);
      var yoffs = (result[3] === void 0 ? 1 : -1) * (result[4] || 0);
      var height = ImageManager.isBigCharacter(char._characterName) ? 2 : 1;
      var tsprite = new Sprite();
      tsprite.bitmap = new Bitmap(100, 20);
      tsprite.bitmap.fontSize = 18;
      tsprite.bitmap.drawText(char.event().name, 0, 0, 100, 20, 'center');
      tsprite.anchor.x = 0.5;
      tsprite.anchor.y = 1;
      tsprite.x = this.x + xoffs;
      tsprite.y = this.y + yoffs - height * 48;
      this._espnamepop = tsprite;
      this.addChild(this._espnamepop);
    }
  }
};


}
})();
