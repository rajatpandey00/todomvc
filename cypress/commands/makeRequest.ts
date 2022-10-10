declare global {
    namespace Cypress {
        interface Chainable {
            makeRequest: typeof makeRequest;
        }
    }
}

export const makeRequest = (urlToHit: string, method: 'GET' | 'POST', additionalOptions: Object | {}) => {
   const requestObject = {
       url: urlToHit,
       method,
       headers: {
        'Authorization': 'Bearer APIKEY-8c1a2d26-85ff-4e2a-b318-0da582a86d12'
    },
    ...additionalOptions
   }
   return cy.request(requestObject)
}