//=============================================================================
// EspItemColor.js
//=============================================================================

/*:
 * @plugindesc Draw names of certain items with certain color.
 * @author Esp
 *
 * @help Note to certain items(weapons/armors/keyitems included) in database, and the names of the items will be colored in item lists.
 * Note formation:
 *   <color COLOR>
 * COLOR: can be a number or a CSS style color, when it is a number, the meaning of the number is the same as that in "\C[NUMBER]" in Event#ShowText.
 * examples:
 *   <color 2>
 *     the color of the item name will be color no.2
 *   <color #ff0000>
 *     the color of the item name will be #ff0000, which means red
 *     simplized ones like "#f00" are okay
 *   <color rgb(0, 255, 0)>
 *     the color of the item name will be rgb(0, 255, 0), which means green
 *   <color blue>
 *     the color of the item name will be blue
 */

 var Imported = Imported || {};
 Imported.Esp = Imported.Esp || function(){};

(function() {
if (Imported.Esp.ItemColor === void 0) {
Imported.Esp.ItemColor = function(){};


Imported.Esp.ItemColor.DrawItem = false;

var _windowitemlistresettextcolor = Window_ItemList.prototype.resetTextColor;
Window_ItemList.prototype.resetTextColor = function() {
  if (Imported.Esp.ItemColor.DrawItem != false) {
    var result =
      (Imported.Esp.ItemColor.DrawItem.match(/<color\s+(.+)>/i)||[])[1];
    if (typeof result != 'string') {
      return _windowitemlistresettextcolor.apply(this, arguments);
    }
    if (result.match(/^\d+$/)) {
      return this.changeTextColor(this.textColor(parseInt(result)));
    }
    return this.changeTextColor(result);
  } else {
    _windowitemlistresettextcolor.apply(this, arguments);
  }
};

var _windowitemlistdrawitem = Window_ItemList.prototype.drawItem;
Window_ItemList.prototype.drawItem = function(index) {
    Imported.Esp.ItemColor.DrawItem = this._data[index].note;
    _windowitemlistdrawitem.apply(this, arguments);
    Imported.Esp.ItemColor.DrawItem = false;
};


}
})();
