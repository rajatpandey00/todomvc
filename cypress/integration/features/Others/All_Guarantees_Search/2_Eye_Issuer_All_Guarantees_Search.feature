Feature: As a platform user
I must be able to search for digital bank guarantee that relates to me
using the filter options available

Scenario: User searches for guarantees with applicant, beneficiary and issuer name
Given the user has an existing guarantee on the platofrm
When the user navigates to the All guarantees page 
And selects the filter option
Then the filter search pop up should be displayed
When the user performs search using the status of the guarantee as active
Then the user should be redirected to the All guarantees page
And the filtered guarantee results should be displayed
When the user navigates through the pages
Then the filtered guarantee results should be displayed
When the user changes the rows per page
Then the number of results displayed changes as per the selection
When the user clicks on the csv download options
Then the csv download should be successful