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

  cy.get("[data-test=VerificationCodeInput]").should("exist");
  cy.getFirebaseVerificationCode().then((code) => {
    cy.get("[data-test=VerificationCodeInput]").type(code);
  });
  // eslint-disable-next-line cypress/no-unnecessary-waiting
  cy.get("[data-test=VerificationCodeButton]").click();
  cy.window().its("sessionStorage").invoke("getItem", "userId").should("exist");
});
