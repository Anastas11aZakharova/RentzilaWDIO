import { expect } from "@wdio/globals";
import { Key } from "webdriverio";
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
    await AdvertPage.priceLabel.click();
    await MainPage.telegramCrossButton.click();
  });

  it('C417-Verify "Спосіб оплати" section', async () => {
    await expect(AdvertPage.paymentTypeTitle).toHaveText(
      constants.priceTab.paymentTypeTitle
    );
    await expect(AdvertPage.paymentTypeAsterisk).toBeDisplayed();
    await expect(AdvertPage.paymentField).toHaveText(
      constants.priceTab.paymentField
    );
    await AdvertPage.paymentField.click();
    await expect(AdvertPage.paymentTypeDropdownElements[0]).toHaveText(
      constants.priceTab.paymentField
    );
    await expect(AdvertPage.paymentTypeDropdownElements[1]).toHaveText(
      constants.priceTab.firstPaymentTypeDropdownElement
    );
    await expect(AdvertPage.paymentTypeDropdownElements[2]).toHaveText(
      constants.priceTab.secondPaymentTypeDropdownElement
    );
    await AdvertPage.paymentTypeDropdownElements[0].click();
    await expect(AdvertPage.paymentField).toHaveText(
      constants.priceTab.paymentField
    );
    await AdvertPage.paymentField.click();
    await AdvertPage.paymentTypeDropdownElements[1].click();
    await expect(AdvertPage.paymentField).toHaveText(
      constants.priceTab.firstPaymentTypeDropdownElement
    );
    await AdvertPage.paymentField.click();
    await AdvertPage.paymentTypeDropdownElements[2].click();
    await expect(AdvertPage.paymentField).toHaveText(
      constants.priceTab.secondPaymentTypeDropdownElement
    );
  });

  it('C418-Verify "Вартість мінімального замовлення" section', async () => {
    await expect(AdvertPage.minimumOrderCostTitle).toHaveText(
      constants.priceTab.minimumOrderCostTitle
    );
    await expect(AdvertPage.minimumOrderCostAsterisk).toBeDisplayed();
    await expect(AdvertPage.minimumOrderCostField).toHaveAttribute(
      "placeholder",
      "Наприклад, 1000"
    );
    await AdvertPage.minimumOrderCostField.setValue("1234567891");
    await expect(AdvertPage.minimumOrderCostField).toHaveValue("123456789");
    await AdvertPage.minimumOrderCostField.clearValue();
    await AdvertPage.minimumOrderCostField.setValue("123 456");
    await expect(AdvertPage.minimumOrderCostField).toHaveValue("123456");
    await AdvertPage.minimumOrderCostField.clearValue();
    await AdvertPage.minimumOrderCostField.setValue("123456 ");
    await expect(AdvertPage.minimumOrderCostField).toHaveValue("123456");
    await AdvertPage.minimumOrderCostField.clearValue();
    await AdvertPage.minimumOrderCostField.setValue(" ");
    await expect(AdvertPage.minimumOrderCostField).toHaveValue("");
    await AdvertPage.minimumOrderCostField.setValue("abc");
    await expect(AdvertPage.minimumOrderCostField).toHaveValue("");
    await AdvertPage.minimumOrderCostField.setValue("!@#$%.,");
    await expect(AdvertPage.minimumOrderCostField).toHaveValue("");
    await AdvertPage.minimumOrderCostField.setValue("123456789");
    await expect(AdvertPage.minimumOrderCostField).toHaveValue("123456789");
    await expect(AdvertPage.currencyField).toHaveValue("UAH");
  });

  it("C482-Verify adding price for service", async () => {
    await expect(AdvertPage.costOfYourServicesLine).toHaveText(
      "Вартість Ваших послуг *"
    );
    await expect(AdvertPage.costOfYourServicesLineAsterisk).toBeDisplayed();
    await expect(AdvertPage.costOfYourServicesText).toHaveText(
      constants.priceTab.costOfYourServicesText
    );
  });

  it('C488-Verify ""Назад"" button', async () => {
    await expect(AdvertPage.backButton).toHaveText(
      constants.photoTab.backButton
    );
    await AdvertPage.backButton.click();
    await expect(AdvertPage.servicesLabel).toBeDisplayed();
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

  it('C489-Verify "Далі" button', async () => {
    await expect(AdvertPage.nextButton).toHaveText(constants.advert.nextButton);
    await AdvertPage.nextButton.click();
    await expect(
      await AdvertPage.verifyMinimumOrderCostFieldBorderIsRed()
    ).toEqual(true);
  });

  it('C596-Verify adding an invalid price in the "Вартість мінімального замовлення *" input', async () => {
    await expect(AdvertPage.minimumOrderCostTitle).toHaveText(
      constants.priceTab.minimumOrderCostTitle
    );
    await AdvertPage.minimumOrderCostField.setValue("0");
    await expect(AdvertPage.minimumOrderCostField).toHaveValue("");
    await AdvertPage.minimumOrderCostField.setValue("1");
    await expect(AdvertPage.minimumOrderCostField).toHaveValue("1");
    await AdvertPage.nextButton.click();
    await expect(AdvertPage.minPriceerrorMessage).toHaveText(
      constants.priceTab.minPriceerrorMessage
    );
    await expect(
      await AdvertPage.verifyMinimumOrderCostFieldBorderIsRed()
    ).toEqual(true);
    await AdvertPage.minimumOrderCostField.click();
    await browser.keys(Key.Backspace);
    await expect(AdvertPage.minimumOrderCostField).toHaveValue("");
    await expect(
      await AdvertPage.verifyMinimumOrderCostFieldBorderIsRed()
    ).toEqual(true);
    await expect(AdvertPage.fieldIsMandatoryErrorMessage).toHaveText(
      constants.priceTab.fieldIsMandatoryErrorMessage
    );
    await AdvertPage.minimumOrderCostField.setValue("1000");
    await expect(AdvertPage.minimumOrderCostField).toHaveValue("1000");
    await expect(
      await AdvertPage.verifyMinimumOrderCostFieldBorderIsRed()
    ).toEqual(false);
    await expect(AdvertPage.fieldIsMandatoryErrorMessage).not.toBeDisplayed();
  });

  it('C636-Verify the data entry in the "Вартість мінімального замовлення *" input', async () => {
    await expect(AdvertPage.minimumOrderCostTitle).toHaveText(
      constants.priceTab.minimumOrderCostTitle
    );
    await AdvertPage.minimumOrderCostField.setValue(constants.priceTab.spaceInside);
    await expect(AdvertPage.minimumOrderCostField).toHaveValue(constants.priceTab.firstEntredValue);
    await AdvertPage.minimumOrderCostField.setValue(constants.priceTab.spaceInTheEnd);
    await expect(AdvertPage.minimumOrderCostField).toHaveValue(constants.priceTab.firstEntredValue);
    await AdvertPage.minimumOrderCostField.setValue(constants.priceTab.space);
    await expect(AdvertPage.minimumOrderCostField).toHaveValue(constants.priceTab.emptyValue);
    await AdvertPage.minimumOrderCostField.setValue(constants.priceTab.letters);
    await expect(AdvertPage.minimumOrderCostField).toHaveValue(constants.priceTab.emptyValue);
    await AdvertPage.minimumOrderCostField.setValue(constants.priceTab.specialSymbols);
    await expect(AdvertPage.minimumOrderCostField).toHaveValue(constants.priceTab.emptyValue);
    await AdvertPage.minimumOrderCostField.setValue(constants.priceTab.moreThanNineSymbols);
    await expect(AdvertPage.minimumOrderCostField).toHaveValue(constants.priceTab.secondEntredValue);
  });

  it('C637-Verify UI of the "Вартість Ваших послуг *" section', async () => {
    await AdvertPage.servicesLabel.click();
    await expect(AdvertPage.servicesField).toHaveAttribute(
      "placeholder",
      constants.priceTab.servicesField
    );
    await AdvertPage.servicesField.setValue(
      constants.priceTab.nameOfTheServices
    );
    await AdvertPage.serviceDropdownItem.click();
    await expect(AdvertPage.selectedServise).toBeDisplayed();
    await AdvertPage.priceLabel.click();
    await expect(AdvertPage.costOfYourServicesLine).toHaveText(
      constants.priceTab.servicesTitle
    );
    await expect(AdvertPage.costOfYourServicesLineAsterisk).toBeDisplayed();
    await expect(AdvertPage.costOfYourServicesText).toHaveText(
      constants.priceTab.servicesCostDescription
    );
    await expect(AdvertPage.addCostPlusButton).toBeDisplayed();
    await expect(AdvertPage.addCostButton).toHaveText(
      constants.priceTab.addCostButton
    );
    await expect(AdvertPage.selectedServisePriceTab).toBeDisplayed();
    await AdvertPage.addCostButton.click();
    await expect(AdvertPage.deleteButton).toBeDisplayed();
    await expect(AdvertPage.servicePriceInputField).toBeDisplayed();
    await expect(AdvertPage.servicePriceInputField).toHaveAttribute(
      "placeholder",
      "Наприклад, 1000"
    );
    await expect(AdvertPage.serviceCurrencyInput).toBeDisplayed();
    await expect(AdvertPage.serviceCurrencyInput).toHaveValue("UAH");
    await expect(AdvertPage.customerSelectValueInput).toBeDisplayed();
    await expect(AdvertPage.customerSelectValueInput).toHaveText("година");
  });

  it('C638-Verify the data entry in the "Вартість Ваших послуг *" price input', async () => {
    await AdvertPage.servicesLabel.click();
    await expect(AdvertPage.servicesField).toHaveAttribute(
      "placeholder",
      constants.priceTab.servicesField
    );
    await AdvertPage.servicesField.setValue(
      constants.priceTab.nameOfTheServices
    );
    await AdvertPage.serviceDropdownItem.click();
    await expect(AdvertPage.selectedServise).toBeDisplayed();
    await AdvertPage.priceLabel.click();
    await AdvertPage.addCostButton.click();
    await expect(AdvertPage.servicePriceInputField).toBeDisplayed();
    await AdvertPage.servicePriceInputField.setValue(constants.priceTab.spaceInside);
    await expect(AdvertPage.servicePriceInputField).toHaveValue(constants.priceTab.firstEntredValue);
    await AdvertPage.servicePriceInputField.setValue(constants.priceTab.spaceInTheEnd);
    await expect(AdvertPage.servicePriceInputField).toHaveValue(constants.priceTab.firstEntredValue);
    await AdvertPage.servicePriceInputField.setValue(constants.priceTab.space);
    await expect(AdvertPage.servicePriceInputField).toHaveValue(constants.priceTab.emptyValue);
    await AdvertPage.servicePriceInputField.setValue(constants.priceTab.letters);
    await expect(AdvertPage.servicePriceInputField).toHaveValue(constants.priceTab.emptyValue);
    await AdvertPage.servicePriceInputField.setValue(constants.priceTab.specialSymbols);
    await expect(AdvertPage.minimumOrderCostField).toHaveValue(constants.priceTab.emptyValue);
    await AdvertPage.servicePriceInputField.setValue(constants.priceTab.moreThanNineSymbols);
    await expect(AdvertPage.servicePriceInputField).toHaveValue(constants.priceTab.secondEntredValue);
  });
});
