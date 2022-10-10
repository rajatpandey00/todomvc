import * as issuer from '../../fixtures/issuer.json'
import * as platformAdmin from '../../fixtures/platformAdmin.json'
import * as applicant from '../../fixtures/applicant.json'
import * as applicantNZ from '../../fixtures/applicantNZ.json'
import * as beneficiary from '../../fixtures/beneficiary.json'
import * as beneficiaryNZ from '../../fixtures/beneficiaryNZ.json'
import { doLogout, doLogin } from '..'

Cypress.on('uncaught:exception', (err, runnable) => {
  return false
})

beforeEach(() => {
  cy.intercept('GET', '/api/alerts?status=NEW').as('matchedURL')
})

export const checkAdminAlreadyLoggedIn = (userName, password, url) => {
  cy.wait(2000)
  cy.wait('@matchedURL').then(({ response }) => {
    cy.wait(2000)
    if (response.statusCode === 403) {
      cy.wait(2000)
      cy.get('#modelContent')
        .should('be.visible')
        .then(() => {
          cy.window().then(() => {
            return cy
              .xpath('/html/body/div[2]/div[2]/div/div[3]/button/span[1]')
              ?.click()
              ?.then(() => {
                cy.get('a').then((element) => {
                  if (element.length > 3) {
                    cy.wait(5000)
                    doLogout.logout()
                    cy.wait(3000)
                  }
                })
              })
          })
        })
        .then(() => {
          cy.visit(url)
          cy.get('#email')
            .should('be.visible')
            .then(() => {
              return cy
                .fillValueById(userName, 'email')
                .then(() => cy.fillValueById(password, 'password'))
                .then(() => cy.clickById('cd_login_button'))
            })
        })
    }
  })
}
// Platform Admin Login
export const loginAsPlatformAdmin = (url?: string) => {
  const userNameToEnter = platformAdmin.userName.trim()
  const passwordToEnter = platformAdmin.password.trim()
  const urlReturn = url ? url : platformAdmin.url
  cy.wait(3000)
  cy.visit(urlReturn).then(() => {
    cy.get('a').then((element) => {
      if (element.length > 3) {
        cy.wait(5000)
        doLogout.logout()
        cy.wait(3000)
      }
    })
  })
  return cy
    .visit(urlReturn)
    .then(() => cy.fillValueById(userNameToEnter, 'email'))
    .then(() => cy.fillValueById(passwordToEnter, 'password'))
    .then(() => cy.clickById('cd_login_button'))
    .then(() => checkAdminAlreadyLoggedIn(userNameToEnter, passwordToEnter, urlReturn))
}

export const checkAlreadyLoggedIn = (userName, password, url) => {
  cy.wait(2000)
  cy.wait('@matchedURL').then(({ response }) => {
    cy.wait(2000)
    if (response?.statusCode === 403) {
      cy.wait(2000)
      cy.get('#modelContent')
        //.should('be.visible')
        .then(() => {
          cy.window().then(() => {
            return cy
              .xpath('/html/body/div[2]/div[2]/div/div[3]/button/span[1]')
              ?.click()
              ?.then(() => {
                cy.get('a').then((element) => {
                  if (element.length > 3) {
                    cy.wait(5000)
                    doLogout.logout()
                    cy.wait(3000)
                  }
                })
              })
          })
        })
        .then(() => {
          cy.visit(url)
          cy.get('#email')
            .should('be.visible')
            .then(() => {
              return cy
                .fillValueById(userName, 'email')
                .then(() => cy.fillValueById(password, 'password'))
                .then(() => cy.clickById('cd_login_button'))
            })
        })
    }
  })
}

