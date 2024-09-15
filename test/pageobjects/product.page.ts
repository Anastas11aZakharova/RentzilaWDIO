import { $ } from "@wdio/globals";
import Page from "./page.js";

class ProductPage extends Page {
  public get servicesList() {
    return $('div[itemprop="services"]');
  }

  public get categoriesList() {
    return $('div[itemprop="category"]');
  }

  public async verifyServiceIsVisible(serviceName: string) {
    await expect(this.servicesList.$('div='+serviceName)).toBeExisting()
  }

  public async verifyCategoriesIsVisible(categoriesName: string) {
    await expect(this.categoriesList.$('div='+categoriesName)).toBeExisting()
  }



}

export default new ProductPage();
