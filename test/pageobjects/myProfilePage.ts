import { $ } from "@wdio/globals";
import Page from "./page.js";

class MyProfilePage extends Page {

  public get phoneNumberField() {
    return $('input[id="mobile"]');
  }
}

export default new MyProfilePage();
