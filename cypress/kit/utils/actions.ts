import * as guarantee from '../../fixtures/createGuarantee.json'
import * as nzGuarantee from '../../fixtures/createGuaranteeNZ.json'
import * as errorMsg from '../../fixtures/notifMsg.json'

let gxId

type userType = 'Applicant' | 'Beneficiary' | 'Issuer'

/**
 * Non JV GX of purpose type Commercial Agreement - AUS/NZL
 */
export const fillGuaranteeDetails = (
  type: userType,
  optionalCountry?: 'NZ' | null
) => {
  cy.wait(4000)
  cy.get('#applicant').then(() => {
    switch (optionalCountry) {
      case 'NZ':
        cy.fillValueById(
          nzGuarantee.applicantName + '{enter}',
          'applicant',
          true
        )
         cy.fillValueById(
          nzGuarantee.priBeneName + '{enter}',
          'beneficiary_0',
          true
        )
        if (type === 'Applicant') {
          cy.clickByAriaLabel('Issuer')
          cy.get('li[data-value=' + nzGuarantee.issuerNameNZ +']').click()
        }
        cy.wait(3000).then(() => {
          fillPurposeFormat('Commercial Agreement - NZL')
        })
        cy.fillValueById(nzGuarantee.expiringDate, 'expiresAt')
        cy.fillValueById(nzGuarantee.amount, 'amount')
        cy.clickById('select-termsConditions')
        cy.get('li[data-value='+ nzGuarantee.termsNZ2 +']').click()
        break

      default:
        cy.fillValueById(
          guarantee.applicantName,
          'applicant',
          true
        )
        cy.fillValueById(
          guarantee.priBeneName,
          'beneficiary_0',
          true
        )
        if (type === 'Applicant') {
          cy.clickByAriaLabel('Issuer')
          cy.get('li[data-value='+ guarantee.AUIssuerId+']').click()
        }
        fillPurposeFormat('Commercial Agreement - AUS')
        cy.fillValueById(guarantee.expiringDate, 'expiresAt')
        cy.fillValueById(guarantee.amount, 'amount')
        cy.clickById('select-termsConditions')
        cy.get('li[data-value='+ guarantee.termsAUS_NSW +']').click()
        break
    }
  })
}
/**
 * 
 * @param amount Edits the Gx to include the new amount specified
 * Edits the GX created with expiry date to open end 
 * 
 */
export const editExistingGuaranteeToOpenEnd = (amount: string) => {

  cy.clickById('amend-btn').then(() => {
    cy.wait(2000)
    cy.xpath('/html/body/div/div/div[2]/form/div/div[4]/div[1]/div[2]/div[1]/div/div[2]/label/span[1]/span[1]/input').check()
   cy.get('[id="amount"]').click().clear()
    cy.fillValueById(guarantee.amendAmount, 'amount')
})

}

/**
 * Non JV international GX of purpose type Commercial Agreement - AUS/NZL
 */
export const fill4eyeJVGuaranteeDetails = (
  type: userType,
  optionalCountry?: 'NZ' | null
) => {
  cy.get('#applicant').then(() => {
    switch (optionalCountry) {
      case 'NZ':
        cy.fillValueById(
          nzGuarantee.applicantName4eye+ '{enter}',
          'applicant',
          true
        )
         cy.fillValueById(
          nzGuarantee.beneName4eye+ '{enter}',
          'beneficiary_0',
          true
        )
      
        if (type === 'Applicant') {
          cy.clickByAriaLabel('Issuer')

          cy.get('li[data-value=' + nzGuarantee.issuerNameNZ + ']').click()
        }
        fillPurposeFormat('Commercial Agreement - NZL')
        cy.fillValueById(nzGuarantee.expiringDate, 'expiresAt')
        cy.fillValueById(nzGuarantee.amount, 'amount')
        cy.clickById('select-termsConditions')
        cy.get('li[data-value=' +nzGuarantee.termsNZ2 + ']').click()
        break

      default:
        cy.get('[type="radio"]').check('international')
        cy.clickById('applicant')
        cy.fillValueByInputAriaLabel(
          guarantee.applicantName4eye + '{enter}',
          'Search relevant applicant name ',
          true
        )
        cy.clickById('beneficiary_0')
        cy.fillValueByInputAriaLabel(
          guarantee.beneName4eye + '{enter}',
          'Search relevant beneficiary_0 name ',
          true
        )
        if (type === 'Applicant') {
          cy.clickById('issuer_country')
          cy.get('li[data-value="NZL"]').click()
        }
        fillPurposeFormat('Commercial Agreement - AUS')
        cy.fillValueById(guarantee.expiringDate, 'expiresAt')
        cy.fillValueById(guarantee.amount, 'amount')
        cy.clickById('select-termsConditions')
        cy.get('li[data-value='+ guarantee.termsAUS_NSW +']').click()
        break
    }
  })
}

