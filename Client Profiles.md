## Client Profiles
<!-- ### [2.](#rfc.section.2) [Client Profiles](#ClientProfiles) -->

<!-- ### [2.1.](#rfc.section.2.1) [Client Types](#ClientTypes) -->
### Client Types

The following profile descriptions give patterns of deployment for use in different types of client applications based on the OAuth grant type. Additional grant types, such as assertions, chained tokens, or other mechanisms, are out of scope of this profile and must be covered separately by appropriate profile documents.

<!-- ### [2.1.1.](#rfc.section.2.1.1) [Full Client with User Delegation](#FullClient) -->
#### Full Client with User Delegation

This client type applies to clients that act on behalf of a particular resource owner and require delegation of that user’s authority to access the protected resource. Furthermore, these clients are capable of interacting with a separate web browser application to facilitate the resource owner's interaction with the authentication endpoint of the authorization server.

These clients MUST use the authorization code flow of OAuth 2 by sending the resource owner to the authorization endpoint to obtain authorization. The user MUST authenticate to the authorization endpoint. The user’s web browser is then redirected back to a URI hosted by the client service, from which the client can obtain an authorization code passed as a query parameter. The client then presents that authorization code along with its own credentials (`private_key_jwt`) to the authorization server's token endpoint to obtain an access token.
<!-- iGov-NL : Start of the additional content -->
<aside class=" addition">
<b>iGov-NL : Additional content</b></br>  
In addition to `private_key_jwt`, the client authentication method `tls_client_auth` [[rfc8705]] MAY also be used.
</aside>
<!-- iGov-NL : End of the additional content -->

