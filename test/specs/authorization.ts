import { expect } from "@wdio/globals";
import MainPage from "../pageobjects/mainPage.ts";
import MyProfilePage from "../pageobjects/myProfilePage.ts";
import LoginPage from "../pageobjects/loginPage.ts";
import * as testData from "../../data/testdata.json";
import * as dotenv from 'dotenv';
import * as constants from "../../data/constants.json";
dotenv.config();
const validEmail = process.env.MY_EMAIL || 'default_email@example.com';
const validPassword = process.env.MY_PASSWORD || 'default_password';
const validPhone = process.env.MY_PHONE || 'default_phone';

async function enterInvalidLoginAndVerifyErrorMessage(login: string) {
  await MainPage.loginButton.click();
  await expect(LoginPage.authorizationFormTitle).toHaveText(constants.authorization.login);
  await LoginPage.enterEmailInEmailOrPhoneNumberField(login);
  await LoginPage.enterPasswordInPasswordField(validPassword);
  await LoginPage.enterButton.click();
  await expect(LoginPage.emailOrPhoneNumberFieldErrorMessage).toHaveText(
    constants.authorization.invalidFormat
  );
  await LoginPage.authorizationFormCrossButton.click();
}

async function enterInvalidPasswordAndVerifyErrorMessage(password: string) {
  await MainPage.loginButton.click();
  await expect(LoginPage.authorizationFormTitle).toHaveText(constants.authorization.login);
  await LoginPage.enterEmailInEmailOrPhoneNumberField(
    validEmail
  );
  await LoginPage.enterPasswordInPasswordField(password);
  await LoginPage.enterButton.click();
  await expect(LoginPage.incorrectEmailOrPasswordErrorMessage).toHaveText(
    constants.authorization.invalidCredentials
  );
  await LoginPage.authorizationFormCrossButton.click();
}

