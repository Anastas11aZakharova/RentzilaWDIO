import { expect } from "@wdio/globals";
import MainPage from "../../pageobjects/main.page.ts";
import LoginPage from "../../pageobjects/login.page.ts";
import AdvertPage from "../../pageobjects/advert.page.ts";
import * as dotenv from "dotenv";
const validEmail = process.env.MY_EMAIL || 'default_email@example.com';
const validPassword = process.env.MY_PASSWORD || 'default_password';
dotenv.config();
const duplicateImageError = "Ви не можете завантажити двічі один файл.";
const formatError = "Формат зображення не підтримується. Допустимі формати: .jpg, .jpeg, .png. Ви не можете завантажити файл більше 20 МВ.";
const clueMessage = "Додайте в оголошення від 1 до 12 фото технічного засобу розміром до 20 МВ у форматі .jpg, .jpeg, .png. Перше фото буде основним."

describe("Rentzila", () => {
  beforeEach(async () => {
    await MainPage.open();

    if (await MainPage.loginButton.isDisplayed()) {
      await MainPage.clickOnLoginButton();
      await expect(LoginPage.authorizationFormTitle).toHaveText("Вхід");
      await LoginPage.enterEmailInEmailOrPhoneNumberField(validEmail);
      await LoginPage.enterPasswordInPasswordField(validPassword);
      await LoginPage.clickOnEnterButton();
      await expect(MainPage.logo).toBeExisting();
    }
    await MainPage.clickOnsubmitAdvertButton();
    await expect(AdvertPage.advertPageTitle).toHaveText("Створити оголошення");
    await AdvertPage.clickOnPriceLabelButton()
    //add preconditions
  });

  it("C417-Verify \"Спосіб оплати\" section", async () => {
    await expect(AdvertPage.paymentTypeTitle).toHaveText("Спосіб оплати *")
    await expect(AdvertPage.paymentTypeAsterisk).toBeDisplayed()
    await expect(AdvertPage.paymentField).toHaveText("Готівкою / на картку")
    await AdvertPage.clickOnPaymentTypeField()
    await expect(AdvertPage.paymentTypeDropdownElements[0]).toHaveText("Готівкою / на картку")
    await expect(AdvertPage.paymentTypeDropdownElements[1]).toHaveText("Безготівковий розрахунок (без ПДВ)")
    await expect(AdvertPage.paymentTypeDropdownElements[2]).toHaveText("Безготівковий розрахунок (з ПДВ)")
    await AdvertPage.paymentTypeDropdownElements[0].click()
    await expect(AdvertPage.paymentField).toHaveText("Готівкою / на картку")
    await AdvertPage.clickOnPaymentTypeField()
    await AdvertPage.paymentTypeDropdownElements[1].click()
    await expect(AdvertPage.paymentField).toHaveText("Безготівковий розрахунок (без ПДВ)")
    await AdvertPage.clickOnPaymentTypeField()
    await AdvertPage.paymentTypeDropdownElements[2].click()
    await expect(AdvertPage.paymentField).toHaveText("Безготівковий розрахунок (з ПДВ)")
    
  });


});
