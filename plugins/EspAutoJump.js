//=============================================================================
// EspAutoJump.js
//=============================================================================

/*:
 * @plugindesc Allow the player automaticly jump over small gaps.
 * @author Esp
 *
 * @param SE Name
 * @desc Name of SE played while jumping. No SE will be played if left empty.
 * @default
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
 * @help All the 1 tile space gaps can be automaticly jumped over by player,
 * Unless:
 *   The gap is marked by certain region IDs which are specially noted to the map.
 *   The formation of notes:
 *     <no auto jump REGION_ID, DIRECTIONS>
 *   REGION_ID: the region ID used to mark.
 *   DIRECTIONS: the directions which player can not jump over to.
 *               2 4 6 8 for down left right up
 *   examples:
 *     <no auto jump 5, 2>
 *       while the gap is marked region 5, player can not jump over it from up to down
 *     <no auto jump 9, 28>
 *       while the gap is marked region 9, player can not jump over it from up to down or down to up
 *     <no auto jump 11, 2468>
 *       while the gap is marked region 11, player can not jump over it
 */

 var Imported = Imported || {};
 Imported.Esp = Imported.Esp || function(){};

(function() {
if (Imported.Esp.AutoJump === void 0) {
Imported.Esp.AutoJump = function(){};


var parameters = PluginManager.parameters("EspAutoJump");
Imported.Esp.AutoJump.SE = {
  name:  parameters["SE Name"],
  pitch: parameters["SE Pitch"],
  volume: parameters["SE Volume"],
  pan:   parameters["SE Pan"]
};

var _gameplayermovestraight = Game_Player.prototype.moveStraight;
Game_Player.prototype.moveStraight = function(d) {
    _gameplayermovestraight.apply(this, arguments);
    if (!this.isMovementSucceeded() && !$gameMap.isEventRunning()) {
      var rxwd = $gameMap.roundXWithDirection(this._x, d);
      var rywd = $gameMap.roundYWithDirection(this._y, d);
      if (!this.espautojumpNoBlockJump(rxwd, rywd, d)) {
        rxwd = $gameMap.roundXWithDirection(rxwd, d);
        rywd = $gameMap.roundYWithDirection(rywd, d);
        if (this.espautojumpCanJumpOver(rxwd, rywd)) {
          this.jump(rxwd - this._x, rywd  - this._y);
          AudioManager.playSe(Imported.Esp.AutoJump.SE);
        }
      }
    }
};

Game_Player.prototype.espautojumpNoBlockJump = function(x, y, d) {
  var result = ($dataMap.note.match(RegExp("<\\s*no\\s*auto\\s*jump\\s*" +
    $gameMap.regionId(x, y) + "\\s*,\\s*([2468]+)\\s*>", 'i')) || [0,""])[1];
  return result.split("").map(function(_){return parseInt(_)}).contains(d);
};

Game_Player.prototype.espautojumpCanJumpOver = function(x, y) {
  var iter = function(d) {return $gameMap.isPassable(x, y, d)};
  return this.isThrough() || this.isDebugThrough() || $gameMap.isValid(x, y) &&
    !this.isCollidedWithCharacters(x,y) && [2,4,6,8].filter(iter).length > 0;
};


}
})();
