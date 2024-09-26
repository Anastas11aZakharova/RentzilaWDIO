import { expect } from "@wdio/globals";
import MainPage from "../pageobjects/main.page.ts";
import MyProfilePage from "../pageobjects/my.profile.page.ts";
import LoginPage from "../pageobjects/login.page.ts";
import * as testData from "../data/testdata.json";
import * as dotenv from 'dotenv';
dotenv.config();
const validEmail = process.env.MY_EMAIL || 'default_email@example.com';
const validPassword = process.env.MY_PASSWORD || 'default_password';
const validPhone = process.env.MY_PHONE || 'default_phone';


describe("Rentzila", () => {
  it("C200- Authorization with empty fields", async () => {
    await MainPage.open();

    await MainPage.clickOnLoginButton();
    await expect(LoginPage.authorizationFormTitle).toHaveText("Вхід");
    await LoginPage.clickOnEnterButton();
    await expect(LoginPage.emailOrPhoneNumberFieldErrorMessage).toHaveText(
      "Поле не може бути порожнім"
    );
    await expect(LoginPage.passwordFieldErrorMessage).toHaveText(
      "Поле не може бути порожнім"
    );
    
    await LoginPage.enterEmailInEmailOrPhoneNumberField(
      validEmail
    );
    await LoginPage.clickOnEnterButton();
    await expect(LoginPage.passwordFieldErrorMessage).toHaveText(
      "Поле не може бути порожнім"
    );
    await LoginPage.clickOnAuthorizationCrossButton();
    await MainPage.clickOnLoginButton();
    await expect(LoginPage.authorizationFormTitle).toHaveText("Вхід");
    await LoginPage.enterPasswordInPasswordField(validPassword);
    await LoginPage.clickOnEnterButton();
    await expect(LoginPage.emailOrPhoneNumberFieldErrorMessage).toHaveText(
      "Поле не може бути порожнім"
    );
  });
  it("C201-  Authorization with valid email and password", async () => {
    await MainPage.open();

    await MainPage.clickOnLoginButton();
    await expect(LoginPage.authorizationFormTitle).toHaveText("Вхід");

    await LoginPage.enterEmailInEmailOrPhoneNumberField(
      validEmail
    );
    const password = process.env.MY_PASSWORD || 'default_password';
    await LoginPage.enterPasswordInPasswordField(password);
    await LoginPage.clickOnHiddenPasswordButton();
    await expect(LoginPage.passwordField).toHaveAttribute("type", "text");
    await LoginPage.clickOnHiddenPasswordButton();
    await expect(LoginPage.passwordField).toHaveAttribute("type", "password");
    await LoginPage.clickOnEnterButton();
    await expect(MainPage.userIconDropdown).toBeExisting();
    await expect(MainPage.loginButton).not.toBeExisting();
    await MainPage.clickOnUserIconDropdown();
    await expect(MainPage.emailInUserDropdown).toHaveText(
     validEmail
    );
    await expect(MainPage.myProfileItem).toHaveText("Мій профіль");
    await MainPage.clickOnLogoutButton();

  });
  it("C202-  Authorization with valid phone and password", async () => {
    await MainPage.open();

    await MainPage.clickOnLoginButton();
    await expect(LoginPage.authorizationFormTitle).toHaveText("Вхід");
    await LoginPage.enterEmailInEmailOrPhoneNumberField(
     validPhone
    );
    await LoginPage.enterPasswordInPasswordField(validPassword);
    await LoginPage.clickOnEnterButton();
    await MainPage.clickOnUserIconDropdown();
    await expect(MainPage.myProfileItem).toHaveText("Мій профіль");
    await MainPage.clickOnMyProfile();
    await expect(MainPage.myProfileTitle).toHaveText("Мій профіль");
    let phoneNumberOnProfile = (
      await MyProfilePage.phoneNumberField.getAttribute("value")
    ).toString();
    phoneNumberOnProfile = phoneNumberOnProfile.replace(/\s/g, "");
    await expect(validPhone).toEqual(phoneNumberOnProfile);
    await MainPage.clickOnUserIconDropdown();
    await expect(MainPage.myProfileItem).toHaveText("Мій профіль");
    await MainPage.clickOnLogoutButton();
    await expect(MainPage.logo).toBeExisting();
    await MainPage.clickOnLoginButton();
    await expect(LoginPage.authorizationFormTitle).toHaveText("Вхід");
    await LoginPage.enterEmailInEmailOrPhoneNumberField(
      testData.validInputs.phoneWithoutPlus
    );
    await LoginPage.enterPasswordInPasswordField(validPassword);
    await LoginPage.clickOnEnterButton();
    await MainPage.clickOnUserIconDropdown();
    await expect(MainPage.myProfileItem).toHaveText("Мій профіль");
    await MainPage.clickOnLogoutButton();
    await expect(MainPage.logo).toBeExisting();
    await MainPage.clickOnLoginButton();
    await expect(LoginPage.authorizationFormTitle).toHaveText("Вхід");
    await LoginPage.enterEmailInEmailOrPhoneNumberField(
      testData.validInputs.phoneWithoutPlus38
    );
    await LoginPage.enterPasswordInPasswordField(validPassword);
    await LoginPage.clickOnEnterButton();
    await MainPage.clickOnUserIconDropdown();
    await expect(MainPage.myProfileItem).toHaveText("Мій профіль");
    await MainPage.clickOnLogoutButton();
  });
  it("C207-  Authorization with invalid phone", async () => {
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

  it("576-  Authorization with invalid email", async () => {
    await MainPage.open();

    await MainPage.clickOnLoginButton();
    await expect(LoginPage.authorizationFormTitle).toHaveText("Вхід");
    await LoginPage.enterEmailInEmailOrPhoneNumberField(
      testData.invalidInputs.emailWithLowerDathes
    );
    await LoginPage.enterPasswordInPasswordField(validPassword);
    await LoginPage.clickOnEnterButton();
    await expect(LoginPage.incorrectEmailOrPasswordErrorMessage).toHaveText(
      "Невірний e-mail або пароль"
    );
    await LoginPage.clickOnAuthorizationCrossButton();
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

  it("577-  Authorization with invalid password", async () => {
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
    await MainPage.clickOnLoginButton();
    await expect(LoginPage.authorizationFormTitle).toHaveText("Вхід");
    await LoginPage.enterEmailInEmailOrPhoneNumberField(
      validEmail
    );
    await LoginPage.enterPasswordInPasswordField(
      testData.invalidInputs.emailWithCyrillicSymbols
    );
    await LoginPage.clickOnEnterButton();
    await expect(LoginPage.passwordFieldErrorMessage).toHaveText(
      "Пароль повинен містити як мінімум 1 цифру, 1 велику літеру і 1 малу літеру, також не повинен містити кирилицю та пробіли"
    );
  });
  async function enterInvalidLoginAndVerifyErrorMessage(login: string) {
    await MainPage.clickOnLoginButton();
    await expect(LoginPage.authorizationFormTitle).toHaveText("Вхід");
    await LoginPage.enterEmailInEmailOrPhoneNumberField(login);
    await LoginPage.enterPasswordInPasswordField(validPassword);
    await LoginPage.clickOnEnterButton();
    await expect(LoginPage.emailOrPhoneNumberFieldErrorMessage).toHaveText(
      "Неправильний формат email або номера телефону"
    );
    await LoginPage.clickOnAuthorizationCrossButton();
  }
  async function enterInvalidPasswordAndVerifyErrorMessage(password: string) {
    await MainPage.clickOnLoginButton();
    await expect(LoginPage.authorizationFormTitle).toHaveText("Вхід");
    await LoginPage.enterEmailInEmailOrPhoneNumberField(
      validEmail
    );
    await LoginPage.enterPasswordInPasswordField(password);
    await LoginPage.clickOnEnterButton();
    await expect(LoginPage.incorrectEmailOrPasswordErrorMessage).toHaveText(
      "Невірний e-mail або пароль"
    );
    await LoginPage.clickOnAuthorizationCrossButton();
  }
});
