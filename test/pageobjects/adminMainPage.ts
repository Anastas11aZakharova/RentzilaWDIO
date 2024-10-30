import { $ } from "@wdio/globals";
import Page from "./page.js";

class AdminMainPage extends Page {
  public get adminMainPageTitle() {
    return $("h1=Site administration");
  }
  
  public get feedbacksCategory() {
    return $("a=Feedbacks");
  }

  public async clickOnFeedbacksCategory() {
    await this.feedbacksCategory.click();
  }
}

export default new AdminMainPage();
