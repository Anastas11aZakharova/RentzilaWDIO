import { expect } from "@wdio/globals";
import MainPage from "../../pageobjects/mainPage.ts";
import ProductsPage from "../../pageobjects/productsPage.ts";
import * as testData from "../../../data/testdata.json";
import * as constants from "../../../data/constants.json";

describe("Rentzila", () => {
  //Will fail due the known issue (This is expected because of the data issue in the dev environment. Multiple categories do not have actual units assigned to them, hence the check fails)
  it('C213- Checking ""Спецтехніка"" section on the main page', async () => {
    await MainPage.open("");
    await expect(MainPage.equipmentTitle).toBeExisting();
    await expect(MainPage.equipmentTitle).toHaveText(
      constants.mainPage.equipmentTitle
    );
    await ProductsPage.verifyEquipment(
      MainPage.popularEquipmentLabel,
      testData.equipment.popular.names,
      testData.equipment.popular.namesInFilters,
      testData.equipment.popular.namesInUnitPage
    );
    await ProductsPage.verifyEquipment(
      MainPage.agriculturalEquipmentLabel,
      testData.equipment.agricultural.names,
      testData.equipment.agricultural.namesInFilters,
      testData.equipment.agricultural.namesInUnitPage
    );
    await ProductsPage.verifyEquipment(
      MainPage.buildingEquipmentLabel,
      testData.equipment.building.names,
      testData.equipment.building.namesInFilters,
      testData.equipment.building.namesInUnitPage
    );
    await ProductsPage.verifyEquipment(
      MainPage.otherEquipmentLabel,
      testData.equipment.other.names,
      testData.equipment.other.namesInFilters,
      testData.equipment.other.namesInUnitPage
    );
  });
});
