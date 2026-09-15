## Client Profiles
<!-- ### [1.](#rfc.section.2) [Client Profiles](#ClientProfiles) -->

<!-- ### [1.1.](#rfc.section.2.1) [Client Types](#ClientTypes) -->
### Client Types

<!-- ### [1.1.1.](#rfc.section.2.1.1) [Full Client with User Delegation](#FullClient) -->
#### Full Client with User Delegation

<!-- iGov-NL : Start of the additional content -->
<span class="nlgov-add" aria-label="sectie toegevoegd in NLgov">

In addition to `private_key_jwt`, the client authentication method `tls_client_auth` [[rfc8705]] MAY also be used.

<!-- REVIEW (issue #131): `tls_client_auth` is zit nu ook in iGov (laatste draft v9 en 10).
     Kan weg wmb -->

</span>
<!-- iGov-NL : End of the additional content -->

#### Native Client with User Delegation

#### Direct Access Client

<!-- ### [1.3.](#rfc.section.2.3) Connection to the Authorization Server -->
### Connection to the Authorization Server

<!-- ### [1.3.1.](#rfc.section.2.3.1) [Requests to the Authorization Endpoint](#RequestsToAuthorizationEndpoint) -->
#### Requests to the Authorization Endpoint

<section class="nlgov-add" aria-label="sectie toegevoegd in NLgov">
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

</section>

<!-- REVIEW (issue #131): PKCE is ook een MUST in iGov anend S256 wordt nu ondersteund. PAR is wel NLgov specifiek.
     Zie issue voor extra uitleg. -->

<!-- ### [1.3.2] -->
#### Response from the Authorization Endpoint

<section class="nlgov-add" aria-label="sectie toegevoegd in NLgov">
Response parameters:

`code`
: Mandatory. MUST be a cryptographic random value, using an unpredictable value
  with at least 128 bits of entropy.

`state`
: Mandatory. MUST be a verbatim copy of the value of the `state` parameter in
  the Authorization Request.

</section>
<!-- REVIEW (issue #131): Both constraints are present in iGov (see section 3.2
     on code_verifier entropy and state matching). Review whether this addition
     is still needed. -->

<!-- ### [1.3.3.](#rfc.section.2.3.3) [Requests to the Token Endpoint](#RequestsToTokenEndpoint) -->
#### Requests to the Token Endpoint

<section class="nlgov-add" aria-label="sectie toegevoegd in NLgov">
When using the JWT assertion for client authentication, the assertion MUST use
the claims as specified in [[rfc7521]] and [[rfc7523]].

In addition to `private_key_jwt`, the client authentication method
`tls_client_auth` [[rfc8705]] MAY also be used. Private Key JWT is a method of
client authentication where the client creates and signs a JWT using its own
private key, as described in [[rfc7521]] and [[rfc7523]] and referenced by
OpenID Connect and FAPI 2.0 Security Profile.

The Authorization Server SHOULD support the PS256 signing algorithm [[rfc7518]]
for the signing of the `private_key_jwt`.

</section>

<!-- REVIEW (issue #131): `tls_client_auth` zit in iGov.
     PS256 zit in iGov's Global Requirements section. 
     Is dit nog nodig? -->

</aside>

<!-- ### [1.3.4.](#rfc.section.2.3.4) [Client Keys](#ClientKeys) -->
#### Client Keys

<section class="nlgov-add" aria-label="sectie toegevoegd in NLgov">
Where the Authorization Server, Resource Server, and client are not operated
under the responsibility of the same organisation, each party MUST use
PKIoverheid certificates with OIN.

The PKIoverheid certificate MUST be included either as an `x5c` or as an `x5u`
parameter, as per [[rfc7517]] sections 4.6 and 4.7. Parties SHOULD at least
support the inclusion of the certificate as `x5c` for maximum interoperability.
Parties MAY agree to use `x5u`, for instance for communication within specific
environments.

</section>

<!-- REVIEW (issue #131): Uniek voor Nederland -->
