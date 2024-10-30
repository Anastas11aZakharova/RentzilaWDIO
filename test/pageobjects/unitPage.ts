import { $ } from "@wdio/globals";
import Page from "./page.js";

class UnitPage extends Page {
  public get servicesList() {
    return $('div[itemprop="services"]');
  }

  public get categoriesList() {
    return $('div[itemprop="category"]');
  }
  
  public get logo() {
    return $('div[data-testid="logo"]');
  }

  public async verifyServiceIsVisible(serviceName: string) {
    await expect(this.servicesList.$("div=" + serviceName)).toBeDisplayed();
  }

  public async verifyCategoriesIsVisible(categoriesName: string) {
    await expect(this.categoriesList.$("div=" + categoriesName)).toBeDisplayed();
  }

  public async clickOnLogo() {
    await this.logo.click();
  }
}

export default new UnitPage();
