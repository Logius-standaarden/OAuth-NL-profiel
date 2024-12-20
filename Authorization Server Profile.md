## Authorization Server Profile
<!-- ### [3.](#rfc.section.3) [Authorization Server Profile](#ServerProfile) -->

All servers MUST conform to applicable recommendations found in the Security Considerations sections of [[rfc6749]] and those found in the "OAuth Threat Model Document" [[rfc6819]] .

The authorization server MUST protect all communications to and from its OAuth endpoints using TLS.

<!-- ### [3.1.](#rfc.section.3.1) Connections with clients -->
### Connections with clients

<!-- ### [3.1.1.](#rfc.section.3.1.1) Grant types -->
#### Grant types

The authorization server MUST support the <samp>authorization_code</samp> , and MAY support the <samp>client_credentials</samp> grant types as described in [Section 2](#client-profiles).
 The authorization server MUST limit each registered client (identified by a client ID) to a single grant type only, since a single piece of software will be functioning at runtime in only one of the modes described in [Section 2](#client-profiles). Clients that have multiple modes of operation MUST have a separate client ID for each mode.
 
<!-- #### Token exchange
Where possible, the token exchange [[rfc8693]] grant type SHOULD be implemented instead of client credentials grant type, as this proves the identity of the user (and, where applicable, a second user that may act on behalf of the user). 

To Do add as a third flow in this document in usecases

Voorbeelden token exchange (rfc8693)
•	Impersonation. Een achterliggende applicatie doet namens een andere applicatie een API aanroep met een tweede token (delegation scenario, met act claim). Het tweede token zal vaak minder of andere scopes of audience restricties hebben dan het originele token. Een ander bekend voorbeeld is dat het token slechts geldig is in de context van één transactie, en/of dat het token langer geldig is, bijvoorbeeld bij asynchrone (batch) verwerking van gegevens. 
•	Delegation. Een gebruiker (vertegenwoordigd door een actor token) acteert namens een andere gebruiker (subject token).

-->

<!-- ### [3.1.2.](#rfc.section.3.1.2) Client authentication -->
#### Client authentication

The authorization server MUST enforce client authentication as described above for the authorization code and client credentials grant types. Public client cannot authenticate to the authorization server.

The authorization server MUST validate all redirect URIs for authorization code ~~and implicit grant types~~.

<!-- ### [3.1.3.](#rfc.section.3.1.3) [Dynamic Registration](#DynamicRegistration) -->
#### Dynamic Registration

Dynamic Registration allows for authorized Clients to on-board programmatically without administrative intervention. This is particularly important in ecosystems with many potential Clients, including Mobile Apps acting as independent Clients. Authorization servers MUST support dynamic client registration,
and clients MAY register using the [Dynamic Client Registration Protocol] [[rfc7591]] for authorization code grant types. Clients MUST NOT dynamically register for the client credentials grant type. Authorization servers MAY limit the scopes available to dynamically registered clients.

Authorization servers MAY protect their Dynamic Registration endpoints by requiring clients to present credentials that the authorization server would recognize as authorized participants. Authorization servers MAY accept signed software statements as described in [[RFC7591]] [[rfc7591]] issued 
to client software developers from a trusted registration entity. The software statement can be used to tie together many instances of the same client software that will be run, dynamically registered, and authorized separately at runtime. The software statement MUST include the following client metadata parameters:

<dl>

<dt>redirect_uris</dt>

<dd style="margin-left: 8">array of redirect URIs used by the client; subject to the requirements listed in [Section 2.2.1](#redirect-uri)</dd>

<dt>grant_types</dt>

<dd style="margin-left: 8">grant type used by the client; must be "authorization_code” or "client_credentials”</dd>

<dt>jwks_uri or jwks</dt>

<dd style="margin-left: 8">client's public key in JWK Set format; if jwks_uri is used it MUST be reachable by the Authorization Server and point to the client's public key set</dd>

<dt>client_name</dt>

<dd style="margin-left: 8">human-readable name of the client</dd>

<dt>client_uri</dt>

<dd style="margin-left: 8">URL of a web page containing further information about the client</dd>

</dl>

<!-- iGov-NL : Start of the additional content -->
<aside class=" addition">
<b>iGov-NL : Additional content</b></br>  
In this version of iGov-NL we recommend that the Authorization servers SHOULD support dynamic client registration. However depending on how the future authentication architecture of the Dutch government develops in regards to OAuth we may revisit this in a future revision.  
The current requirement fits an architecture where there is a limited number of widely used authorization servers. However if in practice we start seeing a very large number of authorization servers with limited use this requirement can become a recommendation in a future version of this profile. For these authorization servers with limited use we consider mandatory support for dynamic client registration a large burden.

</aside>
<!-- iGov-NL : End of the additional content -->

<!-- ### [3.1.4.](#rfc.section.3.1.4) Client Approval -->
#### Client Approval

When prompting the end user with an interactive approval page, the authorization server MUST indicate to the user:

*   Whether the client was dynamically registered, or else statically registered by a trusted administrator, or a public client.
*   Whether the client is associated with a software statement, and in which case provide information about the trusted issuer of the software statement.
*   What kind of access the client is requesting, including scope, protected resources (if applicable beyond scopes), and access duration.

For example, for native clients a message indicating a new App installation has been registered as a client can help users determine if this is the expected behaviour. This signal helps users protect themselves from potentially rogue clients.

<!-- ### [3.1.5.](#rfc.section.3.1.5) [Discovery](#Discovery) -->
#### Discovery

The authorization server MUST provide an [OpenID Connect service discovery] [[OpenID.Discovery]] endpoint listing the components relevant to the OAuth protocol:

<dl>

<dt>issuer</dt>

<dd style="margin-left: 8">REQUIRED. The fully qualified issuer URL of the server</dd>

<dt>authorization_endpoint</dt>

<dd style="margin-left: 8">REQUIRED. The fully qualified URL of the server's authorization endpoint defined by [OAuth 2.0] [[rfc6749]]</dd>

<dt>token_endpoint</dt>

<dd style="margin-left: 8">REQUIRED. The fully qualified URL of the server's token endpoint defined by [OAuth 2.0] [[RFC6749]]</dd>

<dt>introspection_endpoint</dt>

<dd style="margin-left: 8">OPTIONAL. The fully qualified URL of the server's introspection endpoint defined by [OAuth Token Introspection] [[rfc7662]] </dd>

<dt>revocation_endpoint</dt>

<dd style="margin-left: 8">OPTIONAL. The fully qualified URL of the server's revocation endpoint defined by [OAuth 2.0 Token Revocation] [[rfc7009]] </dd>

<dt>jwks_uri</dt>

<dd style="margin-left: 8">REQUIRED. The fully qualified URI of the server's public key in [JWK Set] [[rfc7517]] format</dd>

</dl>

If the authorization server is also an OpenID Connect Provider, it MUST provide a discovery endpoint meeting the requirements listed in Section 3.6 of the iGov OpenID Connect profile.

<aside class="example">
The following example shows the JSON document found at a discovery endpoint for an authorization server:
<!-- iGov-NL : Start of the additional content -->
<aside class=" addition">
<b>iGov-NL : Additional content</b></br>  
Added `tls_client_auth`
</aside>
<!-- iGov-NL : End of the additional content -->
<pre>{
  "request_parameter_supported": true,
  "registration_endpoint": "https://idp-p.example.com/register",
  "userinfo_signing_alg_values_supported": [
    "HS256", "HS384", "HS512", "RS256", "RS384", "RS512"
  ],
  "token_endpoint": "https://idp-p.example.com/token",
  "request_uri_parameter_supported": false,
  "request_object_encryption_enc_values_supported": [
    "A192CBC-HS384", "A192GCM", "A256CBC+HS512",
    "A128CBC+HS256", "A256CBC-HS512",
    "A128CBC-HS256", "A128GCM", "A256GCM"
  ],
  "token_endpoint_auth_methods_supported": [
    "private_key_jwt", "tls_client_auth"
  ],
  "jwks_uri": "https://idp-p.example.com/jwk",
  "authorization_endpoint": "https://idp-p.example.com/authorize",
  "require_request_uri_registration": false,
  "introspection_endpoint": "https://idp-p.example.com/introspect",
  "request_object_encryption_alg_values_supported": [
    "RSA-OAEP", ?RSA1_5", "RSA-OAEP-256"
  ],
  "service_documentation": "https://idp-p.example.com/about",
  "response_types_supported": [
    "code", "token"
  ],
  "token_endpoint_auth_signing_alg_values_supported": [
    "HS256", "HS384", "HS512", "RS256", "RS384", "RS512"
  ],
  "revocation_endpoint": "https://idp-p.example.com/revoke",
  "request_object_signing_alg_values_supported": [
    "HS256", "HS384", "HS512", "RS256", "RS384", "RS512"
  ],
  "grant_types_supported": [
    "authorization_code",
    "implicit",
    "urn:ietf:params:oauth:grant-type:jwt-bearer",
    "client_credentials",
    "urn:ietf:params:oauth:grant_type:redelegate"
  ],
  "scopes_supported": [
    "profile", "openid", "email", "address", "phone", "offline_access"
  ],
  "op_tos_uri": "https://idp-p.example.com/about",
  "issuer": "https://idp-p.example.com/",
  "op_policy_uri": "https://idp-p.example.com/about"
}
</pre>
</aside>

Clients and protected resources SHOULD cache this discovery information. It is RECOMMENDED that servers provide cache information through HTTP headers and make the cache valid for at least one week.

The server MUST provide its public key in JWK Set format. The key MUST contain the following fields:

<dl>

<dt>kid</dt>

<dd style="margin-left: 8">The key ID of the key pair used to sign this token</dd>

<dt>kty</dt>

<dd style="margin-left: 8">The key type</dd>

<dt>alg</dt>

<dd style="margin-left: 8">The default algorithm used for this key</dd>

</dl>

<aside class="example">
The following is an example of a 2048-bit RSA public key:

<pre>{
  "keys": [
    {
      "alg": "RS256",
      "e": "AQAB",
      "n": "o80vbR0ZfMhjZWfqwPUGNkcIeUcweFyzB2S2T-hje83IOVct8gVg9FxvHPK1R
eEW3-p7-A8GNcLAuFP_8jPhiL6LyJC3F10aV9KPQFF-w6Eq6VtpEgYSfzvFegNiPtpMWd7C43
EDwjQ-GrXMVCLrBYxZC-P1ShyxVBOzeR_5MTC0JGiDTecr_2YT6o_3aE2SIJu4iNPgGh9Mnyx
dBo0Uf0TmrqEIabquXA1-V8iUihwfI8qjf3EujkYi7gXXelIo4_gipQYNjr4DBNlE0__RI0kD
U-27mb6esswnP2WgHZQPsk779fTcNDBIcYgyLujlcUATEqfCaPDNp00J6AbY6w",
      "kty": "RSA",
      "kid": "rsa1"
    }
  ]
}
</pre>
</aside>

Clients and protected resources SHOULD cache this key. It is RECOMMENDED that servers provide cache information through HTTP headers and make the cache valid for at least one week.

<!-- iGov-NL : Start of the additional content -->
<aside class=" addition">
<b>iGov-NL : Additional content</b></br>  

iGov requires that the authorization server provides an OpenIDConnect service discovery endpoint. Recently OAuth 2.0 Authorization Server Metadata [[rfc8414]] has been finalized, this provide the same functionality in a more generic way and could replace this requirement in a future version of the iGov-NL profile.

</aside>
<!-- iGov-NL : End of the additional content -->

<!-- ### [3.1.6.](#rfc.section.3.1.6) Revocation -->
#### Revocation

Token revocation allows a client to signal to an authorization server that a given token will no longer be used.

An authorization server MUST revoke the token if the client requesting the revocation is the client to which the token was issued, the client has permission to revoke tokens, and the token is revocable.

A client MUST immediately discard the token and not use it again after revoking it.

<!-- ### [3.1.7.](#rfc.section.3.1.7) PKCE -->
#### PKCE

An authorization server MUST support the Proof Key for Code Exchange (PKCE [[rfc7636]] ) extension to the authorization code flow, including support for the S256 code challenge method. The authorization server MUST NOT allow an ~~iGov~~ iGov-NL client to use the plain code challenge method.

<!-- ### [3.1.8.](#rfc.section.3.1.8) Redirect URIs -->
#### Redirect URIs

The authorization server MUST compare a client's registered redirect URIs with the redirect URI presented during an authorization request using an exact string match.

<!-- ### [3.1.9.](#rfc.section.3.1.9) RefreshTokens -->
#### RefreshTokens

Authorization Servers MAY issue refresh tokens to clients under the following context:

Clients MUST be registered with the Authorization Server.

Clients MUST present a valid client_id. Confidential clients MUST present a signed client_assertion with their associated keypair.

Clients using the Direct Credentials method MUST NOT be issued refresh_tokens. These clients MUST present their client credentials with a new access_token request and the desired scope.

<aside class=" addition">
<b>iGov-NL : Additional content</b></br>  
Refresh tokens for public clients must either be sender-constrained or one-time use. From [[[ietf-oauth-v2-1-10-refresh-token-grant]]]
</aside>

<!-- ### [3.1.10.](#rfc.section.3.1.10) Token Response -->
#### Token Response

<!-- iGov-NL : Start of the additional content -->
<aside class=" addition">
<b>iGov-NL : Additional content</b></br>  

The Token Response has the following contents:

<dl>
<dt>access_token</dt>
<dd>Mandatory. Structured access token a.k.a. a JWT Bearer token. The JWT MUST be signed.</dd>
<dt>token_type</dt>
<dd>Mandatory. The type for a JWT Bearer token is <code>Bearer</code>, as per [[rfc6750]]</dd>
<dt>refresh_token</dt>
<dd>Under this profile, refresh tokens are supported.</dd>
<dt>expires_in</dt>
<dd>Optional. Lifetime of the access token, in seconds.</dd>
<dt>scope</dt>
<dd>Optional. Scope(s) of the access (token) granted, multiple scopes are separated by whitespace. The scope MAY be omitted if it is identical to the scope requested.</dd>
</dl>

For best practices on token lifetime see section [Token Lifetimes](#token-lifetimes).
</aside>
<!-- iGov-NL : End of the additional content -->

<!-- ### [3.2.](#rfc.section.3.2) Connections with protected resources -->
### Connections with protected resources

Unlike the core OAuth protocol, the ~~iGov~~ iGov-NL profile intends to allow compliant protected resources to connect to compliant authorization servers.

<!-- ### [3.2.1.](#rfc.section.3.2.1) [JWT Bearer Tokens](#JWTBearerTokens) -->
#### JWT Bearer Tokens

In order to facilitate interoperability with multiple protected resources, all ~~iGov~~ iGov-NL-compliant authorization servers issue cryptographically signed tokens in the JSON Web Token (JWT) format. The information carried in the JWT is intended to allow a protected resource to quickly test the integrity of the token without additional network calls, and to allow the protected resource to determine which authorization server issued the token. When combined with discovery, this information is sufficient to programmatically locate the token introspection service, which is in turn used for conveying additional security information about the token.

The server MUST issue tokens as JWTs with, at minimum, the following claims:

<dl>

<dt>iss</dt>

<dd style="margin-left: 8">The issuer URL of the server that issued the token</dd>

<dt>azp</dt>

<dd style="margin-left: 8">The client id of the client to whom this token was issued</dd>

<dt>exp</dt>

<dd style="margin-left: 8">The expiration time (integer number of seconds since from 1970-01-01T00:00:00Z UTC), after which the token MUST be considered invalid</dd>

<dt>jti</dt>

<dd style="margin-left: 8">A unique JWT Token ID value with at least 128 bits of entropy. This value MUST NOT be re-used in another token. Clients MUST check for reuse of jti values and reject all tokens issued with duplicate jti values.</dd>

</dl>

The server MAY issue tokens with additional fields, including the following as defined here:

<dl>

<dt>sub</dt>

<dd style="margin-left: 8">The identifier of the end-user that authorized this client, or the client id of a client acting on its own behalf (such as a bulk transfer). Since this information could potentially leak private user information, it should be used only when needed. End-user identifiers SHOULD be pairwise anonymous identifiers unless the audiance requires otherwise.

<dt>aud</dt>

<dd style="margin-left: 8">The audience of the token, an array containing the identifier(s) of protected resource(s) for which the token is valid, if this information is known. The aud claim may contain multiple values if the token is valid for multiple protected resources. Note that at runtime, the authorization server may not know the identifiers of all possible protected resources at which a token may be used.</dd>

</dl>

<aside class="example">
The following sample claim set illustrates the use of the required claims for an access token as defined in this profile; additional claims MAY be included in the claim set:

<pre>{
   "exp": 1418702388,
   "azp": "55f9f559-2496-49d4-b6c3-351a586b7484",
   "iss": "https://idp-p.example.com/",
   "jti": "2402f87c-b6ce-45c4-95b0-7a3f2904997f",
   "iat": 1418698788
}
</pre>
</aside>

The access tokens MUST be signed with [JWS] [[rfc7515]] . The authorization server MUST support the RS256 signature method for tokens and MAY use other asymmetric signing methods as defined in the [IANA JSON Web Signatures and Encryption Algorithms registry] [[JWS.JWE.Algs]] . The JWS header MUST contain the following fields:

<!-- iGov-NL : Start of the additional content -->
<aside class=" addition">
<b>iGov-NL : Additional content</b></br>  

In addition to above signing methods, the Authorization server SHOULD support PS256 signing algorithm [[RFC7518]] for the signing of the JWT Bearer Tokens.

</aside>
<!-- iGov-NL : End of the additional content -->

<dl>

<dt>kid</dt>

<dd style="margin-left: 8">The key ID of the key pair used to sign this token</dd>

</dl>

<aside class="example">
This example access token has been signed with the server's private key using RS256:

<pre>eyJhbGciOiJSUzI1NiJ9.ew0KICAgImV4cCI6IDE0MTg3MDIzODgsDQogICAiYXpwIjo
gIjU1ZjlmNTU5LTI0OTYtNDlkNC1iNmMzLTM1MWE1ODZiNzQ4NCIsDQogICAiaXNzIjo
gImh0dHBzOi8vaWRwLXAuZXhhbXBsZS5jb20vIiwNCiAgICJqdGkiOiAiMjQwMmY4N2M
tYjZjZS00NWM0LTk1YjAtN2EzZjI5MDQ5OTdmIiwNCiAgICJpYXQiOiAxNDE4Njk4Nzg
4LA0KICAgImtpZCI6ICJyc2ExIg0KfQ.iB6Ix8Xeg-L-nMStgE1X75w7zgXabzw7znWU
ECOsXpHfnYYqb-CET9Ah5IQyXIDZ20qEyN98UydgsTpiO1YJDDcZV4f4DgY0ZdG3yBW3
XqwUQwbgF7Gwza9Z4AdhjHjzQx-lChXAyfL1xz0SBDkVbJdDjtXbvaSIyfF7ueWF3M1C
M70-GXuRY4iucKbuytz9e7eW4Egkk4Aagl3iTk9-l5V-tvL6dYu8IlR93GKsaKE8bng0
EZ04xcnq8s4V5Yykuc_NARBJENiKTJM8w3wh7xWP2gvMp39Y0XnuCOLyIx-J1ttX83xm
pXDaLyyY-4HT9XHT9V73fKF8rLWJu9grrA</pre>
</aside>

Refresh tokens SHOULD be signed with [JWS] [[rfc7515]] using the same private key and contain the same set of claims as the access tokens.

The authorization server MAY encrypt access tokens and refresh tokens using [JWE] [[rfc7516]] . Encrypted access tokens MUST be encrypted using the public key of the protected resource. Encrypted refresh tokens MUST be encrypted using the authorization server's public key.

<!-- iGov-NL : Start of the additional content -->
<aside class=" addition">
<b>iGov-NL : Additional content</b></br>  

How to select or obtain the key to be used for encryption of an access token is out of scope of this profile.
A early draft of "Resource Indicators for OAuth 2.0" exist and could be used. This draft describes usage of the <code>resource</code> parameter to indicate the applicable resource server.

In case the Authorization Server, Resource Server and client are not operated under responsibility of the same organisation, each party MUST use PKIoverheid certificates with OIN for encryption.

</aside>
<!-- iGov-NL : End of the additional content -->

<!-- ### [3.2.2.](#rfc.section.3.2.2) Introspection -->
#### Introspection

Token introspection allows a protected resource to query the authorization server for metadata about a token. The protected resource makes a request like the following to the token introspection endpoint:

<aside class="example">
<pre>POST /introspect HTTP/1.1
User-Agent: Faraday v0.9.0
Content-Type: application/x-www-form-urlencoded
Accept-Encoding: gzip;q=1.0,deflate;q=0.6,identity;q=0.3
Accept: */*
Connection: close
Host: as-va.example.com
Content-Length: 1412

client_assertion=eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpc3M
iOiJhMmMzNjkxOS0wMWZmLTQ4MTAtYTgyOS00MDBmYWQzNTczNTEiLCJzdWIi
OiJhMmMzNjkxOS0wMWZmLTQ4MTAtYTgyOS00MDBmYWQzNTczNTEiLCJhdWQiO
iJodHRwczovL2FzLXZhLmV4YW1wbGUuY29tL3Rva2VuIiwiaWF0IjoxNDE4Nj
k4ODE0LCJleHAiOjE0MTg2OTg4NzQsImp0aSI6IjE0MTg2OTg4MTQvZmNmNDQ
2OGY2MDVjNjE1NjliOWYyNGY5ODJlMTZhZWY2OTU4In0.md7mFdNBaGhiJfE_
pFkAAWA5S-JBvDw9Dk7pOOJEWcL08JGgDFoi9UDbg3sHeA5DrrCYGC_zw7fCG
c9ovpfMB7W6YN53hGU19LtzzFN3tv9FNRq4KIzhK15pns9jckKtui3HZ25L_B
-BnxHe7xNo3kA1M-p51uYYIM0hw1SRi2pfwBKG5O8WntybLjuJ0R3X97zvqHn
2Q7xdVyKlInyNPA8gIZK0HVssXxHOI6yRrAqvdMn_sneDTWPrqVpaR_c7rt8D
dd7drf_nTD1QxESVhYqKTax5Qfd-aq8gZz8gJCzS0yyfQh6DmdhmwgrSCCRC6
BUQkeFNvjMVEYHQ9fr0NA
&client_assertion_type=urn%3Aietf%3Aparams%3Aoauth%3Aclient-assertion-type%3Ajwt-bearer
&client_id=a2c36919-01ff-4810-a829-400fad357351
&token=eyJhbGciOiJSUzI1NiJ9.eyJleHAiOjE0MTg3MDI0MTQsImF1ZCI6W
yJlNzFmYjcyYS05NzRmLTQwMDEtYmNiNy1lNjdjMmJjMDAzN2YiXSwiaXNzIj
oiaHR0cHM6XC9cL2FzLXZhLmV4YW1wbGUuY29tXC8iLCJqdGkiOiIyMWIxNTk
2ZC04NWQzLTQzN2MtYWQ4My1iM2YyY2UyNDcyNDQiLCJpYXQiOjE0MTg2OTg4
MTR9.FXDtEzDLbTHzFNroW7w27RLk5m0wprFfFH7h4bdFw5fR3pwiqejKmdfA
bJvN3_yfAokBv06we5RARJUbdjmFFfRRW23cMbpGQCIk7Nq4L012X_1J4IewO
QXXMLTyWQQ_BcBMjcW3MtPrY1AoOcfBOJPx1k2jwRkYtyVTLWlff6S5gK-ciY
f3b0bAdjoQEHd_IvssIPH3xuBJkmtkrTlfWR0Q0pdpeyVePkMSI28XZvDaGnx
A4j7QI5loZYeyzGR9h70xQLVzqwwl1P0-F_0JaDFMJFO1yl4IexfpoZZsB3Hh
F2vFdL6D_lLeHRy-H2g2OzF59eMIsM_Ccs4G47862w
</pre>
</aside>

The client assertion parameter is structured as described in [Section 2.3.3](#requests-to-the-token-endpoint) .

The server responds to an introspection request with a JSON object representing the token containing the following fields as defined in the token introspection specification:

<dl>

<dt>active</dt>

<dd style="margin-left: 8">Boolean value indicating whether or not this token is currently active at this authorization server. Tokens that have been revoked, have expired, or were not issued by this authorization server are considered non-active.</dd>

<dt>scope</dt>

<dd style="margin-left: 8">Space-separated list of OAuth 2.0 scope values represented as a single string.</dd>

<dt>exp</dt>

<dd style="margin-left: 8">Timestamp of when this token expires (integer number of seconds since from 1970-01-01T00:00:00Z UTC)</dd>

<dt>sub</dt>

<dd style="margin-left: 8">An opaque string that uniquely identifies the user who authorized this token at this authorization server (if applicable). This string MAY be diversified per client.</dd>

<dt>client_id</dt>

<dd style="margin-left: 8">An opaque string that uniquely identifies the OAuth 2.0 client that requested this token</dd>

</dl>

<aside class="example">
The following example is a response from the introspection endpoint:

<pre>HTTP/1.1 200 OK
Date: Tue, 16 Dec 2014 03:00:14 GMT
Access-Control-Allow-Origin: *
Content-Type: application/json;charset=ISO-8859-1
Content-Language: en-US
Content-Length: 266
Connection: close

{
   "active": true,
   "scope": "file search visa",
   "exp": 1418702414,
   "sub": "{sub\u003d6WZQPpnQxV, iss\u003dhttps://idp-p.example.com/}",
   "client_id": "e71fb72a-974f-4001-bcb7-e67c2bc0037f",
   "token_type": "Bearer"
}
</pre>
</aside>

The authorization server MUST require authentication for both the revocation and introspection endpoints as described in [Section 2.3.2](#requests-to-the-token-endpoint) . Protected resources calling the introspection endpoint MUST use credentials distinct from any other OAuth client registered at the server.

A protected resource MAY cache the response from the introspection endpoint for a period of time no greater than half the lifetime of the token. A protected resource MUST NOT accept a token that is not active according to the response from the introspection endpoint.

<!-- ### [3.3.](#rfc.section.3.3) Response to Authorization Requests -->
### Response to Authorization Requests

The following data will be sent as an Authorization Response to the Authorization Code Flow as described above. The authentication response is sent via HTTP redirect to the redirect URI specified in the request.

The following fields MUST be included in the response:

<dl>

<dt>state</dt>

<dd style="margin-left: 8">REQUIRED. The value of the state parameter passed in in the authentication request. This value MUST match exactly.</dd>

<dt>code</dt>

<dd style="margin-left: 8">REQUIRED. The authorization code, a random string issued by the IdP to be used in the request to the token endpoint.</dd>

</dl>

PKCE parameters MUST be associated with the "code" as per Section 4.4 of [Proof Key for Code Exchange by OAuth Public Clients (PKCE)] [[rfc7636]]

<aside class="example">
The following is an example response:

<pre>https://client.example.org/cb?
    state=2ca3359dfbfd0
   &code=gOIFJ1hV6Rb1sxUdFhZGACWwR1sMhYbJJcQbVJN0wHA
</pre>
</aside>

<!-- ### [3.4.](#rfc.section.3.4) [Token Lifetimes](#TokenLifetimes) -->
### Token Lifetimes

This profile provides RECOMMENDED lifetimes for different types of tokens issued to different types of clients. Specific applications MAY issue tokens with different lifetimes. Any active token MAY be revoked at any time.

For clients using the authorization code grant type, access tokens SHOULD have a valid lifetime no greater than one hour, and refresh tokens (if issued) SHOULD have a valid lifetime no greater than twenty-four hours.

For public clients access tokens SHOULD have a valid lifetime no greater than fifteen minutes.

For clients using the client credentials grant type, access tokens SHOULD have a valid lifetime no greater than six hours.

<!-- ### [3.5.](#rfc.section.3.5) [Scopes](#Scopes) -->
### Scopes

Scopes define individual pieces of authority that can be requested by clients, granted by resource owners, and enforced by protected resources. Specific scope values will be highly dependent on the specific types of resources being protected in a given interface. OpenID Connect, for example, defines scope values to enable access to different attributes of user profiles.

Authorization servers SHOULD define and document default scope values that will be used if an authorization request does not specify a requested set of scopes.

To facilitate general use across a wide variety of protected resources, authorization servers SHOULD allow for the use of arbitrary scope values at runtime, such as allowing clients or protected resources to use arbitrary scope strings upon registration. Authorization servers MAY restrict certain scopes from use by dynamically registered systems or public clients.

 <!-- ### [3.5.1.](#rfc.section.3.5.1) [Scopes](#Scopes) -->
#### Claims for Authorization Outside of Delegation Scenarios

<!-- iGov-NL : Start of the additional content -->
<aside class=" addition">
<b>iGov-NL : Additional content</b></br>

If there is a need to include resource owner memberships in roles and groups that are relevant to the resource being accessed, entitlements assigned to the resource owner for the targeted resource that the authorization server knows about. The authorization server SHOULD include such attributes as claims in a JWT access token as defined in section 2.2.3.1 of [[rfc9068]].

</aside>
<!-- iGov-NL : End of the additional content -->

