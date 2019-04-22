"use strict"
const describeWithBrowser = require("../util/browser");
const webdriver = require('selenium-webdriver');
const StartPage = require('../pageObjects/Start');
const CashBoxes = require('../pageObjects/CashBoxes');
const Gadgets = require('../pageObjects/Gadgets');
const Basket = require('../pageObjects/Basket');


let browser;


describeWithBrowser(
    "OFD Client",
    b => (browser = b),
    () => {

        describe("Страница авторизации ОФД-Клиент", () => {
            let page;
            beforeEach(async () => {

            });
            before(async () => {
            });

            xit('Проверка тайтла страница авторизации ОФД-Клиент', async () => {
                console.log("============ ТЕСТ_1. Тайтл стартовой страницы ===============");
                const startPage = new StartPage(browser);

                await startPage.checkTitle("Вход в личный кабинет");

            });

            xit("Проверка авторизации и редиректа в модуль Кассы", async () => {
                console.log("============ Тест_2. Редирект в модуль Кассы ================");
                const startPage = new StartPage(browser);

                await startPage.usernameField('999013072');
                await startPage.passwordField('1q2w#E$R');

                await startPage.loginButton();

                const cashBoxes = new CashBoxes(browser);

                await cashBoxes.checkURL("http://10.50.74.227/kkt-list");
                await cashBoxes.checkTitle("Кассы");

            });

            xit("Проверка всплывающего сообщения при неверном логине", async () => {
                console.log("============ Тест_3. Неверный логин ================");
                const startPage = new StartPage(browser);

                await startPage.usernameField('999013941123');
                await startPage.passwordField('1q2w#E$R');

                await startPage.loginButton();

                await startPage.checkLoginError("Имя пользователя или пароль указаны неверно");
            });

            xit("Проверка всплывающего сообщения при неверном пароле", async () => {
                console.log("============ Тест_4. Неверный пароль ================");
                const startPage = new StartPage(browser);

                await startPage.usernameField('999013072');
                await startPage.passwordField('1q2w#E$R123');

                await startPage.loginButton();

                await startPage.checkLoginError("Имя пользователя или пароль указаны неверно");
            });

            it("Проверка возможности ввода в поле 'Номер договора' недопустимых символов", async () => {
                console.log("============ Тест_5. Проверка инпута логина ================");
                const startPage = new StartPage(browser);

                await startPage.usernameField("zaqxswcdevfrbgtnhymju,ki.lo/;p'[]\|/`~!@#$%^&*()-_=+123");

                await startPage.checkLoginContainField('123')
            });
        })
    }
);