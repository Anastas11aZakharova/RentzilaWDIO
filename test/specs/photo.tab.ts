import { expect } from "@wdio/globals";
import MainPage from "../pageobjects/main.page.ts";
import LoginPage from "../pageobjects/login.page.ts";
import AdvertPage from "../pageobjects/advert.page.ts";
import * as dotenv from "dotenv";
const validEmail = process.env.MY_EMAIL || 'default_email@example.com';
const validPassword = process.env.MY_PASSWORD || 'default_password';
dotenv.config();

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
    await AdvertPage.clickOnPhotoLabel()
  });

  // it("C384-Verify same images uploading", async () => {
  //   const filePath = 'test/data/photo1.jpg'
  //   await uploadFile(filePath)
  //   await uploadFile(filePath)
  //   await expect(AdvertPage.errorPopUp).toHaveText("Ви не можете завантажити двічі один файл.")
  //   await AdvertPage.clickOnCrossButton()
  //   await expect(AdvertPage.errorPopUp).not.toBeDisplayed()
  //   await AdvertPage.checkOnlyOneImageIsUploaded()
  //   await uploadFile(filePath)
  //   await expect(AdvertPage.errorPopUp).toHaveText("Ви не можете завантажити двічі один файл.")
  //   await AdvertPage.clickOnUnderstandButton()
  //   await expect(AdvertPage.errorPopUp).not.toBeDisplayed()
  //   await AdvertPage.checkOnlyOneImageIsUploaded()
  //   await uploadFile(filePath)
  //   await expect(AdvertPage.errorPopUp).toHaveText("Ви не можете завантажити двічі один файл.")
  //   await AdvertPage.clickOutsideOfCrossButton()
  //   await expect(AdvertPage.errorPopUp).not.toBeDisplayed()
  //   await AdvertPage.checkOnlyOneImageIsUploaded()
  // });

  async function uploadFile(filePath: string) {
    const remoteFilePath = await browser.uploadFile(filePath)
    browser.execute(function (){
      document.evaluate("//input[@type='file']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.style.display = 'block'
    })
    await $("//input[@type='file']").setValue(remoteFilePath)
  }
  xit("C401-Verify uploading of invalid file type", async () => {
    const filePath = 'test/data/photo1.avp'
    await uploadFile(filePath)
    await expect(AdvertPage.errorPopUp).toHaveText("Формат зображення не підтримується. Допустимі формати: .jpg, .jpeg, .png. Ви не можете завантажити файл більше 20 МВ.")
    await AdvertPage.checkNoFileIsUploaded()
    await AdvertPage.clickOnCrossButton()
    await uploadFile(filePath)
    await expect(AdvertPage.errorPopUp).toHaveText("Формат зображення не підтримується. Допустимі формати: .jpg, .jpeg, .png. Ви не можете завантажити файл більше 20 МВ.")
    await AdvertPage.clickOnUnderstandButton()
    await expect(AdvertPage.errorPopUp).not.toBeDisplayed()
    await AdvertPage.checkNoFileIsUploaded()
    await uploadFile(filePath)
    await expect(AdvertPage.errorPopUp).toHaveText("Формат зображення не підтримується. Допустимі формати: .jpg, .jpeg, .png. Ви не можете завантажити файл більше 20 МВ.")
    await AdvertPage.clickOutsideOfCrossButton()
    await expect(AdvertPage.errorPopUp).not.toBeDisplayed()
    await AdvertPage.checkNoFileIsUploaded()
  });
  xit("C405-Verify uploading of invalid size file", async () => {
    const filePath = 'test/data/30mb.jpg'
    await uploadFile(filePath)
    await expect(AdvertPage.errorPopUp).toHaveText("Формат зображення не підтримується. Допустимі формати: .jpg, .jpeg, .png. Ви не можете завантажити файл більше 20 МВ.")
    await AdvertPage.checkNoFileIsUploaded()
    await AdvertPage.clickOnCrossButton()
    await uploadFile(filePath)
    await expect(AdvertPage.errorPopUp).toHaveText("Формат зображення не підтримується. Допустимі формати: .jpg, .jpeg, .png. Ви не можете завантажити файл більше 20 МВ.")
    await AdvertPage.clickOnUnderstandButton()
    await expect(AdvertPage.errorPopUp).not.toBeDisplayed()
    await AdvertPage.checkNoFileIsUploaded()
    await uploadFile(filePath)
    await expect(AdvertPage.errorPopUp).toHaveText("Формат зображення не підтримується. Допустимі формати: .jpg, .jpeg, .png. Ви не можете завантажити файл більше 20 МВ.")
    await AdvertPage.clickOutsideOfCrossButton()
    await expect(AdvertPage.errorPopUp).not.toBeDisplayed()
    await AdvertPage.checkNoFileIsUploaded()
  });
  xit("C390-Verify \"Назад\" button", async () => {
    await MainPage.clickOnTelegramCrossButton()
    await expect(AdvertPage.backButton).toHaveText("Назад")
    await AdvertPage.clickOnBackButton()
    await expect(AdvertPage.advertPageTitle).toBeDisplayed()
    let mainInformationLabel = "основна інформація";
    let photosLabel = "фотографії";``
    let servicesLabel = "послуги";
    let priceLabel = "вартість";
    let contactsLabel = "контакти";
    await expect(AdvertPage.mainInformationLabel).toHaveText(
      mainInformationLabel
    );
    await AdvertPage.verifyLabelNumberIsCorrect(mainInformationLabel, "1");
    await expect(
      await AdvertPage.verifyLabelIsActive(mainInformationLabel)
    ).toEqual(true);
    await expect(AdvertPage.photosLabel).toHaveText(photosLabel);
    await AdvertPage.verifyLabelNumberIsCorrect(photosLabel, "2");
    await expect(await AdvertPage.verifyLabelIsActive(photosLabel)).toEqual(
      false
    );
    await expect(AdvertPage.servicesLabel).toHaveText(servicesLabel);
    await AdvertPage.verifyLabelNumberIsCorrect(servicesLabel, "3");
    await expect(await AdvertPage.verifyLabelIsActive(servicesLabel)).toEqual(
      false
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
    await expect(AdvertPage.categorySelectField).toBeExisting();
    await expect(AdvertPage.advertNameField).toBeExisting();
    await expect(AdvertPage.producerField).toBeExisting();
    await expect(AdvertPage.modelNameField).toBeExisting();
    await expect(AdvertPage.technicalCharacteristicsField).toBeExisting();
    await expect(AdvertPage.detailedDescriptionField).toBeExisting();
    await expect(AdvertPage.locationField).toBeExisting();
    
  });
  

});
