import { $ } from "@wdio/globals";
import Page from "./page.js";

class MainPage extends Page {
  public open() {
    return super.open("");
  }
  public get logo() {
    return $('div[data-testid="logo"]');
  }
  public get aboutUsLabel() {
    return $('div[data-testid="content"]');
  }
  public get footerLogo() {
    return $(
      "//div[contains(concat(' ',normalize-space(@class),' '),'Footer_container')]/div[@data-testid='logo']"
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
    return $('div[class*="RentzilaForBuyers_title"]');
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
    return $('div[class*="RentzilaContacts_title"]');
  }
  public get emailLink() {
    return $('a[href="mailto:info@rentzila.com.ua"]');
  }
  public get orderConsultationButton() {
    return $("button=Замовити консультацію");
  }
  public get errorMessages() {
    return $$('p[class*="ConsultationForm_error_message"]');
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
    return $("h2=Послуги");
  }
  public get proposesElements() {
    return $$(
      "//section[@data-testid='services']//div[contains(concat(' ',normalize-space(@class),' '),'RentzilaProposes_name')]"
    );
  }

  public get equipmentTitle() {
    return $("h2=Спецтехніка");
  }
  public get equipmentElements() {
    return $$(
      "//section[@data-testid='specialEquipment']//div[contains(concat(' ',normalize-space(@class),' '),'RentzilaProposes_name')]"
    );
  }

  public get popularServiceLabel() {
    return $('div[data-testid="services__populyarni"]');
  }
  public get agriculturalServiceLabel() {
    return $('div[data-testid="services__silskogospodarski"]');
  }
  public get buildingServiceLabel() {
    return $('div[data-testid="services__budivelni"]');
  }
  public get otherServiceLabel() {
    return $('div[data-testid="services__inshi"]');
  }
  public get popularEquipmentLabel() {
    return $('h3[data-testid="specialEquipment__populyarna"]');
  }
  public get agriculturalEquipmentLabel() {
    return $('h3[data-testid="specialEquipment__silskogospodarska"]');
  }
  public get buildingEquipmentLabel() {
    return $('h3[data-testid="specialEquipment__budivelna"]');
  }
  public get otherEquipmentLabel() {
    return $('h3[data-testid="specialEquipment__insha"]');
  }
  public get loginButton() {
    return $('div[class*="NavbarAuthBlock_buttonEnter"]');
  }
  public get userIconDropdown() {
    return $('div[class*="AvatarCircle_wrapper"]');
  }
  public get emailInUserDropdown() {
    return $('div[data-testid="email"]');
  }
  public get myProfileItem() {
    return $('div[data-testid="profile"]');
  }
  public get myProfileTitle() {
    return $('div[class*="OwnerCabinetPage_title"]');
  }
  public get logoutButton() {
    return $('div[data-testid="logout"]');
  }
  public get submitAdvertButton() {
    return $("a=Подати оголошення");
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

  public async clickOnLogo() {
    await this.logo.click();
  }
  public async clickOnLoginButton() {
    await this.loginButton.click();
  }
  public async clickOnUserIconDropdown() {
    await this.userIconDropdown.click();
  }

  public async clickOnMyProfile() {
    await this.myProfileItem.click();
  }

  public async clickOnLogoutButton() {
    await this.logoutButton.click();
  }
  public async clickOnsubmitAdvertButton() {
    await this.submitAdvertButton.click();
  }
}

export default new MainPage();
