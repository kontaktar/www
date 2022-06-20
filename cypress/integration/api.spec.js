/* eslint-disable jest/lowercase-name */
/* eslint-disable jest/valid-expect */
/* eslint-disable jest/expect-expect */
const baseUrl = "/api";
describe("Access", () => {
  beforeEach(() => {});

  it("GET: /api/user", () => {
    //   cy.request(method, url, body);
    cy.log("baseUrl", baseUrl);
    cy.request("GET", `${baseUrl}/user`).should((response) => {
      expect(response.status).to.eq(200);
      expect(response).property("body").to.have.property("isLoggedIn");
    });
  });

  it("GET: /api/users", () => {
    cy.request("GET", `${baseUrl}/users`).should((response) => {
      expect(response.status).to.eq(200);
      expect(response).property("body").to.be.a("array");
    });
  });

  it("POST: /api/user should fail, needs Authorization", () => {
    cy.request({
      method: "POST",
      url: `${baseUrl}/user`,
      failOnStatusCode: false,
      body: { abc: "123" }
    }).should((response) => {
      expect(response.status).to.eq(401);
      expect(response)
        .property("body")
        .to.have.property("message")
        .to.equal("Forbidden");
    });
  });
  it("POST: /api/user/session should fail, needs Authorization", () => {
    cy.request({
      method: "POST",
      url: `${baseUrl}/user/session`,
      failOnStatusCode: false,
      body: { abc: "123" }
    }).should((response) => {
      expect(response.status).to.eq(401);
      expect(response).property("body").to.have.property("message");
    });
  });
  it("PUT: /api/user/0 should fail, needs Authorization", () => {
    cy.request({
      method: "PUT",
      url: `${baseUrl}/user/0`,
      failOnStatusCode: false,
      body: { userName: "Test" }
    }).should((response) => {
      expect(response.status).to.eq(401);
      expect(response).property("body").to.have.property("message");
    });
  });
  it("PUT: /api/user/0/experiences/0 should fail, needs Authorization", () => {
    cy.request({
      method: "PUT",
      url: `${baseUrl}/user/0/experiences/0`,
      failOnStatusCode: false,
      body: { stuff: "Test" }
    }).should((response) => {
      expect(response.status).to.eq(401);
      expect(response)
        .property("body")
        .to.have.property("message")
        .to.equal("Forbidden");
    });
  });
  it("POST: /api/user/0/experiences should fail, needs Authorization", () => {
    cy.request({
      method: "POST",
      url: `${baseUrl}/user/0/experiences`,
      failOnStatusCode: false,
      body: { stuff: "Test" }
    }).should((response) => {
      expect(response.status).to.eq(401);
      expect(response)
        .property("body")
        .to.have.property("message")
        .to.equal("Forbidden");
    });
  });
  it("DELETE: /api/user/0 should fail, needs Authorization", () => {
    cy.request({
      method: "DELETE",
      url: `${baseUrl}/user/0`,
      failOnStatusCode: false,
      body: { stuff: "Test" }
    }).should((response) => {
      expect(response.status).to.eq(401);
      cy.log("DELETE response", response);
      expect(response)
        .property("body")
        .to.have.property("message")
        .to.equal("Forbidden");
    });
  });
  it("DELETE: /api/user/0/experiences/0 should fail, needs Authorization", () => {
    cy.request({
      method: "DELETE",
      url: `${baseUrl}/user/0/experiences/0`,
      failOnStatusCode: false,
      body: { stuff: "Test" }
    }).should((response) => {
      expect(response.status).to.eq(401);
      expect(response).property("body").to.have.property("message");
    });
  });

  //   cy.request({
  //     method: "POST",
  //     url: "https://myrAPI",
  //     failOnStatusCode: false,
  //     auth: {
  //       username: "user@user",
  //       password: "user123"
  //     },
  //     headers: {
  //       Authorization: "Basic dXNlckB1c2VyOnVzZXI=",
  //       "Content-Type": "text/plain"
  //     }
  //   });
});
