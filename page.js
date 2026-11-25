module.exports = {
    // Inputs
    fromField: '#from',
    toField: '#to',
    phoneNumberField: '#phone',
    codeField: '#code',
    cardNumberField: '#number',
    driverMessageField: '#comment',
    blanketSwitchCheckbox: '.r-type-switch .switch-input',
    iceCreamQuantity: '.r-type-counter .counter-value',
    cardCodeField: '.card-input#code',
    // Buttons
    callATaxiButton: 'button=Call a taxi',
    supportiveButton: "//div[contains(@class,'tcard')][.//img[@alt='Supportive']]",
    phoneNumberButton: '//div[starts-with(text(), "Phone number")]',
    nextButton: 'button=Next',
    confirmButton: 'button=Confirm',
    paymentMethodButton: '.pp-button.filled .pp-text',
    paymentMethodCloseButton: '.payment-picker .close-button',
    linkCardButton: 'button=Link',
    addCardButton: '.pp-title',
    blanketSwitch: '.r-type-switch .slider',
    iceCreamPlusButton: '.r-type-counter .counter-plus',
    orderButton: '.smart-button',
    // Modals
    phoneNumberModal: '.modal',
    orderModal: '.order.shown',
    driverArrivalInfo: '.order-header-title',
    carSearchTitle: '.order-header-title',
    orderNumber: '.order-number .number',
    
    // Functions
    fillAddresses: async function(from, to) {
        const fromField = await $(this.fromField);
        await fromField.setValue(from);
        const toField = await $(this.toField);
        await toField.setValue(to);
        const callATaxiButton = await $(this.callATaxiButton);
        await callATaxiButton.waitForDisplayed();
        await callATaxiButton.click();
    },
    fillPhoneNumber: async function(phoneNumber) {
        const phoneNumberButton = await $(this.phoneNumberButton);
        await phoneNumberButton.waitForDisplayed();
        await phoneNumberButton.click();
        const phoneNumberModal = await $(this.phoneNumberModal);
        await phoneNumberModal.waitForDisplayed()
        const phoneNumberField = await $(this.phoneNumberField);
        await phoneNumberField.waitForDisplayed();
        await phoneNumberField.setValue(phoneNumber);
    },
    submitPhoneNumber: async function(phoneNumber) {
        await this.fillPhoneNumber(phoneNumber);
        // we are starting interception of request from the moment of method call
        await browser.setupInterceptor();
        await $(this.nextButton).click();
        // we should wait for response
        // eslint-disable-next-line wdio/no-pause
        await browser.pause(2000);
        const codeField = await $(this.codeField);
        // collect all responses
        const requests = await browser.getRequests();
        // use first response
        await expect(requests.length).toBe(1)
        const code = await requests[0].response.body.code
        await codeField.setValue(code)
        await $(this.confirmButton).click()
    },
};