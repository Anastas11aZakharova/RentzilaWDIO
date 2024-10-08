import { expect } from "@wdio/globals";
import MainPage from "../../pageobjects/mainPage.ts";
import UnitPage from "../../pageobjects/unitPage.ts";
import ProductsPage from "../../pageobjects/productsPage.ts";
import * as testData from "../../../data/testdata.json";

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
 async function verifyServices(
  element: ChainablePromiseElement,
  serviceNames: string[]
) {
  await element.click();
  var count: number = 7;
  expect(await MainPage.proposesElements.length).toEqual(count);
  var i: number;
  for (i = 0; i < count; i++) {
    await expect(MainPage.proposesElements[i]).toBeExisting();
    await expect(MainPage.proposesElements[i]).toHaveText(serviceNames[i]);
  }
  for (i = 0; i < count; i++) {
    await element.click();
    await MainPage.proposesElements[i].click();
    await ProductsPage.verifyCheckBoxIsChecked(serviceNames[i]);
    await expect(ProductsPage.cardUnit).toBeExisting();
    await ProductsPage.clickOnCardUnit();
    await UnitPage.verifyServiceIsVisible(serviceNames[i]);
    await UnitPage.clickOnLogo();
  }
}

describe("Rentzila", () => {
  it('C212 - Checking "Послуги" section on the main page', async () => {
    await MainPage.open();

    await expect(MainPage.proposesTitle).toBeExisting();
    await expect(MainPage.proposesTitle).toHaveText("Послуги");
    await expect(MainPage.popularServiceLabel).toBeExisting();
    await expect(MainPage.agriculturalServiceLabel).toBeExisting();
    await expect(MainPage.buildingServiceLabel).toBeExisting();
    await expect(MainPage.otherServiceLabel).toBeExisting();

    await verifyServices(
      MainPage.popularServiceLabel,
      testData.proposals.popularProposals
    );
    await verifyServices(
      MainPage.agriculturalServiceLabel,
      testData.proposals.agriculturalProposals
    );
    await verifyServices(
      MainPage.buildingServiceLabel,
      testData.proposals.buildingProposals
    );
    await verifyServices(
      MainPage.otherServiceLabel,
      testData.proposals.otherProposals
    );
  });

});
