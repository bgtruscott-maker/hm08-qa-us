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
    baseUrl: 'https://cnt-a5e217a7-e529-4cee-b000-7fe0fd79a469.containerhub.tripleten-services.com',
    waitforTimeout: 10000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,
    services: [
        'chromedriver', 
        'geckodriver', 
        'intercept', 
    ],
    beforeCommand: async function () {
		if (process.env.CI !== 'true') {
			await new Promise(resolve => setTimeout(resolve, 100));
		}
	},
	framework: 'mocha',
    reporters: ['spec'],
    mochaOpts: {
        ui: 'bdd',
        timeout: 120000
    },
}