// ==UserScript==
// @name     Remove All Connections
// @version  1
// @grant    none
// @require https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js 
// @description This script will remove ALL connections that get listed on a Connections page.
// 							Useful when you want to remove all connections from a specific company, or any filter. 
//							It could be improved by creating a Remove button that needs to be clicked on the Connection Page instead. 
// ==/UserScript==

//***** USER CONFIG - FILL THIS OUT! *****//

// Find the CSRF Token by 'Inspecting Element' and searching for 'CSRF'
const CSRF_TOKEN = '';

//***** END USER CONFIG!!! *****//

$(async function() {
  
  let userProfileUrls = [];
  $('.app-aware-link').each(function(i, el) { 
    userProfileUrls.push($(el).attr('href')) 
  });
  userProfileUrls = [...new Set(userProfileUrls)];
  
  
  let userUrns = [];
  userProfileUrls.forEach(userProfileUrl => {
    let userUrn = decodeURIComponent(new URL(userProfileUrl).search);
    if (userUrn.includes('?miniProfileUrn=urn:li:fs_miniProfile:')) {
      userUrns.push(userUrn.replace('?miniProfileUrn=urn:li:fs_miniProfile:', ''));
    }
  });
  
  for (let userUrn of userUrns) {
    console.log(`About to remove ${userUrn}`);
    try {
      const data = await removeConnection(userUrn);
      console.log(`Request succeeded`);
      console.log(data);
    } catch (error) {
      console.log(`Request failed`);
      console.log(error);
    }
  }
  
  function removeConnection(userUrn) {
    return new Promise((resolve, reject) => {
      var settings = {
        "url": "https://www.linkedin.com/voyager/api/relationships/dash/memberRelationships?action=removeFromMyConnections&decorationId=com.linkedin.voyager.dash.deco.relationships.MemberRelationship-28",
        "method": "POST",
        "timeout": 0,
        "headers": {
          "User-Agent": " yo mama",
          "Accept": " application/vnd.linkedin.normalized+json+2.1",
          "Accept-Language": " en-US,en;q=0.5",
          "Accept-Encoding": " gzip, deflate, br",
          "x-li-deco-include-micro-schema": " true",
          "x-li-lang": " en_US",
          "x-li-track": " {\"clientVersion\":\"1.10.697\",\"mpVersion\":\"1.10.697\",\"osName\":\"web\",\"timezoneOffset\":-5,\"timezone\":\"America/New_York\",\"deviceFormFactor\":\"DESKTOP\",\"mpName\":\"voyager-web\",\"displayDensity\":2,\"displayWidth\":3024,\"displayHeight\":1964}",
          "x-li-page-instance": " urn:li:page:d_flagship3_profile_view_base;tPkMPgoIRxO34fLNy3uf5Q==",
          "csrf-token": CSRF_TOKEN,
          "x-restli-protocol-version": " 2.0.0",
          "content-type": " application/json; charset=utf-8",
          "Content-Length": " 81",
          "Origin": " https://www.linkedin.com",
          "Connection": " keep-alive",
          "Referer": " https://www.linkedin.com/in/billgates/",
          "Sec-Fetch-Dest": " empty",
          "Sec-Fetch-Mode": " cors",
          "Sec-Fetch-Site": " same-origin",
          "TE": " trailers"
        },
        "data": `{"connectionUrn":"urn:li:fsd_connection:${userUrn}"}\n`,
      };

      $.ajax(settings).done(function (response) {
        console.log(response);
				return resolve(response);
      });
    });
  }
  
});
