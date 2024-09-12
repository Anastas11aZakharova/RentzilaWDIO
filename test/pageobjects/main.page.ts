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
  public get telegramCrossButton() {
    return $('div[data-testid="crossButton"]');
  }
  public get proposesTitle() {
    return $('h2[data-testid="title"]');
  }
  public get proposesElements() {
    return $$(
      "//section[@data-testid='services']//div[@class='RentzilaProposes_name__DTnwr']"
    );
  }
  public get filterForm() {
    return $('div[data-testid="filterForm"]');
  }
  public get servisesDropDowns() {
    return $$('div[data-testid="rightArrow"]');
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
    await browser.waitUntil(async () => await browser.isAlertOpen(), {});
    let alertText = await browser.getAlertText();
    await expect(alertText).toEqual("Ви успішно відправили заявку");
    await browser.acceptAlert();
  }

  public async clickOnTelegramCrossButton() {
    await this.telegramCrossButton.click();
  }
  public async verifyProposesElementsDisplayed(count: number) {
    expect(await this.proposesElements.length).toEqual(count);
  }

  public async verifyCheckBoxIsChecked(name: string) {
    for await (const element of this.servisesDropDowns) {
      await element.click();
      var isExpanded = await element.getAttribute("class");
      if (!isExpanded.includes("ServiceCategory_clicked")) {
        await element.click();
      }
    }
    await expect(
      this.filterForm.$("//label[contains(text(),'" + name + "')]/../input")
    ).toBeExisting();
    await expect(
      this.filterForm.$("//label[contains(text(),'" + name + "')]/../input")
    ).toBeChecked();
  }

  public async clickOnLogo() {
    await this.logo.click();
  }
}

export default new MainPage();
