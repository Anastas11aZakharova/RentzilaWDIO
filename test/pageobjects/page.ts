import { browser } from "@wdio/globals";

export default class Page {
  public open() {
    return browser.url(`https://dev.rentzila.com.ua/`);
  }
}
