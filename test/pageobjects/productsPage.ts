import { $ } from "@wdio/globals";
import Page from "./page.js";
import MainPage from "./mainPage.ts";
import UnitPage from "./unitPage.ts";

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
    return $(
      "//label[contains(concat(' ',normalize-space(@class),' '),'active_label')]"
    );
  }

  public async verifyCheckBoxIsChecked(name: string) {
    await this.servisesDropDowns[0].waitForDisplayed();
    for await (const element of this.servisesDropDowns) {
      await element.click();
      let isExpanded = await element.getAttribute("class");
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

  public async verifyEquipmentIsPresent(equipmentName: string) {
    await this.equipmentCategoryLabels[0].waitForDisplayed();
    for await (const element of this.equipmentCategoryLabels) {
      await element.click();
      let isExpanded = await element.getAttribute("class");
      if (!isExpanded.includes("rotate")) {
        await element.click();
      }
    }
    for await (const element of this.equipmentCategorySecondLevelLabels) {
      await element.click();
      let isExpanded = await element.getAttribute("class");
      if (!isExpanded.includes("rotate")) {
        await element.click();
      }
    }
    await expect(this.activeEquipmentLabel).toBeExisting();
    await expect(this.activeEquipmentLabel).toHaveText(equipmentName);
  }

  /**
   * Verifies the equipment names, filter names, and categories by interacting with the UI elements.
   *
   * This function performs the following actions:
   * 1. Clicks on a provided UI element.
   * 2. Verifies that a certain number of equipment elements are displayed on the page.
   * 3. Ensures that each equipment element is existing and matches the provided equipment names.
   * 4. Iterates through each equipment, clicking on it, and verifying that the appropriate equipment is present in the filter.
   * 5. Verifies that the card unit is displayed, and checks the equipment's category on the Unit page.
   *
   * @async
   * @function
   * @param {ChainablePromiseElement} element - The UI element to interact with, typically representing a clickable object on the page.
   * @param {string[]} equipmentsNames - An array of equipment names to validate against the equipment elements displayed on the page.
   * @param {string[]} equipmentsNamesInFilter - An array of equipment names to verify against the filtered results on the Products page.
   * @param {string[]} equipmentsCategoryInProductsPage - An array of equipment categories to verify on the Unit page for each piece of equipment.
   *
   * @returns {Promise<void>} A Promise that resolves when the equipment verification process completes.
   */
  public async verifyEquipment(
    element: ChainablePromiseElement,
    equipmentsNames: string[],
    equipmentsNamesInFilter: string[],
    equipmentsCategoryInProductsPage: string[]
  ) {
    await element.click();
    let count: number = 7;
    expect(await MainPage.equipmentElements.length).toEqual(count);
    let i: number;
    for (i = 0; i < count; i++) {
      await expect(MainPage.equipmentElements[i]).toBeExisting();
      await expect(MainPage.equipmentElements[i]).toHaveText(
        equipmentsNames[i]
      );
    }
    for (i = 0; i < count; i++) {
      await element.click();
      await MainPage.equipmentElements[i].click();
      await this.verifyEquipmentIsPresent(equipmentsNamesInFilter[i]);
      await expect(this.cardUnit).toBeExisting();
      await this.cardUnit.click();
      await UnitPage.verifyCategoriesIsVisible(
        equipmentsCategoryInProductsPage[i]
      );
      await UnitPage.logo.click();
    }
  }

  /**
   * Verifies the service names by interacting with UI elements.
   *
   * This function performs the following actions:
   * 1. Clicks on a provided UI element.
   * 2. Verifies that a certain number of service elements are displayed on the page.
   * 3. Ensures that each service element is existing and matches the provided service names.
   * 4. Iterates through each service, clicking on it, and verifying that the appropriate checkbox is checked on the Products page.
   * 5. Verifies that the card unit is displayed, and checks the service's visibility on the Unit page.
   *
   * @async
   * @function
   * @param {ChainablePromiseElement} element - The UI element to interact with, typically representing a clickable object on the page.
   * @param {string[]} serviceNames - An array of service names to validate against the service elements displayed on the page and to verify throughout the UI interactions.
   *
   * @returns {Promise<void>} A Promise that resolves when the service verification process completes.
   */
  public async verifyServices(
    element: ChainablePromiseElement,
    serviceNames: string[]
  ) {
    await element.click();
    let count: number = 7;
    expect(await MainPage.proposesElements.length).toEqual(count);
    let i: number;
    for (i = 0; i < count; i++) {
      await expect(MainPage.proposesElements[i]).toBeExisting();
      await expect(MainPage.proposesElements[i]).toHaveText(serviceNames[i]);
    }
    for (i = 0; i < count; i++) {
      await element.click();
      await MainPage.proposesElements[i].click();
      await this.verifyCheckBoxIsChecked(serviceNames[i]);
      await expect(this.cardUnit).toBeExisting();
      await this.cardUnit.click();
      await UnitPage.verifyServiceIsVisible(serviceNames[i]);
      await UnitPage.logo.click();
    }
  }
}

export default new ProductsPage();
