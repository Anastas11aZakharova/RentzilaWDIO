import { $ } from "@wdio/globals";
import Page from "./page.js";

class FeedbackItemPage extends Page {
  public get feedbackItemPageTitle() {
    return $("h1=Change Feedback");
  }
  public get nameField() {
    return $('input[name="name"]');
  }
  public get phoneField() {
    return $('input[name="phone"]');
  }
  public get createdDateField() {
    return $(
      "//div[@class='form-row field-created_date']//div[@class='readonly']"
    );
  }
}

export default new FeedbackItemPage();
