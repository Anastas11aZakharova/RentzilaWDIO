import { expect } from "@wdio/globals";
import MainPage from "../pageobjects/main.page.ts";
import UnitPage from "../pageobjects/unit.page.ts";
import ProductsPage from "../pageobjects/products.page.ts";
import * as testData from "../data/testdata.json"

describe("Rentzila", () => {
//  it('C212- Checking "Послуги" section on the main page', async () => {
//     await MainPage.open();

//     await expect(MainPage.proposesTitle).toBeExisting();
//     await expect(MainPage.proposesTitle).toHaveText("Послуги");
//     await expect(MainPage.popularServiceLabel).toBeExisting()
//     await expect(MainPage.agriculturalServiceLabel).toBeExisting()
//     await expect(MainPage.buildingServiceLabel).toBeExisting()
//     await expect(MainPage.otherServiceLabel).toBeExisting()

//     await verifyServices(MainPage.popularServiceLabel, testData.proposals.popularProposals)
//     await verifyServices(MainPage.agriculturalServiceLabel, testData.proposals.agriculturalProposals)
//     await verifyServices(MainPage.buildingServiceLabel, testData.proposals.buildingProposals)
//     await verifyServices(MainPage.otherServiceLabel, testData.proposals.otherProposals)
//   });

//   async function verifyServices(element: ChainablePromiseElement, serviceNames: string[]) {

//     await element.click()
//     var count: number = 7;
//     await MainPage.verifyProposesElementsDisplayed(count);
//     var i: number;
//     for (i = 0; i < count; i++) {      
//       await expect(MainPage.proposesElements[i]).toBeExisting();
//       await expect(MainPage.proposesElements[i]).toHaveText(serviceNames[i]);
//     }
//     for (i = 0; i < count; i++) {
//       await element.click()
//       await MainPage.proposesElements[i].click();
//       await ProductsPage.verifyCheckBoxIsChecked(serviceNames[i]);
//       await expect(ProductsPage.cardUnit).toBeExisting();
//       await ProductsPage.clickOnCardUnit();
//       await UnitPage.verifyServiceIsVisible(serviceNames[i]);
//       await UnitPage.clickOnLogo();
//     }
    
//   }

});
