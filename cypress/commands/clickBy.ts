declare global {
    namespace Cypress {
        interface Chainable {
            clickById: typeof clickById;
            clickByAriaLabel: typeof clickByAriaLabel;
            clickByLabel: typeof clickByLabel;
            clickByTitleOfButton: typeof clickByTitleOfButton;
        }
    }
}

export const clickById = (id: string) => {
    const selector = cy.get(`[id="${id}"]`)
    return selector?.click({ force: true })
}

export const clickByAriaLabel = (label: string) => {
    const selector = cy.get(`[aria-label="${label}"]`)
    return selector?.click({ force: true })
}

export const clickByLabel = (label: string) => {
    const selector = cy.get(`label[for="${label}"]`)
    return selector?.click()
}

export const clickByTitleOfButton = (title: string) => {
    const selector = cy.get(`button[title="${title}"]`)
    return selector?.click()
}