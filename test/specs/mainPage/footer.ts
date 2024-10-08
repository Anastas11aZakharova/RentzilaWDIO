import { expect } from "@wdio/globals";
import axios from "axios";
import MainPage from "../../pageobjects/mainPage.ts";
import * as testData from "../../../data/testdata.json";
import AdminLoginPage from "../../pageobjects/adminLoginPage.ts";
import AdminMainPage from "../../pageobjects/adminMainPage.ts";
import AdminFeedbacksPage from "../../pageobjects/adminFeedbacksPage.ts";
import FeedbackItemPage from "../../pageobjects/feedbackItem.ts";
import * as dotenv from "dotenv";
dotenv.config();
const adminEmail = process.env.ADMIN_EMAIL || "default_email@example.com";
const adminPassword = process.env.ADMIN_PASSWORD || "default_password";
const validPhone = process.env.MY_PHONE || "default_phone";
const baseUrl = process.env.BASE_URL || "base_url";

describe("Rentzila", () => {
  it("C214 - Verify that all elements on the footer are displayed and all links are clickable", async () => {
    await MainPage.open();

    await expect(MainPage.logo).toBeExisting();
    await expect(MainPage.footerLogo).toBeExisting();
    await expect(MainPage.footerLogo).not.toBeClickable();
    await expect(MainPage.aboutUsLabel).toBeExisting();
    await expect(MainPage.aboutUsLabel).toHaveText("Про нас");
    await expect(MainPage.privacyPolicyLink).toBeExisting();
    await expect(MainPage.privacyPolicyLink).toHaveAttribute(
      "href",
      "/privacy-policy/"
    );
    await expect(MainPage.cookiePolicyLink).toBeExisting();
    await expect(MainPage.cookiePolicyLink).toHaveAttribute(
      "href",
      "/cookie-policy/"
    );
    await expect(MainPage.termsConditionsLink).toBeExisting();
    await expect(MainPage.termsConditionsLink).toHaveAttribute(
      "href",
      "/terms-conditions/"
    );
    await expect(MainPage.forBuyersLabel).toBeExisting();
    await expect(MainPage.forBuyersLabel).toHaveText("Користувачам");
    await expect(MainPage.productsLink).toBeExisting();
    await expect(MainPage.productsLink).toHaveAttribute("href", "/products/");
    await expect(MainPage.tendersLink).toBeExisting();
    await expect(MainPage.tendersLink).toHaveAttribute("href", "/tenders-map/");
    await expect(MainPage.requestsLink).toBeExisting();
    await expect(MainPage.requestsLink).toHaveAttribute(
      "href",
      "/requests-map/"
    );
    await expect(MainPage.contactsLabel).toBeExisting();
    await expect(MainPage.contactsLabel).toHaveText("Контакти");
    await expect(MainPage.emailLink).toBeExisting();
    await expect(MainPage.emailLink).toHaveAttribute(
      "href",
      "mailto:info@rentzila.com.ua"
    );
  });

  it('C226 -"У Вас залишилися питання?" form', async () => {
    await MainPage.open();

    await expect(MainPage.logo).toBeExisting();
    await MainPage.clickOnTelegramCrossButton();
    await expect(MainPage.orderConsultationButton).toBeExisting();
    await MainPage.clickOnOrderConsultationButton();
    await MainPage.verifyErrorMessagesDisplayed();
    let validPhoneNumber = validPhone;
    await MainPage.enterPhoneNumber(validPhoneNumber);
    await MainPage.clickOnOrderConsultationButton();
    await expect(MainPage.errorMessages[0]).toBeExisting();
    await expect(MainPage.errorMessages[0]).toHaveText(
      "Поле не може бути порожнім"
    );
    let validName = testData.validInputs.name;
    await MainPage.enterName(validName);
    await MainPage.enterPhoneNumber(testData.invalidInputs.phoneShort);
    await expect(MainPage.errorMessages[0]).toBeExisting();
    await expect(MainPage.errorMessages[0]).toHaveText(
      "Телефон не пройшов валідацію"
    );
    await MainPage.enterName(validName);
    await MainPage.enterPhoneNumber(testData.invalidInputs.phoneOnesOnly);
    await expect(MainPage.errorMessages[0]).toBeExisting();
    await expect(MainPage.errorMessages[0]).toHaveText(
      "Телефон не пройшов валідацію"
    );
    await MainPage.enterPhoneNumber(validPhoneNumber);
    await MainPage.clickOnOrderConsultationButton();
    const currentDate: Date = new Date();
    // await MainPage.clickOkInDialogPopUp();
    await AdminLoginPage.open();
    await expect(AdminLoginPage.adminLoginPageHeader).toHaveText(
      "Django administration"
    );
    await expect(AdminLoginPage.emailField).toBeExisting();
    await AdminLoginPage.enterEmailInEmailField("test@test.test");
    await expect(AdminLoginPage.passwordField).toBeExisting();
    await AdminLoginPage.enterPasswordInPasswordlField("admin");
    await expect(AdminLoginPage.logInButton).toBeExisting();
    await AdminLoginPage.clickOnLogInButton();
    await expect(AdminMainPage.adminMainPageTitle).toHaveText(
      "Site administration"
    );
    await expect(AdminMainPage.feedbacksCategory).toHaveText("Feedbacks");
    await AdminMainPage.clickOnFeedbacksCategory();
    await expect(AdminFeedbacksPage.adminFeedbacksPageTitle).toHaveText(
      "Select Feedback to change"
    );
    await AdminFeedbacksPage.clickOnFeedbackLink();
    await expect(FeedbackItemPage.feedbackItemPageTitle).toHaveText(
      "Change Feedback"
    );
    await expect(
      await FeedbackItemPage.nameField.getAttribute("value")
    ).toEqual(validName);
    await expect(
      await FeedbackItemPage.phoneField.getAttribute("value")
    ).toEqual(validPhoneNumber);

    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
      timeZone: "Europe/Kyiv",
    };

    let formattedDate = new Intl.DateTimeFormat("en-US", options)
      .format(currentDate)
      .replace(/([A-Za-z]+)\s/, "$1. ")
      .replace("AM", "a.m.")
      .replace("PM", "p.m.");

    await expect(await FeedbackItemPage.createdDateField.getText()).toEqual(
      formattedDate
    );

    const bodyParameters = {
      email: adminEmail,
      password: adminPassword
    };
    let response = await axios.post(
      baseUrl + "api/auth/jwt/create/",
      bodyParameters
    );
    let token = response.data.access;

    const config = {
      headers: { Authorization: `Bearer ` + token },
    };
    response = await axios.get(baseUrl + "api/backcall/", config);

    const records = response.data;
    let isFound = false;

    records.forEach((record: { name: string; phone: string }) => {
      if (record.name === validName && record.phone === validPhoneNumber) {
        isFound = true;
      }
    });
    await expect(isFound).toEqual(true);
  });
});