export const handleInBrowserLoggedIn = (url) => {
  cy.visit(url).then(() => {
    cy.get('a').then((element) => {
      if (element.length > 3) {
        cy.wait(5000)
        doLogout.logout()
        cy.wait(3000)
      }
    })
  })
}
export const loginAsIssuer = (url?: string) => {
  try {
    const userNameToEnter = issuer.userName.trim()
    const passwordToEnter = issuer.password.trim()
    const finalUrlReturn = url ? url : issuer.url
    cy.wait(3000)
    handleInBrowserLoggedIn(finalUrlReturn)
    return cy
      .visit(finalUrlReturn)
      .then(() => cy.fillValueById(userNameToEnter, 'email'))
      .then(() => cy.fillValueById(passwordToEnter, 'password'))
      .then(() => cy.clickById('cd_login_button'))
      .then(() => checkAlreadyLoggedIn(userNameToEnter, passwordToEnter, finalUrlReturn))
  } catch (error) {
    console.log('Inside the catch')
  }
}
//Login as issuer non-admin
export const loginAsIssuerNonAdmin = (url?: string) => {
  const userNameToEnter = issuer.issuerNonAdminUsername.trim()
  const passwordToEnter = issuer.issuerNonAdminPassword.trim()
  const finalUrlReturn = url ? url : issuer.url
  cy.wait(3000)
  handleInBrowserLoggedIn(finalUrlReturn)
  return cy
    .visit(finalUrlReturn)
    .then(() => cy.fillValueById(userNameToEnter, 'email'))
    .then(() => cy.fillValueById(passwordToEnter, 'password'))
    .then(() => cy.clickById('cd_login_button'))
    .then(() => checkAlreadyLoggedIn(userNameToEnter, passwordToEnter, finalUrlReturn))
}

export const loginAs4EyeIssuerProposer = (url?: string) => {
  const userNameToEnter = issuer.userNameProposer4Eye.trim()
  const passwordToEnter = issuer.passwordProposer4Eye.trim()
  const finalUrlReturn = url ? url : issuer.url4Eye
  cy.wait(3000)
  handleInBrowserLoggedIn(finalUrlReturn)
  return cy
    .visit(finalUrlReturn)
    .then(() => cy.fillValueById(userNameToEnter, 'email'))
    .then(() => cy.fillValueById(passwordToEnter, 'password'))
    .then(() => cy.clickById('cd_login_button'))
    .then(() => checkAlreadyLoggedIn(userNameToEnter, passwordToEnter, finalUrlReturn))
}

export const loginAs4EyeIssuerApprover = (url?: string) => {
  const userNameToEnter = issuer.userNameApprover4Eye.trim()
  const passwordToEnter = issuer.passwordApprover4Eye.trim()
  const finalUrlReturn = url ? url : issuer.url4Eye
  cy.wait(3000)
  handleInBrowserLoggedIn(finalUrlReturn)
  return cy
    .visit(finalUrlReturn)
    .then(() => cy.fillValueById(userNameToEnter, 'email'))
    .then(() => cy.fillValueById(passwordToEnter, 'password'))
    .then(() => cy.clickById('cd_login_button'))
    .then(() => checkAlreadyLoggedIn(userNameToEnter, passwordToEnter, finalUrlReturn))
}

export const loginAsApplicant = (url?: string) => {
  const userNameToEnter = applicant.userName.trim()
  const passwordToEnter = applicant.password.trim()
  const urlReturn = url ? url : applicant.url
  cy.wait(3000)
  handleInBrowserLoggedIn(urlReturn)
  return cy
    .visit(urlReturn)
    .then(() => cy.fillValueById(userNameToEnter, 'email'))
    .then(() => cy.fillValueById(passwordToEnter, 'password'))
    .then(() => cy.clickById('cd_login_button'))
    .then(() => checkAlreadyLoggedIn(userNameToEnter, passwordToEnter, urlReturn))
}

export const loginAsBeneficiary = (url?: string) => {
  const userNameToEnter = beneficiary.primaryBeneUserName.trim()
  const passwordToEnter = beneficiary.primaryBenePassword.trim()
  const urlReturn = url ? url : beneficiary.primaryBeneUrl
  cy.wait(3000)
  handleInBrowserLoggedIn(urlReturn)
  return cy
    .visit(urlReturn)
    .then(() => cy.fillValueById(userNameToEnter, 'email'))
    .then(() => cy.fillValueById(passwordToEnter, 'password'))
    .then(() => cy.clickById('cd_login_button'))
    .then(() => checkAlreadyLoggedIn(userNameToEnter, passwordToEnter, urlReturn))
}

