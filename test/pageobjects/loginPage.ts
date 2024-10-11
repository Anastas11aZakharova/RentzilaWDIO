import { $ } from "@wdio/globals";
import Page from "./page.js";

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

  public async enterEmailInEmailOrPhoneNumberField(email: string) {
    await this.emailOrPhoneNumberField.setValue(email);
  }

  public async enterPasswordInPasswordField(email: string) {
    await this.passwordField.setValue(email);
  }
  public async clickOnAuthorizationCrossButton() {
    await this.authorizationFormCrossButton.click();
  }
  public async clickOnHiddenPasswordButton() {
    await this.hiddenPasswordButton.click();
  }

  public async clickOnEnterButton() {
    await this.enterButton.click();
  }
}

export default new LoginPage();
