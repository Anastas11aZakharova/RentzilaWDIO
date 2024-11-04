import { $ } from "@wdio/globals";
import Page from "./page.js";

class AdminFeedbacksPage extends Page {
  public get adminFeedbacksPageTitle() {
    return $("h1=Select Feedback to change");
  }

  public get feedbackLink() {
    return $('//table[@id="result_list"]//a[1]');
  }
}

export default new AdminFeedbacksPage();