export const loginAsActiveBeneficiary = (url?: string) => {
  const userNameToEnter = beneficiary.activeBeneUserName.trim()
  const passwordToEnter = beneficiary.activeBenePassword.trim()
  const finalUrlReturn = url ? url : beneficiary.activeBeneUrl
  cy.wait(3000)
  handleInBrowserLoggedIn(finalUrlReturn)
  return cy.visit(finalUrlReturn).then(() => {
    cy.get('a').then((element) => {
      if (element.length > 3) {
        cy.wait(3000)
        doLogout.logout()
        cy.wait(3000)
      }
    })
    cy.visit(beneficiary.activeBeneUrl)
    cy.get('#email').then(() => {
      return cy
        .fillValueById(userNameToEnter, 'email')
        .then(() => cy.fillValueById(passwordToEnter, 'password'))
        .then(() => cy.clickById('cd_login_button'))
        .then(() => checkAlreadyLoggedIn(userNameToEnter, passwordToEnter, finalUrlReturn))
    })
  })
}

export const loginAsActiveBeneficiaryOne = (url?: string) => {
  const userNameToEnter = beneficiary.activeBeneOneUserName.trim()
  const passwordToEnter = beneficiary.activeBeneOnePassword.trim()
  cy.wait(3000)
  const finalUrlReturn = url ? url : beneficiary.activeBeneOneUrl
  handleInBrowserLoggedIn(finalUrlReturn)
  return cy
    .visit(finalUrlReturn)
    .then(() => cy.fillValueById(userNameToEnter, 'email'))
    .then(() => cy.fillValueById(passwordToEnter, 'password'))
    .then(() => cy.clickById('cd_login_button'))
    .then(() => checkAlreadyLoggedIn(userNameToEnter, passwordToEnter, finalUrlReturn))
}
export const loginAsActiveBeneficiaryApprover = (url?: string) => {
  const userNameToEnter = beneficiaryNZ.activeBeneApproverUserName.trim()
  const passwordToEnter = beneficiaryNZ.activeBeneApproverPassword.trim()
  cy.wait(3000)
  const finalUrlReturn = url ? url : beneficiaryNZ.activeBene4EyeUrl
  handleInBrowserLoggedIn(finalUrlReturn)
  return cy
    .visit(finalUrlReturn)
    .then(() => cy.fillValueById(userNameToEnter, 'email'))
    .then(() => cy.fillValueById(passwordToEnter, 'password'))
    .then(() => cy.clickById('cd_login_button'))
    .then(() => checkAlreadyLoggedIn(userNameToEnter, passwordToEnter, finalUrlReturn))
}

// NZ logins

export const loginAsNZApplicant = (url?: string) => {
  const userNameToEnter = applicantNZ.userName.trim()
  const passwordToEnter = applicantNZ.password.trim()
  const urlReturn = url ? url : applicantNZ.url
  cy.wait(3000)
  handleInBrowserLoggedIn(urlReturn)
  return cy
    .visit(urlReturn)
    .then(() => cy.fillValueById(userNameToEnter, 'email'))
    .then(() => cy.fillValueById(passwordToEnter, 'password'))
    .then(() => cy.clickById('cd_login_button'))
    .then(() => checkAlreadyLoggedIn(userNameToEnter, passwordToEnter, urlReturn))
}

export const loginAsNZBeneficiary = (url?: string) => {
  const userNameToEnter = beneficiaryNZ.primaryBeneUserName.trim()
  const passwordToEnter = beneficiaryNZ.primaryBenePassword.trim()
  const urlReturn = url ? url : beneficiaryNZ.primaryBeneUrl
  cy.wait(3000)
  handleInBrowserLoggedIn(urlReturn)
  return cy
    .visit(urlReturn)
    .then(() => cy.fillValueById(userNameToEnter, 'email'))
    .then(() => cy.fillValueById(passwordToEnter, 'password'))
    .then(() => cy.clickById('cd_login_button'))
    .then(() => checkAlreadyLoggedIn(userNameToEnter, passwordToEnter, urlReturn))
}

