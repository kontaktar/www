/* eslint-disable jest/lowercase-name */
/* eslint-disable jest/valid-expect */
/* eslint-disable jest/expect-expect */
const baseUrl = "http://localhost:3000/api";
describe("Access", () => {
  beforeEach(() => {});

  it("GET: /api/user", () => {
    //   cy.request(method, url, body);
    cy.request("GET", `${baseUrl}/user`).should((response) => {
      expect(response.status).to.eq(200);
      expect(response).property("body").to.have.property("isLoggedIn");
    });
  });

  it("GET: /api/users/all-usernames", () => {
    cy.request("GET", `${baseUrl}/users/all-usernames`).should((response) => {
      expect(response.status).to.eq(200);
      expect(response).property("body").to.be.a("array");
    });
  });

  it("POST: /api/users should fail, needs Authorization", () => {
    cy.request({
      method: "POST",
      url: `${baseUrl}/users`,
      failOnStatusCode: false,
      body: { abc: "123" }
    }).should((response) => {
      expect(response.status).to.eq(401);
      expect(response)
        .property("body")
        .to.have.property("message")
        .to.equal("Missing Authorization header");
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
  it("PUT: /api/users/0 should fail, needs Authorization", () => {
    cy.request({
      method: "PUT",
      url: `${baseUrl}/users/0`,
      failOnStatusCode: false,
      body: { userName: "Test" }
    }).should((response) => {
      expect(response.status).to.eq(401);
      expect(response).property("body").to.have.property("message");
    });
  });
  it("PUT: /api/users/0/experiences/0 should fail, needs Authorization", () => {
    cy.request({
      method: "PUT",
      url: `${baseUrl}/users/0/experiences/0`,
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
  it("POST: /api/users/0/experiences should fail, needs Authorization", () => {
    cy.request({
      method: "POST",
      url: `${baseUrl}/users/0/experiences`,
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
  it("DELETE: /api/users/0 should fail, needs Authorization", () => {
    cy.request({
      method: "DELETE",
      url: `${baseUrl}/users/0`,
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
  it("DELETE: /api/users/0/experiences/0 should fail, needs Authorization", () => {
    cy.request({
      method: "DELETE",
      url: `${baseUrl}/users/0/experiences/0`,
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
