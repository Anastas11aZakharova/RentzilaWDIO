import { expect } from "@wdio/globals";
import MainPage from "../pageobjects/main.page.ts";
import LoginPage from "../pageobjects/login.page.ts";
import * as testData from "../data/testdata.json";
import AnnouncementPage from "../pageobjects/announcement.page.ts";

describe("Rentzila", () => {
  // it('C294- Verify body title and tab titles', async () => {
  //   await MainPage.open();

  //   await MainPage.clickOnLoginButton();
  //   await expect(LoginPage.authorizationFormTitle).toHaveText("Вхід");
  //   await LoginPage.enterEmailInEmailOrPhoneNumberField(
  //     testData.validInputs.email
  //   );
  //   await LoginPage.enterPasswordInPasswordField(testData.validInputs.password);
  //   await LoginPage.clickOnEnterButton();
  //   await expect(MainPage.logo).toBeExisting()
  //   await MainPage.clickOnsubmitAnnouncementButton()
  //   await expect(AnnouncementPage.announcementPageTitle).toHaveText("Створити оголошення")

    // await browser.pause(2000)
  // })
});
