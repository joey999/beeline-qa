const webdriver = require('selenium-webdriver').WebDriver;
class customConditions{

    async elementAttributeIs (element, text) {
        return new WebElementCondition('until element text is', function() {
            return element.getText().then(t => t === text ? element : null);
        });
    };

}
module.exports = elementAttributeIs;