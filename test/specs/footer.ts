import { expect } from "@wdio/globals";
import axios from "axios";
import MainPage from "../pageobjects/main.page.ts";
import * as testData from "../data/testdata.json"


describe("Rentzila", () => {
//   it("C214-Verify that all elements on the footer are displayed and all links are clickable", async () => {
//     await MainPage.open();

//     await expect(MainPage.logo).toBeExisting();
//     await expect(MainPage.footerLogo).toBeExisting();
//     await expect(MainPage.footerLogo).not.toBeClickable();
//     await expect(MainPage.aboutUsLabel).toBeExisting();
//     await expect(MainPage.aboutUsLabel).toHaveText("Про нас");
//     await expect(MainPage.privacyPolicyLink).toBeExisting();
//     await expect(MainPage.privacyPolicyLink).toHaveAttribute(
//       "href",
//       "/privacy-policy/"
//     );
//     await expect(MainPage.cookiePolicyLink).toBeExisting();
//     await expect(MainPage.cookiePolicyLink).toHaveAttribute(
//       "href",
//       "/cookie-policy/"
//     );
//     await expect(MainPage.termsConditionsLink).toBeExisting();
//     await expect(MainPage.termsConditionsLink).toHaveAttribute(
//       "href",
//       "/terms-conditions/"
//     );
//     await expect(MainPage.forBuyersLabel).toBeExisting();
//     await expect(MainPage.forBuyersLabel).toHaveText("Користувачам");
//     await expect(MainPage.productsLink).toBeExisting();
//     await expect(MainPage.productsLink).toHaveAttribute("href", "/products/");
//     await expect(MainPage.tendersLink).toBeExisting();
//     await expect(MainPage.tendersLink).toHaveAttribute("href", "/tenders-map/");
//     await expect(MainPage.requestsLink).toBeExisting();
//     await expect(MainPage.requestsLink).toHaveAttribute(
//       "href",
//       "/requests-map/"
//     );
//     await expect(MainPage.contactsLabel).toBeExisting();
//     await expect(MainPage.contactsLabel).toHaveText("Контакти");
//     await expect(MainPage.emailLink).toBeExisting();
//     await expect(MainPage.emailLink).toHaveAttribute(
//       "href",
//       "mailto:info@rentzila.com.ua"
//     );
//   });

//   it('C226-"У Вас залишилися питання?" form', async () => {
//     await MainPage.open();

//     await expect(MainPage.logo).toBeExisting();
//     await MainPage.clickOnTelegramCrossButton();
//     await expect(MainPage.orderConsultationButton).toBeExisting();
//     await MainPage.clickOnOrderConsultationButton();
//     await MainPage.verifyErrorMessagesDisplayed();
//     let validPhoneNumber = testData.validInputs.phone;
//     await MainPage.enterPhoneNumber(validPhoneNumber);
//     await MainPage.clickOnOrderConsultationButton();
//     await expect(MainPage.errorMessages[0]).toBeExisting();
//     await expect(MainPage.errorMessages[0]).toHaveText(
//       "Поле не може бути порожнім"
//     );
//     let validName = testData.validInputs.name;
//     await MainPage.enterName(validName);
//     await MainPage.enterPhoneNumber(testData.invalidInputs.phoneShort);
//     await expect(MainPage.errorMessages[0]).toBeExisting();
//     await expect(MainPage.errorMessages[0]).toHaveText(
//       "Телефон не пройшов валідацію"
//     );
//     await MainPage.enterName(validName);
//     await MainPage.enterPhoneNumber(testData.invalidInputs.phoneOnesOnly);
//     await expect(MainPage.errorMessages[0]).toBeExisting();
//     await expect(MainPage.errorMessages[0]).toHaveText(
//       "Телефон не пройшов валідацію"
//     );
//     await MainPage.enterPhoneNumber(validPhoneNumber);
//     await MainPage.clickOnOrderConsultationButton();
//     await MainPage.clickOkInDialogPopUp();

//     const bodyParameters = {
//       email: "txt2021@ukr.net",
//       password: "Qwerty123+",
//     };
    
//     let response = await axios.post(
//       "https://dev.rentzila.com.ua/api/auth/jwt/create/",
//       bodyParameters
//     );
//     let token = response.data.access;

//     const config = {
//       headers: { Authorization: `Bearer ` + token },
//     };
//     response = await axios.get(
//       "https://dev.rentzila.com.ua/api/backcall/",
//       config
//     );

//     const records = response.data;
//     let isFound = false;

//     records.forEach((record: { name: string; phone: string }) => {
//       if (record.name === validName && record.phone === validPhoneNumber) {
//         isFound = true;
//       }
//     });

// });
  
});

