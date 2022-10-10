export const navigateToNeedsAction = () => {
    return cy.get('a[href="/needsaction"]').click()
}
export const navigateToNotifications = () => {
    return cy.get('a[href="/notifications"]').click()
}
export const navigateToPendingRequests = () => {
    return cy.get('a[href="/pending-gx"]').click()
}
export const navigateToDashboard = () => {
    return cy.get('a[href="/dashboard"]').click()
}
export const navigateToAllGuarantees = () => {
    return cy.get('a[href="/gx"]').click({force:true})
}
export const navigateToGuaranteeRequests = () => {
    return cy.get('a[href="/guarantee-requests"]').click()
}
export const navigateToOrganisations = () => {
    return cy.get('a[href="/organisations"]').click()
}
export const navigateToOnBoardlingList = () => {
    return cy.get('a[href="/onboardinglist"]').click()
}

// export const navigateToMarketPolicyAsIssuer = () => {
//     cy.get('button[title="User Menu"]').click();
//     cy.get('li[aria-label="Link to Settings Screen"]').click();
//     return cy.xpath('html/body/div/div/div[2]/div/div[1]/ul/li[5]/a/div/div/div/div[1]/p').click()
// }
export const navigateToUserManagement = () => {
    cy.get('button[title="User Menu"]').click();
    cy.get('li[aria-label="Link to Settings Screen"]').click();
    return cy.get('a[href="/settings/usermanagement"]').click()
}


export const navigateToOrgDetails = () => {
    cy.get('button[title="User Menu"]').click();
    cy.get('li[aria-label="Link to Settings Screen"]').click();
    return cy.get('a[href="/settings/organisationdetails"]').click()
}