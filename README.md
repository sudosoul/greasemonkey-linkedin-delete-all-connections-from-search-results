# greasemonkey-linkedin-delete-all-connections-from-search-results
This Greasemonkey script, when enabled, will delete all the current connections shown on a search results page. Useful if you want to remove all connections from SomeEvilCompany. Just go to connections, and filter by the company, activate the greasemonkey script, and then keep refreshing. Every time you refresh the page, it removes all those users as your connection. Some manual set up required. 

# Steps
DONT ENABLE THE SCRIPT YET!

1. Go to this page here - https://www.linkedin.com/mynetwork/invite-connect/connections/
2. Set up your search according to whatever filters you want to apply. For example, you may want to filter by all users from EvilCompany Inc. 
3. Once you have the filter set, you should see a page of 10 of your current connections belonging to the filter you set. 
4. Grab the CSRF Token from the page, by Right Clicking, Inspect Element, and Search for CSRF -- It should look something like `ajax:31274812374`
5. Once you have the CSRF token, add the script to Greasemonkey, and assign the CSRF token value to the `const CSRF_TOKEN` variable at the top. 
6. Sure you ready? This will delete all 10 users shown per page. 
7. If so, enable the script, and then refresh. Bam! You just removed those 10 users as connections. Refresh again, and you will remove the next 10 users as connections. Keep refreshing until you've removed all relevant users as connections. 
8. Enjoy your new peace of mind. 