//Parent child logins
export const loginAsParentBeneficiaryOne = (url?: string) => {
  const userNameToEnter = beneficiary.parentUserNameOne.trim()
  const passwordToEnter = beneficiary.parentPasswordOne.trim()
  const urlReturn = url ? url : beneficiary.parentOrgUrlOne
  cy.wait(3000)
  handleInBrowserLoggedIn(urlReturn)
  return cy
    .visit(urlReturn)
    .then(() => cy.fillValueById(userNameToEnter, 'email'))
    .then(() => cy.fillValueById(passwordToEnter, 'password'))
    .then(() => cy.clickById('cd_login_button'))
    .then(() => checkAlreadyLoggedIn(userNameToEnter, passwordToEnter, urlReturn))
}

export const loginAsChildBeneficiaryOne = (url?: string) => {
  const userNameToEnter = beneficiary.childUserNameOne.trim()
  const passwordToEnter = beneficiary.childPasswordOne.trim()
  const urlReturn = url ? url : beneficiary.childOrgUrlOne
  cy.wait(3000)
  handleInBrowserLoggedIn(urlReturn)
  return cy
    .visit(urlReturn)
    .then(() => cy.fillValueById(userNameToEnter, 'email'))
    .then(() => cy.fillValueById(passwordToEnter, 'password'))
    .then(() => cy.clickById('cd_login_button'))
    .then(() => checkAlreadyLoggedIn(userNameToEnter, passwordToEnter, urlReturn))
}
export const loginAsApplicantProposer4Eye = (url?: string) => {
  const userNameToEnter = applicant.applicantProposer4EyeUserName.trim()
  const passwordToEnter = applicant.applicantProposer4EyePassword.trim()
  const urlReturn = url ? url : applicant.applicantProposer4EyeUrl
  cy.wait(3000)
  handleInBrowserLoggedIn(urlReturn)
  return cy
    .visit(urlReturn)
    .then(() => cy.fillValueById(userNameToEnter, 'email'))
    .then(() => cy.fillValueById(passwordToEnter, 'password'))
    .then(() => cy.clickById('cd_login_button'))
    .then(() => checkAlreadyLoggedIn(userNameToEnter, passwordToEnter, urlReturn))
}

export const loginAsApplicantApprover4Eye = (url?: string) => {
  const userNameToEnter = applicant.applicantApprover4EyeUserName.trim()
  const passwordToEnter = applicant.applicantApprover4EyePassword.trim()
  const urlReturn = url ? url : applicant.applicantApprover4EyeUrl
  cy.wait(3000)
  handleInBrowserLoggedIn(urlReturn)
  return cy
    .visit(urlReturn)
    .then(() => cy.fillValueById(userNameToEnter, 'email'))
    .then(() => cy.fillValueById(passwordToEnter, 'password'))
    .then(() => cy.clickById('cd_login_button'))
    .then(() => checkAlreadyLoggedIn(userNameToEnter, passwordToEnter, urlReturn))
}

export const loginAsNZApplicantProposer4Eye = (url?: string) => {
  const userNameToEnter = applicantNZ.NZApplicantProposer4EyeUserName.trim()
  const passwordToEnter = applicantNZ.NZApplicantProposer4EyePassword.trim()
  const urlReturn = url ? url : applicantNZ.NZApplicantProposer4EyeUrl
  cy.wait(3000)
  handleInBrowserLoggedIn(urlReturn)
  return cy
    .visit(urlReturn)
    .then(() => cy.fillValueById(userNameToEnter, 'email'))
    .then(() => cy.fillValueById(passwordToEnter, 'password'))
    .then(() => cy.clickById('cd_login_button'))
    .then(() => checkAlreadyLoggedIn(userNameToEnter, passwordToEnter, urlReturn))
}
export const loginAsNZApplicantApprover4Eye = (url?: string) => {
  const userNameToEnter = applicantNZ.NZApplicantApprover4EyeUserName.trim()
  const passwordToEnter = applicantNZ.NZApplicantApprover4EyePassword.trim()
  const urlReturn = url ? url : applicantNZ.NZApplicantApprover4EyeUrl
  cy.wait(3000)
  handleInBrowserLoggedIn(urlReturn)
  return cy
    .visit(urlReturn)
    .then(() => cy.fillValueById(userNameToEnter, 'email'))
    .then(() => cy.fillValueById(passwordToEnter, 'password'))
    .then(() => cy.clickById('cd_login_button'))
    .then(() => checkAlreadyLoggedIn(userNameToEnter, passwordToEnter, urlReturn))
}