These clients MUST be associated with a unique public key, as described in [Section 2.3.4](#client-keys).

This client type MAY request and be issued a refresh token if the security parameters of the access request allow for it.

<!-- ### [2.1.2.](#rfc.section.2.1.2) Native Client with User Delegation -->
#### Native Client with User Delegation

This client type applies to clients that act on behalf of a particular resource owner, such as an app on a mobile platform, and require delegation of that user's authority to access the protected resource. Furthermore, these clients are capable of interacting with a separate web browser application to facilitate the resource owner's interaction with the authentication endpoint of the authorization server. In particular, this client type runs natively on the resource owner's device, often leading to many identical instances of a piece of software operating in different environments and running simultaneously for different end users.

These clients MUST use the authorization code flow of OAuth 2 by sending the resource owner to the authorization endpoint to obtain authorization. The user MUST authenticate to the authorization endpoint. The user is then redirected back to a URI hosted by the client, from which the client can obtain an authorization code passed as a query parameter. The client then presents that authorization code along to the authorization server's token endpoint to obtain an access token.

Native clients MUST either:

*   use dynamic client registration to obtain a separate client id for each instance, or
*   act as a public client by using a common client id and use PKCE [[RFC7636]] to protect calls to the token endpoint.

Native applications using dynamic registration SHOULD generate a unique public and private key pair on the device and register that public key value with the authorization server. Alternatively, an authorization server MAY issue a public and private key pair to the client as part of the registration process. In such cases, the authorization server MUST discard its copy of the private key. Client credentials MUST NOT be shared among instances of client software.

Dynamically registered native applications MAY use PKCE.

Native applications not registering a separate public key for each instance are considered Public Clients, and MUST use PKCE [[RFC7636]] with the S256 code challenge mechanism. Public Clients do not authenticate with the Token Endpoint in any other way.

<!-- ### [2.1.3.](#rfc.section.2.1.3) [Direct Access Client](#DirectClient) -->
#### Direct Access Client

This client type MUST NOT request or be issued a refresh token.

This profile applies to clients that connect directly to protected resources and do not act on behalf of a particular resource owner, such as those clients that facilitate bulk transfers.

These clients use the client credentials flow of OAuth 2 by sending a request to the token endpoint with the client's credentials and obtaining an access token in the response. Since this profile does not involve an authenticated user, this flow is appropriate only for trusted applications, such as those that would traditionally use a developer key. For example, a partner system that performs bulk data transfers between two systems would be considered a direct access client.

<!-- ### [2.2.](#rfc.section.2.2) [Client Registration](#ClientRegistration) -->
### Client Registration

All clients MUST register with the authorization server. For client software that may be installed on multiple client instances, such as native applications or web application software, each client instance MAY receive a unique client identifier from the authorization server. Clients that share client identifiers are considered public clients.

Client registration MAY be completed by either static configuration (out-of-band, through an administrator, etc...) or dynamically.

<!-- ### [2.2.1.](#rfc.section.2.2.1) [Redirect URI](#RedirectURI) -->
#### Redirect URI

Clients using the authorization code grant type MUST register their full redirect URIs. The Authorization Server MUST validate the redirect URI given by the client at the authorization endpoint using strict string comparison.

A client MUST protect the values passed back to its redirect URI by ensuring that the redirect URI is one of the following:

*   Hosted on a website with Transport Layer Security (TLS) protection (a Hypertext Transfer Protocol – Secure (HTTPS) URI)
*   Hosted on a client-specific non-remote-protocol URI scheme (e.g., `myapp://`)
*   Hosted on the local domain of the client (e.g., `http://localhost/`).

Clients MUST NOT allow the redirecting to the local domain.

Clients SHOULD NOT have multiple redirect URIs on different domains.

Clients MUST NOT forward values passed back to their redirect URIs to other arbitrary or user-provided URIs (a practice known as an "open redirector").

<!-- ### [2.3.](#rfc.section.2.3) Connection to the Authorization Server -->
### Connection to the Authorization Server


<!-- ### [2.3.1.](#rfc.section.2.3.1) [Requests to the Authorization Endpoint](#RequestsToAuthorizationEndpoint) -->
#### Requests to the Authorization Endpoint

Full clients and browser-embedded clients making a request to the authorization endpoint MUST use an unpredictable value for the state parameter with at least 128 bits of entropy. Clients MUST validate the value of the <samp>state</samp> parameter upon return to the redirect URI and MUST ensure that the state value is securely tied to the user’s current session (e.g., by relating the state value to a session identifier issued by the client software to the browser).

Clients MUST include their full redirect URI in the authorization request. To prevent open redirection and other injection attacks, the authorization server MUST match the entire redirect URI using a direct string comparison against registered values and MUST reject requests with an invalid or missing redirect URI.

<!-- iGov-NL : Start of the additional content -->
<aside class=" addition">
<b>iGov-NL : Additional content</b></br>  

Public clients MUST apply PKCE, as per RFC7636.
As `code_challenge` the S256 method MUST be applied.
Effectively this means that browser based and native clients MUST include a cryptographic random `code_verifier` of at least 128 bits of entropy and the `code_challenge_method` with the value `S256`.

Request fields:
<dl>
<dt>client_id</dt>
<dd>Mandatory. MUST have the value as obtained during registration.</dd>
<dt>scope</dt>
<dd>Optional.</dd>
<dt>response_type</dt>
<dd>Mandatory. MUST have value `code` for the Authorization Code Flow.</dd>
<dt>redirect_uri</dt>
<dd>Mandatory. MUST be an absolute HTTPS URL, pre-registered with the Authorization Server.</dd>
<dt>state</dt>
<dd>Mandatory, see above. Do not use the SessionID secure cookie for this.</dd>
<dt>code_challenge</dt>
<dd>In case of using a native app as user-agent mandatory. (Eg. an UUID [[rfc4122]])</dd>
<dt>code_challenge_method</dt>
<dd>In case `code_challenge` is used with a native app, mandatory. MUST use the value `S256`.</dd>
</dl>

</aside>
<!-- iGov-NL : End of the additional content -->

<aside class="example">
The following is a sample response from a web-based client to the end user’s browser for the purpose of redirecting the end user to the authorization server's authorization endpoint:

<pre>HTTP/1.2 302 Found
Cache-Control: no-cache
Connection: close
Content-Type: text/plain; charset=UTF-8
Date: Wed, 07 Jan 2015 20:24:15 GMT
Location: https://idp-p.example.com/authorize?client_id=55f9f559-2496-49d4-b6c3-351a58
6b7484&nonce=cd567ed4d958042f721a7cdca557c30d&response_type=code&scope=openid+email&redirect_uri=https%3A%2F%2Fclient.example.org%2Fcb
Status: 302 Found
</pre>

This causes the browser to send the following (non-normative) request to the authorization endpoint (inline wraps for display purposes only):

<pre>GET /authorize?
   client_id=55f9f559-2496-49d4-b6c3-351a586b7484
  &nonce=cd567ed4d958042f721a7cdca557c30d
  &response_type=code
  &scope=openid+email
  &redirect_uri=https%3A%2F%2Fclient.example.org%2Fcb HTTP/1.1
Host: idp-p.example.com
</pre>
</aside>

<!-- ### [2.3.2.](#rfc.section.2.3.2) [Response from the Authorization Endpoint](#ResonseFromAuthorizationEndpoint) -->
#### Response from the Authorization Endpoint

<!-- iGov-NL : Start of the additional content -->
<aside class=" addition">
<b>iGov-NL : Additional content</b></br>  

Response parameters
<dl>
<dt>code</dt>
<dd>Mandatory. MUST be a cryptographic random value, using an unpredictable value with at least 128 bits of entropy.</dd>
<dt>state</dt>
<dd>Mandatory. MUST be a verbatim copy of the value of the <code>state</code> parameter in the Authorization Request.</dd>
</dl>

</aside>
<!-- iGov-NL : End of the additional content -->

<!-- ### [2.3.3.](#rfc.section.2.3.3) [Requests to the Token Endpoint](#RequestsToTokenEndpoint) -->
#### Requests to the Token Endpoint

Full clients, native clients with dynamically registered keys, and direct access clients as defined above MUST authenticate to the authorization server's token endpoint using a JWT assertion as defined by the [JWT Profile for OAuth 2.0 Client Authentication and Authorization Grants][[rfc7523]] using only the <samp>private_key_jwt</samp> method defined in [OpenID Connect Core] [[OpenID.Core]]. ~~The assertion MUST use the claims as follows:~~

<!-- iGov-NL : Start of the additional content -->
<aside class=" addition">
<b>iGov-NL : Additional content</b></br>  

When using the JWT assertion, the assertion MUST use the claims as follows:

</aside>
<!-- iGov-NL : End of the additional content -->

<dl>

<dt>iss</dt>

<dd style="margin-left: 8">the client ID of the client creating the token</dd>

<dt>sub</dt>

<dd style="margin-left: 8">the client ID of the client creating the token</dd>

<dt>aud</dt>

<dd style="margin-left: 8">the URL of the authorization server's token endpoint</dd>

<dt>iat</dt>

<dd style="margin-left: 8">the time that the token was created by the client</dd>

<dt>exp</dt>

<dd style="margin-left: 8">the expiration time, after which the token MUST be considered invalid</dd>

<dt>jti</dt>

<dd style="margin-left: 8">a unique identifier generated by the client for this authentication. This identifier MUST contain at least 128 bits of entropy and MUST NOT be re-used by any subsequent authentication token.</dd>

</dl>

<!-- iGov-NL : Start of the additional content -->
<aside class=" addition">
<b>iGov-NL : Additional content</b></br>  
In addition to `private_key_jwt`, the client authentication method `tls_client_auth` [[rfc8705]] MAY also be used. Examples of this method can be found in the related documentation of the specific standards.

> Private Key JWT is a method of client authentication where the client creates and signs a JWT using its own private key. This method is described in a combination of RFC 7521 (Assertion Framework) and RFC 7523 (JWT Profile for Client Authentication), and referenced by OpenID Connect and FAPI 2.0 Security Profile.
</aside>
<!-- iGov-NL : End of the additional content -->

<!-- iGov-NL : the folowing example only relates to private key jwt and not the tls_client_auth -->
<!-- <aside class="example">
The following sample claim set illustrates the use of the required claims for a client authentication JWT as defined in this profile; additional claims MAY be included in the claim set.

<pre>{
   "iss": "55f9f559-2496-49d4-b6c3-351a586b7484",
   "sub": "55f9f559-2496-49d4-b6c3-351a586b7484",
   "aud": "https://idp-p.example.com/token",
   "iat": 1418698788,
   "exp": 1418698848,
   "jti": "1418698788/107c4da5194df463e52b56865c5af34e5595"
}
</pre>
</aside> -->

The JWT assertion MUST be signed by the client using the client's private key. See [Section 2.3.4](#client-keys) for mechanisms by which the client can make its public key known to the server.
The authorization server MUST support the RS256 signature method (the Rivest, Shamir, and Adleman (RSA) signature algorithm with a 256-bit hash) and MAY use other asymmetric signature methods listed in the JSON Web Algorithms ( [JWA] [[rfc7518]] ) specification.

<!-- iGov-NL : Start of the additional content -->
<aside class=" addition">
<b>iGov-NL : Additional content</b></br>  

In addition to above signing methods, the Authorization server SHOULD support PS256 signing algorithm [[RFC7518]] for the signing of the private\_key\_jwt.

</aside>
<!-- iGov-NL : End of the additional content -->

<aside class="example">
The following sample JWT contains the above claims and has been signed using the RS256 JWS algorithm and the client's own private key (with line breaks for display purposes only):

<pre>eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.ew0KICAgImlzcyI6ICI1NWY5ZjU1OS0yNDk2LTQ5Z
DQtYjZjMy0zNTFhNTg2Yjc0ODQiLA0KICAgInN1YiI6ICI1NWY5ZjU1OS0yNDk2LTQ5ZDQtYjZjMy0
zNTFhNTg2Yjc0ODQiLA0KICAgImF1ZCI6ICJodHRwczovL2lkcC1wLmV4YW1wbGUuY29tL3Rva2VuI
iwNCiAgICJpYXQiOiAxNDE4Njk4Nzg4LA0KICAgImV4cCI6IDE0MTg2OTg4NDgsDQogICAianRpIjo
gIjE0MTg2OTg3ODgvMTA3YzRkYTUxOTRkZjQ2M2U1MmI1Njg2NWM1YWYzNGU1NTk1Ig0KfQ.t-_gX8
JQGq3G2OEc2kUCQ8zVj7pqff87Sua5nktLIHj28l5onO5VpsL4sRHIGOvrpo7XO6jgtPWy3iLXv3-N
Lyo1TWHbtErQEGpmf7nKiNxVCXlGYJXSDJB6shP3OfvdUc24urPJNUGBEDptIgT7-Lhf6BbwQNlMQu
bNeOPRFDqQoLWqe7UxuI06dKX3SEQRMqcxYSIAfP7CQZ4WLuKXb6oEbaqz6gL4l6p83G7wKGDeLETO
THszt-ZjKR38v4F_MnSrx8e0iIqgZwurW0RtetEWvynOCJXk-p166T7qZR45xuCxgOotXY6O3et4n7
7GtgspMgOEKj3b_WpCiuNEwQ</pre>

This is sent in the request to the token endpoint as in the following example:

<pre>POST /token HTTP/1.1
Content-Type: application/x-www-form-urlencoded
User-Agent: Rack::OAuth2 (1.0.8.7) (2.5.3.2, ruby 2.1.3 (2014-09-19))
Accept: */*
Date: Tue, 16 Dec 2014 02:59:48 GMT
Content-Length: 884
Host: idp-p.example.com

grant_type=authorization_code
&code=sedaFh
&scope=openid+email
&client_id=55f9f559-2496-49d4-b6c3-351a586b7484
&redirect_uri=https%3A%2F%2Fclient.example.org%2Fcb
&client_assertion_type=urn%3Aietf%3Aparams%3Aoauth%3Aclient-assertion-type%3Ajwt-bearer
&client_assertion=eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.ew0KICAgImlzcyI6ICI1NWY
5ZjU1OS0yNDk2LTQ5ZDQtYjZjMy0zNTFhNTg2Yjc0ODQiLA0KICAgInN1YiI6ICI1NWY5ZjU1OS0yN
Dk2LTQ5ZDQtYjZjMy0zNTFhNTg2Yjc0ODQiLA0KICAgImF1ZCI6ICJodHRwczovL2lkcC1wLmV4YW1
wbGUuY29tL3Rva2VuIiwNCiAgICJpYXQiOiAxNDE4Njk4Nzg4LA0KICAgImV4cCI6IDE0MTg2OTg4N
DgsDQogICAianRpIjogIjE0MTg2OTg3ODgvMTA3YzRkYTUxOTRkZjQ2M2U1MmI1Njg2NWM1YWYzNGU
1NTk1Ig0KfQ.t-_gX8JQGq3G2OEc2kUCQ8zVj7pqff87Sua5nktLIHj28l5onO5VpsL4sRHIGOvrpo
7XO6jgtPWy3iLXv3-NLyo1TWHbtErQEGpmf7nKiNxVCXlGYJXSDJB6shP3OfvdUc24urPJNUGBEDpt
IgT7-Lhf6BbwQNlMQubNeOPRFDqQoLWqe7UxuI06dKX3SEQRMqcxYSIAfP7CQZ4WLuKXb6oEbaqz6g
L4l6p83G7wKGDeLETOTHszt-ZjKR38v4F_MnSrx8e0iIqgZwurW0RtetEWvynOCJXk-p166T7qZR45
xuCxgOotXY6O3et4n77GtgspMgOEKj3b_WpCiuNEwQ
</pre>
</aside>

<!-- ### [2.3.4.](#rfc.section.2.3.4) [Client Keys](#ClientKeys) -->
#### Client Keys

Clients using the authorization code grant type or direct access clients using the client credentials grant type MUST have a public and private key pair for use in authentication to the token endpoint. These clients MUST register their public keys in their client registration metadata by either sending the public key directly in the <samp>jwks</samp> field or by registering a <samp>jwks\_uri</samp> that MUST be reachable by the authorization server. It is RECOMMENDED that clients use a <samp>jwks_uri</samp> if possible as this allows for key rotation more easily. This applies to both dynamic and static (out-of-band) client registration.

The <samp>jwks</samp> field or the content available from the <samp>jwks\_uri</samp> of a client MUST contain a public key in [JSON Web Key Set (JWK Set)] [[rfc7517]] format. The authorization server MUST validate the content of the client's registered jwks_uri document and verify that it contains a JWK Set. The following example is of a 2048-bit RSA key:

<aside class="example">
<pre>{
   "keys": [
     {
       "alg": "RS256",
       "e": "AQAB",
       "n": "kAMYD62n_f2rUcR4awJX4uccDt0zcXRssq_mDch5-ifcShx9aTtTVza23P
Tn3KaKrsBXwWcfioXR6zQn5eYdZQVGNBfOR4rxF5i7t3hfb4WkS50EK1gBYk2lO9NSrQ-xG
9QsUsAnN6RHksXqsdOqv-nxjLexDfIJlgbcCN9h6TB-C66ZXv7PVhl19gIYVifSU7liHkLe
0l0fw7jUI6rHLHf4d96_neR1HrNIK_xssr99Xpv1EM_ubxpktX0T925-qej9fMEpzzQ5HLm
cNt1H2_VQ_Ww1JOLn9vRn-H48FDj7TxlIT74XdTZgTv31w_GRPAOfyxEw_ZUmxhz5Z-gTlQ",
       "kty": "RSA",
       "kid": "oauth-client"
     }
   ]
}
</pre>
</aside>

<!-- iGov-NL : Start of the additional content -->
<aside class=" addition">
<b>iGov-NL : Additional content</b></br>  

In case the Authorization Server, Resource Server and client are not operated under responsibility of the same organisation, each party MUST use PKIoverheid certificates with OIN.
The PKIoverheid certificate MUST be included either as a <code>x5c</code> or as <code>x5u</code> parameter, as per [[rfc7517]] §4.6 and 4.7. Parties SHOULD at least support the inclusion of the certificate as <code>x5c</code> parameter, for maximum interoperability. 
Parties MAY agree to use <code>x5u</code>, for instance for communication within specific environments.  


</aside>
<!-- iGov-NL : End of the additional content -->

<aside class="example">
For reference, the corresponding public/private key pair for this public key is the following (in JWK format):

<pre>{
   "alg": "RS256",
   "d": "PjIX4i2NsBQuOVIw74ZDjqthYsoFvaoah9GP-cPrai5s5VUIlLoadEAdGbBrss
_6dR58x_pRlPHWh04vLQsFBuwQNc9SN3O6TAaai9Jg5TlCi6V0d4O6lUoTYpMR0cxFIU-xF
MwII--_OZRgmAxiYiAXQj7TKMKvgSvVO7-9-YdhMwHoD-UrJkfnZckMKSs0BoAbjReTski3
IV9f1wVJ53_pmr9NBpiZeHYmmG_1QDSbBuY35Zummut4QShF-fey2gSALdp9h9hRk1p1fsT
ZtH2lwpvmOcjwDkSDv-zO-4Pt8NuOyqNVPFahROBPlsMVxc_zjPck8ltblalBHPo6AQ",
   "e": "AQAB",
   "n": "kAMYD62n_f2rUcR4awJX4uccDt0zcXRssq_mDch5-ifcShx9aTtTVza23PTn3K
aKrsBXwWcfioXR6zQn5eYdZQVGNBfOR4rxF5i7t3hfb4WkS50EK1gBYk2lO9NSrQ-xG9QsU
sAnN6RHksXqsdOqv-nxjLexDfIJlgbcCN9h6TB-C66ZXv7PVhl19gIYVifSU7liHkLe0l0f
w7jUI6rHLHf4d96_neR1HrNIK_xssr99Xpv1EM_ubxpktX0T925-qej9fMEpzzQ5HLmcNt1
H2_VQ_Ww1JOLn9vRn-H48FDj7TxlIT74XdTZgTv31w_GRPAOfyxEw_ZUmxhz5Z-gTlQ",
   "kty": "RSA",
   "kid": "oauth-client"
}
</pre>

Note that the second example contains both the public and private keys, while the first example contains the public key only.
</aside>


<!-- ### [2.4.](#rfc.section.2.4) Connection to the Protected Resource -->
### Connection to the Protected Resource

<!-- ### [2.4.1.](#rfc.section.2.4.1) [Requests to the Protected Resource](#RequestsToProtectedResource) -->
#### Requests to the Protected Resource

Clients SHOULD send bearer tokens passed in the Authentication header as defined by [[rfc6750]] . Clients MAY use the form-parameter ~~or query-parameter~~ method~~s~~ in [[rfc6750]] . Authorized requests MUST be made over TLS, and clients MUST validate the protected resource server's certificate.

<aside class="example">
An example of an OAuth-protected call to the OpenID Connect UserInfo endpoint, sending the token in the Authorization header, follows:

<pre>GET /userinfo HTTP/1.1
Authorization: Bearer eyJhbGciOiJSUzI1NiJ9.eyJleHAiOjE0MTg3MDI0MTIsImF1ZCI6WyJjMWJjOD
RlNC00N2VlLTRiNjQtYmI1Mi01Y2RhNmM4MWY3ODgiXSwiaXNzIjoiaHR0cHM6XC9cL2lkcC1wLmV4YW1wbGU
uY29tXC8iLCJqdGkiOiJkM2Y3YjQ4Zi1iYzgxLTQwZWMtYTE0MC05NzRhZjc0YzRkZTMiLCJpYXQiOjE0MTg2
OTg4MTJ9.iHMz_tzZ90_b0QZS-AXtQtvclZ7M4uDAs1WxCFxpgBfBanolW37X8h1ECrUJexbXMD6rrj_uuWEq
PD738oWRo0rOnoKJAgbF1GhXPAYnN5pZRygWSD1a6RcmN85SxUig0H0e7drmdmRkPQgbl2wMhu-6h2Oqw-ize
4dKmykN9UX_2drXrooSxpRZqFVYX8PkCvCCBuFy2O-HPRov_SwtJMk5qjUWMyn2I4Nu2s-R20aCA-7T5dunr0
iWCkLQnVnaXMfA22RlRiU87nl21zappYb1_EHF9ePyq3Q353cDUY7vje8m2kKXYTgc_bUAYuW-W3SMSw5UlKa
HtSZ6PQICoA
Accept: text/plain, application/json, application/*+json, */*
Host: idp-p.example.com
Connection: Keep-Alive
User-Agent: Apache-HttpClient/4.2.3 (java 1.5)
</pre>
</aside>
