import { $ } from "@wdio/globals";
import Page from "./page.js";

class ProductsPage extends Page {

  public get servisesDropDowns() {
    return $$('div[data-testid="rightArrow"]');
  }
  public get filterForm() {
    return $('div[data-testid="filterForm"]');
  }
  public get cardUnit() {
    return $('div[data-testid="cardWrapper"]');
  }
  public get equipmentCategoryLabels() {
    return $$('img[data-testid="firstCategoryImage"]');
  }
  public get equipmentCategorySecondLevelLabels() {
    return $$('img[data-testid="secondCategoryImage"]');
  }
  public get activeEquipmentLabel() {
    return $("//label[contains(concat(' ',normalize-space(@class),' '),'active_label')]");
  }

  public async verifyCheckBoxIsChecked(name: string) {
    await this.servisesDropDowns[0].waitForDisplayed({ timeout: 2000 });
    for await (const element of this.servisesDropDowns) {
      await element.click();
      var isExpanded = await element.getAttribute("class");
      if (!isExpanded.includes("ServiceCategory_clicked")) {
        await element.click();
      }
    }
    await expect(
      this.filterForm.$("//label[contains(text(),'" + name + "')]/../input")
    ).toBeExisting();
    await expect(
      this.filterForm.$("//label[contains(text(),'" + name + "')]/../input")
    ).toBeChecked();
  }
  
  public async clickOnCardUnit() {
    await this.cardUnit.click();
  }

  public async verifyEquipmentIsPresent(equipmentName: string) {
    await this.equipmentCategoryLabels[0].waitForDisplayed({ timeout: 2000 })
    for await (const element of this.equipmentCategoryLabels) {
      await element.click();
      var isExpanded = await element.getAttribute("class");
      if (!isExpanded.includes("rotate")) {
        await element.click();
      }
    }
    for await (const element of this.equipmentCategorySecondLevelLabels) {
      await element.click();
      var isExpanded = await element.getAttribute("class");
      if (!isExpanded.includes("rotate")) {
        await element.click();
      }
    }
    await expect(this.activeEquipmentLabel).toBeExisting();
    await expect(this.activeEquipmentLabel).toHaveText(equipmentName);
  }
}

export default new ProductsPage();