/**
 * JV GX of purpose type Commercial Agreement - AUS/NZL
 */
export const fill4eyeParentChildJVGuaranteeDetails = (
  type: userType,
  optionalCountry?: 'NZ' | null
) => {
  cy.clickById("select-actOnBehalf")
  cy.wait(10000)
  cy.get('li[data-value="510b6dcb-05a2-4f66-8532-2779e44492d7"]').click()
  cy.wait(5000)
  cy.get('#applicant').then(() => {
    switch (optionalCountry) {
      case 'NZ':
        cy.fillValueById(
          nzGuarantee.NZChildProposerOrgTwo+ '{enter}',
          'applicant',
          true
        )
         cy.fillValueById(
          nzGuarantee.beneName4eye + '{enter}',
          'beneficiary_0',
          true
        )
        cy.get('button[aria-label="Click here to Add Beneficiary"]').click()
          cy.fillValueById(nzGuarantee.passiveNZBeneName4eye + '{enter}',
          'beneficiary_1',
          true
        )
         if (type === 'Applicant') {
          cy.clickByAriaLabel('Issuer')

          cy.get('li[data-value=' + nzGuarantee.issuerNameNZ + ']').click()
        }
        fillPurposeFormat('Commercial Agreement - NZL')
        cy.fillValueById(nzGuarantee.expiringDate, 'expiresAt')
        cy.fillValueById(nzGuarantee.amount, 'amount')
        cy.clickById('select-termsConditions')
        cy.get('li[data-value=' +nzGuarantee.termsNZ2 + ']').click()
        break

      default:
        cy.get('[type="radio"]').check('international')
        cy.clickById('applicant')
        cy.fillValueByInputAriaLabel(
          guarantee.applicantName4eye + '{enter}',
          'Search relevant applicant name ',
          true
        )
        cy.clickById('beneficiary_0')
        cy.fillValueByInputAriaLabel(
          guarantee.beneName4eye + '{enter}',
          'Search relevant beneficiary_0 name ',
          true
        )
        if (type === 'Applicant') {
          cy.clickById('issuer_country')
          cy.get('li[data-value="NZL"]').click()
        }
        fillPurposeFormat('Commercial Agreement - AUS')
        cy.fillValueById(guarantee.expiringDate, 'expiresAt')
        cy.fillValueById(guarantee.amount, 'amount')
        cy.clickById('select-termsConditions')
        cy.get('li[data-value='+ guarantee.termsAUS_NSW +']').click()
        break
    }
  })
}

/**
 * JV GX of purpose type commercial agreement Australia
 */
 export const jvGuaranteeDetails = (type: 'Applicant' | 'Beneficiary' | 'Issuer') => {
  cy.wait(3000)
  cy.get('#applicant').then(() => {
    cy.wait(4000)
    cy.wait('@matchedOrgUrl').then(() => {
      cy.fillValueById(guarantee.priBeneName, 'beneficiary_0', true) // add beneficiary details
      cy.get('button[aria-label="Click here to Add Beneficiary"]') // get plus button
      cy.clickByAriaLabel('Click here to Add Beneficiary') // plus button click
      cy.wait(2000)
      cy.fillValueById(guarantee.activeBene1Name, 'beneficiary_1', true) // add beneficiary 1 details
      cy.get('button[aria-label="Click here to Add Beneficiary"]')
      cy.clickByAriaLabel('Click here to Add Beneficiary') // plus button 2 click
      cy.wait(2000)
      cy.fillValueById(guarantee.passiveBene1Name, 'beneficiary_2', true) // add beneficiary 2 details

      if (type === 'Applicant') {
        cy.clickByAriaLabel('Issuer')
        cy.wait(500)
        cy.get('li[data-value='+ guarantee.AUIssuerId +']').click()
      }
      cy.wait(5000)
      fillPurposeFormat('Commercial Agreement - AUS')
      cy.fillValueById(guarantee.expiringDate, 'expiresAt')
      cy.fillValueById(guarantee.amount, 'amount')
      cy.clickById('select-termsConditions')
      cy.get('li[data-value='+ guarantee.termsAUS_NSW +']').click()
    })

  })
}

