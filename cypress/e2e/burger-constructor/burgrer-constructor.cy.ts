import ingredientsData from '../../fixtures/ingredients.json';
import orderResponse from '../../fixtures/orders-created.json';

const apiUrl = process.env.BURGER_API_URL;

describe('Testing modal functionality', () => {
    beforeEach(() => {
        cy.intercept(`${apiUrl}/ingredients`, ingredientsData);
        cy.visit('/');
        cy.contains('Соберите бургер').should('be.visible');
    });

    it('Should open and close the modal window', () => {
        cy.get('#modals').as('modal');
        cy.contains('Краторная булка').click();
        const windowSelector = '@modal';
        cy.get(windowSelector).contains('Краторная булка');
        cy.get(windowSelector).find('button').click();
        cy.contains(windowSelector).should('not.exist');
    });
});

describe('Authentication flow', () => {
    beforeEach(() => {
        cy.clearCookies();
        cy.clearAllLocalStorage();
    });

    afterEach(() => {
        cy.clearCookies();
        cy.clearAllLocalStorage();
    });

    it('Allows user to login via login page', () => {
        cy.login();
        cy.location('pathname').should('eq', '/');
        cy.contains('Test User').should('be.visible');
        cy.getCookie('accessToken').should('have.property', 'value', 'mock');
    });
});

describe('Burger constructor scenarios', () => {
    beforeEach(() => {
        cy.clearCookies();
        cy.clearAllLocalStorage();
        cy.intercept(`${apiUrl}/ingredients`, ingredientsData);
        cy.setCookie('accessToken', 'mocktoken');
        cy.visit('/');
        cy.contains('Соберите бургер').should('be.visible');
    });

    afterEach(() => {
        cy.clearCookies();
        cy.clearAllLocalStorage();
    });

    it('Redirects unauthenticated user to login on order', () => {
        cy.contains('Краторная булка').closest('li').find('button').click();
        cy.contains('Биокотлета').closest('li').find('button').click();
        cy.contains('2934');
        cy.contains('Оформить заказ').click();
        cy.location('pathname').should('eq', '/login');
    });

    it('Allows authenticated user to create an order', () => {
        cy.get('#modals').as('modal');
        cy.intercept('POST', '**/api/orders', orderResponse);
        cy.login();
        cy.contains('Краторная булка').closest('li').find('button').click();
        cy.contains('Биокотлета').closest('li').find('button').click();
        cy.contains('Оформить заказ').click();

        cy.contains('идентификатор заказа');
        cy.contains('78651');

        cy.get('@modal').find('button').click();
        cy.contains('Выберите булки');
        cy.contains('Выберите начинку');
    });

    it('Ingredients are added in constructor', () => {
        cy.contains('Краторная булка').closest('li').find('button').click();
        cy.contains('Биокотлета').closest('li').find('button').click();

       cy.contains('Краторная булка N-200i (верх)');
       cy.contains('Краторная булка N-200i (низ)');
       cy.contains('Оформить').closest('section').contains('Биокотлета из марсианской Магнолии');
    });
});
