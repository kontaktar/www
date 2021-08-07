/* eslint-disable jest/expect-expect */
/// <reference types="cypress" />

// Test user. +3541111111
// firebaseToken: eyJhbGciOiJub25lIiwidHlwIjoiSldUIn0.eyJwaG9uZV9udW1iZXIiOiIrMzU0MTExMTExMSIsImF1dGhfdGltZSI6MTYyODM1MjA2MCwidXNlcl9pZCI6ImxmNldVVHpWbFpWTnlSRjk5aVpXUXFUODEybXUiLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7InBob25lIjpbIiszNTQxMTExMTExIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGhvbmUifSwiaWF0IjoxNjI4MzUyMDYwLCJleHAiOjE2MjgzNTU2NjAsImF1ZCI6ImtvbnRha3Rhci1pcyIsImlzcyI6Imh0dHBzOi8vc2VjdXJldG9rZW4uZ29vZ2xlLmNvbS9rb250YWt0YXItaXMiLCJzdWIiOiJsZjZXVVR6VmxaVk55UkY5OWlaV1FxVDgxMm11In0;

describe("Login", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/innskra");
    cy.doLogin("+3541111111");
    cy.location("pathname", { timeout: 10000 }).should("eq", "/profill");
  });

  it("add a new experience", () => {
    cy.get("[data-test=addNewExperienceButton]", { timeout: 10000 })
      .should("exist")
      .should("be.visible");
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(3000);
    cy.get("[data-test=addNewExperienceButton]").click();

    // Modal opens
    cy.get("[data-test=titleInput]", { timeout: 10000 })
      .should("exist")
      .should("be.visible");
    cy.get("[data-test=titleInput]").type("Title");
    cy.get("[data-test=monthsSelect]").select("1");
    cy.get("[data-test=yearsSelect]").select("2");
    cy.get("[data-test=descriptionTextArea]").type("Desc");

    cy.get("[data-test=saveUserInfoButton]").click();

    // Modal closes, verify the content of the card
    cy.get("[data-test=publishStatus-Card0]")
      .should("exist")
      .should("be.visible");
    cy.get("[data-test=publishStatus-Card0]").should("have.text", "Í geymslu");
    cy.get("[data-test=experienceTitle-Card0]").should("have.text", "Title");
    cy.get("[data-test=experienceDescription-Card0]").should(
      "have.text",
      "Desc"
    );
    cy.get("[data-test=experienceYears-Card0]").should("include.text", "2");
    cy.get("[data-test=experienceMonths-Card0]").should("include.text", "1");

    // Open modal, change publish status
    cy.get("[data-test=experienceEditButton-Card0]").should("exist").click();
    cy.get("[data-test=titleInput]", { timeout: 10000 })
      .should("be.visible")
      .should("have.value", "Title");

    cy.get("[data-test=publishCheckbox]").click();
    cy.get("[data-test=titleInput]").clear().type("Updated title");
    cy.get("[data-test=monthsSelect]").select("11");
    cy.get("[data-test=yearsSelect]").select("1");
    cy.get("[data-test=descriptionTextArea]").clear().type("Updated desc");
    cy.get("[data-test=saveUserInfoButton]").click();
    cy.get("[data-test=closeDialogButton]").click();

    cy.get("[data-test=publishStatus-Card0]")
      .should("exist")
      .should("be.visible");
    cy.get("[data-test=publishStatus-Card0]", { timeout: 10000 }).should(
      "have.text",
      "Í birtingu"
    );
    cy.get("[data-test=experienceTitle-Card0]").should(
      "have.text",
      "Updated title"
    );
    cy.get("[data-test=experienceDescription-Card0]").should(
      "have.text",
      "Updated desc"
    );
    cy.get("[data-test=experienceYears-Card0]").should("include.text", "1");
    cy.get("[data-test=experienceMonths-Card0]").should("include.text", "11");

    //
    cy.get("[data-test=experiencePublishToggleButton-Card0]").click();
    cy.get("[data-test=publishStatus-Card0]").should("have.text", "Í geymslu");
    cy.get("[data-test=experienceDeleteButton-Card0]").click();
  });

  //   it("new user should be able to fully register", () => {

  //   });
});
