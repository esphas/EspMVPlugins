//=============================================================================
// EspLibrary.js
//=============================================================================

/*:
 * @plugindesc Unfinished.
 * @author Esp
 *
 * @param Library File Name
 * @desc The name of the file that stores the library.
 * @default EspLibrary
 *
 * @help Unfinished.
 */

 var Imported = Imported || {};
 Imported.Esp = Imported.Esp || function(){};

(function() {
if (Imported.Esp.Library === void 0) {
Imported.Esp.Library = function(){};


var parameters = PluginManager.parameters('EspLibrary');
var LibraryFileName = String(parameters['Library File Name'] || 'EspLibrary');

// setup
Imported.Esp.Library.prototype.setup = function() {
  DataManager.loadDataFile();
}


}
})();
