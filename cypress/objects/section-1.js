import formdetails from '../fixtures/formdetails.json'

class DomInteractions {

  visit() {
    cy.visit(formdetails.Section1HTMLPage)
  }

  fillName(Value) {
    const field = cy.get(formdetails.nameelement)
    field.clear()
    field.type(Value)
    return this

  }

  fillAge(Value) {
    const field = cy.get(formdetails.ageelement)
    field.clear()
    field.type(Value)
    return this

  }

  fillGender(Value) {
    const field = cy.get(formdetails.genderelement)
    field.select(Value)
    return this

  }

  fillNurse() {
    const field = cy.get(formdetails.nurseelement)
    field.check()


  }

  clickShowForm() {
    const button = cy.get(formdetails.ShowFormButton)
    button.click()
  }

  clickShowTable() {
    const button = cy.get(formdetails.ShowTableButton)
    button.click()
  }

  clickSubmit() {
    const button = cy.get(formdetails.SubmitButton)
    button.click()

  }

}
const domObj = new DomInteractions()
export default domObj