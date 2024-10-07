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
    await AdvertPage.clickOnPhotoLabel()
  });

  it("C384-Verify same images uploading", async () => {
    const filePath = 'test/data/photo1.jpg'
    await uploadFile(filePath)
    await uploadFile(filePath)
    await expect(AdvertPage.errorPopUp).toHaveText(duplicateImageError)
    await AdvertPage.clickOnCrossButton()
    await expect(AdvertPage.errorPopUp).not.toBeDisplayed()
    await AdvertPage.checkOnlyOneImageIsUploaded()
    await uploadFile(filePath)
    await expect(AdvertPage.errorPopUp).toHaveText(duplicateImageError)
    await AdvertPage.clickOnUnderstandButton()
    await expect(AdvertPage.errorPopUp).not.toBeDisplayed()
    await AdvertPage.checkOnlyOneImageIsUploaded()
    await uploadFile(filePath)
    await expect(AdvertPage.errorPopUp).toHaveText(duplicateImageError)
    await AdvertPage.clickOutsideOfCrossButton()
    await expect(AdvertPage.errorPopUp).not.toBeDisplayed()
    await AdvertPage.checkOnlyOneImageIsUploaded()
  });

  async function uploadFile(filePath: string) {
    const remoteFilePath = await browser.uploadFile(filePath)
    browser.execute(function (){
      document.evaluate("//input[@type='file']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.style.display = 'block'
    })
    await $("//input[@type='file']").setValue(remoteFilePath)
  }
  it("C401-Verify uploading of invalid file type", async () => {
    const filePath = 'test/data/photo1.avp'
    await uploadFile(filePath)
    await expect(AdvertPage.errorPopUp).toHaveText(formatError)
    await AdvertPage.checkNoFileIsUploaded()
    await AdvertPage.clickOnCrossButton()
    await uploadFile(filePath)
    await expect(AdvertPage.errorPopUp).toHaveText(formatError)
    await AdvertPage.clickOnUnderstandButton()
    await expect(AdvertPage.errorPopUp).not.toBeDisplayed()
    await AdvertPage.checkNoFileIsUploaded()
    await uploadFile(filePath)
    await expect(AdvertPage.errorPopUp).toHaveText(formatError)
    await AdvertPage.clickOutsideOfCrossButton()
    await expect(AdvertPage.errorPopUp).not.toBeDisplayed()
    await AdvertPage.checkNoFileIsUploaded()
  });
  it("C405-Verify uploading of invalid size file", async () => {
    const filePath = 'test/data/30mb.jpg'
    await uploadFile(filePath)
    await expect(AdvertPage.errorPopUp).toHaveText(formatError)
    await AdvertPage.checkNoFileIsUploaded()
    await AdvertPage.clickOnCrossButton()
    await uploadFile(filePath)
    await expect(AdvertPage.errorPopUp).toHaveText(formatError)
    await AdvertPage.clickOnUnderstandButton()
    await expect(AdvertPage.errorPopUp).not.toBeDisplayed()
    await AdvertPage.checkNoFileIsUploaded()
    await uploadFile(filePath)
    await expect(AdvertPage.errorPopUp).toHaveText(formatError)
    await AdvertPage.clickOutsideOfCrossButton()
    await expect(AdvertPage.errorPopUp).not.toBeDisplayed()
    await AdvertPage.checkNoFileIsUploaded()
  });
  it("C390-Verify \"Назад\" button", async () => {
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
  it("C393-Verify \"Далі\" button", async () => {
    await MainPage.clickOnTelegramCrossButton()
    await expect(AdvertPage.nextButton).toHaveText("Далі")
    await AdvertPage.clickOnNextButton()
    let photosLabel = "фотографії";
    await expect(await AdvertPage.verifyLabelIsActive(photosLabel)).toEqual(
      true
    );
    await expect(await AdvertPage.verifyClueTextIsRed()).toEqual(true)
    const filePath = 'test/data/photo1.jpg'
    await uploadFile(filePath)
    await AdvertPage.clickOnNextButton()
    await expect(AdvertPage.servicesTitle).toHaveText("Послуги")
    await expect(AdvertPage.advertPageTitle).toHaveText("Створити оголошення");
    let mainInformationLabel = "основна інформація";
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
  it("C593- Upload multiple images", async () => {
    await expect(AdvertPage.photoParagraph).toHaveText("Фото технічного засобу *")
    await expect(AdvertPage.photoParagraphAsterisk).toBeDisplayed()
    await expect(AdvertPage.clueText).toHaveText(clueMessage)
    let filePath = 'test/data/photo1.jpg'
    await uploadFile(filePath)
    filePath = 'test/data/photo2.jpg'
    await uploadFile(filePath)
    filePath = 'test/data/photo3.jpg'
    await uploadFile(filePath)
    await expect(AdvertPage.mainImageLabel).toHaveText("Головне")

  });

  it("C594- Drag and drop images", async () => {
    await expect(AdvertPage.photoParagraph).toHaveText("Фото технічного засобу *")
    await expect(AdvertPage.photoParagraphAsterisk).toBeDisplayed()
    await expect(AdvertPage.clueText).toHaveText(clueMessage)
    let filePath = 'test/data/photo1.jpg'
    await uploadFile(filePath)
    filePath = 'test/data/photo2.jpg'
    await uploadFile(filePath)
    filePath = 'test/data/photo3.jpg'
    await uploadFile(filePath)
    await expect(AdvertPage.mainImageLabel).toHaveText("Головне")
    await AdvertPage.unitImages[1].dragAndDrop(await AdvertPage.unitImages[0])
    await expect(AdvertPage.mainImageLabel).toHaveText("Головне")
    
  });

  it("C595- Delete images", async () => {
    for (let i = 1; i<= 12; i++){
      let filePath = 'test/data/photo'+i+'.jpg'
    await uploadFile(filePath)
    }

    for (let i = 12; i > 0; i--) {
      switch (i) {
        case 12:
        case 11:
        case 10:
        case 9:
        case 8:
          await expect(await AdvertPage.unitImages.length).toEqual(12);
          break;
        case 7:
        case 6:
        case 5:
        case 4:
          await expect(await AdvertPage.unitImages.length).toEqual(8);
          break;
        case 3:
        case 2:
        case 1:
          await expect(await AdvertPage.unitImages.length).toEqual(4);
          break;
      }

      await AdvertPage.imageBlock.$('img[data-testid="unitImage"]').moveTo();
      let deleteIcon = await AdvertPage.imageBlock.$(
        'div[data-testid="deleteImage"]'
      );
      await expect(deleteIcon).toBeDisplayed();
      await deleteIcon.click();
    }

    await AdvertPage.checkNoFileIsUploaded()

  });


});
