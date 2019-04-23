const {By, until} = require('selenium-webdriver');
const Catalog = require('./Catalog');
const screenshotWithCircle = require('../util/screenFunc');
const expect = require('chai').expect;

class Start {
    constructor(driver) {
        this.driver = driver;
        screenshotWithCircle(this.driver, 'Стартовая страница http://10.50.74.227/login');//вызов скриншота без обоводки
    }

    /**
     * Кнопка Войти
     * @returns {Promise<void>}
     */
    async loginButton() {

        let selector = "//button[text()='Войти']";
        const item = await this.driver.wait(until.elementLocated(By.xpath(selector)), 10000);
        // const item = await this.driver.findElement(By.xpath(selector));
        await screenshotWithCircle(this.driver, 'Переход в личный кабинет клиента', item);

        await item.click(); // клик по item

        await this.waitFor();
        // await this.driver.wait(until.elementLocated(By.xpath("//div[@class='b-container']"))); // опциональное ожидание загрузки элемента

    }

    /**
     * Поле "Номер договора"
     * @param name
     * @returns {Promise<void>}
     */
    async usernameField(name) {
        let selector = "//input[@name='UserName']";
        const item = await this.driver.wait(until.elementLocated(By.xpath(selector)), 10000);

        return await item.sendKeys(name);
    }

    /**
     * Поле "Пароль"
     * @param passwd
     * @returns {Promise<void>}
     */
    async passwordField(passwd){
        let selector = "//input[@name='Password']";
        const item = await this.driver.findElement(By.xpath(selector));
        await item.sendKeys(passwd);
    }

    // validators

    /**
     * Проверка тайтла
     * @param expectTitle - string;
     * @returns {Promise<*|void>}
     */
    async checkTitle(expectTitle) {
        return await this.driver.wait(until.elementLocated(By.xpath("//*[@class='panel__title']")), 10000)
            .then(async (elem) => {
                await screenshotWithCircle(this.driver, 'Проверка тайтла', elem);
                return expect(await elem.getText()).to.equal(expectTitle, 'НЕВЕРНЫЙ ТАЙТЛ!!! ')
            });
    }

    /**
     * Проверка всплывающего сообщения об ошибке некорректых учётных данных
     * @param expectError
     * @returns {Promise<void>}
     */
    async checkLoginError(expectError) {
        return await this.driver.wait(until.elementLocated(By.xpath("//*[@class='login__error']")), 10000)
            .then(async (elem) => {
                await screenshotWithCircle(this.driver, 'Проверка наличия сообщения об ошибке неверного логина', elem);
                return expect(await elem.getText()).to.equal(expectError, 'НЕВЕРНОЕ СООБЩЕНИЕ!!! ')
            });
    }

    /**
     * Проверка содержимого поля Номер договора
     * @param containText
     * @returns {Promise<void>}
     */
    async checkLoginContainField(containText) {
        await this.driver.sleep(10000);
        let elem = await this.driver.findElement(By.xpath("//input[@name='UserName']"));
        console.log("ELEMENT TEXT IS ---- " + await elem.getAttribute('value'));

        return expect(await elem.getAttribute('value')).to.equal(containText, 'Инпут принял что-то не то!');
        // await this.driver.wait(until.elementTextIs(await elem.getAttribute('value'), containText), 10000)
            // .then(async (mess) => {
            //     await console.log('=========asdasdasdasd ========== | \n' + mess)
            // });

        // await screenshotWithCircle(this.driver, 'Проверка наличия сообщения об ошибке неверного логина', item);
        // return expect(await item.getText()).to.equal(containText, 'НЕДОПУСТИМЫЕ СИМВОЛЫ!!! ')

    }


    /**
     * Ожидание загрузки страницы
     * @param selector
     * @returns {Promise<void>}
     */
    async waitFor(selector = 'div.load') {

        console.log('======================>> Модуль waitFor in catalog. Ожидание загрузки страницы... << ====================');
        const waitArray = await this.driver.findElements(By.css(selector))
            .then( async () => {
                for (let i = 0; i < waitArray.length; i++) {
                    await this.driver.wait(until.elementIsNotVisible(waitArray[i]));
                }})
            .catch(() => {console.log('============ Ожидание завершено =============')})
    }
}

module.exports = Start;