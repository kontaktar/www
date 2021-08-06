/* eslint-disable jest/valid-expect */
/* eslint-disable no-unused-expressions */
/* eslint-disable jest/expect-expect */
/// <reference types="cypress" />

describe("example to-do app", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/innskra");
  });

  it("new user should reach Register page", () => {
    cy.doLogin("+3541231231");
    cy.location("pathname", { timeout: 10000 }).should("eq", "/nyskra");

    cy.get("[data-test=RegistrationHeading]").should("exist");
  });
  it("existing user should login", () => {
    cy.doLogin("+3541111111");

    cy.window()
      .its("sessionStorage")
      .invoke("getItem", "userId")
      .should("eq", "451");
    cy.location("pathname", { timeout: 10000 }).should("eq", "/profill");
  });
});
