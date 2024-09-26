import { expect } from "@wdio/globals";
import MainPage from "../pageobjects/main.page.ts";
import LoginPage from "../pageobjects/login.page.ts";
import AdvertPage from "../pageobjects/advert.page.ts";
import * as dotenv from "dotenv";
dotenv.config();
const validEmail = process.env.MY_EMAIL || "default_email@example.com";
const validPassword = process.env.MY_PASSWORD || "default_password";

describe("Rentzila", () => {
  // it("C294- Verify body title and tab titles", async () => {
  //   await MainPage.open();

  //   await MainPage.clickOnLoginButton();
  //   await expect(LoginPage.authorizationFormTitle).toHaveText("Вхід");
  //   await LoginPage.enterEmailInEmailOrPhoneNumberField(validEmail);
  //   await LoginPage.enterPasswordInPasswordField(validPassword);
  //   await LoginPage.clickOnEnterButton();
  //   await expect(MainPage.logo).toBeExisting();
  //   await MainPage.clickOnsubmitAdvertButton();
  //   await expect(AdvertPage.advertPageTitle).toHaveText("Створити оголошення");
  //   let mainInformationLabel = "основна інформація";
  //   let photosLabel = "фотографії";
  //   let servicesLabel = "послуги";
  //   let priceLabel = "вартість";
  //   let contactsLabel = "контакти";
  //   await expect(AdvertPage.mainInformationLabel).toHaveText(
  //     mainInformationLabel
  //   );
  //   await AdvertPage.verifyLabelNumberIsCorrect(mainInformationLabel, "1");
  //   await expect(
  //     await AdvertPage.verifyLabelIsActive(mainInformationLabel)
  //   ).toEqual(true);
  //   await expect(AdvertPage.photosLabel).toHaveText(photosLabel);
  //   await AdvertPage.verifyLabelNumberIsCorrect(photosLabel, "2");
  //   await expect(await AdvertPage.verifyLabelIsActive(photosLabel)).toEqual(
  //     false
  //   );
  //   await expect(AdvertPage.servicesLabel).toHaveText(servicesLabel);
  //   await AdvertPage.verifyLabelNumberIsCorrect(servicesLabel, "3");
  //   await expect(await AdvertPage.verifyLabelIsActive(servicesLabel)).toEqual(
  //     false
  //   );
  //   await expect(AdvertPage.priceLabel).toHaveText(priceLabel);
  //   await AdvertPage.verifyLabelNumberIsCorrect(priceLabel, "4");
  //   await expect(await AdvertPage.verifyLabelIsActive(priceLabel)).toEqual(
  //     false
  //   );
  //   await expect(AdvertPage.contactsLabel).toHaveText(contactsLabel);
  //   await AdvertPage.verifyLabelNumberIsCorrect(contactsLabel, "5");
  //   await expect(await AdvertPage.verifyLabelIsActive(contactsLabel)).toEqual(
  //     false
  //   );
  //   await expect(AdvertPage.categorySelectField).toBeExisting();
  //   await expect(AdvertPage.advertNameField).toBeExisting();
  //   await expect(AdvertPage.producerField).toBeExisting();
  //   await expect(AdvertPage.modelNameField).toBeExisting();
  //   await expect(AdvertPage.technicalCharacteristicsField).toBeExisting();
  //   await expect(AdvertPage.detailedDescriptionField).toBeExisting();
  //   await expect(AdvertPage.locationField).toBeExisting();
  //   await MainPage.clickOnUserIconDropdown();
  //   await MainPage.clickOnLogoutButton();
  // });
  it("C296- Verify category (Категорія) section", async () => {
    await MainPage.open();

    await MainPage.clickOnLoginButton();
    await expect(LoginPage.authorizationFormTitle).toHaveText("Вхід");
    await LoginPage.enterEmailInEmailOrPhoneNumberField(validEmail);
    await LoginPage.enterPasswordInPasswordField(validPassword);
    await LoginPage.clickOnEnterButton();
    await expect(MainPage.logo).toBeExisting();
    await MainPage.clickOnsubmitAdvertButton();
    await expect(AdvertPage.advertPageTitle).toHaveText("Створити оголошення");
    await expect(AdvertPage.categoryLabel).toHaveText("Категорія *");
    await expect(AdvertPage.categorySelectAsterisk).toBeExisting();
    await expect(AdvertPage.categorySelectField).toHaveText(
      "Виберіть категорію"
    );
    await expect(AdvertPage.categorySelectArrow).toBeExisting();
    await AdvertPage.clickOnNextButton();
    await expect(await AdvertPage.verifyCategoryFieldBorderIsRed()).toEqual(
      true
    );
    await expect(AdvertPage.categoryErrorMessage).toBeExisting();
    await AdvertPage.clickOnCategorySelectField();
    await expect(AdvertPage.popUpTitle).toBeExisting();
    await expect(AdvertPage.crossButton).toBeExisting();
    await AdvertPage.clickOnCrossButton();
    await expect(AdvertPage.popUpTitle).not.toBeDisplayed();
    await expect(AdvertPage.crossButton).not.toBeDisplayed();
    await AdvertPage.clickOnCategorySelectField();
    await expect(AdvertPage.popUpTitle).toBeExisting();
    await AdvertPage.clickOutsideOfCrossButton();
    await expect(AdvertPage.popUpTitle).not.toBeDisplayed();
    await expect(AdvertPage.crossButton).not.toBeDisplayed();
   
    await AdvertPage.clickOnCategorySelectField();
    
    for await (const element of AdvertPage.firstCategoryLevel) {
      await element.click()
      for await (const element of AdvertPage.secondCategoryLevel) {
        await element.click()
        for await (const element of AdvertPage.thirdCategoryLevel) {
          let categoryName = await element.getText()
          await element.click()
          await expect(AdvertPage.categorySelectField).toHaveText(categoryName)
          await AdvertPage.clickOnCategorySelectField();
        }
      }
    }
    await AdvertPage.clickOutsideOfCrossButton();
    await MainPage.clickOnUserIconDropdown();
    await MainPage.clickOnLogoutButton();
  }).timeout(60000);
  // it("C297- Verify unit name section", async () => {
  //   await MainPage.open();

  //   await MainPage.clickOnLoginButton();
  //   await expect(LoginPage.authorizationFormTitle).toHaveText("Вхід");
  //   await LoginPage.enterEmailInEmailOrPhoneNumberField(validEmail);
  //   await LoginPage.enterPasswordInPasswordField(validPassword);
  //   await LoginPage.clickOnEnterButton();
  //   await expect(MainPage.logo).toBeExisting();
  //   await MainPage.clickOnsubmitAdvertButton();
  //   await expect(AdvertPage.advertPageTitle).toHaveText("Створити оголошення");
  //   await expect(AdvertPage.advertNameLabel).toHaveText("Назва оголошення *");
  //   await expect(AdvertPage.advertNameAsterisk).toBeExisting();
  //   await expect(AdvertPage.advertNameField).toHaveAttribute(
  //     "placeholder",
  //     "Введіть назву оголошення"
  //   );
  //   await AdvertPage.clickOnNextButton();
  //   await expect(await AdvertPage.verifyAdvertNameFieldBorderIsRed()).toEqual(
  //     true
  //   );
  //   await expect(AdvertPage.advertNameErrorMessage).toHaveText(
  //     "Це поле обов’язкове"
  //   );
  //   await AdvertPage.enterDataInAdvertNameField("123456789");
  //   await AdvertPage.clickOnNextButton();
  //   await expect(AdvertPage.advertErrorMessage).toBeExisting();
  //   await AdvertPage.enterDataInAdvertNameField(
  //     "d859JTAonv6cdLNdH9j2Zl4jPO6X5oiJ1OF1Az3LZOll0KV0Kf31Amc30mBJco2XPSuFBEg71W6T2L2kYPULDZTv60INIpQYSJHLA"
  //   );
  //   await AdvertPage.clickOnNextButton();
  //   await expect(AdvertPage.advertNameErrorMessage).toHaveText(
  //     "У назві оголошення може бути не більше 100 символів"
  //   );
  //   await AdvertPage.enterDataInAdvertNameField("<>{};^");
  //   await AdvertPage.clickOnNextButton();
  //   await expect(AdvertPage.advertNameField).toHaveText("");
  //   await AdvertPage.enterDataInAdvertNameField("Оголошення");
  //   await AdvertPage.clickOnNextButton();
  //   await expect(AdvertPage.advertNameErrorMessage).not.toBeDisplayed();
  //   await MainPage.clickOnUserIconDropdown();
  //   await MainPage.clickOnLogoutButton();

  //   // await browser.pause(1000)
  // });
  // it("C298- Verify vehicle manufacturer section", async () => {
  //   await MainPage.open();

  //   await MainPage.clickOnLoginButton();
  //   await expect(LoginPage.authorizationFormTitle).toHaveText("Вхід");
  //   await LoginPage.enterEmailInEmailOrPhoneNumberField(validEmail);
  //   await LoginPage.enterPasswordInPasswordField(validPassword);
  //   await LoginPage.clickOnEnterButton();
  //   await expect(MainPage.logo).toBeExisting();
  //   await MainPage.clickOnsubmitAdvertButton();
  //   await expect(AdvertPage.advertPageTitle).toHaveText("Створити оголошення");
  //   await expect(AdvertPage.producerLabel).toHaveText(
  //     "Виробник транспортного засобу *"
  //   );
  //   await expect(AdvertPage.producerAsterisk).toBeExisting();
  //   await AdvertPage.clickOnNextButton();
  //   await expect(await AdvertPage.verifyProducerFieldBorderIsRed()).toEqual(
  //     true
  //   );
  //   await expect(AdvertPage.producerErrorMessage).toHaveText(
  //     "Це поле обов’язкове"
  //   );
  //   await AdvertPage.enterDataInProducerField("A");
  //   await expect(AdvertPage.producerSearchDropdown).toBeDisplayed();
  //   await AdvertPage.enterDataInProducerField("АТЭК");
  //   await expect(AdvertPage.producerSearchDropdownElement).toHaveText("АТЭК");
  //   await AdvertPage.enterDataInProducerField("Атэк");
  //   await expect(AdvertPage.producerSearchDropdownElement).toHaveText("АТЭК");
  //   let randomData = "123456&lhf";
  //   await AdvertPage.enterDataInProducerField(randomData);
  //   await expect(AdvertPage.producerNotFoundErrorMessage).toBeDisplayed();
  //   await expect(AdvertPage.producerNotFoundErrorMessage).toHaveText(
  //     "На жаль, виробника “" +
  //       randomData +
  //       "“ не знайдено в нашій базі.\nЩоб додати виробника - зв`яжіться із службою підтримки"
  //   );
  //   await expect(AdvertPage.symbolsCounter).toHaveText(
  //     randomData.length.toString() + " / 100"
  //   );
  //   await expect(AdvertPage.producerSearchDropdownElement).not.toBeDisplayed();
  //   await MainPage.clickOnUserIconDropdown();
  //   await MainPage.clickOnLogoutButton();
  // });
  // it("C299- Verify model name input field", async () => {
  //   await MainPage.open();

  //   await MainPage.clickOnLoginButton();
  //   await expect(LoginPage.authorizationFormTitle).toHaveText("Вхід");
  //   await LoginPage.enterEmailInEmailOrPhoneNumberField(validEmail);
  //   await LoginPage.enterPasswordInPasswordField(validPassword);
  //   await LoginPage.clickOnEnterButton();
  //   await expect(MainPage.logo).toBeExisting();
  //   await MainPage.clickOnsubmitAdvertButton();
  //   await expect(AdvertPage.advertPageTitle).toHaveText("Створити оголошення");
  //   await expect(AdvertPage.modelNameLabel).toHaveText("Назва моделі");
  //   await expect(AdvertPage.modelNameField).toHaveAttribute(
  //     "placeholder",
  //     "Введіть назву моделі"
  //   );
  //   await AdvertPage.enterDataInModelNameField("1234567890123456");
  //   await expect(AdvertPage.modelNameErrorMessage).toBeDisplayed();
  //   await AdvertPage.enterDataInModelNameField("12345678 90123456");
  //   await expect(AdvertPage.modelNameErrorMessage).toBeDisplayed();
  //   await AdvertPage.enterDataInModelNameField("1234567890123456 ");
  //   await expect(AdvertPage.modelNameErrorMessage).toBeDisplayed();
  //   await expect(await AdvertPage.verifyModelNameBorderIsRed()).toEqual(true);
  //   await MainPage.clickOnUserIconDropdown();
  //   await MainPage.clickOnLogoutButton();
  // });
  // it("C317- Verify technical characteristics section", async () => {
  //   await MainPage.open();

  //   await MainPage.clickOnLoginButton();
  //   await expect(LoginPage.authorizationFormTitle).toHaveText("Вхід");
  //   await LoginPage.enterEmailInEmailOrPhoneNumberField(validEmail);
  //   await LoginPage.enterPasswordInPasswordField(validPassword);
  //   await LoginPage.clickOnEnterButton();
  //   await expect(MainPage.logo).toBeExisting();
  //   await MainPage.clickOnsubmitAdvertButton();
  //   await expect(AdvertPage.advertPageTitle).toHaveText("Створити оголошення");
  //   await expect(AdvertPage.technicalCharacteristicsField).toBeExisting;
  //   await expect(AdvertPage.technicalCharacteristicsField).toHaveText("")
  //   await expect(AdvertPage.technicalCharacteristicsField).toBeClickable()
  //   await AdvertPage.enterDataInTechnicalCharacteristicsField("<>{};");
  //   await expect(AdvertPage.technicalCharacteristicsField).toHaveText("");
  //   await AdvertPage.enterDataInTechnicalCharacteristicsField(
  //     "a7g3d9z8q4p2n6b1s5r0h8j3x7k9l4t2w0y6e5v1m8c7f3u2q9o4a5z1j8r6b0d2p3x7n9hjbdfubcjhdbfs4k1w8h5y0m3t6v2g1l7e8o9c5b4j3r2f0z1q8p6n3s7k4d2y9h1t5m8j3v0o6g4w7x1q2b8n5d0p9c3t4s2f1h6j7l8k0v9m4g3e5z1r2x8p6j9b0y4t7w3h1n5q2k8f6l9o0a3d4g7m1s5j2e8p9b6x0w3y4r1q7t5v8c2n9k3l0h4a1z7f2m8s5b9g1r6d0j3q8t2x4e7k1w9l3p5n0j8y6v1z2h7f4g3q5r9b0a8m1t2x6s4k3p7n5j0l8d1c2v9h6w4e7r3j8y5b1g9s0m3n4k2q8p1t5l7x6a9f2w0j3d5r8k1s4m7v9c0g6q2j5b8n4h1p3z7x0d9l2w5s8k1m6e3f9g7a2t0h4j5q1r8y3n9l6c2d0s5b8x7p1k4g3v9j2f8y0w1t6m5h4z3k9r2q0s8p1n7j5v6d2l4g0c8h1x3w9r5f7k2j4m0q6s1b9y8t5n3g2l7p0e4x1j6k8h3q5d9f2w7m4t1z8b0n5s2r6v3k9j1g4x8y2p5l7t0h1n3f9q2w6r8j5d4m0b1k7g3y9t2z8v4x1s6p5j0h3n7l2q8f1r4w9d6m5s3k1g0v8b2t7p6j4y3h9c1n0x5k2w8f7g3m1q4s2d9v0r8t5l6h1y3n2j7w4b9p5g0k3f8s1t6j2r4q9x8l5m0d3n7w1g4h2p8v9f1k6s0j2q5l3t8x4b7d9m1r6n2c5g0v4h8y3t1w7k5s9j2f0m8p6l4r1q7b3t2x9d5n8v0k4h6g1j7w2r3s9y5c0q1x2p8f6l3n4m7d5t9k1g2b0r8j4y6w5h3s2t7l9q0m1f8g4x2n5p7j3r8k6v1y0t9s4b3d2l7j1k8m0q5w6g9f2n3r4t1y8h5s0b7d2p1v6j9k3x5m4q0c2n8g7h1w4r9t6y3l2b5s0j8k9x1g4m7d2v3n6t5p8h0r1j2l9q4y7b3k8g5s0f6n1j3t2w9v4x7m5r8d1h2p0k6l3q9y5b4n1j8t7g2v0s3w6f1r8k4d5m9q2h7l3x1y0p9j5c6b4g8k1w2n3d0r5m7s9h4j8v6t1x0q2b3y5p9g4k1n8d7r6f3m2h0l9j5w1s8q4t7b6x0n3k5y9g2m8j4p1d0q6f3r2l7v9s1h8t5b3n0k4j2g6x1p8m5w3d9s7t4y2q0l1r8h6k3v2n5b1g7m9t4s0x8j3q5w1f6d2p7n4r9h8k5m0y1g3j2b4t6x9q5s1n8l7v0r2d3j6m5k9w8y1h4b7g2t3p0q1n5j6v8x4s7k9c2r3y0m1t5w6h9j2d8l3p0g4f1s7n2k8q9b5m0j1t3d4y2r6h8l5x7w9s3n1g2q0f4b8k7v5j3m6t1y9l2h4d8r5s0k3q7p1x9j5g6w2n4m8f1t3b0r2y5h6j4v8l7x1p9d0s3g2k5q1f4m7n8t6h9j3r2w0b1j5v4l2d6x8p3g7s1k9y0n5t2q8f4m1w3j6b9r0h5s2v7d1k3y4p8j9n2l5x6q0g1t7m4r8b2h9f3w5y1k6l0s4d2v8p3x7g1j5r9t0n2b6k3m7q4h1d8j5l2s9f6g0y4r7t8p1x3w9k2b5j0n6g4m1f8d3q2r7h9t5v0s1l8k6b2p9x4g3n0y7m1d8j5q4k6v3l9s2t7f8p0h1r5x2n3j9g4w8d6m1b5s2y0k3l8t7q6r4p1v9j2g0h5f1x8w3b2n4k7m9t0l8r1d3q5s2j6g7y9v1k0b4n8p5w3m1f2h7q9j4d0t8k6l3x5r2g9s1p0n4b7m2v3y8j6k5d1q0t7h9g8s4p3xhhbhbjbjhbhjbkghvghvgfvfgcfcfdcfghvjhbjbhibuyvftgrcdcftygvhbgyvdcvfygbhugvyfctdfvygbhnbugyvftrdtcfvygbhunjmnihubgyvfcrdrtvygbuhnjmnibuygvfctdrxtfyvgubhnj1j6l2w5y4n0r8k1t9m5b2h3q6f4d7x0g1p8j3s9v2l7r5n4y0k2q1m3d8t9h6g5f4j7s2b1w0n9r3k8m5y1t6j4p7x0v2d3h1l8k9q5g4s6m2r0t7b3n1j8f2p4l9d0v5x6y1k2g8m3r9w5h4j7t0s1q6l2p8f9j5d4k3b0g1n7m2r8x6t5q3w1l9p0j7d4h2k8s5n1m3v6g0b8f9y2bbbbnnnnnnnnnhhhhhgvygvygvygvygvyga7g3d9z8q4p2n6b1s5r0h8j3x7k9l4t2w0y6e5v1m8c7f3u2q9o4a5z1j8r6b0d2p3x7n9s4k1w8h5y0m3t6v2g1l7e8o9c5b4j3r2f0z1q8p6n3s7k4d2y9h1t5m8j3v0o6g4w7x1q2b8n5d0p9c3t4s2f1h6j7l8k0v9m4g3e5z1r2x8p6j9b0y4t7w3h1n5q2k8f6l9o0a3d4g7m1s5j2e8p9b6x0w3y4r1q7t5v8c2n9k3l0h4a1z7f2m8s5b9g1r6d0j3q8t2x4e7k1w9l3p5n0j8y6v1z2h7f4g3q5r9b0a8m1t2x6s4k3p7n5j0l8d1c2v9h6w4e7r3j8y5b1g9s0m3n4k2q8p1t5l7x6a9f2w0j3d5r8k1s4m7v9c0g6q2j5b8n4h1p3z7x0d9l2w5s8k1m6e3f9g7a2t0h4j5q1r8y3n9l6c2d0s5b8x7p1k4g3v9j2f8y0w1t6m5h4z3k9r2q0s8p1n7j5v6d2l4g0c8h1x3w9r5f7k2j4m0q6s1b9y8t5n3g2l7p0e4x1j6k8h3q5d9f2w7m4t1z8b0n5s2r6v3k9j1g4x8y2p5l7t0h1n3f9q2w6r8j5d4m0b1k7g3y9t2z8v4x1s6p5j0h3n7l2q8f1r4w9d6m5s3k1g0v8b2t7p6j4y3h9c1n0x5k2w8f7g3m1q4s2d9v0r8t5l6h1y3n2j7w4b9p5g0k3f8s1t6j2r4q9x8l5m0d3n7w1g4h2p8v9f1k6s0j2q5l3t8x4b7d9m1r6n2c5g0v4h8y3t1w7k5s9j2f0m8p6l4r1q7b3t2x9d5n8v0k4h6g1j7w2r3s9y5c0q1x2p8f6l3n4m7d5t9k1g2b0r8j4y6w5h3s2t7l9q0m1f8g4x2n5p7j3r8k6v1y0t9s4b3d2l7j1k8m0q5w6g9f2n3r4t1y8h5s0b7d2p1v6j9k3x5m4q0c2n8g7h1w4r9t6y3l2b5s0j8k9x1g4m7d2v3n6t5p8h0r1j2l9q4y7b3k8g5s0f6n1j3t2w9v4x7m5r8d1h2p0k6l3q9y5b4n1j8t7g2v0s3w6f1r8k4d5m9q2h7l3x1y0p9j5c6b4g8k1w2n3d0r5m7s9h4j8v6t1x0q2b3y5p9g4k1n8d7r6f3m2h0l9j5w1s8q4t7b6x0n3k5y9g2m8j4p1d0q6f3r2l7v9s1h8t5b3n0k4j2g6x1p8m5w3d9s7t4y2q0l1r8h6k3v2n5b1g7m9t4s0x8j3q5w1f6d2p7n4r9h8k5m0y1g3j2b4t6x9q5s1n8l7v0r2d3j6m5k9w8y1h4b7g2t3p0q1n5j6v8x4s7k9c2r3y0m1t5w6h9j2d8l3p0g4f1s7n2k8q9b5m0j1t3d4y2r6h8l5x7w9s3n1g2q0f4b8k7v5j3m6t1y9l2h4d8r5s0k3q7p1x9j5g6w2n4m8f1t3b0r2y5h6j4v8l7x1p9d0s3g2k5q1f4m7n8t6h9j3r2w0b1j5v4l2d6x8p3g7s1k9y0n5t2q8f4m1w3j6b9r0h5s2v7d1k3y4p8j9n2l5x6q0g1t7m4r8b2h9f3w5y1k6l0s4d2v8p3x7g1j5r9t0n2b6k3m7q4h1d8j5l2s9f6g0y4r7t8p1x3w9k2b5j0n6g4m1f8d3q2r7h9t5v0s1l8k6b2p9x4g3n0y7m1d8j5q4k6v3l9s2t7f8p0h1r5x2n3j9g4w8d6m1b5s2y0k3l8t7q6r4p1v9j2g0h5f1x8w3b2n4k7m9t0l8r1d3q5s2j6g7y9v1k0b4n8p5w3m1f2h7q9j4d0t8k6l3x5r2g9s1p0n4b7m2v3y8j6k5d1q0t7h9g8s4p3xhhbhbjbjhbhjbkghvghvgfvfgcfcfdcfghvjhbjbhibuyvftgrcdcftygvhbgyvdcvfygbhugvyfctdfvygbhnbugyvftrdtcfvygbhunjmnihubgyvfcrdrtvygbuhnjmnibuygvfctdrxtfyvgubhnj1j6l2w5y4n0r8k1t9m5b2h3q6f4d7x0g1p8j3s9v2l7r5n4y0k2q1m3d8t9h6g5f4j7s2b1w0n9r3k8m5y1t6j4p7x0v2d3h1l8k9q5g4s6m2r0t7b3n1j8f2p4l9d0v5x6y1k2g8m3r9w5h4j7t0s1q6l2p8f9j5d4k3b0g1n7m2r8x6t5q3w1l9p0j7d4h2k8s5n1m3v6g0b8f9y2bbbbnnnnnnnnnhhhhhgvygvygvygvygvyga7g3d9z8q4p2n6b1s5r0h8j3x7k9l4t2w0y6e5v1m8c7f3u2q9o4a5z1j8r6b0d2p3x7n9s4k1w8h5y0m3t6v2g1l7e8o9c5b4j3r2f0z1q8p6n3s7k4d2y9h1t5m8j3v0o6g4w7x1q2b8n5d0p9c3t4s2f1h6j7l8k0v9m4g3e5z1r2x8p6j9b0y4t7w3h1n5q2k8f6l9o0a3d4g7m1s5j2e8p9b6x0w3y4r1q7t5v8c2n9k3l0h4a1z7f2m8s5b9g1r6d0j3q8t2x4e7k1w9l3p5n0j8y6v1z2h7f4g3q5r9b0a8m1t2x6s4k3p7n5j0l8d1c2v9h6w4e7r3j8y5b1g9s0m3n4k2q8p1t5l7x6a9f2w0j3d5r8k1s4m7v9c0g6q2j5b8n4h1p3z7x0d9l2w5s8k1m6e3f9g7a2t0h4j5q1r8y3n9l6c2d0s5b8x7p1k4g3v9j2f8y0w1t6m5h4z3k9r2q0s8p1n7j5v6d2l4g0c8h1x3w9r5f7k2j4m0q6s1b9y8t5n3g2l7p0e4x1j6k8h3q5d9f2w7m4t1z8b0n5s2r6v3k9j1g4x8y2p5l7t0h1n3f9q2w6r8j5d4m0b1k7g3y9t2z8v4x1s6p5j0h3n7l2q8f1r4w9d6m5s3k1g0v8b2t7p6j4y3h9c1n0x5k2w8f7g3m1q4s2d9v0r8t5l6h1y3n2j7w4b9p5g0k3f8s1t6j2r4q9x8l5m0d3n7w1g4h2p8v9f1k6s0j2q5l3t8x4b7d9m1r6n2c5g0v4h8y3t1w7k5s9j2f0m8p6l4r1q7b3t2x9d5n8v0k4h6g1j7w2r3s9y5c0q1x2p8f6l3n4m7d5t9k1g2b0r8j4y6w5h3s2t7l9q0m1f8g4x2n5p7j3r8k6v1y0t9s4b3d2l7j1k8m0q5w6g9f2n3r4t1y8h5s0b7d2p1v6j9k3x5m4q0c2n8g7h1w4r9t6y3l2b5s0j8k9x1g4m7d2v3n6t5p8h0r1j2l9q4y7b3k8g5s0f6n1j3t2w9v4x7m5r8d1h2p0k6l3q9y5b4n1j8t7g2v0s3w6f1r8k4d5m9q2h7l3x1y0p9j5c6b4g8k1w2n3d0r5m7s9h4j8v6t1x0q2b3y5p9g4k1n8d7r6f3m2h0l9j5w1s8q4t7b6x0n3k5y9g2m8j4p1d0q6f3r2l7v9s1h8t5b3n0k4j2g6x1p8m5w3d9s7t4y2q0l1r8h6k3v2n5b1g7m9t4s0x8j3q5w1f6d2p7n4r9h8k5m0y1g3j2b4t6x9q5s1n8l7v0r2d3j6m5k9w8y1h4b7g2t3p0q1n5j6v8x4s7k9c2r3y0m1t5w6h9j2d8l3p0g4f1s7n2k8q9b5m0j1t3d4y2r6h8l5x7w9s3n1g2q0f4b8k7v5j3m6t1y9l2h4d8r5s0k3q7p1x9j5g6w2n4m8f1t3b0r2y5h6j4v8l7x1p9d0s3g2k5q1f4m7n8t6h9j3r2w0b1j5v4l2d6x8p3g7s1k9y0n5t2q8f4m1w3j6b9r0h5s2v7d1k3y4p8j9n2l5x6q0g1t7m4r8b2h9f3w5y1k6l0s4d2v8p3x7g1j5r9t0n2b6k3m7q4h1d8j5l2s9f6g0y4r7t8p1x3w9k2b5j0n6g4m1f8d3q2r7h9t5v0s1l8k6b2p9x4g3n0y7m1d8j5q4k6v3l9s2t7f8p0h1r5x2n3j9g4w8d6m1b5s2y0k3l8t7q6r4p1v9j2g0h5f1x8w3b2n4k7m9t0l8r1d3q5s2j6g7y9v1k0b4n8p5w3m1f2h7q9j4d0t8k6l3x5r2g9s1p0n4b7m2v3y8j6k5d1q0t7h9g8s4p3xhhbhbjbjhbhjbkghvghvgfvfgcfcfdcfghvjhbjbhibuyvftgrcdcftygvhbgyvdcvfygbhugvyfctdfvygbhnbugyvftrdtcfvygbhunjmnihubgyvfcrdrtvygbuhnjmnibuygvfctdrxtfyvgubhnj1j6l2w5y4n0r8k1t9m5b2h3q6f4d7x0g1p8j3s9v2l7r5n4y0k2q1m3d8t9h6g5f4j7s2b1w0n9r3k8m5y1t6j4p7x0v2d3h1l8k9q5g4s6m2r0t7b3n1j8f2p4l9d0v5x6y1k2g8m3r9w5h4j7t0s1q6l2p8f9j5d4k3b0g1n7m2r8x6t5q3w1l9p0j7d4h2k8s5n1m3v6g0b8f9y2bbbbnnnnnnnnnhhhhhgvygvygvygvygvyga7g3d9z8q4p2n6b1s5r0h8j3x7k9l4t2w0y6e5v1m8c7f3u2q9o4a5z1j8r6b0d2p3x7n9s4k1w8h5y0m3t6v2g1l7e8o9c5b4j3r2f0z1q8p6n3s7k4d2y9h1t5m8j3v0o6g4w7x1q2b8n5d0p9c3t4s2f1h6j7l8k0v9m4g3e5z1r2x8p6j9b0y4t7w3h1n5q2k8f6l9o0a3d4g7m1s5j2e8p9b6x0w3y4r1q7t5v8c2n9k3l0h4a1z7f2m8s5b9g1r6d0j3q8t2x4e7k1w9l3p5n0j8y6v1z2h7f4g3q5r9b0a8m1t2x6s4k3p7n5j0l8d1c2v9h6w4e7r3j8y5b1g9s0m3n4k2q8p1t5l7x6a9f2w0j3d5r8k1s4m7v9c0g6q2j5b8n4h1p3z7x0d9l2w5s8k1m6e3f9g7a2t0h4j5q1r8y3n9l6c2d0s5b8x7p1k4g3v9j2f8y0w1t6m5h4z3k9r2q0s8p1n7j5v6d2l4g0c8h1x3w9r5f7k2j4m0q6s1b9y8t5n3g2l7p0e4x1j6k8h3q5d9f2w7m4t1z8b0n5s2r6v3k9j1g4x8y2p5l7t0h1n3f9q2w6r8j5d4m0b1k7g3y9t2z8v4x1s6p5j0h3n7l2q8f1r4w9d6m5s3k1g0v8b2t7p6j4y3h9c1n0x5k2w8f7g3m1q4s2d9v0r8t5l6h1y3n2j7w4b9p5g0k3f8s1t6j2r4q9x8l5m0d3n7w1g4h2p8v9f1k6s0j2q5l3t8x4b7d9m1r6n2c5g0v4h8y3t1w7k5s9j2f0m8p6l4r1q7b3t2x9d5n8v0k4h6g1j7w2r3s9y5c0q1x2p8f6l3n4m7d5t9k1g2b0r8j4y6w5h3s2t7l9q0m1f8g4x2n5p7j3r8k6v1y0t9s4b3d2l7j1k8m0q5w6g9f2n3r4t1y8h5s0b7d2p1v6j9k3x5m4q0c2n8g7h1w4r9t6y3l2b5s0j8k9x1g4m7d2v3n6t5p8h0r1j2l9q4y7b3k8g5s0f6n1j3t2w9v4x7m5r8d1h2p0k6l3q9y5b4n1j8t7g2v0s3w6f1r8k4d5m9q2h7l3x1y0p9j5c6b4g8k1w2n3d0r5m7s9h4j8v6t1x0q2b3y5p9g4k1n8d7r6f3m2h0l9j5w1s8q4t7b6x0n3k5y9g2m8j4p1d0q6f3r2l7v9s1h8t5b3n0k4j2g6x1p8m5w3d9s7t4y2q0l1r8h6k3v2n5b1g7m9t4s0x8j3q5w1f6d2p7n4r9h8k5m0y1g3j2b4t6x9q5s1n8l7v0r2d3j6m5k9w8y1h4b7g2t3p0q1n5j6v8x4s7k9c2r3y0m1t5w6h9j2d8l3p0g4f1s7n2k8q9b5m0j1t3d4y2r6h8l5x7w9s3n1g2q0f4b8k7v5j3m6t1y9l2h4d8r5s0k3q7p1x9j5g6w2n4m8f1t3b0r2y5h6j4v8l7x1p9d0s3g2k5q1f4m7n8t6h9j3r2w0b1j5v4l2d6x8p3g7s1k9y0n5t2q8f4m1w3j6b9r0h5s2v7d1k3y4p8j9n2l5x6q0g1t7m4r8b2h9f3w5y1k6l0s4d2v8p3x7g1j5r9t0n2b6k3m7q4h1d8j5l2s9f6g0y4r7t8p1x3w9k2b5j0n6g4m1f8d3q2r7h9t5v0s1l8k6b2p9x4g3n0y7m1d8j5q4k6v3l9s2t7f8p0h1r5x2n3j9g4w8d6m1b5s2y0k3l8t7q6r4p1v9j2g0h5f1x8w3b2n4k7m9t0l8r1d3q5s2j6g7y9v1k0b4n8p5w3m1f2h7q9j4d0t8k6l3x5r2g9s1p0n4b7m2v3y8j6k5d1q0t7h9g8s4p3xhhbhbjbjhbhjbkghvghvgfvfgcfcfdcfghvjhbjbhibuyvftgrcdcftygvhbgyvdcvfygbhugvyfctdfvygbhnbugyvftrdtcfvygbhunjmnihubgyvfcrdrtvygbuhnjmnibuygvfctdrxtfyvgubhnj1j6l2w5y4n0r8k1t9m5b2h3q6f4d7x0g1p8j3s9v2l7r5n4y0k2q1m3d8t9h6g5f4j7s2b1w0n9r3k8m5y1t6j4p7x0v2d3h1l8k9q5g4s6m2r0t7b3n1j8f2p4l9d0v5x6y1k2g8m3r9w5h4j7t0s1q6l2p8f9j5d4k3b0g1n7m2r8x6t5q3w1l9p0j7d4h2k8s5n1m3v6g0b8f9y2bbbbnnnnnnnnnhhhhhgvygvygvygvygvyga7g3d9z8q4p2n6b1s5r0h8j3x7k9l4t2w0y6e5v1m8c7f3u2q9o4a5z1j8r6b0d2p3x7n9s4k1w8h5y0m3t6v2g1l7e8o9c5b4j3r2f0z1q8p6n3s7k4"
  //   );
  //   let text =  await AdvertPage.technicalCharacteristicsField.getText()
  //   await expect(text.length).toEqual(9000)

  // });
});