export const loginASNZParentApplicantProposer4Eye = (url?: string) => {
  const userNameToEnter = applicantNZ.NZparentProposerUserNameOne.trim()
  const passwordToEnter = applicantNZ.NZparentProposerPasswordOne.trim()
  const urlReturn = url ? url : applicantNZ.NZParentOrgUrlOne
  cy.wait(3000)
  handleInBrowserLoggedIn(urlReturn)
  return cy
    .visit(urlReturn)
    .then(() => cy.fillValueById(userNameToEnter, 'email'))
    .then(() => cy.fillValueById(passwordToEnter, 'password'))
    .then(() => cy.clickById('cd_login_button'))
    .then(() => checkAlreadyLoggedIn(userNameToEnter, passwordToEnter, urlReturn))
}
export const loginASNZParentApplicantProposer4EyeTwo = (url?: string) => {
  const userNameToEnter = applicantNZ.NZParentProposerUserNameTwo.trim()
  const passwordToEnter = applicantNZ.NZParenProposerPasswordTwo.trim()
  const urlReturn = (url ? url : applicantNZ.NZParentOrgUrlTwo)
  cy.wait(3000)
  handleInBrowserLoggedIn(urlReturn)
  return cy
    .visit(urlReturn)
    .then(() => cy.fillValueById(userNameToEnter, 'email'))
    .then(() => cy.fillValueById(passwordToEnter, 'password'))
    .then(() => cy.clickById('cd_login_button'))
    .then(() => checkAlreadyLoggedIn(userNameToEnter, passwordToEnter, urlReturn))
}
export const loginAsNZBeneficiaryProposer4Eye = (url?: string) => {
  const userNameToEnter = beneficiaryNZ.NZBeneProposer4EyeUserName.trim()
  const passwordToEnter = beneficiaryNZ.NZBeneProposer4EyePassword.trim()
  const urlReturn = (url ? url : beneficiaryNZ.NZBeneProposer4EyeUrl)
  cy.wait(3000)
  handleInBrowserLoggedIn(urlReturn)
  return cy
    .visit(urlReturn)
    .then(() => cy.fillValueById(userNameToEnter, 'email'))
    .then(() => cy.fillValueById(passwordToEnter, 'password'))
    .then(() => cy.clickById('cd_login_button'))
    .then(() => checkAlreadyLoggedIn(userNameToEnter, passwordToEnter, urlReturn))
}

export const loginAs2EyeNZBeneficiary = (url?: string) => {
  const userNameToEnter = beneficiaryNZ.primaryBeneUserName.trim()
  const passwordToEnter = beneficiaryNZ.primaryBenePassword.trim()
  const urlReturn = url ? url : beneficiaryNZ.primaryBeneUrl
  cy.wait(3000)
  handleInBrowserLoggedIn(urlReturn)
  return cy
    .visit(urlReturn)
    .then(() => cy.fillValueById(userNameToEnter, 'email'))
    .then(() => cy.fillValueById(passwordToEnter, 'password'))
    .then(() => cy.clickById('cd_login_button'))
    .then(() => checkAlreadyLoggedIn(userNameToEnter, passwordToEnter, urlReturn))
}

export const loginAs2EyeNZActiveBeneficiary = (url?: string) => {
  const userNameToEnter = beneficiaryNZ.activeBeneOneUserName.trim()
  const passwordToEnter = beneficiaryNZ.activeBeneOnePassword.trim()
  const urlReturn = url ? url : beneficiaryNZ.activeBeneOneUrl
  cy.wait(3000)
  handleInBrowserLoggedIn(urlReturn)
  return cy
    .visit(urlReturn)
    .then(() => cy.fillValueById(userNameToEnter, 'email'))
    .then(() => cy.fillValueById(passwordToEnter, 'password'))
    .then(() => cy.clickById('cd_login_button'))
    .then(() => checkAlreadyLoggedIn(userNameToEnter, passwordToEnter, urlReturn))
}

