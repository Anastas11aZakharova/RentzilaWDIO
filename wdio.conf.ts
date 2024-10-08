import * as dotenv from 'dotenv';
dotenv.config();
import type { Options } from '@wdio/types'
export const config: Options.Testrunner = {
    baseUrl: process.env.BASE_URL || 'https://defaulturl.com',
    runner: 'local',
    tsConfigPath: './tsconfig.json',
    specs: [
        './test/specs/**/*.ts'
    ],
    suites: {
        authorization: [
            './test/specs/authorization.ts'
        ],
        advert: [
            './test/specs/advert.ts'
        ],
        photo: [
             './test/specs/advert/*photoTab.ts'
        ],
        price: [
            './test/specs/advert/*priceTab.ts'
       ]
    },
    exclude: [
        // 'path/to/excluded/files'
    ],
    maxInstances: 10,
    capabilities: [
        {
            browserName: 'chrome',
            'goog:chromeOptions': {
                args: ['--disable-infobars', '--window-size=1920,1080']
            }
        }
    ],
    logLevel: 'info',
    bail: 0,
    waitforTimeout: 10000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,
    framework: 'mocha',
    reporters: ['spec',['allure', {outputDir: 'allure-results'}]],
    mochaOpts: {
        ui: 'bdd',
        timeout: 600000
    },
    afterTest: async function(test, context, { error, result, duration, passed, retries }) {
        if (!passed) {
            await browser.takeScreenshot();
        }
    }
}
