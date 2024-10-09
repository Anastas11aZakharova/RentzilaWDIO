import { expect } from "@wdio/globals";
import MainPage from "../../pageobjects/mainPage.ts";
import UnitPage from "../../pageobjects/unitPage.ts";
import ProductsPage from "../../pageobjects/productsPage.ts";
import * as testData from "../../../data/testdata.json";

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
  async function verifyEquipment(
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
      await ProductsPage.verifyEquipmentIsPresent(equipmentsNamesInFilter[i]);
      await expect(ProductsPage.cardUnit).toBeExisting();
      await ProductsPage.clickOnCardUnit();
      await UnitPage.verifyCategoriesIsVisible(
        equipmentsCategoryInProductsPage[i]
      );
      await UnitPage.clickOnLogo();
    }
  }

describe("Rentzila", () => {
  it('C213 - Checking ""Спецтехніка"" section on the main page', async () => {
    await MainPage.open();

    await expect(MainPage.equipmentTitle).toBeExisting();
    await expect(MainPage.equipmentTitle).toHaveText("Спецтехніка");

    await verifyEquipment(
      MainPage.popularEquipmentLabel,
      testData.equipment.popular.names,
      testData.equipment.popular.namesInFilters,
      testData.equipment.popular.namesInUnitPage
    );
    await verifyEquipment(
      MainPage.agriculturalEquipmentLabel,
      testData.equipment.agricultural.names,
      testData.equipment.agricultural.namesInFilters,
      testData.equipment.agricultural.namesInUnitPage
    );
    await verifyEquipment(
      MainPage.buildingEquipmentLabel,
      testData.equipment.building.names,
      testData.equipment.building.namesInFilters,
      testData.equipment.building.namesInUnitPage
    );
    await verifyEquipment(
      MainPage.otherEquipmentLabel,
      testData.equipment.other.names,
      testData.equipment.other.namesInFilters,
      testData.equipment.other.namesInUnitPage
    );
  });
});
