import { $ } from "@wdio/globals";
import Page from "./page.js";

class MainPage extends Page {
  public get logo() {
    return $('div[data-testid="logo"]');
  }
  public get aboutUsLabel() {
    return $('div[data-testid="content"]');
  }
  public get footerLogo() {
    return $(
      "//div[@class='Footer_container__5d2_x']/div[@data-testid='logo']"
    );
  }
  public get privacyPolicyLink() {
    return $('a[href="/privacy-policy/"]');
  }
  public get cookiePolicyLink() {
    return $('a[href="/cookie-policy/"]');
  }
  public get termsConditionsLink() {
    return $('a[href="/terms-conditions/"]');
  }
  public get forBuyersLabel() {
    return $('div[class="RentzilaForBuyers_title__k3tHn"]');
  }
  public get productsLink() {
    return $('a[href="/products/"]');
  }
  public get tendersLink() {
    return $('a[href="/tenders-map/"]');
  }
  public get requestsLink() {
    return $('a[href="/requests-map/"]');
  }
  public get contactsLabel() {
    return $('div[class="RentzilaContacts_title__SxcO7"]');
  }
  public get emailLink() {
    return $('a[href="mailto:info@rentzila.com.ua"]');
  }

  public open() {
    return super.open();
  }
}

export default new MainPage();
