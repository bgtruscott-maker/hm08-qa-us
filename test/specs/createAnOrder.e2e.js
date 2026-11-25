const page = require('../../page');
const helper = require('../../helper')

describe('Create an order', () => {  
    it('should open phone number modal', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        const phoneNumberButton = await $(page.phoneNumberButton);
        await phoneNumberButton.waitForDisplayed();
        await phoneNumberButton.click();
        const phoneNumberModal = await $(page.phoneNumberModal);
        await phoneNumberModal.waitForDisplayed();
        await expect(phoneNumberModal).toBeExisting();
    })

    it('should save the phone', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        const phoneNumber = helper.getPhoneNumber("+1");
        await page.submitPhoneNumber(phoneNumber);
        await expect(await helper.getElementByText(phoneNumber)).toBeExisting();
    })

    it('should create a taxi order', async () => {
        await browser.url(`/`);
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        const supportiveButton = await $(page.supportiveButton);
        await supportiveButton.waitForDisplayed();
        await supportiveButton.click();
        const phoneNumber = helper.getPhoneNumber("+1");
        await page.submitPhoneNumber(phoneNumber);
        const paymentMethodButton = await $(page.paymentMethodButton);
        await paymentMethodButton.waitForDisplayed();
        await paymentMethodButton.click();
        const addCardButton = await $(page.addCardButton);
        await addCardButton.waitForDisplayed();
        await browser.execute(() => {
        document.querySelector('.pp-row.disabled').click();
        });
        const cardNumberField = await $(page.cardNumberField);
        await cardNumberField.waitForDisplayed();
        await cardNumberField.setValue('1234567812345678'); 
        const cardCodeField = await $(page.cardCodeField);
        await cardCodeField.waitForDisplayed();
        await cardCodeField.setValue('357'); 
        await browser.keys('Tab');
        const linkCardButton = await $(page.linkCardButton);
        await linkCardButton.waitForEnabled();
        await linkCardButton.click();
        const paymentMethodCloseButton = await $(page.paymentMethodCloseButton);
        await paymentMethodCloseButton.waitForDisplayed();
        await paymentMethodCloseButton.click();
        const driverMessageField = await $(page.driverMessageField);
        await driverMessageField.waitForDisplayed();
        await driverMessageField.setValue('Please come on time.');
        const blanketSwitch = await $(page.blanketSwitch);
        await blanketSwitch.click();

        const blanketSwitchCheckbox = await $(page.blanketSwitchCheckbox);
        await expect(blanketSwitchCheckbox).toBeChecked();
        const iceCreamPlusButton = await $(page.iceCreamPlusButton);
        await iceCreamPlusButton.click();
        await iceCreamPlusButton.click();
        const iceCreamQuantity = await $(page.iceCreamQuantity);

        const quantityText  = await iceCreamQuantity.getText();
        await expect(quantityText).toBe('2');
        const orderButton = await $(page.orderButton);
        await orderButton.waitForDisplayed();
        await orderButton.click();
        const orderModal = await $(page.orderModal);
        await orderModal.waitForDisplayed();
        const carSearchTitle = await $(page.carSearchTitle);
        const carSearchText = await carSearchTitle.getText();
        await expect(carSearchText).toBe('Car search');
        await browser.waitUntil(
        async () => {
        const carSearchTitle = await $(page.carSearchTitle);
        const carSearchText = await carSearchTitle.getText();
        return carSearchText.includes('The driver will arrive in');
        },
        {
        timeout: 60000,
        timeoutMsg: 'Driver information did not appear within 60 seconds'
        }
    );
        const driverArrivalInfo = await $(page.driverArrivalInfo);
        const driverArrivalText = await driverArrivalInfo.getText();
        await expect(driverArrivalText).toContain('The driver will arrive in');
    })
})

