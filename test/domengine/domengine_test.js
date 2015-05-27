iwo.define('../test/domengine/domengine_test',['mods/domengine/domengine'],function(require){
    var dom = require('mods/domengine/domengine');

    var div = dom.createElement('div');
    console.info(div);
});
