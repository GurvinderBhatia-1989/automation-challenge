import apiObj from '../objects/section-2'
import formdetails from '../fixtures/formdetails.json'



describe('Problem 2', () => {

  // Visiting section-2.html page

  beforeEach(() => {
    apiObj.visit()
  })

  //Verifying API Calls

  it('API Payload Test', () => {

    // Validating alert window text & payload details

    apiObj.clickNetworkCallButton()

    cy.on('window:alert', (alertText) => {
      expect(alertText, 'Message in Alert Window').to.equal('Abnormally long network call!') // Checking on Alert Window UI
    })

    cy.intercept('todos').as('get') // Intercepting the Get Request for todos
    cy.wait('@get').then((interception) => {

      expect(interception.response.statusCode, 'response status code').equal(200);
      expect(interception.response.body.id, 'Value Of id in response body').equal(1);
      expect(interception.response.body.title, 'Value Of title in response body').equal('Abnormally long network call!');

    })
  })


  //Verifying Opening Of A New Tab

  it('Invoke New Tab', () => {

    cy.get('a').invoke('removeAttr', 'target')
    apiObj.clickNewTabButton()
    cy.url().should('include', '/')

  })

  //Verifying File Download

  it('File Download', () => {

    apiObj.clickFileDownloadButton()

    cy.get(formdetails.FileDownloadButton) // Getting the 'href' attribute of the anchor element
      .invoke('attr', 'href')
      .then(href => {
        cy.request({
          url: href,
          encoding: 'base64'
        }).then((res) => {
          expect(res.status, 'response status').to.equal(200)
          expect(res.body, 'response body').to.equal('PGh0bWw+CiAgPGhlYWQ+CiAgICA8bWV0YSBodHRwLWVxdWl2PSJjb250ZW50LXR5cGUiIGNvbnRlbnQ9InRleHQvaHRtbDtjaGFyc2V0PXV0Zi04Ij4KICAgIDxtZXRhIG5hbWU9InZpZXdwb3J0IiBjb250ZW50PSJ3aWR0aD1kZXZpY2Utd2lkdGgsIGluaXRpYWwtc2NhbGU9MS4wIj4KICAgIDx0aXRsZT5DeXByZXNzPC90aXRsZT4KCiAgICA8bGluayBocmVmPSIvX19jeXByZXNzL3N0YXRpYy9mYXZpY29uLmljbyIgcmVsPSJpY29uIj4KCiAgICA8bGluayByZWw9InN0eWxlc2hlZXQiIGhyZWY9Ii9fX2N5cHJlc3MvcnVubmVyL2N5cHJlc3NfcnVubmVyLmNzcyI+CiAgPC9oZWFkPgogIDxib2R5PgogICAgPGRpdiBpZD0iYXBwIj4KICAgICAgPGRpdiBjbGFzcz0icnVubmVyIGF1dG9tYXRpb24tZmFpbHVyZSI+CiAgICAgICAgPGRpdiBjbGFzcz0iYXV0b21hdGlvbi1tZXNzYWdlIj4KICAgICAgICAgIDxwPldob29wcywgd2UgY2FuJ3QgcnVuIHlvdXIgdGVzdHMuPC9wPgogICAgICAgICAgPGRpdj4KICAgICAgICAgICAgPHAgY2xhc3M9Im11dGVkIj5UaGlzIGJyb3dzZXIgd2FzIG5vdCBsYXVuY2hlZCB0aHJvdWdoIEN5cHJlc3MuIFRlc3RzIGNhbm5vdCBydW4uPC9wPgogICAgICAgICAgPC9kaXY+CiAgICAgICAgPC9kaXY+CiAgICAgIDwvZGl2PgogICAgPC9kaXY+CiAgPC9ib2R5Pgo8L2h0bWw+Cg==')
        })
      })

  })


})

