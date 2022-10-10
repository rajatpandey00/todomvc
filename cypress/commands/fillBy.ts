declare global {
  namespace Cypress {
    interface Chainable {
      fillValueById: typeof fillValueById;
      fillValueByAriaLabel: typeof fillValueByAriaLabel;
      fillValueByInputAriaLabel: typeof fillValueByInputAriaLabel;
      fillValueByDataTestId: typeof fillValueByDataTestId;
    }
  }
}

export const fillValueById = (valueToBeFilled: string, id: string, withDelay: boolean = false) => {
  const selector = cy.get(`[id="${id}"]`)
  return withDelay
    ? selector?.type(valueToBeFilled, { delay: 500 })
    : selector?.type(valueToBeFilled)
}

export const fillValueByAriaLabel = (valueToBeFilled: string, ariaLabel: string) => {
  const selector = cy.get(`[aria-label="${ariaLabel}"]`)
  return selector?.type(valueToBeFilled)
}

export const fillValueByInputAriaLabel = (
  valueToBeFilled: string,
  ariaLabel: string,
  withDelay: boolean = false
) => {
  const selector = cy.get(`input[aria-label="${ariaLabel}"]`)
  withDelay
    ? selector?.type(valueToBeFilled, { delay: 500, force: true })
    : selector?.type(valueToBeFilled)
}

export const fillValueByDataTestId = (
  valueToBeFilled: string,
  data_testid: string,
  withDelay: boolean = false
) => {
  const selector = cy.get(`[data_testid="${data_testid}"]`)
  return withDelay
    ? selector?.type(valueToBeFilled, { delay: 500 })
    : selector?.type(valueToBeFilled)
}

