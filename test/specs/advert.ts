import { expect } from "@wdio/globals";
import MainPage from "../pageobjects/main.page.ts";
import LoginPage from "../pageobjects/login.page.ts";
import AdvertPage from "../pageobjects/advert.page.ts";
import * as dotenv from "dotenv";
import randomstring from 'randomstring';

dotenv.config();
const validEmail = process.env.MY_EMAIL || "default_email@example.com";
const validPassword = process.env.MY_PASSWORD || "default_password";

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
  });

  it("C294- Verify body title and tab titles", async () => {
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
  it("C296- Verify category (Категорія) section", async () => {
    await expect(AdvertPage.categoryLabel).toHaveText("Категорія *");
    await expect(AdvertPage.categorySelectAsterisk).toBeExisting();
    await expect(AdvertPage.categorySelectField).toHaveText(
      "Виберіть категорію"
    );
    await expect(AdvertPage.categorySelectArrow).toBeExisting();
    await AdvertPage.clickOnNextButton();
    await expect(await AdvertPage.verifyCategoryFieldBorderIsRed()).toEqual(
      true
    );
    await expect(AdvertPage.categoryErrorMessage).toBeExisting();
    await AdvertPage.clickOnCategorySelectField();
    await expect(AdvertPage.popUpTitle).toBeExisting();
    await expect(AdvertPage.crossButton).toBeExisting();
    await AdvertPage.clickOnCrossButton();
    await expect(AdvertPage.popUpTitle).not.toBeDisplayed();
    await expect(AdvertPage.crossButton).not.toBeDisplayed();
    await AdvertPage.clickOnCategorySelectField();
    await expect(AdvertPage.popUpTitle).toBeExisting();
    await AdvertPage.clickOutsideOfCrossButton();
    await expect(AdvertPage.popUpTitle).not.toBeDisplayed();
    await expect(AdvertPage.crossButton).not.toBeDisplayed();

    await AdvertPage.clickOnCategorySelectField();

    for await (const element of AdvertPage.firstCategoryLevel) {
      await element.click();
      for await (const element of AdvertPage.secondCategoryLevel) {
        await element.click();
        for await (const element of AdvertPage.thirdCategoryLevel) {
          let categoryName = await element.getText();
          await element.click();
          await expect(AdvertPage.categorySelectField).toHaveText(categoryName);
          await AdvertPage.clickOnCategorySelectField();
        }
      }
    }
    await AdvertPage.clickOutsideOfCrossButton();
  }).timeout(60000);
  it("C297- Verify unit name section", async () => {
    await expect(AdvertPage.advertNameLabel).toHaveText("Назва оголошення *");
    await expect(AdvertPage.advertNameAsterisk).toBeExisting();
    await expect(AdvertPage.advertNameField).toHaveAttribute(
      "placeholder",
      "Введіть назву оголошення"
    );
    await AdvertPage.clickOnNextButton();
    await expect(await AdvertPage.verifyAdvertNameFieldBorderIsRed()).toEqual(
      true
    );
    await expect(AdvertPage.advertNameErrorMessage).toHaveText(
      "Це поле обов’язкове"
    );
    await AdvertPage.enterDataInAdvertNameField("123456789");
    await AdvertPage.clickOnNextButton();
    await expect(AdvertPage.advertErrorMessage).toBeExisting();
    await AdvertPage.enterDataInAdvertNameField(randomstring.generate(101))
    await AdvertPage.clickOnNextButton();
    await expect(AdvertPage.advertNameErrorMessage).toHaveText(
      "У назві оголошення може бути не більше 100 символів"
    );
    await AdvertPage.enterDataInAdvertNameField("<>{};^");
    await AdvertPage.clickOnNextButton();
    await expect(AdvertPage.advertNameField).toHaveText("");
    await AdvertPage.enterDataInAdvertNameField("Оголошення");
    await AdvertPage.clickOnNextButton();
    await expect(AdvertPage.advertNameErrorMessage).not.toBeDisplayed();

  });
  it("C298- Verify vehicle manufacturer section", async () => {
    await expect(AdvertPage.producerLabel).toHaveText(
      "Виробник транспортного засобу *"
    );
    await expect(AdvertPage.producerField).toHaveAttribute(
      "placeholder",
      "Введіть виробника транспортного засобу"
    );
    await expect(AdvertPage.producerAsterisk).toBeExisting();

    await AdvertPage.clickOnNextButton();
    await expect(await AdvertPage.verifyProducerFieldBorderIsRed()).toEqual(
      true
    );
    await expect(AdvertPage.producerErrorMessage).toHaveText(
      "Це поле обов’язкове"
    );
    await AdvertPage.enterDataInProducerField("A");
    await expect(AdvertPage.producerSearchDropdown).toBeDisplayed();
    await AdvertPage.enterDataInProducerField("АТЭК");
    await expect(AdvertPage.producerSearchDropdownElement).toHaveText("АТЭК");
    await AdvertPage.enterDataInProducerField("Атэк");
    await expect(AdvertPage.producerSearchDropdownElement).toHaveText("АТЭК");
    let randomData = "123456&lhf";
    await AdvertPage.enterDataInProducerField(randomData);
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
    await expect(AdvertPage.modelNameLabel).toHaveText("Назва моделі");
    await expect(AdvertPage.modelNameField).toHaveAttribute(
      "placeholder",
      "Введіть назву моделі"
    );
    await AdvertPage.enterDataInModelNameField("1234567890123456");
    await expect(AdvertPage.modelNameErrorMessage).toBeDisplayed();
    await AdvertPage.enterDataInModelNameField("12345678 90123456");
    await expect(AdvertPage.modelNameErrorMessage).toBeDisplayed();
    await AdvertPage.enterDataInModelNameField("1234567890123456 ");
    await expect(AdvertPage.modelNameErrorMessage).toBeDisplayed();
    await expect(await AdvertPage.verifyModelNameBorderIsRed()).toEqual(true);
  });
  it("C317- Verify technical characteristics section", async () => {
    await expect(AdvertPage.technicalCharacteristicsField).toBeExisting;
    await expect(AdvertPage.technicalCharacteristicsField).toHaveText("");
    await expect(AdvertPage.technicalCharacteristicsField).toBeClickable();
    await AdvertPage.enterDataInTechnicalCharacteristicsField("<>{};");
    await expect(AdvertPage.technicalCharacteristicsField).toHaveText("");
    await AdvertPage.enterDataInTechnicalCharacteristicsField(randomstring.generate(9001))
    let text = await AdvertPage.technicalCharacteristicsField.getText();
    await expect(text.length).toEqual(9000);
  });
  it("C318- Verify description section", async () => {
    await expect(AdvertPage.detailedDescriptionField).toBeExisting;
    await expect(AdvertPage.detailedDescriptionField).toHaveText("");
    await expect(AdvertPage.detailedDescriptionField).toBeClickable();
    await AdvertPage.enterDataInDetailedDescriptionField("<>{};");
    await expect(AdvertPage.detailedDescriptionField).toHaveText("");
    await AdvertPage.enterDataInDetailedDescriptionField(randomstring.generate(9001))
    let text = await AdvertPage.detailedDescriptionField.getText();
    await expect(text.length).toEqual(9000);
  });
  it("C319- Verify vehicle location division", async () => {
    await expect(AdvertPage.locationLabel).toHaveText(
      "Місце розташування технічного засобу *"
    );
    await expect(AdvertPage.locationField).toHaveText("Виберіть на мапі");
    await expect(AdvertPage.locationAsterisk).toBeExisting();
    await expect(AdvertPage.locationField).toBeClickable();
    await AdvertPage.clickOnNextButton();
    await expect(await AdvertPage.verifyLocationFieldBorderIsRed()).toEqual(
      true
    );
    await expect(AdvertPage.locationErrorMessage).toHaveText(
      "Виберіть коректне місце на мапі України"
    );
    await AdvertPage.clickOnChooseOnMapButton();
    await expect(AdvertPage.mapPopUpMessage).toBeExisting();
    await expect(AdvertPage.mapPopUpTitle).toHaveText("Техніка на мапі");
    await expect(AdvertPage.mapPopUpCrossIcom).toBeExisting();
    await expect(AdvertPage.defaultAddressLine).toBeExisting();
    let defaultAddress = await AdvertPage.defaultAddressLine.getText();
    await expect(AdvertPage.mapElement).toBeExisting();
    await AdvertPage.clickOnConfirmButton();
    await expect(AdvertPage.locationField).toHaveText(defaultAddress);
    await AdvertPage.clickOnChooseOnMapButton();
    await AdvertPage.mapElement.click({ x: 100 });
    let newAddress = await AdvertPage.defaultAddressLine.getText();
    await AdvertPage.clickOnConfirmButton();
    await expect(AdvertPage.locationField).toHaveText(newAddress);
  });
  it('C326- Verify "Скасувати" button', async () => {
    await expect(AdvertPage.cancelButton).toHaveText("Скасувати");
    await AdvertPage.clickOnCancelButton();
    await AdvertPage.clickOkInDialogPopUp();
    await expect(MainPage.logo).toBeDisplayed();
  });
  it('C326- Verify "Далі" button', async () => {
    await expect(AdvertPage.nextButton).toHaveText("Далі");
    await AdvertPage.clickOnNextButton();
    await expect(await AdvertPage.verifyCategoryFieldBorderIsRed()).toEqual(
      true
    );
    await expect(AdvertPage.categoryErrorMessage).toHaveText(
      "Це поле обов’язкове"
    );
    await expect(await AdvertPage.verifyProducerFieldBorderIsRed()).toEqual(
      true
    );
    await expect(AdvertPage.producerErrorMessage).toHaveText(
      "Це поле обов’язкове"
    );
    await expect(await AdvertPage.verifyProducerFieldBorderIsRed()).toEqual(
      true
    );
    await expect(AdvertPage.producerErrorMessage).toHaveText(
      "Це поле обов’язкове"
    );
    await expect(await AdvertPage.verifyLocationFieldBorderIsRed()).toEqual(
      true
    );
    await expect(AdvertPage.locationErrorMessage).toHaveText(
      "Виберіть коректне місце на мапі України"
    );
    await AdvertPage.clickOnCategorySelectField();
    await AdvertPage.firstCategoryLevel[0].click();
    await AdvertPage.secondCategoryLevel[0].click();
    await AdvertPage.thirdCategoryLevel[0].click();
    await AdvertPage.enterDataInAdvertNameField("Asdfghjkla");
    await AdvertPage.enterDataInProducerField("АТЭК");
    await AdvertPage.clickOnProduserSearchDropdownElement();
    await AdvertPage.enterDataInModelNameField("qwerty");
    await AdvertPage.clickOnChooseOnMapButton();
    await AdvertPage.mapElement.click({ x: 100 });
    let newAddress = await AdvertPage.defaultAddressLine.getText();
    await AdvertPage.clickOnConfirmButton();
    await expect(AdvertPage.locationField).toHaveText(newAddress);
    await AdvertPage.clickOnNextButton();
    let mainInformationLabel = "основна інформація";
    let photosLabel = "фотографії";
    let servicesLabel = "послуги";
    let priceLabel = "вартість";
    let contactsLabel = "контакти";
    await expect(AdvertPage.advertPageTitle).toHaveText("Створити оголошення");
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
