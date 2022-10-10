Feature: As a user, I should be able to access the application using valid credentials only

    Scenario: Error message thrown when user uses invalid credentials
        Given User navigates to the user portal
        When User enters the <email> and <password> as Beneficiary
            | email                        | password       |
            | 910000004_U1@lygonqatest.com | 5dsC@m6aEa5%35 |
        And User click on login button
        Then Error<error> message is thrown
            | error                                                |
            | The email or password that you entered is incorrect. |


    Scenario: User is able login successfully using valid password
        Given User navigates to the user portal
        When User enters the <email> and <password> as Beneficiary
            | email                        | password              |
            | 910000004_U1@lygonqatest.com | 5dsC@m6aEa5%35ie75aB2 |
        And User click on login button
        Then User is able to login successfully to the landing page
        And The user is able to logout successfully
