import { $ } from "@wdio/globals";
import Page from "./page.js";

class ProductPage extends Page {
  public get servicesList() {
    return $('div[itemprop="services"]');
  }

  public async verifyServiceIsVisible(serviceName: string) {
    await expect(this.servicesList.$('div='+serviceName)).toBeExisting()
  }



}

export default new ProductPage();
