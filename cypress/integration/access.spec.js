/* eslint-disable jest/expect-expect */
describe("Access", () => {
  it("a guest should not be able to visit the registration", () => {
    cy.visit("/nyskra");
    cy.location("pathname", { timeout: 10000 }).should("eq", "/innskra");
  });
  it("a guest should not be able to visit a profile", () => {
    cy.visit("/nyskra");
    cy.location("pathname", { timeout: 10000 }).should("eq", "/innskra");
  });
});
