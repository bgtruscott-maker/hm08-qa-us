const page = require('../../page');
const helper = require('../../helper')

describe('Create an order', () => {  
    it('should open phone number modal', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        const phoneNumberButton = await $(page.phoneNumberButton);
        await phoneNumberButton.waitForDisplayed();
        await browser.pause(3000); 
        await phoneNumberButton.click();
        await browser.pause(3000); 
        const pnoneNumberModal = await $(page.phoneNumberModal);
        await browser.pause(3000); 
        await expect(pnoneNumberModal).toBeExisting();
        await browser.pause(3000); 
    })

    it('should save the phone', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        const phoneNumber = helper.getPhoneNumber("+1");
        await browser.pause(3000); 
        await page.submitPhoneNumber(phoneNumber);
        await browser.pause(3000); 
        await expect(await helper.getElementByText(phoneNumber)).toBeExisting();
        await browser.pause(3000); 
    })
})

