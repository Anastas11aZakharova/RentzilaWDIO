import { expect } from "@wdio/globals";
import MainPage from "../../pageobjects/main.page.ts";
import LoginPage from "../../pageobjects/login.page.ts";
import AdvertPage from "../../pageobjects/advert.page.ts";
import * as dotenv from "dotenv";
import randomstring from "randomstring";
const validEmail = process.env.MY_EMAIL || "default_email@example.com";
const validPassword = process.env.MY_PASSWORD || "default_password";
dotenv.config();
const duplicateImageError = "Ви не можете завантажити двічі один файл.";
const formatError =
  "Формат зображення не підтримується. Допустимі формати: .jpg, .jpeg, .png. Ви не можете завантажити файл більше 20 МВ.";
const clueMessage =
  "Додайте в оголошення від 1 до 12 фото технічного засобу розміром до 20 МВ у форматі .jpg, .jpeg, .png. Перше фото буде основним.";

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
    await AdvertPage.clickOnPriceLabelButton();
    //add preconditions
  });

  xit('C417-Verify "Спосіб оплати" section', async () => {
    await expect(AdvertPage.paymentTypeTitle).toHaveText("Спосіб оплати *");
    await expect(AdvertPage.paymentTypeAsterisk).toBeDisplayed();
    await expect(AdvertPage.paymentField).toHaveText("Готівкою / на картку");
    await AdvertPage.clickOnPaymentTypeField();
    await expect(AdvertPage.paymentTypeDropdownElements[0]).toHaveText(
      "Готівкою / на картку"
    );
    await expect(AdvertPage.paymentTypeDropdownElements[1]).toHaveText(
      "Безготівковий розрахунок (без ПДВ)"
    );
    await expect(AdvertPage.paymentTypeDropdownElements[2]).toHaveText(
      "Безготівковий розрахунок (з ПДВ)"
    );
    await AdvertPage.paymentTypeDropdownElements[0].click();
    await expect(AdvertPage.paymentField).toHaveText("Готівкою / на картку");
    await AdvertPage.clickOnPaymentTypeField();
    await AdvertPage.paymentTypeDropdownElements[1].click();
    await expect(AdvertPage.paymentField).toHaveText(
      "Безготівковий розрахунок (без ПДВ)"
    );
    await AdvertPage.clickOnPaymentTypeField();
    await AdvertPage.paymentTypeDropdownElements[2].click();
    await expect(AdvertPage.paymentField).toHaveText(
      "Безготівковий розрахунок (з ПДВ)"
    );
  });
  xit('C418-Verify "Вартість мінімального замовлення" section', async () => {
    await expect(AdvertPage.minimumOrderCostTitle).toHaveText(
      "Вартість мінімального замовлення *"
    );
    await expect(AdvertPage.minimumOrderCostAsterisk).toBeDisplayed();
    await expect(AdvertPage.minimumOrderCostField).toHaveAttribute(
      "placeholder",
      "Наприклад, 1000"
    );
    await AdvertPage.enterDataInminimumOrderCostField("1234567891");
    await expect(AdvertPage.minimumOrderCostField).toHaveValue("123456789");
    await AdvertPage.minimumOrderCostField.clearValue();
    await AdvertPage.enterDataInminimumOrderCostField("123 456");
    await expect(AdvertPage.minimumOrderCostField).toHaveValue("123456");
    await AdvertPage.minimumOrderCostField.clearValue();
    await AdvertPage.enterDataInminimumOrderCostField("123456 ");
    await expect(AdvertPage.minimumOrderCostField).toHaveValue("123456");
    await AdvertPage.minimumOrderCostField.clearValue();
    await AdvertPage.enterDataInminimumOrderCostField(" ");
    await expect(AdvertPage.minimumOrderCostField).toHaveValue("");
    await AdvertPage.enterDataInminimumOrderCostField("abc");
    await expect(AdvertPage.minimumOrderCostField).toHaveValue("");
    await AdvertPage.enterDataInminimumOrderCostField("!@#$%.,");
    await expect(AdvertPage.minimumOrderCostField).toHaveValue("");
    await AdvertPage.enterDataInminimumOrderCostField("123456789");
    await expect(AdvertPage.minimumOrderCostField).toHaveValue("123456789");
    await expect(AdvertPage.currencyField).toHaveValue("UAH");
  });
  it("C482-Verify adding price for service", async () => {
    await expect(AdvertPage.costOfYourServicesLine).toHaveText(
      "Вартість Ваших послуг *"
    );
    await expect(AdvertPage.costOfYourServicesLineAsterisk).toBeDisplayed();
    await expect(AdvertPage.costOfYourServicesText).toHaveText(
      "За бажанням Ви можете додати вартість конкретних послуг, які надає технічний засіб"
    );
    
  });

  xit('C488-Verify ""Назад"" button', async () => {
    await MainPage.clickOnTelegramCrossButton();
    await expect(AdvertPage.backButton).toHaveText("Назад");
    await AdvertPage.clickOnBackButton();
    await expect(AdvertPage.servicesLabel).toBeDisplayed();
    let mainInformationLabel = "основна інформація";
    let photosLabel = "фотографії";
    let servicesLabel = "послуги";
    let priceLabel = "вартість";
    let contactsLabel = "контакти";
    await expect(AdvertPage.mainInformationLabel).toHaveText(
      mainInformationLabel
    );
    await AdvertPage.verifyLabelNumberIsCorrect(mainInformationLabel, "1");
    await expect(
      await AdvertPage.verifyLabelIsActive(mainInformationLabel)
    ).toEqual(false);
    await expect(AdvertPage.photosLabel).toHaveText(photosLabel);
    await AdvertPage.verifyLabelNumberIsCorrect(photosLabel, "2");
    await expect(await AdvertPage.verifyLabelIsActive(photosLabel)).toEqual(
      false
    );
    await expect(AdvertPage.servicesLabel).toHaveText(servicesLabel);
    await AdvertPage.verifyLabelNumberIsCorrect(servicesLabel, "3");
    await expect(await AdvertPage.verifyLabelIsActive(servicesLabel)).toEqual(
      true
    );
    await expect(AdvertPage.priceLabel).toHaveText(priceLabel);
    await AdvertPage.verifyLabelNumberIsCorrect(priceLabel, "4");
    await expect(await AdvertPage.verifyLabelIsActive(priceLabel)).toEqual(
      false
    );
    await expect(AdvertPage.contactsLabel).toHaveText(contactsLabel);
    await AdvertPage.verifyLabelNumberIsCorrect(contactsLabel, "5");
    await expect(await AdvertPage.verifyLabelIsActive(contactsLabel)).toEqual(
      false
    );
  });

  xit('C489-Verify "Далі" button', async () => {
    await MainPage.clickOnTelegramCrossButton();
    await expect(AdvertPage.nextButton).toHaveText("Далі");
    await AdvertPage.clickOnNextButton();
    await expect(
      await AdvertPage.verifyMinimumOrderCostFieldBorderIsRed()
    ).toEqual(false);
  });
});