describe("Rentzila", () => {
  it("C200 - Authorization with empty fields", async () => {
    await MainPage.open();

    await MainPage.loginButton.click();
    await expect(LoginPage.authorizationFormTitle).toHaveText(constants.authorization.login);
    await LoginPage.enterButton.click();
    await expect(LoginPage.emailOrPhoneNumberFieldErrorMessage).toHaveText(
      constants.footer.emptyField
    );
    await expect(LoginPage.passwordFieldErrorMessage).toHaveText(
      constants.footer.emptyField
    );
    
    await LoginPage.enterEmailInEmailOrPhoneNumberField(
      validEmail
    );
    await LoginPage.enterButton.click();
    await expect(LoginPage.passwordFieldErrorMessage).toHaveText(
      constants.footer.emptyField
    );
    await LoginPage.authorizationFormCrossButton.click();
    await MainPage.loginButton.click();
    await expect(LoginPage.authorizationFormTitle).toHaveText(constants.authorization.login);
    await LoginPage.enterPasswordInPasswordField(validPassword);
    await LoginPage.enterButton.click();
    await expect(LoginPage.emailOrPhoneNumberFieldErrorMessage).toHaveText(
      constants.footer.emptyField
    );
  });

  it("C201 - Authorization with valid email and password", async () => {
    await MainPage.open();

    await MainPage.loginButton.click();
    await expect(LoginPage.authorizationFormTitle).toHaveText(constants.authorization.login);

    await LoginPage.enterEmailInEmailOrPhoneNumberField(
      validEmail
    );
    const password = process.env.MY_PASSWORD || 'default_password';
    await LoginPage.enterPasswordInPasswordField(password);
    await LoginPage.hiddenPasswordButton.click();
    await expect(LoginPage.passwordField).toHaveAttribute("type", "text");
    await LoginPage.hiddenPasswordButton.click();
    await expect(LoginPage.passwordField).toHaveAttribute("type", "password");
    await LoginPage.enterButton.click();
    await expect(MainPage.userIconDropdown).toBeExisting();
    await expect(MainPage.loginButton).not.toBeExisting();
    await MainPage.userIconDropdown.click();
    await expect(MainPage.emailInUserDropdown).toHaveText(
     validEmail
    );
    await expect(MainPage.myProfileItem).toHaveText(constants.authorization.myProfile);
    await MainPage.logoutButton.click();
    await expect(MainPage.loginButton).toBeDisplayed();
  });

  it("C202 - Authorization with valid phone and password", async () => {
    await MainPage.open();

    await MainPage.loginButton.click();
    await expect(LoginPage.authorizationFormTitle).toHaveText(constants.authorization.login);
    await LoginPage.enterEmailInEmailOrPhoneNumberField(
     validPhone
    );
    await LoginPage.enterPasswordInPasswordField(validPassword);
    await LoginPage.enterButton.click();
    await MainPage.userIconDropdown.click();
    await expect(MainPage.myProfileItem).toHaveText(constants.authorization.myProfile);
    await MainPage.myProfileItem.click();
    await expect(MainPage.myProfileTitle).toHaveText(constants.authorization.myProfile);
    let phoneNumberOnProfile = (
      await MyProfilePage.phoneNumberField.getAttribute("value")
    ).toString();
    phoneNumberOnProfile = phoneNumberOnProfile.replace(/\s/g, "");
    await expect(validPhone).toEqual(phoneNumberOnProfile);
    await MainPage.userIconDropdown.click();
    await expect(MainPage.myProfileItem).toHaveText(constants.authorization.myProfile);
    await MainPage.logoutButton.click();
    await expect(MainPage.logo).toBeExisting();
    await MainPage.loginButton.click();
    await expect(LoginPage.authorizationFormTitle).toHaveText(constants.authorization.login);
    await LoginPage.enterEmailInEmailOrPhoneNumberField(
      testData.validInputs.phoneWithoutPlus
    );
    await LoginPage.enterPasswordInPasswordField(validPassword);
    await LoginPage.enterButton.click();
    await MainPage.userIconDropdown.click();
    await expect(MainPage.myProfileItem).toHaveText(constants.authorization.myProfile);
    await MainPage.logoutButton.click();
    await expect(MainPage.logo).toBeExisting();
    await MainPage.loginButton.click();
    await expect(LoginPage.authorizationFormTitle).toHaveText(constants.authorization.login);
    await LoginPage.enterEmailInEmailOrPhoneNumberField(
      testData.validInputs.phoneWithoutPlus38
    );
    await LoginPage.enterPasswordInPasswordField(validPassword);
    await LoginPage.enterButton.click();
    await MainPage.userIconDropdown.click();
    await expect(MainPage.myProfileItem).toHaveText(constants.authorization.myProfile);
    await MainPage.logoutButton.click();
    await expect(MainPage.loginButton).toBeDisplayed();
  });

  it("C207 - Authorization with invalid phone", async () => {
    await MainPage.open();

    await enterInvalidLoginAndVerifyErrorMessage(
      testData.invalidInputs.phoneWithoutPlus380
    );
    await enterInvalidLoginAndVerifyErrorMessage(
      testData.invalidInputs.phoneWithoutPlus38AndLastNumber
    );
    await enterInvalidLoginAndVerifyErrorMessage(
      testData.invalidInputs.phoneWithDash
    );
    await enterInvalidLoginAndVerifyErrorMessage(
      testData.invalidInputs.phoneWithLowerDash
    );
    await enterInvalidLoginAndVerifyErrorMessage(
      testData.invalidInputs.phoneWithBrackets
    );
    await enterInvalidLoginAndVerifyErrorMessage(
      testData.invalidInputs.phoneWithBracketsAndWithoutPlus380
    );
    await enterInvalidLoginAndVerifyErrorMessage(
      testData.invalidInputs.phoneWith11Numbers
    );
    await enterInvalidLoginAndVerifyErrorMessage(
      testData.invalidInputs.phoneWithOtherCountryCode
    );
    await enterInvalidLoginAndVerifyErrorMessage(
      testData.invalidInputs.phoneWithout38
    );
  });

  it("C576 - Authorization with invalid email", async () => {
    await MainPage.open();

    await MainPage.loginButton.click();
    await expect(LoginPage.authorizationFormTitle).toHaveText(constants.authorization.login);
    await LoginPage.enterEmailInEmailOrPhoneNumberField(
      testData.invalidInputs.emailWithLowerDathes
    );
    await LoginPage.enterPasswordInPasswordField(validPassword);
    await LoginPage.enterButton.click();
    await expect(LoginPage.incorrectEmailOrPasswordErrorMessage).toHaveText(
      constants.authorization.invalidCredentials
    );
    await LoginPage.authorizationFormCrossButton.click();
    await enterInvalidLoginAndVerifyErrorMessage(
      testData.invalidInputs.emailWithCyrillicSymbols
    );
    await enterInvalidLoginAndVerifyErrorMessage(
      testData.invalidInputs.emailWithoutEt
    );
    await enterInvalidLoginAndVerifyErrorMessage(
      testData.invalidInputs.emailWithoutDot
    );
    await enterInvalidLoginAndVerifyErrorMessage(
      testData.invalidInputs.emailWithoutDotCom
    );
    await enterInvalidLoginAndVerifyErrorMessage(
      testData.invalidInputs.emailWithoutgmail
    );
    await enterInvalidLoginAndVerifyErrorMessage(
      testData.invalidInputs.emailWithoutEtgmailDotCom
    );
    await enterInvalidLoginAndVerifyErrorMessage(
      testData.invalidInputs.emailWith2Ets
    );
  });

  it("C577 - Authorization with invalid password", async () => {
    await MainPage.open();

    await enterInvalidPasswordAndVerifyErrorMessage(
      testData.invalidInputs.passwordWithLowerDathesInTheEnd
    );
    await enterInvalidPasswordAndVerifyErrorMessage(
      testData.invalidInputs.passwordWithLowerDathesAtTheBeginning
    );
    await enterInvalidPasswordAndVerifyErrorMessage(
      testData.invalidInputs.nonExistentpassword
    );
    await enterInvalidPasswordAndVerifyErrorMessage(
      testData.invalidInputs.passwordWithUppercaseLetters
    );
    await enterInvalidPasswordAndVerifyErrorMessage(
      testData.invalidInputs.passwordWithLowercaseLetters
    );
    await MainPage.loginButton.click();
    await expect(LoginPage.authorizationFormTitle).toHaveText(constants.authorization.login);
    await LoginPage.enterEmailInEmailOrPhoneNumberField(
      validEmail
    );
    await LoginPage.enterPasswordInPasswordField(
      testData.invalidInputs.emailWithCyrillicSymbols
    );
    await LoginPage.enterButton.click();
    await expect(LoginPage.passwordFieldErrorMessage).toHaveText(
      constants.authorization.passwordValidation
    );
  });
});
