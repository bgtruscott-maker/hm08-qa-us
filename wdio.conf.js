exports.config = {
    runner: 'local',
    specs: [
        './test/specs/**/*.js'
    ],
    exclude: [
        // 'path/to/excluded/files'
    ],
    maxInstances: 10,
    headless: process.env.CI === 'true',
    capabilities: [
        {
        maxInstances: 5,
        browserName: 'chrome',
        acceptInsecureCerts: true,
        'goog:chromeOptions': {
    args: process.env.CI === 'true'
        ? ['headless', 'disable-gpu', 'no-sandbox']
        : ['disable-gpu']
}
    },
    /* {
        maxInstances: 5,
        browserName: 'firefox',
        acceptInsecureCerts: true,
        'moz:firefoxOptions': {
            args: ['-headless']
        }
    } */
],
    logLevel: 'error',
    bail: 0,
    baseUrl: 'https://cnt-237e4a4f-e9a4-43e7-9e99-e286f0e12e5b.containerhub.tripleten-services.com',
    waitforTimeout: 10000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,
    services: [
        'chromedriver', 
        'geckodriver', 
        'intercept', 
    ],
    framework: 'mocha',
    reporters: ['spec'],
    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    },
}