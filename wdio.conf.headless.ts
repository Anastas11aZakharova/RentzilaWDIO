import { config  } from "./wdio.conf";

config.capabilities[0]['goog:chromeOptions'].args = ['headless', 'disable-gpu'];

exports.config = config;