/**
 * JV GX of purpose type performance guarantee Australia
 */
export const jvPerfomGuaranteeDetails = (type: 'Applicant' | 'Beneficiary' | 'Issuer') => {
  cy.wait(3000)
  cy.get('#applicant').then(() => {
    cy.wait(4000)
    cy.fillValueById(guarantee.applicantName4eye,'applicant',true)
    cy.fillValueById(guarantee.priBeneName, 'beneficiary_0', true) // add beneficiary details
    cy.get('button[aria-label="Click here to Add Beneficiary"]') // get plus button
    cy.clickByAriaLabel('Click here to Add Beneficiary') // plus button click
    cy.wait(5000)
    cy.fillValueById(guarantee.activeBene1Name, 'beneficiary_1', true) // add beneficiary 1 details
    cy.wait(5000)
    cy.get('button[aria-label="Click here to Add Beneficiary"]')
    cy.clickByAriaLabel('Click here to Add Beneficiary') // plus button 2 click
    cy.wait(5000)
    cy.fillValueById(guarantee.passiveBene1Name, 'beneficiary_2', true) // add beneficiary 2 details
    
    if (type === 'Applicant') {
      cy.clickByAriaLabel('Issuer')
      cy.get('li[data-value=' + guarantee.AUIssuerId + ']').click()
    }
    
    fillPurposeFormat('Performance GX - AUS')
    cy.fillValueById(guarantee.expiringDate, 'expiresAt')
    cy.fillValueById(guarantee.amount, 'amount')
    cy.clickById('select-termsConditions')
    cy.get('li[data-value=' + guarantee.termsAUS_NSW + ']').click()
    
  })
}

/**
 * JV GX of purpose type commercial agreement Australia
 */
export const jvGuaranteeDetails1 = (type: 'Applicant' | 'Beneficiary' | 'Issuer') => {
  cy.wait(3000)
  cy.get('#applicant').then(() => {
    cy.wait(4000)
    cy.fillValueById(guarantee.applicantName + '{enter}', 'applicant', true)
    cy.fillValueById(guarantee.priBeneName + '{enter}', 'beneficiary_0', true)
    if (type === 'Applicant') {
      cy.clickByAriaLabel('issuer')
      cy.get('li[data-value='+ guarantee.AUIssuerId +']').click()
    }
    cy.clickByAriaLabel('Beneficiarystatus')
    cy.get('li[data-value="ACTIVE"]').click()
    cy.clickByAriaLabel('Purpose Type')
    cy.get('li[data-value="787659ec-f312-41f3-8741-d32a7fa48007"]').click()
    cy.fillValueById('Spots Light', 'purpose\\.propertyDetails\\.propertyName')
    cy.wait(5000)
    cy.clickByAriaLabel('Purpose Type')
    cy.get('li[data-value="787659ec-f312-41f3-8741-d32a7fa48007"]').click()
    cy.fillValueById('Spots Light', 'purpose\\.propertyDetails\\.propertyName')
    cy.fillValueById('3456', 'purpose\\.propertyDetails\\.shopNumber')
    cy.fillValueById('George Street', 'purpose\\.propertyAddress\\.addressStreet')
    cy.fillValueById('Rockdale', 'purpose\\.propertyAddress\\.addressSuburb')
    cy.fillValueById('3214', 'purpose\\.propertyAddress\\.addressPostcode')
    cy.clickById('purpose\\.propertyAddress\\.addressState')
    cy.fillValueByInputAriaLabel('New South Wales{enter}', 'State/Region')
    cy.clickById('purpose\\.propertyAddress\\.addressCountry')
    cy.fillValueByInputAriaLabel('Australia{enter}', 'Country')
    cy.fillValueById('219', 'purpose\\.purpose\\.contractNo')
    cy.fillValueById(guarantee.comment + `${Date()}`, 'purpose\\.purpose\\.comment')
    cy.fillValueById('22112022', 'expiresAt')
    cy.fillValueById('111', 'amount')
    cy.clickById('select-termsConditions')
    cy.get('li[data-value="050c94a5-f181-4a52-9166-fa103aa3ac20"').click()
  })
}

// Not used anywhere as of now
export const whetherLoaderExists = (selector?: string) => {
  const finalSelector = selector
    ? selector
    : 'body > div.jss15.jss1 > div.jss4.jss2 > div > div > div > div:nth-child(2) > div:nth-child(1)'
  return cy.get(finalSelector)
}


/**
 * To get the Guarantee Id of the current guarantee
 */

