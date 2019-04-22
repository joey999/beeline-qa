const {By, until} = require('selenium-webdriver');
const Catalog = require('./Catalog');
const screenshotWithCircle = require('../util/screenFunc');
const expect = require('chai').expect;

class CashBoxes {
    constructor(driver) {
        this.driver = driver;
        // this.catalog = new Cashboxes(this.driver);

    }

    /**
     * функция вызова страницы корзины
     * @returns {Promise<void>}
     */
    async page() {
        await this.driver.get('https://10.50.74.227/kkt-list');
        return await screenshotWithCircle(this.driver, 'Страница Кассы - http://10.50.74.227/kkt-list');//вызов скриншота без обоводки
    }

    // validators

    /**
     * Проверка тайтла страницы
     * @param expectTitle
     * @returns {Promise<void>}
     */
    async checkTitle(expectTitle){
        return await this.driver.wait(until.elementLocated(By.xpath("//*[@class='kkt-list__title']")), 10000)
            .then(async (elem) => {
                await screenshotWithCircle(this.driver, 'Проверка тайтла', elem);
                return expect(await elem.getText()).to.equal(expectTitle, 'НЕВЕРНЫЙ ТАЙТЛ!!! ')
            });
    }

    /**
     *
     * @param addr
     * @returns {Promise<void>}
     */
    async checkURL(addr) {

        await this.driver.wait(until.urlIs(addr), 10000)
            .then(async () => {
                screenshotWithCircle(this.driver, 'Проверка редиректа в Кассы');
                let url = await this.driver.getCurrentUrl();
                return expect(url).to.equal(addr, 'Ожидаем другой URL')
            });
        // return await this.driver.getCurrentUrl()
        //     .then((currentURL) => {
        //         expect(currentURL).to.equal(addr, 'Кнопка покупки некорректно редиректит')
        //     });
    }
}

module.exports = CashBoxes;