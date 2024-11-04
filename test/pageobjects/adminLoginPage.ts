import { $ } from "@wdio/globals";
import Page from "./page.js";

class AdminLoginPage extends Page {
  public get emailField() {
    return $('input[name="username"]');
  }

  public get adminLoginPageHeader() {
    return $('div[id="header"]');
  }

  public get passwordField() {
    return $('input[name="password"]');
  }

  public get logInButton() {
    return $('input[value="Log in"]');
  }

  public open() {
    return super.open('api/admin/');
  }
}

export default new AdminLoginPage();