export const getGxId = () => {
  cy.url().then((res) => {
    const splitted = res.split('/')
    gxId = splitted[splitted.length - 1]
    return gxId
  })
}

/**
 * Enter gx details by unauthorized applicant. issuer name to be disabled
 */
export const fillGxDetailsUnauthAppl = (
  type: 'Applicant' | 'Beneficiary' | 'Issuer',
  optionalCountry?: 'NZ' | null
) => {
  cy.wait(2000)
  cy.get('#applicant').then(() => {
    cy.wait(4000)
    switch (optionalCountry) {
      case 'NZ':
        cy.clickById('applicant')
        cy.fillValueByInputAriaLabel(
          nzGuarantee.applicantName + '{enter}',
          'Search relevant applicant name ',
          true
        )
        cy.clickById('beneficiary_0')
        cy.fillValueByInputAriaLabel(
          nzGuarantee.priBeneName + '{enter}',
          'Search relevant beneficiary_0 name ',
          true
        )
        if (type === 'Applicant') {
          cy.clickByAriaLabel('Issuer')
          cy.get('li[value="85e8a743-228d-4416-912f-4b150c6363f8"]').should(
            'have.css',
            'opacity',
            '0.5'
          )
          cy.reload()
        }
        break

      default:
        cy.clickById('applicant')
        cy.fillValueByInputAriaLabel(
          guarantee.applicantName + '{enter}',
          'Search relevant applicant name ',
          true
        )
        cy.clickById('beneficiary_0')
        cy.fillValueByInputAriaLabel(
          guarantee.priBeneName + '{enter}',
          'Search relevant beneficiary_0 name ',
          true
        )
        if (type === 'Applicant') {
          cy.clickByAriaLabel('Issuer')
          cy.get('li[value="f7cb1854-c0c8-11ea-b3de-0242ac130004"]').should('be.disabled')
        }
        break
    }
  })
}

/**
 * To filter the recent guarantee based on the status provided
 */

export const selectRecentGX = (status) => {
  cy.clickByAriaLabel('filter')
  cy.clickById('select-status')
  switch (status) {
    default:
      cy.get('li[data-value="ACTIVE"]').click()
      break

    case 'CANCELLED':
      cy.get('li[data-value="CANCELLED"]').click()
      break

    case 'PAYWALKED':
      cy.get('li[data-value="PAYWALKED"]').click()
      break

    case 'UPLIFTED':
      cy.get('li[data-value="UPLIFTED"]').click()
      break

    case 'EXPIRED':
      cy.get('li[data-value="EXPIRED"]').click()
      break

    case 'DEMANDED':
      cy.get('li[data-value="DEMANDED"]').click()
      break

    case 'TRANSFERRED':
      cy.get('li[data-value="TRANSFERRED"]').click()
      break
  }
  cy.get('button[type="submit"]').click()
  cy.wait(2000)
  cy.clickById('issuedAt_sort')
  cy.wait(3000)
  cy.clickById('issuedAt_sort')
  cy.clickByAriaLabel('Guarantees table row 1')
}

/**
 * Non JV Payment Guarantee AUS
 */
export const fillPaymentGuaranteeDetails = (type: 'Applicant' | 'Beneficiary' | 'Issuer') => {
  cy.wait(3000)
   cy.get('#applicant').then(() => {
    cy.wait(4000)

    cy.fillValueById(guarantee.applicantName, 'applicant', true)
    cy.fillValueById(guarantee.priBeneName, 'beneficiary_0', true)
    if (type === 'Applicant') {
      cy.clickByAriaLabel('Issuer')
      cy.get('li[data-value=' + guarantee.AUIssuerId + ']').click()
    }
    cy.wait(3000)
    fillPurposeFormat('Payment GX - AUS')
    cy.fillValueById(guarantee.expiringDate, 'expiresAt')
    cy.fillValueById(guarantee.amount, 'amount')
    cy.clickById('select-termsConditions')
    cy.get('li[data-value=' + guarantee.termsAUS_WA + ']').click()
  })
}

/**
 * Non JV international Performance GX - NZL or international Performance GX - AUS
 */
