declare global {
    namespace Cypress {
        interface Chainable {
            sendAPIRequest: typeof sendAPIRequest;
        }
    }
}

export const sendAPIRequest = (urlToHit: string, method: 'GET' | 'POST' | 'PUT' | 'DELETE', apikey: string, ReqBody: object) => {
    const Options = {
        url: urlToHit,
        failOnStatusCode: false,
        method,
        headers: {
            'Authorization': apikey
        },
        body: ReqBody
    }
    return cy.request(Options)
}