export const loginAsParentApplicantProposer4Eye = (url?: string) => {
  const userNameToEnter = applicant.parentUserNameOne.trim()
  const passwordToEnter = applicant.parentPasswordOne.trim()
  const urlReturn = (url ? url : applicant.parentOrgOne)
  cy.wait(5000)
  handleInBrowserLoggedIn(urlReturn)
  return cy
    .visit(urlReturn)
    .then(() => cy.fillValueById(userNameToEnter, 'email'))
    .then(() => cy.fillValueById(passwordToEnter, 'password'))
    .then(() => cy.clickById('cd_login_button'))
    .then(() => checkAlreadyLoggedIn(userNameToEnter, passwordToEnter, urlReturn))
}

export const loginAs2EyeNZPassiveBeneficiary = (url?: string) => {
  const userNameToEnter = beneficiaryNZ.passiveBeneOneUserName.trim()
  const passwordToEnter = beneficiaryNZ.passiveBeneOnePassword.trim()
  const urlReturn = url ? url : beneficiaryNZ.passiveBeneOneUrl
  cy.wait(5000)
  handleInBrowserLoggedIn(urlReturn)
  return cy
    .visit(urlReturn)
    .then(() => cy.fillValueById(userNameToEnter, 'email'))
    .then(() => cy.fillValueById(passwordToEnter, 'password'))
    .then(() => cy.clickById('cd_login_button'))
    .then(() => checkAlreadyLoggedIn(userNameToEnter, passwordToEnter, urlReturn))
}

export const loginAsParentApplicantApprover4Eye = (url?: string) => {
  const userNameToEnter = applicant.parentUserNameOne.trim()
  const passwordToEnter = applicant.parentPasswordOne.trim()
  const urlReturn = url ? url : applicant.parentOrgOne
  cy.wait(5000)
  handleInBrowserLoggedIn(urlReturn)
  return cy
    .visit(urlReturn)
    .then(() => cy.fillValueById(userNameToEnter, 'email'))
    .then(() => cy.fillValueById(passwordToEnter, 'password'))
    .then(() => cy.clickById('cd_login_button'))
    .then(() => checkAlreadyLoggedIn(userNameToEnter, passwordToEnter, urlReturn))
}

export const loginAsNZPassiveBeneficiaryProposer4Eye = (url?: string) => {
  const userNameToEnter = beneficiaryNZ.NZBeneProposer4EyeUserName.trim()
  const passwordToEnter = beneficiaryNZ.NZBeneProposer4EyePassword.trim()
  const urlReturn = url ? url : beneficiaryNZ.NZBeneProposer4EyeUrl
  cy.wait(3000)
  handleInBrowserLoggedIn(urlReturn)
  return cy
    .visit(urlReturn)
    .then(() => cy.fillValueById(userNameToEnter, 'email'))
    .then(() => cy.fillValueById(passwordToEnter, 'password'))
    .then(() => cy.clickById('cd_login_button'))
    .then(() => checkAlreadyLoggedIn(userNameToEnter, passwordToEnter, urlReturn))
}
export const loginAsNZPassiveBeneficiaryApprover4Eye = (url?: string) => {
  const userNameToEnter = beneficiaryNZ.NZPrimaryBeneApprover4EyeUserName.trim()
  const passwordToEnter = beneficiaryNZ.NZPrimaryBeneApprover4EyePassword.trim()
  const urlReturn = url ? url : beneficiaryNZ.NZPrimaryBeneApprover4EyeUrl
  cy.wait(5000)
  handleInBrowserLoggedIn(urlReturn)
  return cy
    .visit(urlReturn)
    .then(() => cy.fillValueById(userNameToEnter, 'email'))
    .then(() => cy.fillValueById(passwordToEnter, 'password'))
    .then(() => cy.clickById('cd_login_button'))
    .then(() => checkAlreadyLoggedIn(userNameToEnter, passwordToEnter, urlReturn))
}
export const loginAsActiveBeneficiaryProposer = (url?: string) => {
  const userNameToEnter = beneficiaryNZ.activeBeneProposerUserName.trim()
  const passwordToEnter = beneficiaryNZ.activeBeneProposerPassword.trim()
  cy.wait(3000)
  const finalUrlReturn = url ? url : beneficiaryNZ.activeBene4EyeUrl
  handleInBrowserLoggedIn(finalUrlReturn)
  return cy
    .visit(finalUrlReturn)
    .then(() => cy.fillValueById(userNameToEnter, 'email'))
    .then(() => cy.fillValueById(passwordToEnter, 'password'))
    .then(() => cy.clickById('cd_login_button'))
    .then(() => checkAlreadyLoggedIn(userNameToEnter, passwordToEnter, finalUrlReturn))
}