export const fillBeneInit4eyePerfGuaranteeDetails = (
  type: 'Applicant' | 'Beneficiary' | 'Issuer',
  optionalCountry?: 'NZ' | null
) => {
  cy.wait(4000)
  cy.get('#applicant').then(() => {
    cy.wait(4000)
    switch (optionalCountry) {
      case 'NZ':
        cy.get('[type="radio"]').check('international')
        cy.fillValueById(
          nzGuarantee.applicantName4eye + '{enter}',
          'applicant',
          true
          )
        cy.wait(4000)
        cy.fillValueById(
          nzGuarantee.priBeneName + '{enter}',
          'beneficiary_0',
          true
          )
        
        fillPurposeFormat('Performance GX - NZL')
        cy.fillValueById(nzGuarantee.expiringDate, 'expiresAt')
        cy.fillValueById(nzGuarantee.amount, 'amount')
        cy.clickById('select-termsConditions')
        cy.get('li[data-value=' + nzGuarantee.termsNZ2 + ']').click()
        break

      default:
        cy.get('[type="radio"]').check('international')
        cy.clickById('applicant')
        cy.fillValueByInputAriaLabel(
          nzGuarantee.applicantName4eye + '{enter}',
          'Search relevant applicant name ',
          true
        )
        cy.clickById('beneficiary_0')
        cy.fillValueByInputAriaLabel(
          nzGuarantee.priBeneName + '{enter}',
          'Search relevant beneficiary_0 name ',
          true
        )
        if (type === 'Applicant') {
          cy.clickById('issuer_country')
          cy.get('li[data-value="NZL"]').click()
        }
        fillPurposeFormat('Performance GX - AUS')
        cy.fillValueById(guarantee.expiringDate, 'expiresAt')
        cy.fillValueById(guarantee.amount, 'amount')
        cy.clickById('select-termsConditions')
        cy.get('li[data-value=' + guarantee.termsAUS_NSW + ']').click()
        break
    }
  })
}

/**
 * Select issuer by applicant on a bene init request
 */
export const selectsIssuer = (issuerName) => {
  cy.get('div#select-issuer').click()
  cy.wait(5000)
  cy.get('li[data-value=' + issuerName + ']').click()
}

/**
 * approve gx by any user/issuer
 */
export const approveGuarantee = () => {
  cy.wait(10000)
  cy.get('span:contains("APPROVE")').parent().click()
  cy.wait(2000)
  cy.get('span:contains("Proceed")').parent().click()
  cy.wait(15000)
}

/**
 * issuer prefill performance guarantee australia
 */
export const issuerPrefillPerfGuaranteeDetails = () => {
  cy.wait(4000)
  cy.get('#applicant').then(() => {
    cy.wait(4000)
    cy.fillValueById(guarantee.applicantName4eye, 'applicant', true)
    cy.wait(4000)
    cy.fillValueById(guarantee.priBeneName, 'beneficiary_0', true)
    fillPurposeFormat('Performance GX - AUS')
    cy.fillValueById(guarantee.expiringDate, 'expiresAt')
    cy.fillValueById(guarantee.amount, 'amount')
    cy.clickById('select-termsConditions')
    cy.get('li[data-value=' + guarantee.termsAUS_NSW + ']').click()
  })
}

/**
 * applicant rejects prefill request
 */
export const rejectPrefillGuarantee = () => {
  cy.wait(3000)
  cy.get('span:contains("REJECT")').parent().click()
  cy.get('span:contains("Proceed")').parent().click()
  cy.wait(15000)
}

/**
 * 4E Applicant, 4E Bene, Issuer - Commercial Agreement AUS/NZL
 */
export const fill4eyeGuaranteeDetails = (
  type: userType,
  optionalCountry?: 'NZ' | null
) => {
  cy.wait(4000)
  cy.get('#applicant')
  cy.wait(4000).then(() => {
    switch (optionalCountry) {
      case 'NZ':
        cy.fillValueById(
          nzGuarantee.applicantName4eye + '{enter}',
          'applicant',
          true
        )
         cy.fillValueById(
          nzGuarantee.beneName4eye + '{enter}',
          'beneficiary_0',
          true
        )
      cy.wait(2000)
        if (type === 'Applicant') {
          cy.clickByAriaLabel('Issuer')
          cy.get('li[data-value=' + nzGuarantee.issuerNameNZ + ']').click()
        }
        fillPurposeFormat('Commercial Agreement - NZL')
        cy.fillValueById(nzGuarantee.expiringDate, 'expiresAt')
        cy.fillValueById(nzGuarantee.amount, 'amount')
        cy.clickById('select-termsConditions')
        cy.get('li[data-value=' + nzGuarantee.termsNZ2 +']').click()
        break

      default:
        cy.get('[type="radio"]').check('international')
        cy.clickById('applicant')
        cy.fillValueByInputAriaLabel(
          guarantee.applicantName4eye + '{enter}',
          'Search relevant applicant name ',
          true
        )
        cy.fillValueByInputAriaLabel(
          guarantee.beneName4eye + '{enter}',
          'Search relevant beneficiary_0 name ',
          true
        )
            cy.wait(2000)
        if (type === 'Applicant') {
          cy.clickById('issuer_country')
          cy.get('li[data-value="NZL"]').click()
        }
        fillPurposeFormat('Commercial Agreement - AUS')
        cy.fillValueById(guarantee.expiringDate, 'expiresAt')
        cy.fillValueById(guarantee.amount, 'amount')
        cy.clickById('select-termsConditions')
        cy.get('li[data-value='+ guarantee.termsAUS_NSW +']').click()
        break
    }
  })
}

