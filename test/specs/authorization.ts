import { expect } from "@wdio/globals";
import MainPage from "../pageobjects/mainPage.ts";
import MyProfilePage from "../pageobjects/myProfilePage.ts";
import LoginPage from "../pageobjects/loginPage.ts";
import * as testData from "../../data/testdata.json";
import * as dotenv from "dotenv";
import * as constants from "../../data/constants.json";

dotenv.config();
const validEmail = process.env.MY_EMAIL || "default_email@example.com";
const validPassword = process.env.MY_PASSWORD || "default_password";
const validPhone = process.env.MY_PHONE || "default_phone";

describe("Rentzila", () => {
  beforeEach(async () => {
    await MainPage.open("");
  });

  it("C201 - Authorization with valid email and password", async () => {
    await MainPage.loginButton.click();
    await expect(LoginPage.authorizationFormTitle).toHaveText(
      constants.authorization.login
    );
    await LoginPage.emailOrPhoneNumberField.setValue(validEmail);
    const password = process.env.MY_PASSWORD || "default_password";
    await LoginPage.passwordField.setValue(password);
    await LoginPage.hiddenPasswordButton.click();
    await expect(LoginPage.passwordField).toHaveAttribute("type", "text");
    await LoginPage.hiddenPasswordButton.click();
    await expect(LoginPage.passwordField).toHaveAttribute("type", "password");
    await LoginPage.enterButton.click();
    await expect(MainPage.userIconDropdown).toBeExisting();
    await expect(MainPage.loginButton).not.toBeExisting();
    await MainPage.userIconDropdown.click();
    await expect(MainPage.emailInUserDropdown).toHaveText(validEmail);
    await expect(MainPage.myProfileItem).toHaveText(
      constants.authorization.myProfile
    );
    await MainPage.logoutButton.click();
    await expect(MainPage.loginButton).toBeDisplayed();
  });

  it("C202 - Authorization with valid phone and password", async () => {
    await MainPage.loginButton.click();
    await expect(LoginPage.authorizationFormTitle).toHaveText(
      constants.authorization.login
    );
    await LoginPage.emailOrPhoneNumberField.setValue(validPhone);
    await LoginPage.passwordField.setValue(validPassword);
    await LoginPage.enterButton.click();
    await MainPage.userIconDropdown.click();
    await expect(MainPage.myProfileItem).toHaveText(
      constants.authorization.myProfile
    );
    await MainPage.myProfileItem.click();
    await expect(MainPage.myProfileTitle).toHaveText(
      constants.authorization.myProfile
    );
    let phoneNumberOnProfile = (
      await MyProfilePage.phoneNumberField.getAttribute("value")
    ).toString();
    phoneNumberOnProfile = phoneNumberOnProfile.replace(/\s/g, "");
    await expect(validPhone).toEqual(phoneNumberOnProfile);
    await MainPage.userIconDropdown.click();
    await expect(MainPage.myProfileItem).toHaveText(
      constants.authorization.myProfile
    );
    await MainPage.logoutButton.click();
    await expect(MainPage.logo).toBeExisting();
    await MainPage.loginButton.click();
    await expect(LoginPage.authorizationFormTitle).toHaveText(
      constants.authorization.login
    );
    await LoginPage.emailOrPhoneNumberField.setValue(
      testData.validInputs.phoneWithoutPlus
    );
    await LoginPage.passwordField.setValue(validPassword);
    await LoginPage.enterButton.click();
    await MainPage.userIconDropdown.click();
    await expect(MainPage.myProfileItem).toHaveText(
      constants.authorization.myProfile
    );
    await MainPage.logoutButton.click();
    await expect(MainPage.logo).toBeExisting();
    await MainPage.loginButton.click();
    await expect(LoginPage.authorizationFormTitle).toHaveText(
      constants.authorization.login
    );
    await LoginPage.emailOrPhoneNumberField.setValue(
      testData.validInputs.phoneWithoutPlus38
    );
    await LoginPage.passwordField.setValue(validPassword);
    await LoginPage.enterButton.click();
    await MainPage.userIconDropdown.click();
    await expect(MainPage.myProfileItem).toHaveText(
      constants.authorization.myProfile
    );
    await MainPage.logoutButton.click();
    await expect(MainPage.loginButton).toBeDisplayed();
  });

  it("C200 - Authorization with empty fields", async () => {
    await MainPage.loginButton.click();
    await expect(LoginPage.authorizationFormTitle).toHaveText(
      constants.authorization.login
    );
    await LoginPage.enterButton.click();
    await expect(LoginPage.emailOrPhoneNumberFieldErrorMessage).toHaveText(
      constants.footer.emptyField
    );
    await expect(LoginPage.passwordFieldErrorMessage).toHaveText(
      constants.footer.emptyField
    );
    await LoginPage.emailOrPhoneNumberField.setValue(validEmail);
    await LoginPage.enterButton.click();
    await expect(LoginPage.passwordFieldErrorMessage).toHaveText(
      constants.footer.emptyField
    );
    await LoginPage.authorizationFormCrossButton.click();
    await MainPage.loginButton.click();
    await expect(LoginPage.authorizationFormTitle).toHaveText(
      constants.authorization.login
    );
    await LoginPage.passwordField.setValue(validPassword);
    await LoginPage.enterButton.click();
    await expect(LoginPage.emailOrPhoneNumberFieldErrorMessage).toHaveText(
      constants.footer.emptyField
    );
  });

  it("C207 - Authorization with invalid phone", async () => {
    await LoginPage.enterInvalidLoginAndVerifyErrorMessage(
      testData.invalidInputs.phoneWithoutPlus380
    );
    await LoginPage.enterInvalidLoginAndVerifyErrorMessage(
      testData.invalidInputs.phoneWithoutPlus38AndLastNumber
    );
    await LoginPage.enterInvalidLoginAndVerifyErrorMessage(
      testData.invalidInputs.phoneWithDash
    );
    await LoginPage.enterInvalidLoginAndVerifyErrorMessage(
      testData.invalidInputs.phoneWithLowerDash
    );
    await LoginPage.enterInvalidLoginAndVerifyErrorMessage(
      testData.invalidInputs.phoneWithBrackets
    );
    await LoginPage.enterInvalidLoginAndVerifyErrorMessage(
      testData.invalidInputs.phoneWithBracketsAndWithoutPlus380
    );
    await LoginPage.enterInvalidLoginAndVerifyErrorMessage(
      testData.invalidInputs.phoneWith11Numbers
    );
    await LoginPage.enterInvalidLoginAndVerifyErrorMessage(
      testData.invalidInputs.phoneWithOtherCountryCode
    );
    await LoginPage.enterInvalidLoginAndVerifyErrorMessage(
      testData.invalidInputs.phoneWithout38
    );
  });

  it("C576 - Authorization with invalid email", async () => {
    await MainPage.loginButton.click();
    await expect(LoginPage.authorizationFormTitle).toHaveText(
      constants.authorization.login
    );
    await LoginPage.emailOrPhoneNumberField.setValue(
      testData.invalidInputs.emailWithLowerDathes
    );
    await LoginPage.passwordField.setValue(validPassword);
    await LoginPage.enterButton.click();
    await expect(LoginPage.incorrectEmailOrPasswordErrorMessage).toHaveText(
      constants.authorization.invalidCredentials
    );
    await LoginPage.authorizationFormCrossButton.click();
    await LoginPage.enterInvalidLoginAndVerifyErrorMessage(
      testData.invalidInputs.emailWithCyrillicSymbols
    );
    await LoginPage.enterInvalidLoginAndVerifyErrorMessage(
      testData.invalidInputs.emailWithoutEt
    );
    await LoginPage.enterInvalidLoginAndVerifyErrorMessage(
      testData.invalidInputs.emailWithoutDot
    );
    await LoginPage.enterInvalidLoginAndVerifyErrorMessage(
      testData.invalidInputs.emailWithoutDotCom
    );
    await LoginPage.enterInvalidLoginAndVerifyErrorMessage(
      testData.invalidInputs.emailWithoutgmail
    );
    await LoginPage.enterInvalidLoginAndVerifyErrorMessage(
      testData.invalidInputs.emailWithoutEtgmailDotCom
    );
    await LoginPage.enterInvalidLoginAndVerifyErrorMessage(
      testData.invalidInputs.emailWith2Ets
    );
  });

  it("C577 - Authorization with invalid password", async () => {
    await LoginPage.enterInvalidPasswordAndVerifyErrorMessage(
      testData.invalidInputs.passwordWithLowerDathesInTheEnd
    );
    await LoginPage.enterInvalidPasswordAndVerifyErrorMessage(
      testData.invalidInputs.passwordWithLowerDathesAtTheBeginning
    );
    await LoginPage.enterInvalidPasswordAndVerifyErrorMessage(
      testData.invalidInputs.nonExistentpassword
    );
    await LoginPage.enterInvalidPasswordAndVerifyErrorMessage(
      testData.invalidInputs.passwordWithUppercaseLetters
    );
    await LoginPage.enterInvalidPasswordAndVerifyErrorMessage(
      testData.invalidInputs.passwordWithLowercaseLetters
    );
    await MainPage.loginButton.click();
    await expect(LoginPage.authorizationFormTitle).toHaveText(
      constants.authorization.login
    );
    await LoginPage.emailOrPhoneNumberField.setValue(validEmail);
    await LoginPage.passwordField.setValue(
      testData.invalidInputs.emailWithCyrillicSymbols
    );
    await LoginPage.enterButton.click();
    await expect(LoginPage.passwordFieldErrorMessage).toHaveText(
      constants.authorization.passwordValidation
    );
  });
});
