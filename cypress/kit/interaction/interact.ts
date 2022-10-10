
export const visit = (url: string) => cy.visit(url)
export const clickLogin = () => {
    cy.clickById('cd_login_button')
}
export const fillPassword = (password: string) => {
    return cy.fillValueById(password, 'password')
}

export const fillEmail = (email: string) => {
    return cy.fillValueById(email, 'email')
}

export const fillApplicant = (applicantName: string) => {
    return cy.fillValueById(applicantName, 'applicant')
}

export const fillNBeneficiary = (value: string, benNumber: number) => { 
    return cy.fillValueById(value, `beneficiary_${benNumber}`)
}

export const fillIssuerDetails = (issuerName: string) => {
    return cy.fillValueById(issuerName, 'issuer')
}