/**
 * Uplift gx request
 */
export const upliftGuarantee = () => {
  cy.get('#uplift-btn').then(() => {
    cy.clickById('uplift-btn').then(() => {
      cy.get('span:contains("Proceed")').parent().click()
    })
  })
}

/**
 * NZ JV Performance gx details
 */
export const nzJVPerfGuaranteeDetails = (type: 'Applicant' | 'Beneficiary' | 'Issuer') => {
  cy.wait(3000).then(() => {
    cy.get('#applicant').then(() => {
      cy.wait(4000)
      cy.wait('@matchedOrgUrl').then(() => {
        cy.fillValueById(nzGuarantee.applicantName + '{enter}','applicant',true)
        cy.fillValueById(nzGuarantee.priBeneName + '{enter}', 'beneficiary_0', true) // add beneficiary details
        cy.get('button[aria-label="Click here to Add Beneficiary"]') // get plus button
        cy.clickByAriaLabel('Click here to Add Beneficiary') // plus button click
        cy.wait(2000)
        cy.fillValueById(nzGuarantee.activeBene1Name + '{enter}', 'beneficiary_1', true) // add beneficiary 1 details
        cy.get('button[aria-label="Click here to Add Beneficiary"]')
        cy.clickByAriaLabel('Click here to Add Beneficiary') // plus button 2 click
        cy.wait(2000)
        cy.fillValueById(nzGuarantee.passiveBene1Name + '{enter}', 'beneficiary_2', true) // add beneficiary 2 details

        if (type === 'Applicant') {
          cy.clickByAriaLabel('Issuer')
          cy.wait(1000)
          cy.get('li[data-value=' + nzGuarantee.issuerNameNZ + ']').click()
        }
        fillPurposeFormat('Performance GX - NZL')
        cy.fillValueById(nzGuarantee.expiringDate, 'expiresAt')
        cy.fillValueById(nzGuarantee.amount, 'amount')
        cy.clickById('select-termsConditions')
        cy.get('li[data-value=' + nzGuarantee.termsNZ2 + ']').click()
      })

    })
  })
}

/**
 * reject guarantee request
 */
export const rejectGuarantee = () => {
  cy.wait(3000)
  cy.get('span:contains("REJECT")').parent().click()
  cy.get('span:contains("Proceed")').parent().click()
  cy.wait(15000)
}

/**
 * edit permission on an active beneficiary passed as parameter
 */
export const editPermission = (activeBeneficiary) => {
  cy.wait(7000)
  cy.get('span:contains("EDIT PERMISSIONS")').parent().click()
  cy.wait(2000)
  cy.xpath("//p[contains(text(),'"+activeBeneficiary+"')]//following::div[1]").click().then(() => {
    cy.get('li[data-value="ACTIVE"]').click()
    cy.get('span:contains("SAVE")').parent().click()
    cy.wait(7000)

  })  
}

/**
 * fill purpose format and all other related fields
 */
