import { expect } from "@wdio/globals";
import MainPage from "../../pageobjects/mainPage.ts";
import ProductsPage from "../../pageobjects/productsPage.ts";
import * as testData from "../../../data/testdata.json";
import * as constants from "../../../data/constants.json";

describe("Rentzila", () => {
  //Will fail due the known issue (After clicking on "FCHCHFCFB" element (last item in "Популярні", "Інше" section), there are no units on the right side section)
  it('C212- Checking "Послуги" section on the main page', async () => {
    await MainPage.open("");
    await expect(MainPage.proposesTitle).toBeExisting();
    await expect(MainPage.proposesTitle).toHaveText(
      constants.mainPage.proposes
    );
    await expect(MainPage.popularServiceLabel).toBeExisting();
    await expect(MainPage.agriculturalServiceLabel).toBeExisting();
    await expect(MainPage.buildingServiceLabel).toBeExisting();
    await expect(MainPage.otherServiceLabel).toBeExisting();
    await ProductsPage.verifyServices(
      MainPage.popularServiceLabel,
      testData.proposals.popularProposals
    );
    await ProductsPage.verifyServices(
      MainPage.agriculturalServiceLabel,
      testData.proposals.agriculturalProposals
    );
    await ProductsPage.verifyServices(
      MainPage.buildingServiceLabel,
      testData.proposals.buildingProposals
    );
    await ProductsPage.verifyServices(
      MainPage.otherServiceLabel,
      testData.proposals.otherProposals
    );
  });
});
