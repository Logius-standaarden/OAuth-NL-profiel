## Client Profiles
<!-- ### [2.](#rfc.section.2) [Client Profiles](#ClientProfiles) -->

<!-- ### [2.1.](#rfc.section.2.1) [Client Types](#ClientTypes) -->
### Client Types

<!-- ### [2.1.1.](#rfc.section.2.1.1) [Full Client with User Delegation](#FullClient) -->
#### Full Client with User Delegation

<!-- iGov-NL : Start of the additional content -->
<span class="nlgov-add" aria-label="sectie toegevoegd in NLgov">

In addition to `private_key_jwt`, the client authentication method `tls_client_auth` [[rfc8705]] MAY also be used.

<!-- REVIEW (issue #131): `tls_client_auth` is zit nu ook in iGov (laatste draft v9 en 10).
     Kan weg wmb -->
 
 
</span>
<!-- iGov-NL : End of the additional content -->

<!-- ### [2.3.](#rfc.section.2.3) Connection to the Authorization Server -->
### Connection to the Authorization Server


<!-- ### [2.3.1.](#rfc.section.2.3.1) [Requests to the Authorization Endpoint](#RequestsToAuthorizationEndpoint) -->
#### Requests to the Authorization Endpoint

<span class="nlgov-add" aria-label="sectie toegevoegd in NLgov">

Public clients MUST apply PKCE, as per [[rfc7636]]. As `code_challenge` the
S256 method MUST be applied. Effectively this means that browser-based and
native clients MUST include a cryptographic random `code_verifier` of at least
128 bits of entropy and the `code_challenge_method` with the value `S256`.
 
Request fields:
 
`client_id`
: Mandatory. MUST have the value as obtained during registration.
 
`scope`
: Optional.
 
`response_type`
: Mandatory. MUST have value `code` for the Authorization Code Flow.
 
`redirect_uri`
: Mandatory. MUST be an absolute HTTPS URL, pre-registered with the
  Authorization Server.
 
`state`
: Mandatory. Do not use the SessionID secure cookie for this.
 
`code_challenge`
: Mandatory when using a native app or browser-based app as user-agent.
 
`code_challenge_method`
: Mandatory when `code_challenge` is used. MUST use the value `S256`.
 
When the Authorization Server supports OAuth 2.0 Pushed Authorization Requests
(PAR) [[rfc9126]], the client MAY use PAR (or MUST, if
`require_pushed_authorization_requests` is set in the Authorization Server
Metadata). The client pushes the authorization parameters to the
`pushed_authorization_request_endpoint` and uses the returned `request_uri` as
the redirect.
 
</span>


<!-- REVIEW (issue #131): PKCE is ook een MUST in iGov anend S256 wordt nu ondersteund. PAR is wel NLgov specifiek.
     Zie issue voor extra uitleg. -->


<!-- ### [2.3.3.](#rfc.section.2.3.3) [Requests to the Token Endpoint](#RequestsToTokenEndpoint) -->
#### Requests to the Token Endpoint

<span class="nlgov-add" aria-label="sectie toegevoegd in NLgov">

When using the JWT assertion for client authentication, the assertion MUST use
the claims as specified in [[rfc7521]] and [[rfc7523]].
 
In addition to `private_key_jwt`, the client authentication method
`tls_client_auth` [[rfc8705]] MAY also be used. Private Key JWT is a method of
client authentication where the client creates and signs a JWT using its own
private key, as described in [[rfc7521]] and [[rfc7523]] and referenced by
OpenID Connect and FAPI 2.0 Security Profile.
 
The Authorization Server SHOULD support the PS256 signing algorithm [[rfc7518]]
for the signing of the `private_key_jwt`.
 
</span>

<!-- REVIEW (issue #131): `tls_client_auth` zit in iGov.
     PS256 zit in iGov's Global Requirements section. 
     Is dit nog nodig? -->

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

<pre class="http">POST /token HTTP/1.1
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

<span class="nlgov-add" aria-label="sectie toegevoegd in NLgov">

Where the Authorization Server, Resource Server, and client are not operated
under the responsibility of the same organisation, each party MUST use
PKIoverheid certificates with OIN.
 
The PKIoverheid certificate MUST be included either as an `x5c` or as an `x5u`
parameter, as per [[rfc7517]] sections 4.6 and 4.7. Parties SHOULD at least
support the inclusion of the certificate as `x5c` for maximum interoperability.
Parties MAY agree to use `x5u`, for instance for communication within specific
environments.
 
</span>

<!-- REVIEW (issue #131): This is unique to the Netherlands and will not appear
     in iGov in this form. A more abstract version could be proposed upstream. -->

<!-- iGov-NL : End of the additional content -->

<aside class="example">
For reference, the corresponding public/private key pair for this public key is the following (in JWK format):

<pre class="hljs" style="white-space: pre-wrap"><code class="json">
{
   "alg": "RS256",
   "d": "PjIX4i2NsBQuOVIw74ZDjqthYsoFvaoah9GP-cPrai5s5VUIlLoadEAdGbBrss_6dR58x_pRlPHWh04vLQsFBuwQNc9SN3O6TAaai9Jg5TlCi6V0d4O6lUoTYpMR0cxFIU-xFMwII--_OZRgmAxiYiAXQj7TKMKvgSvVO7-9-YdhMwHoD-UrJkfnZckMKSs0BoAbjReTski3IV9f1wVJ53_pmr9NBpiZeHYmmG_1QDSbBuY35Zummut4QShF-fey2gSALdp9h9hRk1p1fsTZtH2lwpvmOcjwDkSDv-zO-4Pt8NuOyqNVPFahROBPlsMVxc_zjPck8ltblalBHPo6AQ",
   "e": "AQAB",
   "n": "kAMYD62n_f2rUcR4awJX4uccDt0zcXRssq_mDch5-ifcShx9aTtTVza23PTn3KaKrsBXwWcfioXR6zQn5eYdZQVGNBfOR4rxF5i7t3hfb4WkS50EK1gBYk2lO9NSrQ-xG9QsUsAnN6RHksXqsdOqv-nxjLexDfIJlgbcCN9h6TB-C66ZXv7PVhl19gIYVifSU7liHkLe0l0fw7jUI6rHLHf4d96_neR1HrNIK_xssr99Xpv1EM_ubxpktX0T925-qej9fMEpzzQ5HLmcNt1H2_VQ_Ww1JOLn9vRn-H48FDj7TxlIT74XdTZgTv31w_GRPAOfyxEw_ZUmxhz5Z-gTlQ",
   "kty": "RSA",
   "kid": "oauth-client"
}
</code></pre>

Note that the second example contains both the public and private keys, while the first example contains the public key only.
</aside>


<!-- ### [2.4.](#rfc.section.2.4) Connection to the Protected Resource -->
### Connection to the Protected Resource

<!-- ### [2.4.1.](#rfc.section.2.4.1) [Requests to the Protected Resource](#RequestsToProtectedResource) -->
#### Requests to the Protected Resource

Clients SHOULD send bearer tokens passed in the Authentication header as defined by [[rfc6750]] . Clients MAY use the form-parameter ~~or query-parameter~~ method~~s~~ in [[rfc6750]] . Authorized requests MUST be made over TLS, and clients MUST validate the protected resource server's certificate.

<aside class="example">
An example of an OAuth-protected call to the OpenID Connect UserInfo endpoint, sending the token in the Authorization header, follows:

<pre class="hljs" style="white-space: pre-wrap"><code class="http">
GET /userinfo HTTP/1.1
Authorization: Bearer eyJhbGciOiJSUzI1NiJ9.eyJleHAiOjE0MTg3MDI0MTIsImF1ZCI6WyJjMWJjODRlNC00N2VlLTRiNjQtYmI1Mi01Y2RhNmM4MWY3ODgiXSwiaXNzIjoiaHR0cHM6XC9cL2lkcC1wLmV4YW1wbGUuY29tXC8iLCJqdGkiOiJkM2Y3YjQ4Zi1iYzgxLTQwZWMtYTE0MC05NzRhZjc0YzRkZTMiLCJpYXQiOjE0MTg2OTg4MTJ9.iHMz_tzZ90_b0QZS-AXtQtvclZ7M4uDAs1WxCFxpgBfBanolW37X8h1ECrUJexbXMD6rrj_uuWEqPD738oWRo0rOnoKJAgbF1GhXPAYnN5pZRygWSD1a6RcmN85SxUig0H0e7drmdmRkPQgbl2wMhu-6h2Oqw-ize4dKmykN9UX_2drXrooSxpRZqFVYX8PkCvCCBuFy2O-HPRov_SwtJMk5qjUWMyn2I4Nu2s-R20aCA-7T5dunr0iWCkLQnVnaXMfA22RlRiU87nl21zappYb1_EHF9ePyq3Q353cDUY7vje8m2kKXYTgc_bUAYuW-W3SMSw5UlKaHtSZ6PQICoA
Accept: text/plain, application/json, application/*+json, */*
Host: idp-p.example.com
Connection: Keep-Alive
User-Agent: Apache-HttpClient/4.2.3 (java 1.5)
</code></pre>
</aside>