export const fillPurposeFormat = (PurposeType) => {
  cy.clickByAriaLabel('Purpose Type')
  switch (PurposeType) {
 case 'Performance GX - NZL':
      cy.get('li[data-value=' + nzGuarantee.purpTypePerfGx + ']').click()
      cy.fillValueById(nzGuarantee.contractName, 'purpose.contractName')
      cy.fillValueById(nzGuarantee.contractNum, 'purpose.contractNumber')
      cy.fillValueById(nzGuarantee.contractStartDate, 'purpose.contractStartDate')
      cy.fillValueById(nzGuarantee.contractEndDate, 'purpose.contractEndDate')
      cy.fillValueById(nzGuarantee.contractDescription, 'purpose.contractDescription') 
      cy.fillValueById(nzGuarantee.comment + `${Date()}`, 'purpose.optionalComments')
      break

    case 'Commercial Agreement - NZL':
      cy.get('li[data-value=' + nzGuarantee.purpTypeCommNZ + ']').click()
      cy.fillValueById(nzGuarantee.propertyName, 'purpose.propertyDetails.propertyName')
      cy.fillValueById(nzGuarantee.shopNum, 'purpose.propertyDetails.shopNumber')
      cy.fillValueById(nzGuarantee.addrStreet, 'purpose.propertyAddress.addressStreet')
      cy.fillValueById(nzGuarantee.addrSuburb, 'purpose.propertyAddress.addressSuburb')
      cy.fillValueById(nzGuarantee.addrPostcode, 'purpose.propertyAddress.addressPostcode')
      cy.fillValueById(nzGuarantee.addrState, 'purpose.propertyAddress.addressState')
      cy.fillValueById(nzGuarantee.addrCtryAUS +'{enter}', 'purpose.propertyAddress.addressCountry')
      cy.fillValueById(nzGuarantee.contractNum, 'purpose.purpose.contractNo') 
      cy.fillValueById(nzGuarantee.comment + `${Date()}`, 'purpose.purpose.comment')
      break

    case 'Payment GX - AUS':
      cy.get('li[data-value=' + guarantee.purpTypePayGxAU + ']').click()
      cy.fillValueById(guarantee.contractName, 'purpose.contractName')
      cy.fillValueById(guarantee.contractNum, 'purpose.contractNumber')
      cy.fillValueById(guarantee.contractStartDate, 'purpose.contractStartDate')
      cy.fillValueById(guarantee.contractEndDate, 'purpose.contractEndDate')
      cy.fillValueById(guarantee.contractDescription, 'purpose.contractDescription') 
      cy.fillValueById(guarantee.comment + `${Date()}`, 'purpose.optionalComments')
      break
      
    case 'Commercial Agreement - AUS':
      cy.get('li[data-value=' + guarantee.purpTypeCommAUS + ']').click()
      cy.fillValueById(guarantee.propertyName, 'purpose.propertyDetails.propertyName')
      cy.fillValueById(guarantee.shopNum, 'purpose.propertyDetails.shopNumber')
      cy.fillValueById(guarantee.addrStreet, 'purpose.propertyAddress.addressStreet')
      cy.fillValueById(guarantee.addrSuburb, 'purpose.propertyAddress.addressSuburb')
      cy.fillValueById(guarantee.addrPostcode, 'purpose.propertyAddress.addressPostcode')
      cy.fillValueById(guarantee.addrState, 'purpose.propertyAddress.addressState')
      cy.fillValueById(guarantee.addrCtryAUS +'{enter}', 'purpose.propertyAddress.addressCountry')
      cy.fillValueById(guarantee.contractNum, 'purpose.purpose.contractNo') 
      cy.fillValueById(guarantee.comment + `${Date()}`, 'purpose.purpose.comment')
      break

      case 'Performance GX - AUS':
        cy.get('li[data-value=' + guarantee.purpTypePerfGxAU + ']').click()
        cy.fillValueById(guarantee.contractName, 'purpose.contractName')
        cy.fillValueById(guarantee.contractNum, 'purpose.contractNumber')
        cy.fillValueById(guarantee.contractStartDate, 'purpose.contractStartDate')
        cy.fillValueById(guarantee.contractEndDate, 'purpose.contractEndDate')
        cy.fillValueById(guarantee.contractDescription, 'purpose.contractDescription') 
        cy.fillValueById(guarantee.comment + `${Date()}`, 'purpose.optionalComments')
        break
        
        default:
          cy.get('li[data-value=' + nzGuarantee.purpTypePerfGx + ']').click()
          cy.fillValueById(nzGuarantee.contractName, 'purpose.contractName')
          cy.fillValueById(nzGuarantee.contractNum, 'purpose.contractNumber')
          cy.fillValueById(nzGuarantee.contractStartDate, 'purpose.contractStartDate')
          cy.fillValueById(nzGuarantee.contractEndDate, 'purpose.contractEndDate')
          cy.fillValueById(nzGuarantee.contractDescription, 'purpose.contractDescription') 
          cy.fillValueById(nzGuarantee.comment + `${Date()}`, 'purpose.optionalComments')
          break

  }

}

/**
 * uplift gx with reason
 */
export const upliftGuaranteeWithReason = () => {
  cy.get('#uplift-btn').then(() => {
    cy.clickById('uplift-btn').then(() => {
      cy.fillValueById(nzGuarantee.upliftReason + `${Date()}`, 'reasons')
      cy.get('span:contains("Proceed")').parent().click()
      cy.wait(15000)
    })

  })
}

