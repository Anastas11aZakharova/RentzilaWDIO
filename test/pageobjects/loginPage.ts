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
}

export default new LoginPage();