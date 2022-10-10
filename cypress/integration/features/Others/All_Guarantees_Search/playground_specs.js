import { doLogin, doLogout, navigate } from '../../../../kit'

Cypress.on('uncaught:exception', (err, runnable) => {
  return false
})

describe('Bank Guarantee creation - All approved', () => {
  let gxId

  it('Verify logo', () => {
    cy.visit('https://user.uat.lygon.io/login/mnhD/')
    cy.get('#logo').should('have.attr', 'src')
  })

  it('Verify invalid credential', () => {
    cy.visit('https://user.uat.lygon.io/login/mnhD/')
    cy.fillValueById('sabitri.gaire@lygon.com', 'email')
    cy.fillValueById('HelloWorld', 'password')
    cy.clickById('cd_login_button') // Sign In
    cy.contains('The email or password that you entered is incorrect.').should('be.visible')
  })

  it('Verify Valid credential', () => {
    doLogin.loginAsApplicant()
  })

  it('Create new Bank Gurantee', () => {
    cy.get('button[title="New Request"]')
      .click()
      .then(() => cy.get('button[aria-label="Start a bank guarantee request"]').click())
      .then(() => {
        //actions.fillGuaranteeDetails('Applicant')
      })

    cy.get('button[type="submit"]')
      .click()
      .then(() => {
        cy.on('url:changed', (newUrl) => {
          if (newUrl.includes('/gx/guarantee-requests/')) {
            gxId = newUrl.split('/guarantee-requests/')[1]
          }
        })
      })
    doLogout.logout()
  })

  it('Approves the Gx as Beneficiary and logs out after that', () => {
    cy.wait(5000)
    doLogin.loginAsBeneficiary().then(() => {
      navigate.navigateToNeedsAction()
    })
    cy.visit('https://user.uat.lygon.io/gx/guarantee-requests/' + gxId)
      .then(() => cy.get('span:contains("APPROVE")').parent().click())
      .then(() => cy.get('span:contains("Proceed")').parent().click())
      .then(() => doLogout.logout())
  })

  it('Approves the Gx as Issuer and logs out after that', () => {
    doLogin.loginAsIssuer().then(() => navigate.navigateToNeedsAction())
    cy.visit('https://test.uat.lygon.io/gx/guarantee-requests/' + gxId)
      .then(() => cy.get('span:contains("APPROVE")').parent().click())
      .then(() => cy.get('span:contains("Proceed")').parent().click())
      .then(() => doLogout.logout())
  })
})
