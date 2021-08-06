/* eslint-disable jest/expect-expect */
describe("Access", () => {
  //   beforeEach(() => {
  //     cy.visit("http://localhost:3000/innskra");
  //   });

  it("a guest should not be able to visit the registration", () => {
    cy.visit("http://localhost:3000/nyskra");
    cy.location("pathname", { timeout: 10000 }).should("eq", "/innskra");
  });
  it("a guest should not be able to visit a profile", () => {
    cy.visit("http://localhost:3000/nyskra");
    cy.location("pathname", { timeout: 10000 }).should("eq", "/innskra");
  });
});
