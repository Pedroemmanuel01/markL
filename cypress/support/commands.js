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
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
import pageElements from "../support/pageElements";

Cypress.Commands.add("createTask", (taskName = "") => {
  cy.visit("/");
  if (taskName != "") {
    cy.get(pageElements.input_task).type(taskName);
  }
  cy.contains("button", "Create").click();
});

Cypress.Commands.add("deleteTask", (task) => {
  cy.request({
    url: Cypress.env("apiUrl") + "/helper/tasks",
    method: "DELETE",
    body: { name: task },
  }).then((response) => {
    expect(response.status).to.eq(204);
  });
});

Cypress.Commands.add("postTask", (task) => {
  cy.request({
    url: Cypress.env("apiUrl") + "/tasks",
    method: "POST",
    body: task,
  }).then((response) => {
    expect(response.status).to.eq(201);
  });
});
