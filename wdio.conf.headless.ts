import { config  } from "./wdio.conf";

config.capabilities[0]['goog:chromeOptions'].args = ['headless', 'disable-gpu', '--window-size=1920,1080'];

exports.config = config;