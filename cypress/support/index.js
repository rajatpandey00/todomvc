import {
    fillValueById,
    fillValueByAriaLabel,
    fillValueByInputAriaLabel
} from '../commands/fillBy';
import {
    clickById,
    clickByAriaLabel,
    clickByLabel,
    clickByTitleOfButton
} from '../commands/clickBy';
import { sendAPIRequest } from '../commands/sendAPIRequest';

Cypress.Commands.add('fillValueById', fillValueById);
Cypress.Commands.add('clickById', clickById);
Cypress.Commands.add('sendAPIRequest', sendAPIRequest);
Cypress.Commands.add('fillValueByAriaLabel', fillValueByAriaLabel);
Cypress.Commands.add('fillValueByInputAriaLabel', fillValueByInputAriaLabel);
Cypress.Commands.add('clickByAriaLabel', clickByAriaLabel);
Cypress.Commands.add('clickByTitleOfButton', clickByTitleOfButton);
Cypress.Commands.add('clickByLabel', clickByLabel);