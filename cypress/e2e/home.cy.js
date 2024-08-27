import pageElements from "../support/pageElements";

describe("Test Mark L", () => {
  let testData;
  before(() => {
    cy.fixture("tasks").then((t) => {
      testData = t;
    });
  });

  context("Register", () => {
    it("Verify if not possible add task null", () => {
      cy.createTask();
      cy.get(pageElements.input_task)
        .invoke("prop", "validationMessage")
        .should((text) => {
          expect("This is a required field").to.eq(text);
        });
    });

    it("Verify create task", () => {
      const taskName = "Ler um livro node.js";
      cy.deleteTask(taskName);
      cy.createTask(taskName);
      cy.contains(pageElements.task_item, taskName).should("be.visible");
    });

    it("Verify if not possible create task duplicate", () => {
      const task = testData.dup;
      cy.deleteTask(task.name);
      cy.postTask(task);
      cy.createTask(task.name);

      cy.get(pageElements.popup_task).contains("Task already exists!");
      cy.get(pageElements.button_ok).click();
    });
  });
  context("Update", () => {
    it("Verify finish task", () => {
      const task = testData.up;
      cy.deleteTask(task.name);
      cy.postTask(task);

      cy.visit("/");

      cy.contains("p", task.name)
        //Elemento pai
        .parent()
        //Elemento dentro do elemento pai
        .find(pageElements.finish_task)
        .click();

      cy.contains("p", task.name).should(
        "have.css",
        "text-decoration-line",
        "line-through"
      );
    });
  });
  context("Delete", () => {
    it("Verify if task is deleted", () => {
      const task = testData.del;

      cy.deleteTask(task.name);
      cy.postTask(task);

      cy.visit("/");

      cy.contains("p", task.name)
        //Elemento pai
        .parent()
        //Elemento dentro do elemento pai
        .find(pageElements.delete_task)
        .click();
      cy.contains("p", task.name).should("not.exist");
    });
  });
});
