
const { equal, strictEqual } = require('assert')
const { assert, table } = require('console')
const { on } = require('events')
const { userInfo } = require('os')
import domObj from '../objects/section-1'

describe('Problem 1', () => {



  // Visiting section-1.html page

  beforeEach(() => {
    domObj.visit()
  })

  // Verifying Table Visibility & Data

  it('Validating Table visibility & data', () => {

    //Inserting table web elements locator from JSON file(formdetails.json)

    cy.fixture("formdetails.json").then((ele) => {

      // Validating Table Visibility before & after clicking Show Table button

      cy.get(ele.tableelement).should('not.be.visible')
      domObj.clickShowTable()
      cy.get(ele.tableelement).should('be.visible')


      // Verifying that table is 5 columns wide

      cy.get(ele.tablecolumnlength)
        .should('have.length', 5)

      // Verifying that table has 10 rows excluding header row

      cy.get(ele.tablerowlength)
        .not('.table-header')
        .should('have.length', 10)


      // Verifying that admin has an ID with value of 1

      cy.get(ele.RetrievingRoleColumn).not('.table-header').each(($e, index, $list) => {

        const text = $e.text()
        if (text.includes("admin")) {
          cy.get(ele.RetrievingIdColumn).eq(index).then(function (Id) {
            const IdValue = Id.text()
            expect(IdValue).to.equal("1")
          })
        }
      })

      // Verifying at least 5 entries have the role "user"

      var countUser = 0;
      cy.get(ele.RetrievingRoleColumn).not('.table-header').each(($e, $list) => {

        const text = $e.text()
        if (text.includes("user")) {
          countUser++
        }
      }).then(() => {
        expect(countUser).to.be.greaterThan(4)
      })

      // Verifying that there are exactly 3 people older than 60 years old     

      var TodayDate = new Date();
      var DiffDate = new Date(TodayDate.getFullYear() - 60, TodayDate.getMonth(), TodayDate.getDate());
      var peopleCount = 0;

      cy.get(ele.RetrievingDOBColumn).not('.table-header').each(($e, $list) => {
        const personDate = new Date($e.text())
        if (personDate <= DiffDate) {
          peopleCount++
        }
      }).then(() => {
        expect(peopleCount).to.be.equal(3)
      })

    })
  })




  //Verifying form visibility with all the entered data

  it('Validating Form visibility and data ', () => {

    //Inserting test data & web elements locator from JSON file(formdetails.json)

    cy.fixture("formdetails.json").then((user) => {

      //Validating Form Visibility before & after clicking Show Form button

      cy.get(user.formelement).should('not.be.visible')
      domObj.clickShowForm()
      cy.get(user.formelement).should('be.visible')

      //Validating Name Field Value

      domObj.fillName(user.name)
      cy.get(user.nameelement)
        .should('have.value', 'Gurvinder Bhatia')

      //Validating Age Field Value

      domObj.fillAge(user.age)
      cy.get(user.ageelement)
        .should('have.value', '29')

      //Validating Gender Field Value

      domObj.fillGender(user.gender)
      cy.get(user.genderelement)
        .should('have.value', 'female')

      //Validating Nurse checkbox value

      domObj.fillNurse()
      cy.get(user.nurseelement)
        .should('be.checked')

    })



    //Validating Alert Window Text after clicking submit

    cy.on('window:alert', (alertText) => {
      expect(alertText, 'Alert Window Text').to.equal('Form submitted!')
    })

    domObj.clickSubmit()

  })


})




