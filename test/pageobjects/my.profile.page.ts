import { $ } from "@wdio/globals";
import Page from "./page.js";

class MyProfilePage extends Page {

  public get phoneNumberField() {
    return $('input[id="mobile"]');
  }
  

//   public async verifyServiceIsVisible(serviceName: string) {
//     await expect(this.servicesList.$('div='+serviceName)).toBeExisting()
//   }

}

export default new MyProfilePage();
