import { expect } from "@wdio/globals";
import MainPage from "../pageobjects/main.page.js";

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

  it('C226-"У Вас залишилися питання?" form', async () => {
    await MainPage.open();

    await expect(MainPage.logo).toBeExisting();
    await expect(MainPage.orderConsultationButton).toBeExisting()
    await MainPage.clickOnOrderConsultationButton()
    await MainPage.verifyErrorMessagesDisplayed()
    await MainPage.enterPhoneNumber("+380506743060")
    await MainPage.clickOnOrderConsultationButton()
    await expect(MainPage.errorMessages[0]).toBeExisting()
    await expect(MainPage.errorMessages[0]).toHaveText("Поле не може бути порожнім")
    await MainPage.enterName("Test")
    await MainPage.enterPhoneNumber("+38063111111")
    await expect(MainPage.errorMessages[0]).toBeExisting()
    await expect(MainPage.errorMessages[0]).toHaveText("Телефон не пройшов валідацію")
    await MainPage.enterName("Test")
    await MainPage.enterPhoneNumber("+11111111111111")
    await expect(MainPage.errorMessages[0]).toBeExisting()
    await expect(MainPage.errorMessages[0]).toHaveText("Телефон не пройшов валідацію")
    await MainPage.enterPhoneNumber("+380506743060")
    await MainPage.clickOnOrderConsultationButton()
    await MainPage.clickOkInDialogPopUp()



    








  });
});
