## Protected Resource Profile
<!-- ### [4.](#rfc.section.4) Protected Resource Profile -->

<!-- ### [4.1.](#rfc.section.4.1) [Protecting Resources](#ProtectingResources) -->
### Protecting Resources

Protected Resources grant access to clients if they present a valid <samp>access_token</samp> with the appropriate <samp>scope</samp>. Resource servers trust the authorization server to authenticate the end user and client appropriately for the importance, risk, and value level of the protected resource scope.

Protected resources that require a higher end-user authentication trust level to access certain resources MUST associate those resources with a unique scope.

Clients wishing access to these higher level resources MUST include the higher level scope in their authorization request to the authorization server.

Authorization servers MUST authenticate the end-user with the appropriate trust level before providing an <samp>authorization_code</samp> or associated <samp>access_token</samp> to the client.

Authorization servers MUST only grant access to higher level scope resources to clients that have permission to request these scope levels. Client authorization requests containing scopes that are outside their permission MUST be rejected.

Authorization servers MAY set the expiry time (<samp>exp</samp>) of access_tokens associated with higher level resources to be shorter than access_tokens for less sensitive resources.

Authorization servers MAY allow a <samp>refresh_token</samp> issued at a higher level to be used to obtain an access_token for a lower level resource scope with an extended expiry time. The client MUST request both the higher level scope and lower level scope in the original authorization request. This allows clients to continue accessing lower level resources after the higher level resource access has expired -- without requiring an additional user authentication/authorization.

<aside class="example">
A resource server has resources classified as "public" and "sensitive". "Sensitive" resources require the user to perform a two-factor authentication, and those access grants are short-lived: 15 minutes. For a client to obtain access to both "public" and "sensitive" resources, it makes an authorization request to the authorization server with <samp>scope=public+sensitive</samp>. The authorization server authenticates the end-user as required to meet the required trust level (two-factor authentication or some approved equivalent) and issues an <samp>access_token</samp> for the "public" and "sensitive" scopes with an expiry time of 15mins, and a <samp>refresh_token</samp> for the "public" scope with an expiry time of 24 hrs. The client can access both "public" and "sensitive" resources for 15mins with the access_token. When the access_token expires, the client will NOT be able to access "public" or "sensitive" resources any longer as the access_token has expired, and must obtain a new access_token. The client makes a access grant request (as described in [OAuth 2.0] [[rfc6749]] section 6) with the refresh_token, and the reduced scope of just "public". The token endpoint validates the refresh_token, and issues a new access_token for just the "public" scopewith an expiry time set to 24hrs. An access grant request for a new access_token with the "sensitive" scope would be rejected, and require the client to get the end-user to re-authenticate/authorize the "sensitive" scope request.
</aside>

In this manner, protected resources and authorization servers work together to meet risk tolerance levels for sensitive resources and end-user authentication.

<!-- iGov-NL : Start of the additional content -->
<aside class=" addition">
<b>iGov-NL : Additional content</b></br>  

<aside class="example">

Request:
```
GET /resource HTTP/1.1
Authorization: Bearer 4f626847-91b1-3417-a91e-c5627f377ae1
Accept: text/plain, application/json, application/*+json, */*
Host: resource.com
Connection: Keep-Alive
User-Agent: Apache-HttpClient/4.2.3 (java 1.5)
```

Response:
```
  HTTP/1.1 200 OK
  Content-Type: application/json
  {
   "sub": "248289761001",
   "name": "Jane Doe",
   "given_name": "Jane",
   "family_name": "Doe",
   "preferred_username": "j.doe",
   "email": "janedoe@example.com",
   "picture": "http://example.com/janedoe/me.jpg"
  }
```
</aside>
</aside>
<!-- iGov-NL : End of the additional content -->

<!-- ### [4.2.](#rfc.section.4.2) Connections with Clients -->
### Connections with Clients

A protected resource MUST accept bearer tokens passed in the authorization header as described in [[rfc6750]] . A protected resource MAY also accept bearer tokens passed in the form parameter ~~or query parameter~~ method~~s~~.

<!-- iGov-NL : Start of the additional content -->
<aside class=" addition">
<b>iGov-NL : Additional content</b></br>  

A Protected Resource under this profile MUST NOT accept access tokens passed using the query parameter method.

A Protected Resource under this profile SHOULD verify if the client is the Authorized party (azp) when client authentication is used. See section [Advanced OAuth Security Options](#advanced-oauth-security-options) as well.

</aside>
<!-- iGov-NL : End of the additional content -->


Protected resources MUST define and document which scopes are required for access to the resource.

<!-- ### [4.3.](#rfc.section.4.3) Connections with Authorization Servers -->
### Connections with Authorization Servers

Protected resources MUST interpret access tokens using either JWT, token introspection, or a combination of the two.

The protected resource MUST check the <samp>aud</samp> (audience) claim, if it exists in the token, to ensure that it includes the protected resource's identifier. The protected resource MUST ensure that the rights associated with the token are sufficient to grant access to the resource. For example, this can be accomplished by querying the scopes and acr associated with the token from the authorization server's token introspection endpoint.

A protected resource MUST limit which authorization servers it will accept valid tokens from. A resource server MAY accomplish this using a whitelist of trusted servers, a dynamic policy engine, or other means.
