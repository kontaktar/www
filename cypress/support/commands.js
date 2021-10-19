/* eslint-disable no-unused-expressions */
/* eslint-disable jest/valid-expect */
// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
Cypress.Commands.add("getFirebaseVerificationCode", () => {
  cy.exec("cat firebase-debug.log | awk 'END {print $NF}' | grep -o '[0-9]'")
    .then((result) => {
      return result.stdout.replaceAll("\n", "").toString();
    })
    .should("have.length", 6)
    .should((value) => {
      expect(Number.isNaN(+value), "code should only contain numbers").to.eq(
        false
      );
    });
});

Cypress.Commands.add("doLogin", (phoneNumber) => {
  cy.get("[data-test=PhoneNumberLoginInput]").type(phoneNumber);
  cy.get("[data-test=PhoneNumberLoginButton]").click();

  cy.get("[data-test=verificationCodeInput]", { timeout: 10000 }).should(
    "exist"
  );
  // cy.getFirebaseVerificationCode().then((code) => {
  //   cy.get("[data-test=VerificationCodeInput]").type(code);
  // });
  cy.get("[data-test=VerificationCodeButton]")
    .should("exist")
    .should("be.visible");
  // eslint-disable-next-line cypress/no-unnecessary-waiting
  cy.wait(3000);
  cy.get("[data-test=VerificationCodeButton]").click();
  // cy.getCookie("userSession", { timeout: 10000 }).should("exist");
});

Cypress.Commands.add("doRegistration", () => {
  const randomNumber = Math.floor(100000 + Math.random() * 900000);
  cy.doLogin(`+666${randomNumber}`);
  cy.location("pathname", { timeout: 20000 }).should("eq", "/nyskra");
  cy.get("[data-test=FirstNameInput]").type("_TESTER");
  cy.get("[data-test=LastNameInput]").type("_TESTERSON");
  cy.get("[data-test=KennitalaInput]").type(`1234${randomNumber}`);
  cy.get("[data-test=UserNameInput]").type(`TESTER${randomNumber}`);
  cy.get("[data-test=EmailInput]").type(`TESTER${randomNumber}@test.is`);
  cy.get("[data-test=RegisterNewUserButton]").click();
  cy.location("pathname", { timeout: 10000 }).should("eq", "/profill");
});
