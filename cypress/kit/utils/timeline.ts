export const analyseTimeline = (
  approver: 'Applicant' | 'Beneficiary' | 'Issuer',
  isApprover: boolean = false,
  type: '2E' | '4E',
  details: DetailsType,
  jspath?: string
) => {
  switch (type) {
    case '2E':
      infoLookUpFor2E(approver, details, isApprover, jspath)
      break
    case '4E':
      infoLookUpFor4E(approver, details, isApprover)
      break
    default:
      infoLookUpFor2E(approver, details, isApprover, jspath)
  }
}

type DetailsType = {
  name: string
  timeStamp: string
}

const infoLookUpFor2E = (
  approver: string,
  details: DetailsType,
  isApprover: boolean,
  jspath?: string
) => {
  let message
  if ((approver === 'Applicant' || approver === 'Beneficiary') && !isApprover) {
    message = `Guarantee Request Initiated By ${approver}`
  } else {
    message = `Guarantee Approved By ${approver}`
  }
  const finalJsPath = !jspath
    ? jspath
    : '#main-content > div:nth-child(3) > div > ol > li:nth-child(1) > div.css-uxo7tc.e1drh6ts0 > button'
  // Need to pass additional string variable i.e. JSPath
  cy.get(finalJsPath)
    .click()
    .then(() => {
      cy.get('p:contains("Initiated By")').find('span').should('have.html', details?.name)
      cy.get('.e1drh6ts0').find('p').should('have.html', message)
      cy.get('span:contains("Ok")').parent().click()
    })
}

const infoLookUpFor4E = (approver: string, details: DetailsType, isApprover: boolean) => {
  cy.get(
    '#main-content > div:nth-child(3) > div > ol > li > div.css-uxo7tc.e1drh6ts0 > button'
  ).then(() => {
    cy.get(`span:contains('Guarantee Approved By ${approver}')`)
  })
}

export const stepperInfoLookUp = (
  approver: 'Applicant' | 'Beneficiary' | 'Issuer',
  isApprover: boolean = false
) => {
  let message
  if (!isApprover) {
    message = `Request Initiated by ${approver}`
  }
}