/**
 * Domestic JV GX, Payment Guarantee AUS
 */
export const jvGxDetailsPPFTypePayGx = (type: 'Applicant' | 'Beneficiary' | 'Issuer') => {
  cy.wait(3000)
  cy.get('#applicant').then(() => {
    cy.wait(4000)
    cy.wait('@matchedOrgUrl').then(() => {
      cy.fillValueById(guarantee.priBeneName, 'beneficiary_0', true) // add beneficiary details
      cy.get('button[aria-label="Click here to Add Beneficiary"]') // get plus button
      cy.clickByAriaLabel('Click here to Add Beneficiary') // plus button click
      cy.fillValueById(guarantee.activeBene1Name, 'beneficiary_1', true) // add beneficiary 1 details
      cy.wait(2000)
      cy.get('button[aria-label="Click here to Add Beneficiary"]')

      cy.clickByAriaLabel('Click here to Add Beneficiary') // plus button 2 click
      cy.wait(2000)
      cy.fillValueById(guarantee.passiveBene1Name, 'beneficiary_2', true) // add beneficiary 2 details

      if (type === 'Applicant') {
        cy.clickByAriaLabel('Issuer')
        cy.wait(500)
        cy.get('li[data-value='+ guarantee.AUIssuerId +']').click()
      }
      cy.wait(5000)
      fillPurposeFormat('Payment GX - AUS')
      cy.fillValueById(guarantee.expiringDate, 'expiresAt')
      cy.fillValueById(guarantee.amount, 'amount')
      cy.clickById('select-termsConditions')
      cy.get('li[data-value=' + guarantee.termsAUS_WA + ']').click()
    })
  })
}

/**
 * accept uplift prefill request
 */
export const acceptUpliftPrefill = () => {
  cy.wait(5000)
  cy.get('span:contains("ACCEPT UPLIFT PREFILL")').parent().click()
  cy.get('span:contains("Proceed to uplift")').parent().click()
  cy.wait(15000)
}

/**
 * Checks the error message for an user with managerial role
 */
 export const chkErrMsg_NonMgrUser_ActsOnGx = () => {
  cy.xpath('/html/body/div/div/div[3]/div[1]/div[6]/p').contains(errorMsg.errMsg_NonManagerRoleUsrActsOnGx)
}

/**
 * Check the error message when user enter less than 3 char as IRN
 */
export const chkErrMsg_ReqPendingWithAppr = () => {
  cy.wait(3000)
  cy.xpath('/html/body/div/div/div[3]/div[2]/div[2]/div[5]/p').contains(errorMsg.errMsg_PendingWithAppr)
}

/**
 * JV GX with 4E Applicant, 2E primary, active and passive bene, 2E issuer, purpose type Commercial Agreement - AUS
 */
export const jvCommAgreemntGuaranteeDetails = (type: 'Applicant' | 'Beneficiary' | 'Issuer') => {
  cy.wait(3000)
  cy.get('#applicant').then(() => {
    cy.wait(4000)
    cy.fillValueById(guarantee.applicantName4eye,'applicant',true)
    cy.fillValueById(guarantee.priBeneName, 'beneficiary_0', true) // add beneficiary details
    cy.get('button[aria-label="Click here to Add Beneficiary"]') // get plus button
    cy.clickByAriaLabel('Click here to Add Beneficiary') // plus button click
    cy.wait(5000)
    cy.fillValueById(guarantee.activeBene1Name, 'beneficiary_1', true) // add beneficiary 1 details
    cy.wait(5000)
    cy.get('button[aria-label="Click here to Add Beneficiary"]')
    cy.clickByAriaLabel('Click here to Add Beneficiary') // plus button 2 click
    cy.wait(5000)
    cy.fillValueById(guarantee.passiveBene1Name, 'beneficiary_2', true) // add beneficiary 2 details
    
    if (type === 'Applicant') {
      cy.clickByAriaLabel('Issuer')
      cy.get('li[data-value=' + guarantee.AUIssuerId + ']').click()
    }
    
    fillPurposeFormat('Commercial Agreement - AUS')
    cy.fillValueById(guarantee.expiringDate, 'expiresAt')
    cy.fillValueById(guarantee.amount, 'amount')
    cy.clickById('select-termsConditions')
    cy.get('li[data-value=' + guarantee.termsAUS_WA + ']').click()
    
  })
}