import { expect } from "@wdio/globals";
import axios from "axios";
import MainPage from "../pageobjects/main.page.js";
import ProductPage from "../pageobjects/product.page.js";

describe("Rentzila", () => {
  // it("C214-Verify that all elements on the footer are displayed and all links are clickable", async () => {
  //   await MainPage.open();

  //   await expect(MainPage.logo).toBeExisting();
  //   await expect(MainPage.footerLogo).toBeExisting();
  //   await expect(MainPage.footerLogo).not.toBeClickable();
  //   await expect(MainPage.aboutUsLabel).toBeExisting();
  //   await expect(MainPage.aboutUsLabel).toHaveText("Про нас");
  //   await expect(MainPage.privacyPolicyLink).toBeExisting();
  //   await expect(MainPage.privacyPolicyLink).toHaveAttribute(
  //     "href",
  //     "/privacy-policy/"
  //   );
  //   await expect(MainPage.cookiePolicyLink).toBeExisting();
  //   await expect(MainPage.cookiePolicyLink).toHaveAttribute(
  //     "href",
  //     "/cookie-policy/"
  //   );
  //   await expect(MainPage.termsConditionsLink).toBeExisting();
  //   await expect(MainPage.termsConditionsLink).toHaveAttribute(
  //     "href",
  //     "/terms-conditions/"
  //   );
  //   await expect(MainPage.forBuyersLabel).toBeExisting();
  //   await expect(MainPage.forBuyersLabel).toHaveText("Користувачам");
  //   await expect(MainPage.productsLink).toBeExisting();
  //   await expect(MainPage.productsLink).toHaveAttribute("href", "/products/");
  //   await expect(MainPage.tendersLink).toBeExisting();
  //   await expect(MainPage.tendersLink).toHaveAttribute("href", "/tenders-map/");
  //   await expect(MainPage.requestsLink).toBeExisting();
  //   await expect(MainPage.requestsLink).toHaveAttribute(
  //     "href",
  //     "/requests-map/"
  //   );
  //   await expect(MainPage.contactsLabel).toBeExisting();
  //   await expect(MainPage.contactsLabel).toHaveText("Контакти");
  //   await expect(MainPage.emailLink).toBeExisting();
  //   await expect(MainPage.emailLink).toHaveAttribute(
  //     "href",
  //     "mailto:info@rentzila.com.ua"
  //   );
  // });

  // it('C226-"У Вас залишилися питання?" form', async () => {
  //   await MainPage.open();

  //   await expect(MainPage.logo).toBeExisting();
  //   await MainPage.clickOnTelegramCrossButton();
  //   await expect(MainPage.orderConsultationButton).toBeExisting();
  //   await MainPage.clickOnOrderConsultationButton();
  //   await MainPage.verifyErrorMessagesDisplayed();
  //   let validPhoneNumber = "+380506743060";
  //   await MainPage.enterPhoneNumber(validPhoneNumber);
  //   await MainPage.clickOnOrderConsultationButton();
  //   await expect(MainPage.errorMessages[0]).toBeExisting();
  //   await expect(MainPage.errorMessages[0]).toHaveText(
  //     "Поле не може бути порожнім"
  //   );
  //   let validName = "Test";
  //   await MainPage.enterName(validName);
  //   await MainPage.enterPhoneNumber("+38063111111");
  //   await expect(MainPage.errorMessages[0]).toBeExisting();
  //   await expect(MainPage.errorMessages[0]).toHaveText(
  //     "Телефон не пройшов валідацію"
  //   );
  //   await MainPage.enterName(validName);
  //   await MainPage.enterPhoneNumber("+11111111111111");
  //   await expect(MainPage.errorMessages[0]).toBeExisting();
  //   await expect(MainPage.errorMessages[0]).toHaveText(
  //     "Телефон не пройшов валідацію"
  //   );
  //   await MainPage.enterPhoneNumber(validPhoneNumber);
  //   await MainPage.clickOnOrderConsultationButton();
  //   await MainPage.clickOkInDialogPopUp();

  //   const bodyParameters = {
  //     email: "txt2021@ukr.net",
  //     password: "Qwerty123+",
  //   };
    
  //   let response = await axios.post(
  //     "https://dev.rentzila.com.ua/api/auth/jwt/create/",
  //     bodyParameters
  //   );
  //   let token = response.data.access;

  //   const config = {
  //     headers: { Authorization: `Bearer ` + token },
  //   };
  //   response = await axios.get(
  //     "https://dev.rentzila.com.ua/api/backcall/",
  //     config
  //   );

  //   const records = response.data;
  //   let isFound = false;

  //   records.forEach((record: { name: string; phone: string }) => {
  //     if (record.name === validName && record.phone === validPhoneNumber) {
  //       isFound = true;
  //     }
  //   });

  //   await expect(isFound).toEqual(true);
  // });

  // it('C212- Checking "Послуги" section on the main page', async () => {
  //   await MainPage.open();

  //   await expect(MainPage.proposesTitle).toBeExisting();
  //   await expect(MainPage.proposesTitle).toHaveText("Послуги");
  //   await expect(MainPage.popularServiceLabel).toBeExisting()
  //   await expect(MainPage.agriculturalServiceLabel).toBeExisting()
  //   await expect(MainPage.buildingServiceLabel).toBeExisting()
  //   await expect(MainPage.otherServiceLabel).toBeExisting()
  //   const popularProposals = [
  //     "Орання землі",
  //     "Перевезення матеріалів",
  //     "Рихлення ґрунту",
  //     "Культивація",
  //     "Комплекс робіт",
  //     "Навантаження та розвантаження",
  //     "Асфальтування",
  //   ];
  //   const agriculturalProposals = [
  //     "Орання землі",
  //     "Рихлення ґрунту",
  //     "Культивація",
  //     "Комплекс робіт",
  //     "Посів технічних та зернових культур",
  //     "Внесення добрив",
  //     "Зберігання урожаю"
  //   ];
  //   const buildingProposals = [
  //     "Навантаження та розвантаження",
  //     "Асфальтування",
  //     "Дорожні роботи",
  //     "Риття ям",
  //     "Планування та розчищення території під будівельний майданчик",
  //     "Навантажування та розвантажування матеріалів",
  //     "Буріння"
  //   ];
  //   const otherProposals = [
  //     "Перевезення матеріалів",
  //     "Навантаження матеріалів",
  //     "Зберігальні ангари",
  //     "Підйомні роботи",
  //     "Асенізаторські послуги",
  //     "Перевезення техніки",
  //     "FCHCHFCFB",
  //   ];
  //   await verifyServices(MainPage.popularServiceLabel, popularProposals)
  //   await verifyServices(MainPage.agriculturalServiceLabel, agriculturalProposals)
  //   await verifyServices(MainPage.buildingServiceLabel, buildingProposals)
  //   await verifyServices(MainPage.otherServiceLabel, otherProposals)
  // });

  // async function verifyServices(element: ChainablePromiseElement, serviceNames: string[]) {

  //   await element.click()
  //   var count: number = 7;
  //   await MainPage.verifyProposesElementsDisplayed(count);
  //   var i: number;
  //   for (i = 0; i < count; i++) {      
  //     await expect(MainPage.proposesElements[i]).toBeExisting();
  //     await expect(MainPage.proposesElements[i]).toHaveText(serviceNames[i]);
  //   }
  //   for (i = 0; i < count; i++) {
  //     await element.click()
  //     await MainPage.proposesElements[i].click();
  //     await MainPage.verifyCheckBoxIsChecked(serviceNames[i]);
  //     await expect(MainPage.cardUnit).toBeExisting();
  //     await MainPage.clickOnCardUnit();
  //     await ProductPage.verifyServiceIsVisible(serviceNames[i]);
  //     await MainPage.clickOnLogo();
  //   }
    
  // }

  it('C213- Checking ""Спецтехніка"" section on the main page', async () => {
    await MainPage.open();

    await expect(MainPage.equipmentTitle).toBeExisting();
    await expect(MainPage.equipmentTitle).toHaveText("Спецтехніка");
    await MainPage.verifyEquipmentElementsDisplayed(7);
    const popularEquipmentsCategories = [
     "посівні комплекси",
     "трактори колісні",
     "обприскувачі самохідні",
     "",
     "навантажувачі телескопічні",
     "",
     "асенізатори"
    ]

    const popularEquipments = [
     "Сівалки",
     "Трактори",
     "Обприскувачі",
     "Екскаватори",
     "Навантажувачі",
     "Підйомники",
     "Комунальні машини"
    ];
    const popularEquipmentsFilters = [
      "посівна та садильна техніка",
      "трактори",
      "техніка для поливу та зрошення",
      "Екскаватори",
      "Навантажувачі",
      "Підйомники",
      "Комунальні машини"
     ];
    const agriculturalEquipments = [
      "Трактори",
      "Жатки",
      "Комбайни",
      "Сівалки",
      "Обприскувачі",
      "Дрони",
      "Лісозаготівельна техніка"
     ];
     const agriculturalEquipmentsFilters = [
      "трактори",
      "жатки",
      "комбайни",
      "посівна та садильна техніка",
      "техніка для поливу та зрошення",
      "інша сільгосптехніка",
      "лісозаготівельна техніка"
     ];
     const buildingEquipments = [
      "Екскаватори",
      "Aвтокрани",
      "Навантажувачі",
      "Катки",
      "Підйомники",
      "Техніка для земляних робіт",
      "Дорожньо-будівельна техніка"
     ];
     const buildingEquipmentsFilters = [
      "Екскаватори",
      "",//noFilterIsApplyedAtAll
      "Навантажувачі",
      "Катки",
      "Підйомники",
      "Техніка для земляних робіт",
      "Дорожньо-будівельна техніка"
     ];
     const otherEquipments = [
      "Дорожня техніка",
      "Комунальна техніка",
      "Вантажівки",
      "Аварійна техніка",
      "Прибиральна техніка",
      "Складська техніка",
      "Техніка для складування"
     ];
     const otherEquipmentsFilters = [
      "Дорожньо-прибиральна техніка",
      "інша комунальна техніка",
      "Техніка для транспортування",
      "Аварійні машини",
      "Клінінгове обладнання",
      "",//noFilterIsApplyedAtAll
      "Техніка для складування"
     ];
     await verifyEquipment(MainPage.popularEquipmentLabel, popularEquipments, popularEquipmentsFilters, popularEquipmentsCategories)
     await verifyEquipment(MainPage.agriculturalEquipmentLabel, agriculturalEquipments, agriculturalEquipmentsFilters, popularEquipmentsCategories)
     await verifyEquipment(MainPage.buildingEquipmentLabel, buildingEquipments, buildingEquipmentsFilters, popularEquipmentsCategories)
     await verifyEquipment(MainPage.otherEquipmentLabel, otherEquipments, otherEquipmentsFilters, popularEquipmentsCategories)

  });
  async function verifyEquipment(element: ChainablePromiseElement, equipmentsNames: string[], equipmentsNamesInFilter: string[], equipmentsCategoryInProductsPage: string[]) {
    await element.click()
    var count: number = 7;
    await MainPage.verifyEquipmentsElementsDisplayed(count);
    var i: number;
    for (i = 0; i < count; i++) {      
      await expect(MainPage.equipmentElements[i]).toBeExisting();
      await expect(MainPage.equipmentElements[i]).toHaveText(equipmentsNames[i]);
    }
    for (i = 0; i < count; i++) {
      await element.click()
      await MainPage.equipmentElements[i].click();
      await MainPage.verifyEquipmentIsPresent(equipmentsNamesInFilter[i]);
      await expect(MainPage.cardUnit).toBeExisting();
      await MainPage.clickOnCardUnit();
      await ProductPage.verifyCategoriesIsVisible(equipmentsCategoryInProductsPage[i]);
      await MainPage.clickOnLogo();
    }
  }
});
