/* eslint-disable jest/valid-expect */
/* eslint-disable no-unused-expressions */
/* eslint-disable jest/expect-expect */
/// <reference types="cypress" />

describe("Login", () => {
  beforeEach(() => {
    cy.visit("/innskra");
  });

  it("new user should reach Register page", () => {
    cy.doLogin("+3541111113");
    cy.location("pathname", { timeout: 15000 }).should("eq", "/nyskra");

    cy.get("[data-test=RegistrationHeading]").should("exist");
  });

  it("existing user should login", () => {
    cy.doLogin("+354952489");
    cy.location("pathname", { timeout: 10000 }).should("eq", "/profill");
  });

  it("new user should be able to fully register", () => {
    cy.doRegistration();
  });
});
