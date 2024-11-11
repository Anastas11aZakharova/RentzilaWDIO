import { $ } from "@wdio/globals";
import Page from "./page.js";

class AdvertPage extends Page {
  public get advertPageTitle() {
    return $("div=Створити оголошення");
  }

  public get mainInformationLabel() {
    return $("span=Основна інформація");
  }

  public get photosLabel() {
    return $("span=Фотографії");
  }

  public get servicesLabel() {
    return $("span=Послуги");
  }

  public get priceLabel() {
    return $("span=Вартість");
  }

  public get contactsLabel() {
    return $("span=Контакти");
  }

  public get tabList() {
    return $('div[role="tablist"]');
  }

  public get categorySelectField() {
    return $('div[data-testid="buttonDiv"]');
  }

  public get categoryLabel() {
    return $("div=Категорія");
  }

  public get advertNameField() {
    return $('input[placeholder="Введіть назву оголошення"]');
  }

  public get producerField() {
    return $('input[data-testid="input-customSelectWithSearch"]');
  }

  public get producerFieldBorder() {
    return $("//input[@data-testid='input-customSelectWithSearch']/../..");
  }

  public get modelNameField() {
    return $('input[placeholder="Введіть назву моделі"]');
  }

  public get technicalCharacteristicsField() {
    return $(
      "//div[text()='Технічні характеристики']/following-sibling::div/textarea"
    );
  }

  public get detailedDescriptionField() {
    return $("//div[text()='Детальний опис']/following-sibling::div/textarea");
  }

  public get locationField() {
    return $('label[data-testid="mapLabel"]');
  }

  public get categorySelectAsterisk() {
    return $("//div[text()='Категорія ']/span[text()='*']");
  }

  public get categorySelectArrow() {
    return $(
      "//span[text()='Виберіть категорію']/following-sibling::div//img[@alt='Arrow-down']"
    );
  }

  public get nextButton() {
    return $('button[data-testid="nextButton"]');
  }

  public get categoryErrorMessage() {
    return $(
      "//span[text()='Виберіть категорію']/../following-sibling::div[text()='Це поле обов’язкове']"
    );
  }

  public get popUpTitle() {
    return $("div=Вибір категорії технічного засобу");
  }

  public get crossButton() {
    return $('div[data-testid="closeIcon"]');
  }

  public get advertNameLabel() {
    return $("div=Назва оголошення");
  }

  public get advertNameAsterisk() {
    return $('span[data-testid="customInputStar"]');
  }

  public get advertNameErrorMessage() {
    return $('div[data-testid="descriptionError"]');
  }

  public get advertErrorMessage() {
    return $("div=У назві оголошення повинно бути не менше 10 символів");
  }

  public get producerLabel() {
    return $('div[data-testid="div-wrapper-selectManufacturer"]');
  }

  public get producerAsterisk() {
    return $(
      "//div[contains(text(),'Виробник транспортного засобу')]/span[text()='*']"
    );
  }

  public get producerErrorMessage() {
    return $(
      "//input[@placeholder='Введіть виробника транспортного засобу']/../../../following-sibling::div[text()='Це поле обов’язкове']"
    );
  }

  public get producerSearchDropdown() {
    return $(
      'div[class*="CustomSelectWithSearch_searchedServicesCat_wrapper"]'
    );
  }

  public get producerSearchDropdownElement() {
    return $('div[data-testid="item-customSelectWithSearch"]');
  }

  public get producerNotFoundErrorMessage() {
    return $('p[data-testid="p2-notFound-addNewItem"]');
  }

  public get symbolsCounter() {
    return $('div[data-testid="maxLength"]');
  }

  public get modelNameLabel() {
    return $("div=Назва моделі");
  }

  public get modelNameErrorMessage() {
    return $(
      "//input[@placeholder='Введіть назву моделі']/following-sibling::div[@data-testid='descriptionError']"
    );
  }

  public get technicalCharacteristicsLabel() {
    return $("div=Технічні характеристики");
  }

  public get firstCategoryLevel() {
    return $$('div[data-testid="firstCategoryWrapper"]');
  }

  public get secondCategoryLevel() {
    return $$('label[data-testid="checkLabel"]');
  }

  public get thirdCategoryLevel() {
    return $$('label[data-testid="thirdCategoryLabel"]');
  }

  public get cancelButton() {
    return $('button[data-testid="prevButton"]');
  }

  public get locationAsterisk() {
    return $(
      "//div[contains(text(),'Місце розташування технічного засобу')]/span[text()='*']"
    );
  }

  public get locationLabel() {
    return $("div=Місце розташування технічного засобу");
  }

  public get locationErrorMessage() {
    return $("div=Виберіть коректне місце на мапі України");
  }

  public get chooseOnMapButton() {
    return $('span[data-testid="choseOnMap"]');
  }

  public get mapPopUpMessage() {
    return $('div[data-testid="div-mapPopup"]');
  }

  public get mapPopUpTitle() {
    return $("div=Техніка на мапі");
  }

  public get mapPopUpCrossIcom() {
    return $('svg[data-testid="crossIcon"]');
  }

  public get defaultAddressLine() {
    return $('div[data-testid="address"]');
  }

  public get mapElement() {
    return $('div[id="map"]');
  }

  public get confirmButton() {
    return $("button=Підтвердити вибір");
  }

  public get photoLabel() {
    return $("button=Підтвердити вибір");
  }

  public async verifyLabelNumberIsCorrect(label: string, number: string) {
    label = label.charAt(0).toUpperCase() + label.slice(1);
    await expect(
      this.tabList.$(
        "//span[text()='" + label + "']//..//span[@data-testid='labelNumber']"
      )
    ).toHaveText(number);
  }

  public async verifyLabelIsActive(label: string): Promise<boolean> {
    label = label.charAt(0).toUpperCase() + label.slice(1);
    let cls = await this.tabList
      .$("//span[text()='" + label + "']//..//div[@data-testid='label']")
      .getAttribute("class");
    if (cls.includes("Active")) {
      return true;
    } else {
      return false;
    }
  }
  
  public async verifyModelNameBorderIsRed(): Promise<boolean> {
    let cls = await this.modelNameField.getAttribute("class");
    if (cls.includes("inputError")) {
      return true;
    } else {
      return false;
    }
  }
  
  public async verifyCategoryFieldBorderIsRed(): Promise<boolean> {
    let cls = await this.categorySelectField.getAttribute("class");
    if (cls.includes("error")) {
      return true;
    } else {
      return false;
    }
  }

  public async verifyAdvertNameFieldBorderIsRed(): Promise<boolean> {
    let cls = await this.advertNameField.getAttribute("class");
    if (cls.includes("inputError")) {
      return true;
    } else {
      return false;
    }
  }

  public async verifyProducerFieldBorderIsRed(): Promise<boolean> {
    let cls = await this.producerFieldBorder.getAttribute("class");
    if (cls.includes("Error")) {
      return true;
    } else {
      return false;
    }
  }

  public async clickOkInDialogPopUp() {
    await browser.waitUntil(async () => await browser.isAlertOpen(), {});
    let alertText = await browser.getAlertText();
    await expect(alertText).toEqual(
      "Ви впевнені, що хочете перейти на іншу сторінку? Внесені дані не збережуться!"
    );
    await browser.acceptAlert();
  }

  public async verifyLocationFieldBorderIsRed(): Promise<boolean> {
    let cls = await this.locationField.getAttribute("class");
    if (cls.includes("Error")) {
      return true;
    } else {
      return false;
    }
  }
}

export default new AdvertPage();
