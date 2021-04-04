import formdetails from '../fixtures/formdetails.json'

class APIInteractions {

  visit() {
    cy.visit(formdetails.Section2HTMLPage)
  }


  clickNetworkCallButton() {
    const button = cy.get(formdetails.NetworkCallButton)
    button.click()
  }

  clickNewTabButton() {
    const button = cy.get(formdetails.NewTabButton)
    button.click()
  }

  clickFileDownloadButton() {
    const button = cy.get(formdetails.FileDownloadButton)
    button.click()

  }

}
const apiObj = new APIInteractions()
export default apiObj