import { $ } from "@wdio/globals";
import Page from "./page.js";
import MainPage from "./mainPage.ts";
import * as constants from "../../data/constants.json"
import * as dotenv from "dotenv";

dotenv.config();
const validEmail = process.env.MY_EMAIL || "default_email@example.com";
const validPassword = process.env.MY_PASSWORD || "default_password";

class LoginPage extends Page {
  public get emailOrPhoneNumberFieldErrorMessage() {
    return $('p[class*="CustomReactHookInput_error_message"]');
  }
  
  public get passwordFieldErrorMessage() {
    return $('p[class*="CustomReactHookInput_error_message"]');
  }

  public get emailOrPhoneNumberField() {
    return $('input[id="email"]');
  }

  public get passwordField() {
    return $('input[id="password"]');
  }

  public get authorizationFormCrossButton() {
    return $('div[data-testid="authClose"]');
  }

  public get hiddenPasswordButton() {
    return $('div[data-testid="reactHookButton"]');
  }

  public get incorrectEmailOrPasswordErrorMessage() {
    return $('div[data-testid="errorMessage"]');
  }

  public get authorizationFormTitle() {
    return $('div[data-testid="authorizationTitle"]');
  }

  public get enterButton() {
    return $("button=Увійти");
  }

  public async enterInvalidLoginAndVerifyErrorMessage(login: string) {
    await MainPage.loginButton.click();
    await expect(this.authorizationFormTitle).toHaveText(
      constants.authorization.login
    );
    await this.emailOrPhoneNumberField.setValue(login);
    await this.passwordField.setValue(validPassword);
    await this.enterButton.click();
    await expect(this.emailOrPhoneNumberFieldErrorMessage).toHaveText(
      constants.authorization.invalidFormat
    );
    await this.authorizationFormCrossButton.click();
  }

  public async enterInvalidPasswordAndVerifyErrorMessage(password: string) {
    await MainPage.loginButton.click();
    await expect(this.authorizationFormTitle).toHaveText(
      constants.authorization.login
    );
    await this.emailOrPhoneNumberField.setValue(validEmail);
    await this.passwordField.setValue(password);
    await this.enterButton.click();
    await expect(this.incorrectEmailOrPasswordErrorMessage).toHaveText(
      constants.authorization.invalidCredentials
    );
    await this.authorizationFormCrossButton.click();
  }
}

export default new LoginPage();