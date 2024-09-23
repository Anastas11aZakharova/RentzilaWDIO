import { expect } from "@wdio/globals";
import MainPage from "../pageobjects/main.page.ts";
import UnitPage from "../pageobjects/unit.page.ts";
import ProductsPage from "../pageobjects/products.page.ts";
import * as testData from "../data/testdata.json";

describe("Rentzila", () => {
  // it('C213- Checking ""Спецтехніка"" section on the main page', async () => {
  //   await MainPage.open();

  //   await expect(MainPage.equipmentTitle).toBeExisting();
  //   await expect(MainPage.equipmentTitle).toHaveText("Спецтехніка");

  //   await verifyEquipment(
  //     MainPage.popularEquipmentLabel,
  //     testData.equipment.popular.names,
  //     testData.equipment.popular.namesInFilters,
  //     testData.equipment.popular.namesInUnitPage
  //   );
  //   await verifyEquipment(
  //     MainPage.agriculturalEquipmentLabel,
  //     testData.equipment.agricultural.names,
  //     testData.equipment.agricultural.namesInFilters,
  //     testData.equipment.agricultural.namesInUnitPage
  //   );
  //   await verifyEquipment(
  //     MainPage.buildingEquipmentLabel,
  //     testData.equipment.building.names,
  //     testData.equipment.building.namesInFilters,
  //     testData.equipment.building.namesInUnitPage
  //   );
  //   await verifyEquipment(
  //     MainPage.otherEquipmentLabel,
  //     testData.equipment.other.names,
  //     testData.equipment.other.namesInFilters,
  //     testData.equipment.other.namesInUnitPage
  //   );
  // });
  // async function verifyEquipment(
  //   element: ChainablePromiseElement,
  //   equipmentsNames: string[],
  //   equipmentsNamesInFilter: string[],
  //   equipmentsCategoryInProductsPage: string[]
  // ) {
  //   await element.click();
  //   var count: number = 7;
  //   await MainPage.verifyEquipmentsElementsDisplayed(count);
  //   var i: number;
  //   for (i = 0; i < count; i++) {
  //     await expect(MainPage.equipmentElements[i]).toBeExisting();
  //     await expect(MainPage.equipmentElements[i]).toHaveText(
  //       equipmentsNames[i]
  //     );
  //   }
  //   for (i = 0; i < count; i++) {
  //     await element.click();
  //     await MainPage.equipmentElements[i].click();
  //     await ProductsPage.verifyEquipmentIsPresent(equipmentsNamesInFilter[i]);
  //     await expect(ProductsPage.cardUnit).toBeExisting();
  //     await ProductsPage.clickOnCardUnit();
  //     await UnitPage.verifyCategoriesIsVisible(
  //       equipmentsCategoryInProductsPage[i]
  //     );
  //     await UnitPage.clickOnLogo();
  //   }
  // }
});
