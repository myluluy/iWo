iwo.define('../test/domengine/domengine_test', ['mods/domengine/domengine'], function(require) {
    var dom = require('mods/domengine/domengine');


    function testElement() {
        var div1,div2,span1,span2,text1,text2;
        div1 = dom.createElement('div');
        div2 = dom.createElement('div');
        span1 = dom.createElement('span');
        span2 = dom.createElement('span');
        text1 = dom.createTextNode('text1');
        text2 = dom.createTextNode('text1');
        return {
            div1 : div1,
            div2 : div2,
            span1:span1,
            span2:span2,
            text1:text1,
            text2:text2
        } 
    }

    test("testElement()", function(assert) {
        var doms = testElement();
        equal(doms.div1.tagName , 'div');
        doms.div1.appendChild(doms.span1);
        doms.div1.appendChild(doms.span2);
        equal(doms.div1.firstChild , doms.span1);
        equal(doms.div1.lastChild , doms.span2);
        equal(doms.div1.children.length , 2);
        
        doms.span1.appendChild(doms.span2);
        equal(doms.div1.firstChild , doms.span1);
        equal(doms.div1.lastChild , doms.span1);
        equal(doms.div1.children.length , 1);
        equal(doms.span2.parentNode , doms.span1);
        equal(doms.span2.block.parentNode , doms.div1);
        equal(doms.span1.block.parentNode , doms.div1);
        
        doms.span1.removeChild(doms.span2);
        equal(doms.div1.firstChild , doms.span1);
        equal(doms.div1.lastChild , doms.span1);
        equal(doms.div1.children.length , 1);
        equal(doms.span2.parentNode , null);
        equal(doms.span2.block.parentNode , null);
        equal(doms.span1.block.parentNode , doms.div1);

        doms.span1.appendChild(doms.span2);
        doms.div2.appendChild(doms.span2);
        equal(doms.div1.firstChild , doms.span1);
        equal(doms.div2.lastChild , doms.span2);
        equal(doms.div1.children.length , 1);
        equal(doms.span2.parentNode , doms.div2);
        equal(doms.span2.block.parentNode , doms.div2);
        equal(doms.span1.block.parentNode , doms.div1);
        equal(doms.span1.nextBlockSibling,null)

        doms.div1.appendChild(doms.div2);
        equal(doms.div1.lastChild ,doms.div2);
        equal(doms.div1.children.length,2);
        equal(doms.span1.nextSibling,doms.div2)
        equal(doms.span1.nextBlockSibling,doms.div2)
    });
});
