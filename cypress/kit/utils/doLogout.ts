export const logout = () => {
    cy.get('button[title="User Menu"]').click().then(() => {
        cy.get('li[aria-label="Log Out"]').click();
        return cy.clearCookies()
    })
   
}