export const loginASNZParentApplicantApprover4eye = (url?: string) => {
  const userNameToEnter = applicantNZ.NZParentApproverUserNameOne.trim()
  const passwordToEnter = applicantNZ.NZParentApproverPasswordOne.trim()
  const urlReturn = url ? url : applicantNZ.NZParentOrgUrlOne
  cy.wait(3000)
  handleInBrowserLoggedIn(urlReturn)
  return cy
    .visit(urlReturn)
    .then(() => cy.fillValueById(userNameToEnter, 'email'))
    .then(() => cy.fillValueById(passwordToEnter, 'password'))
    .then(() => cy.clickById('cd_login_button'))
    .then(() => checkAlreadyLoggedIn(userNameToEnter, passwordToEnter, urlReturn))
}
export const loginASNZParentApplicantApprover4eyeTwo = (url?: string) => {
  const userNameToEnter = applicantNZ.NZParentApproverUserNameTwo.trim()
  const passwordToEnter = applicantNZ.NZParentApproverPasswordTwo.trim()
  const urlReturn = url ? url : applicantNZ.NZParentOrgUrlTwo
  cy.wait(3000)
  handleInBrowserLoggedIn(urlReturn)
  return cy
    .visit(urlReturn)
    .then(() => cy.fillValueById(userNameToEnter, 'email'))
    .then(() => cy.fillValueById(passwordToEnter, 'password'))
    .then(() => cy.clickById('cd_login_button'))
    .then(() => checkAlreadyLoggedIn(userNameToEnter, passwordToEnter, urlReturn))
}
export const loginAsNZBeneficiaryApprover4Eye = (url?: string) => {
  const userNameToEnter = beneficiaryNZ.NZBeneApprover4EyeUserName.trim()
  const passwordToEnter = beneficiaryNZ.NZBeneApprover4EyePassword.trim()
  const urlReturn = url ? url : beneficiaryNZ.NZBeneApprover4EyeUrl
  cy.wait(3000)
  handleInBrowserLoggedIn(urlReturn)
  return cy
    .visit(urlReturn)
    .then(() => cy.fillValueById(userNameToEnter, 'email'))
    .then(() => cy.fillValueById(passwordToEnter, 'password'))
    .then(() => cy.clickById('cd_login_button'))
    .then(() => checkAlreadyLoggedIn(userNameToEnter, passwordToEnter, urlReturn))
}

