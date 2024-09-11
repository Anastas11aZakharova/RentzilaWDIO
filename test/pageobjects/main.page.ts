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
  public get orderConsultationButton() {
    return $("button=Замовити консультацію");
  }
  public get errorMessages() {
    return $$('p[class="ConsultationForm_error_message__jleeD"]');
  }
  public get phoneNumberField() {
    return $('input[id="mobile"]');
  }
  public get nameField() {
    return $('input[name="name"]');
  }

  public open() {
    return super.open();
  }
  public async clickOnOrderConsultationButton() {
    await this.orderConsultationButton.click();
  }

  public async verifyErrorMessagesDisplayed() {
    expect(await this.errorMessages.length).toEqual(2);
    for await (const element of this.errorMessages) {
      await expect(element).toHaveText("Поле не може бути порожнім");
    }
  }

  public async enterPhoneNumber(phoneNumber: string) {
    await this.phoneNumberField.setValue(phoneNumber);
  }

  public async enterName(name: string) {
    await this.nameField.setValue(name);
  }

  public async clickOkInDialogPopUp() {
    await browser.waitUntil(async () => await browser.isAlertOpen(), {
      
    });
    let alertText = await browser.getAlertText();
    await expect(alertText).toEqual("Ви успішно відправили заявку");
    await browser.acceptAlert();
  }
}

export default new MainPage();
