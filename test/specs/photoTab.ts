import { expect } from "@wdio/globals";
import MainPage from "../pageobjects/mainPage.ts";
import LoginPage from "../pageobjects/loginPage.ts";
import AdvertPage from "../pageobjects/advertPage.ts";
import * as dotenv from "dotenv";
import * as constants from "../../data/constants.json";

const validEmail = process.env.MY_EMAIL || "default_email@example.com";
const validPassword = process.env.MY_PASSWORD || "default_password";
dotenv.config();

describe("Rentzila", () => {
  beforeEach(async () => {
    await MainPage.open("");

    if (await MainPage.loginButton.isDisplayed()) {
      await MainPage.loginButton.click();
      await expect(LoginPage.authorizationFormTitle).toHaveText(
        constants.authorization.login
      );
      await LoginPage.emailOrPhoneNumberField.setValue(validEmail);
      await LoginPage.passwordField.setValue(validPassword);
      await LoginPage.enterButton.click();
      await expect(MainPage.logo).toBeExisting();
    }
    await MainPage.submitAdvertButton.click();
    await expect(AdvertPage.advertPageTitle).toHaveText(
      constants.advert.advertPageTitle
    );
    await AdvertPage.photoLabel.click();
  });

  it("C384-Verify same images uploading", async () => {
    const filePath = "data/photo1.jpg";
    await AdvertPage.uploadFile(filePath);
    await AdvertPage.uploadFile(filePath);
    await expect(AdvertPage.errorPopUp).toHaveText(
      constants.photoTab.duplicateImageError
    );
    await AdvertPage.crossButton.click();
    await expect(AdvertPage.errorPopUp).not.toBeDisplayed();
    await AdvertPage.checkOnlyOneImageIsUploaded();
    await AdvertPage.uploadFile(filePath);
    await expect(AdvertPage.errorPopUp).toHaveText(
      constants.photoTab.duplicateImageError
    );
    await AdvertPage.understandButton.click();
    await expect(AdvertPage.errorPopUp).not.toBeDisplayed();
    await AdvertPage.checkOnlyOneImageIsUploaded();
    await AdvertPage.uploadFile(filePath);
    await expect(AdvertPage.errorPopUp).toHaveText(
      constants.photoTab.duplicateImageError
    );
    await AdvertPage.crossButton.click({ x: 100 });
    await expect(AdvertPage.errorPopUp).not.toBeDisplayed();
    await AdvertPage.checkOnlyOneImageIsUploaded();
  });

  it("C401-Verify uploading of invalid file type", async () => {
    const filePath = "data/photo1.avp";
    await AdvertPage.uploadFile(filePath);
    await expect(AdvertPage.errorPopUp).toHaveText(
      constants.photoTab.formatError
    );
    await AdvertPage.checkNoFileIsUploaded();
    await AdvertPage.crossButton.click();
    await AdvertPage.uploadFile(filePath);
    await expect(AdvertPage.errorPopUp).toHaveText(
      constants.photoTab.formatError
    );
    await AdvertPage.understandButton.click();
    await expect(AdvertPage.errorPopUp).not.toBeDisplayed();
    await AdvertPage.checkNoFileIsUploaded();
    await AdvertPage.uploadFile(filePath);
    await expect(AdvertPage.errorPopUp).toHaveText(
      constants.photoTab.formatError
    );
    await AdvertPage.crossButton.click({ x: 100 });
    await expect(AdvertPage.errorPopUp).not.toBeDisplayed();
    await AdvertPage.checkNoFileIsUploaded();
  });

  it("C405-Verify uploading of invalid size file", async () => {
    const filePath = "data/30mb.jpg";
    await AdvertPage.uploadFile(filePath);
    await expect(AdvertPage.errorPopUp).toHaveText(
      constants.photoTab.formatError
    );
    await AdvertPage.checkNoFileIsUploaded();
    await AdvertPage.crossButton.click();
    await AdvertPage.uploadFile(filePath);
    await expect(AdvertPage.errorPopUp).toHaveText(
      constants.photoTab.formatError
    );
    await AdvertPage.understandButton.click();
    await expect(AdvertPage.errorPopUp).not.toBeDisplayed();
    await AdvertPage.checkNoFileIsUploaded();
    await AdvertPage.uploadFile(filePath);
    await expect(AdvertPage.errorPopUp).toHaveText(
      constants.photoTab.formatError
    );
    await AdvertPage.crossButton.click({ x: 100 });
    await expect(AdvertPage.errorPopUp).not.toBeDisplayed();
    await AdvertPage.checkNoFileIsUploaded();
  });

  it('C390-Verify "Назад" button', async () => {
    await MainPage.telegramCrossButton.click();
    await expect(AdvertPage.backButton).toHaveText(
      constants.photoTab.backButton
    );
    await AdvertPage.backButton.click();
    await expect(AdvertPage.advertPageTitle).toBeDisplayed();
    await expect(AdvertPage.mainInformationLabel).toHaveText(
      constants.advert.mainInformationLabel
    );
    await AdvertPage.verifyLabelNumberIsCorrect(
      constants.advert.mainInformationLabel,
      "1"
    );
    await expect(
      await AdvertPage.verifyLabelIsActive(
        constants.advert.mainInformationLabel
      )
    ).toEqual(true);
    await expect(AdvertPage.photosLabel).toHaveText(
      constants.advert.photoLabel
    );
    await AdvertPage.verifyLabelNumberIsCorrect(
      constants.advert.photoLabel,
      "2"
    );
    await expect(
      await AdvertPage.verifyLabelIsActive(constants.advert.photoLabel)
    ).toEqual(false);
    await expect(AdvertPage.servicesLabel).toHaveText(
      constants.advert.servicesLabel
    );
    await AdvertPage.verifyLabelNumberIsCorrect(
      constants.advert.servicesLabel,
      "3"
    );
    await expect(
      await AdvertPage.verifyLabelIsActive(constants.advert.servicesLabel)
    ).toEqual(false);
    await expect(AdvertPage.priceLabel).toHaveText(constants.advert.priceLabel);
    await AdvertPage.verifyLabelNumberIsCorrect(
      constants.advert.priceLabel,
      "4"
    );
    await expect(
      await AdvertPage.verifyLabelIsActive(constants.advert.priceLabel)
    ).toEqual(false);
    await expect(AdvertPage.contactsLabel).toHaveText(
      constants.advert.contactsLabel
    );
    await AdvertPage.verifyLabelNumberIsCorrect(
      constants.advert.contactsLabel,
      "5"
    );
    await expect(
      await AdvertPage.verifyLabelIsActive(constants.advert.contactsLabel)
    ).toEqual(false);
    await expect(AdvertPage.categorySelectField).toBeExisting();
    await expect(AdvertPage.advertNameField).toBeExisting();
    await expect(AdvertPage.producerField).toBeExisting();
    await expect(AdvertPage.modelNameField).toBeExisting();
    await expect(AdvertPage.technicalCharacteristicsField).toBeExisting();
    await expect(AdvertPage.detailedDescriptionField).toBeExisting();
    await expect(AdvertPage.locationField).toBeExisting();
  });

  it('C393-Verify "Далі" button', async () => {
    await MainPage.telegramCrossButton.click();
    await expect(AdvertPage.nextButton).toHaveText(constants.advert.nextButton);
    await AdvertPage.nextButton.click();
    await expect(
      await AdvertPage.verifyLabelIsActive(constants.advert.photoLabel)
    ).toEqual(true);
    await expect(await AdvertPage.verifyClueTextIsRed()).toEqual(true);
    const filePath = "data/photo1.jpg";
    await AdvertPage.uploadFile(filePath);
    await AdvertPage.nextButton.click();
    await expect(AdvertPage.servicesTitle).toHaveText(
      constants.mainPage.proposes
    );
    await expect(AdvertPage.advertPageTitle).toHaveText(
      constants.advert.advertPageTitle
    );
    await expect(AdvertPage.mainInformationLabel).toHaveText(
      constants.advert.mainInformationLabel
    );
    await AdvertPage.verifyLabelNumberIsCorrect(
      constants.advert.mainInformationLabel,
      "1"
    );
    await expect(
      await AdvertPage.verifyLabelIsActive(
        constants.advert.mainInformationLabel
      )
    ).toEqual(false);
    await expect(AdvertPage.photosLabel).toHaveText(
      constants.advert.photoLabel
    );
    await AdvertPage.verifyLabelNumberIsCorrect(
      constants.advert.photoLabel,
      "2"
    );
    await expect(
      await AdvertPage.verifyLabelIsActive(constants.advert.photoLabel)
    ).toEqual(false);
    await expect(AdvertPage.servicesLabel).toHaveText(
      constants.advert.servicesLabel
    );
    await AdvertPage.verifyLabelNumberIsCorrect(
      constants.advert.servicesLabel,
      "3"
    );
    await expect(
      await AdvertPage.verifyLabelIsActive(constants.advert.servicesLabel)
    ).toEqual(true);
    await expect(AdvertPage.priceLabel).toHaveText(constants.advert.priceLabel);
    await AdvertPage.verifyLabelNumberIsCorrect(
      constants.advert.priceLabel,
      "4"
    );
    await expect(
      await AdvertPage.verifyLabelIsActive(constants.advert.priceLabel)
    ).toEqual(false);
    await expect(AdvertPage.contactsLabel).toHaveText(
      constants.advert.contactsLabel
    );
    await AdvertPage.verifyLabelNumberIsCorrect(
      constants.advert.contactsLabel,
      "5"
    );
    await expect(
      await AdvertPage.verifyLabelIsActive(constants.advert.contactsLabel)
    ).toEqual(false);
  });

  it("C593- Upload multiple images", async () => {
    await expect(AdvertPage.photoParagraph).toHaveText(
      constants.photoTab.potoParagraph
    );
    await expect(AdvertPage.photoParagraphAsterisk).toBeDisplayed();
    await expect(AdvertPage.clueText).toHaveText(
      constants.photoTab.clueMessage
    );
    let filePath = "data/photo1.jpg";
    await AdvertPage.uploadFile(filePath);
    filePath = "data/photo2.jpg";
    await AdvertPage.uploadFile(filePath);
    filePath = "data/photo3.jpg";
    await AdvertPage.uploadFile(filePath);
    await expect(AdvertPage.mainImageLabel).toHaveText(
      constants.photoTab.mainImageLabel
    );
  });

  it("C594- Drag and drop images", async () => {
    await expect(AdvertPage.photoParagraph).toHaveText(
      constants.photoTab.potoParagraph
    );
    await expect(AdvertPage.photoParagraphAsterisk).toBeDisplayed();
    await expect(AdvertPage.clueText).toHaveText(
      constants.photoTab.clueMessage
    );
    let filePath = "data/photo1.jpg";
    await AdvertPage.uploadFile(filePath);
    filePath = "data/photo2.jpg";
    await AdvertPage.uploadFile(filePath);
    filePath = "data/photo3.jpg";
    await AdvertPage.uploadFile(filePath);
    await expect(AdvertPage.mainImageLabel).toHaveText(
      constants.photoTab.mainImageLabel
    );
    await AdvertPage.unitImages[1].dragAndDrop(await AdvertPage.unitImages[0]);
    await expect(AdvertPage.mainImageLabel).toHaveText(
      constants.photoTab.mainImageLabel
    );
  });

  it("C595- Delete images", async () => {
    for (let i = 1; i <= 12; i++) {
      let filePath = "data/photo" + i + ".jpg";
      await AdvertPage.uploadFile(filePath);
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
    await AdvertPage.checkNoFileIsUploaded();
  });
});