export const loginASNZChildApplicantProposer4EyeTwo = (url?: string) => {
  const userNameToEnter = applicantNZ.NZChildProposerUserNameTwo.trim()
  const passwordToEnter = applicantNZ.NZChildProposerPasswordTwo.trim()
  const urlReturn = url ? url : applicantNZ.NZChildOrgUrlTwo
  cy.wait(3000)
  handleInBrowserLoggedIn(urlReturn)
  return cy
    .visit(urlReturn)
    .then(() => cy.fillValueById(userNameToEnter, 'email'))
    .then(() => cy.fillValueById(passwordToEnter, 'password'))
    .then(() => cy.clickById('cd_login_button'))
    .then(() => checkAlreadyLoggedIn(userNameToEnter, passwordToEnter, urlReturn))
}
export const loginASNZChildApplicantApprover4EyeTwo = (url?: string) => {
  const userNameToEnter = applicantNZ.NZChildApproverUserNameTwo.trim()
  const passwordToEnter = applicantNZ.NZChildApproverPasswordTwo.trim()
  const urlReturn = url ? url : applicantNZ.NZChildOrgUrlTwo
  cy.wait(3000)
  handleInBrowserLoggedIn(urlReturn)
  return cy
    .visit(urlReturn)
    .then(() => cy.fillValueById(userNameToEnter, 'email'))
    .then(() => cy.fillValueById(passwordToEnter, 'password'))
    .then(() => cy.clickById('cd_login_button'))
    .then(() => checkAlreadyLoggedIn(userNameToEnter, passwordToEnter, urlReturn))
}
export const loginAsNZActiveBeneficiaryProposer4Eye = (url?: string) => {
  const userNameToEnter = beneficiaryNZ.NZActiveBeneProposer4EyeUserName.trim()
  const passwordToEnter = beneficiaryNZ.NZActiveBeneProposer4EyePassword.trim()
  const urlReturn = url ? url : beneficiaryNZ.NZActiveBeneProposer4EyeUrl
  cy.wait(3000)
  handleInBrowserLoggedIn(urlReturn)
  return cy
    .visit(urlReturn)
    .then(() => cy.fillValueById(userNameToEnter, 'email'))
    .then(() => cy.fillValueById(passwordToEnter, 'password'))
    .then(() => cy.clickById('cd_login_button'))
    .then(() => checkAlreadyLoggedIn(userNameToEnter, passwordToEnter, urlReturn))
}
export const loginAsNZActiveBeneficiaryApprover4Eye = (url?: string) => {
  const userNameToEnter = beneficiaryNZ.NZActiveBeneApprover4EyeUserName.trim()
  const passwordToEnter = beneficiaryNZ.NZActiveBeneApprover4EyePassword.trim()
  const urlReturn = url ? url : beneficiaryNZ.NZActiveBeneApprover4EyeUrl
  cy.wait(3000)
  handleInBrowserLoggedIn(urlReturn)
  return cy
    .visit(urlReturn)
    .then(() => cy.fillValueById(userNameToEnter, 'email'))
    .then(() => cy.fillValueById(passwordToEnter, 'password'))
    .then(() => cy.clickById('cd_login_button'))
    .then(() => checkAlreadyLoggedIn(userNameToEnter, passwordToEnter, urlReturn))
}

//Login as issuer admin
export const loginAsIssuerAdmin = (url?: string) => {
  const userNameToEnter = issuer.issuerAdminUsername.trim()
  const passwordToEnter = issuer.issuerAdminPassword.trim()
  const finalUrlReturn = url ? url : issuer.url
  cy.wait(3000)
  handleInBrowserLoggedIn(finalUrlReturn)
  return cy
    .visit(finalUrlReturn)
    .then(() => cy.fillValueById(userNameToEnter, 'email'))
    .then(() => cy.fillValueById(passwordToEnter, 'password'))
    .then(() => cy.clickById('cd_login_button'))
    .then(() => checkAlreadyLoggedIn(userNameToEnter, passwordToEnter, finalUrlReturn))
}
//Login as AU passive Beneficiary 2eye
export const loginAsPassiveBeneficiary = (url?: string) => {
  const userNameToEnter = beneficiary.passiveBeneOneUserName.trim()
  const passwordToEnter = beneficiary.passiveBeneOnePassword.trim()
  const urlReturn = url ? url : beneficiary.passiveBeneOneUrl
  cy.wait(5000)
  handleInBrowserLoggedIn(urlReturn)
  return cy
    .visit(urlReturn)
    .then(() => cy.fillValueById(userNameToEnter, 'email'))
    .then(() => cy.fillValueById(passwordToEnter, 'password'))
    .then(() => cy.clickById('cd_login_button'))
    .then(() => checkAlreadyLoggedIn(userNameToEnter, passwordToEnter, urlReturn))
}