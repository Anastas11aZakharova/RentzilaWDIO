import { expect } from "@wdio/globals";
import MainPage from "../pageobjects/mainPage.ts";
import LoginPage from "../pageobjects/loginPage.ts";
import AdvertPage from "../pageobjects/advertPage.ts";
import * as dotenv from "dotenv";
import randomstring from 'randomstring';
import * as constants from "../../data/constants.json";

dotenv.config();
const validEmail = process.env.MY_EMAIL || "default_email@example.com";
const validPassword = process.env.MY_PASSWORD || "default_password";

describe("Rentzila", () => {
  beforeEach(async () => {
    await MainPage.open("");
    if (await MainPage.loginButton.isDisplayed()) {
      await MainPage.loginButton.click();
      await expect(LoginPage.authorizationFormTitle).toHaveText(constants.authorization.login);
      await LoginPage.emailOrPhoneNumberField.setValue(validEmail);
      await LoginPage.passwordField.setValue(validPassword);
      await LoginPage.enterButton.click();
      await expect(MainPage.logo).toBeExisting();
    }
    await MainPage.submitAdvertButton.click();
    await expect(AdvertPage.advertPageTitle).toHaveText(constants.advert.advertPageTitle);
  });

  it("C294- Verify body title and tab titles", async () => {
    let mainInformationLabel = constants.advert.mainInformationLabel;
    let photosLabel = constants.advert.photoLabel;
    let servicesLabel = constants.advert.servicesLabel;
    let priceLabel = constants.advert.priceLabel;
    let contactsLabel = constants.advert.contactsLabel;
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

  it("C296- Verify category (Категорія) section", async () => {
    await expect(AdvertPage.categoryLabel).toHaveText(constants.advert.categoryLabel);
    await expect(AdvertPage.categorySelectAsterisk).toBeExisting();
    await expect(AdvertPage.categorySelectField).toHaveText(
      constants.advert.categorySelectField
    );
    await expect(AdvertPage.categorySelectArrow).toBeExisting();
    await AdvertPage.nextButton.click();
    await expect(await AdvertPage.verifyCategoryFieldBorderIsRed()).toEqual(
      true
    );
    await expect(AdvertPage.categoryErrorMessage).toBeExisting();
    await AdvertPage.categorySelectField.click();
    await expect(AdvertPage.popUpTitle).toBeExisting();
    await expect(AdvertPage.crossButton).toBeExisting();
    await AdvertPage.crossButton.click();
    await expect(AdvertPage.popUpTitle).not.toBeDisplayed();
    await expect(AdvertPage.crossButton).not.toBeDisplayed();
    await AdvertPage.categorySelectField.click();
    await expect(AdvertPage.popUpTitle).toBeExisting();
    await AdvertPage.crossButton.click({ x: 100 });
    await expect(AdvertPage.popUpTitle).not.toBeDisplayed();
    await expect(AdvertPage.crossButton).not.toBeDisplayed();
    await AdvertPage.categorySelectField.click();
    for await (const element of AdvertPage.firstCategoryLevel) {
      await element.click();
      for await (const element of AdvertPage.secondCategoryLevel) {
        await element.click();
        for await (const element of AdvertPage.thirdCategoryLevel) {
          let categoryName = await element.getText();
          await element.click();
          await expect(AdvertPage.categorySelectField).toHaveText(categoryName);
          await AdvertPage.categorySelectField.click();
        }
      }
    }
    await AdvertPage.crossButton.click({ x: 100 });
  }).timeout(60000);

  it("C297- Verify unit name section", async () => {
    await expect(AdvertPage.advertNameLabel).toHaveText(constants.advert.advertNameLabel);
    await expect(AdvertPage.advertNameAsterisk).toBeExisting();
    await expect(AdvertPage.advertNameField).toHaveAttribute(
      "placeholder",
      constants.advert.advertNameField
    );
    await AdvertPage.nextButton.click();
    await expect(await AdvertPage.verifyAdvertNameFieldBorderIsRed()).toEqual(
      true
    );
    await expect(AdvertPage.advertNameErrorMessage).toHaveText(
      constants.advert.advertNameFieldErrorMessage
    );
    await AdvertPage.advertNameField.setValue("123456789");
    await AdvertPage.nextButton.click();
    await expect(AdvertPage.advertErrorMessage).toBeExisting();
    await AdvertPage.advertNameField.setValue(randomstring.generate(101))
    await AdvertPage.nextButton.click();
    await expect(AdvertPage.advertNameErrorMessage).toHaveText(
      constants.advert.advertNameSymbolsErrorMessage
    );
    await AdvertPage.advertNameField.setValue("<>{};^");
    await AdvertPage.nextButton.click();
    await expect(AdvertPage.advertNameField).toHaveText("");
    await AdvertPage.advertNameField.setValue("Оголошення");
    await AdvertPage.nextButton.click();
    await expect(AdvertPage.advertNameErrorMessage).not.toBeDisplayed();
  });

  it("C298- Verify vehicle manufacturer section", async () => {
    await expect(AdvertPage.producerLabel).toHaveText(
      constants.advert.producerLabel
    );
    await expect(AdvertPage.producerField).toHaveAttribute(
      "placeholder",
      constants.advert.producerField
    );
    await expect(AdvertPage.producerAsterisk).toBeExisting();
    await AdvertPage.nextButton.click();
    await expect(await AdvertPage.verifyProducerFieldBorderIsRed()).toEqual(
      true
    );
    await expect(AdvertPage.producerErrorMessage).toHaveText(
      constants.advert.advertNameFieldErrorMessage
    );
    await AdvertPage.producerField.setValue("A");
    await expect(AdvertPage.producerSearchDropdown).toBeDisplayed();
    await AdvertPage.producerField.setValue("АТЭК");
    await expect(AdvertPage.producerSearchDropdownElement).toHaveText("АТЭК");
    await AdvertPage.producerField.setValue("Атэк");
    await expect(AdvertPage.producerSearchDropdownElement).toHaveText("АТЭК");
    let randomData = "123456&lhf";
    await AdvertPage.producerField.setValue(randomData);
    await expect(AdvertPage.producerNotFoundErrorMessage).toBeDisplayed();
    await expect(AdvertPage.producerNotFoundErrorMessage).toHaveText(
      "На жаль, виробника “" +
        randomData +
        "“ не знайдено в нашій базі.\nЩоб додати виробника - зв`яжіться із службою підтримки"
    );
    await expect(AdvertPage.symbolsCounter).toHaveText(
      randomData.length.toString() + " / 100"
    );
    await expect(AdvertPage.producerSearchDropdownElement).not.toBeDisplayed();
  });

  it("C299- Verify model name input field", async () => {
    await expect(AdvertPage.modelNameLabel).toHaveText(constants.advert.modelNameLabel);
    await expect(AdvertPage.modelNameField).toHaveAttribute(
      "placeholder",
      constants.advert.modelNameField
    );
    await AdvertPage.modelNameField.setValue("1234567890123456");
    await expect(AdvertPage.modelNameErrorMessage).toBeDisplayed();
    await AdvertPage.modelNameField.setValue("12345678 90123456");
    await expect(AdvertPage.modelNameErrorMessage).toBeDisplayed();
    await AdvertPage.modelNameField.setValue("1234567890123456 ");
    await expect(AdvertPage.modelNameErrorMessage).toBeDisplayed();
    await expect(await AdvertPage.verifyModelNameBorderIsRed()).toEqual(true);
  });

  it("C317- Verify technical characteristics section", async () => {
    await expect(AdvertPage.technicalCharacteristicsField).toBeExisting;
    await expect(AdvertPage.technicalCharacteristicsField).toHaveText("");
    await expect(AdvertPage.technicalCharacteristicsField).toBeClickable();
    await AdvertPage.technicalCharacteristicsField.setValue("<>{};");
    await expect(AdvertPage.technicalCharacteristicsField).toHaveText("");
    await AdvertPage.technicalCharacteristicsField.setValue(randomstring.generate(9001))
    let text = await AdvertPage.technicalCharacteristicsField.getText();
    await expect(text.length).toEqual(9000);
  });

  it("C318- Verify description section", async () => {
    await expect(AdvertPage.detailedDescriptionField).toBeExisting;
    await expect(AdvertPage.detailedDescriptionField).toHaveText("");
    await expect(AdvertPage.detailedDescriptionField).toBeClickable();
    await AdvertPage.detailedDescriptionField.setValue("<>{};");
    await expect(AdvertPage.detailedDescriptionField).toHaveText("");
    await AdvertPage.detailedDescriptionField.setValue(randomstring.generate(9001))
    let text = await AdvertPage.detailedDescriptionField.getText();
    await expect(text.length).toEqual(9000);
  });

  it("C319- Verify vehicle location division", async () => {
    await expect(AdvertPage.locationLabel).toHaveText(
      constants.advert.locationLabel
    );
    await expect(AdvertPage.locationField).toHaveText(constants.advert.locationField);
    await expect(AdvertPage.locationAsterisk).toBeExisting();
    await expect(AdvertPage.locationField).toBeClickable();
    await AdvertPage.nextButton.click();
    await expect(await AdvertPage.verifyLocationFieldBorderIsRed()).toEqual(
      true
    );
    await expect(AdvertPage.locationErrorMessage).toHaveText(
      constants.advert.locationErrorMessage
    );
    await AdvertPage.chooseOnMapButton.click();
    await expect(AdvertPage.mapPopUpMessage).toBeExisting();
    await expect(AdvertPage.mapPopUpTitle).toHaveText(constants.advert.mapPopUpTitle);
    await expect(AdvertPage.mapPopUpCrossIcom).toBeExisting();
    await expect(AdvertPage.defaultAddressLine).toBeExisting();
    let defaultAddress = await AdvertPage.defaultAddressLine.getText();
    await expect(AdvertPage.mapElement).toBeExisting();
    await AdvertPage.confirmButton.click();
    await expect(AdvertPage.locationField).toHaveText(defaultAddress);
    await AdvertPage.chooseOnMapButton.click();
    await AdvertPage.mapElement.click({ x: 100 });
    let newAddress = await AdvertPage.defaultAddressLine.getText();
    await AdvertPage.confirmButton.click();
    await expect(AdvertPage.locationField).toHaveText(newAddress);
  });

  it('C326- Verify "Скасувати" button', async () => {
    await expect(AdvertPage.cancelButton).toHaveText(constants.advert.cancelButton);
    await AdvertPage.cancelButton.click();
    await AdvertPage.clickOkInDialogPopUp();
    await expect(MainPage.logo).toBeDisplayed();
  });

  it('C327- Verify "Далі" button', async () => {
    await expect(AdvertPage.nextButton).toHaveText(constants.advert.nextButton);
    await AdvertPage.nextButton.click();
    await expect(await AdvertPage.verifyCategoryFieldBorderIsRed()).toEqual(
      true
    );
    await expect(AdvertPage.categoryErrorMessage).toHaveText(
      constants.advert.advertNameFieldErrorMessage
    );
    await expect(await AdvertPage.verifyProducerFieldBorderIsRed()).toEqual(
      true
    );
    await expect(AdvertPage.producerErrorMessage).toHaveText(
      constants.advert.advertNameFieldErrorMessage
    );
    await expect(await AdvertPage.verifyProducerFieldBorderIsRed()).toEqual(
      true
    );
    await expect(AdvertPage.producerErrorMessage).toHaveText(
      constants.advert.advertNameFieldErrorMessage
    );
    await expect(await AdvertPage.verifyLocationFieldBorderIsRed()).toEqual(
      true
    );
    await expect(AdvertPage.locationErrorMessage).toHaveText(
      constants.advert.locationErrorMessage
    );
    await AdvertPage.categorySelectField.click();
    await AdvertPage.firstCategoryLevel[0].click();
    await AdvertPage.secondCategoryLevel[0].click();
    await AdvertPage.thirdCategoryLevel[0].click();
    await AdvertPage.advertNameField.setValue("Asdfghjkla");
    await AdvertPage.producerField.setValue("АТЭК");
    await AdvertPage.producerSearchDropdownElement.click();
    await AdvertPage.modelNameField.setValue("qwerty");
    await AdvertPage.chooseOnMapButton.click();
    await AdvertPage.mapElement.click({ x: 100 });
    let newAddress = await AdvertPage.defaultAddressLine.getText();
    await AdvertPage.confirmButton.click();
    await expect(AdvertPage.locationField).toHaveText(newAddress);
    await AdvertPage.nextButton.click();
    let mainInformationLabel = constants.advert.mainInformationLabel;
    let photosLabel = constants.advert.photoLabel;
    let servicesLabel = constants.advert.servicesLabel;
    let priceLabel = constants.advert.priceLabel;
    let contactsLabel = constants.advert.contactsLabel;
    await expect(AdvertPage.advertPageTitle).toHaveText(constants.advert.advertPageTitle);
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
      true
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
  });
});
