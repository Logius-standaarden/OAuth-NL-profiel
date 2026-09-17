## Authorization Server Profile
<!-- ### [2.](#rfc.section.3) [Authorization Server Profile](#ServerProfile) -->

All servers MUST conform to applicable recommendations found in the Security Considerations sections of [[rfc6749]] and those found in the "OAuth Threat Model Document" [[rfc6819]] .

The authorization server MUST protect all communications to and from its OAuth endpoints using TLS.

<!-- ### [2.1.](#rfc.section.3.1) Connections with clients -->
### Connections with clients

<!-- ### [2.1.1.](#rfc.section.3.1.1) Grant types -->
#### Grant types

The authorization server MUST support the <samp>authorization_code</samp> , and MAY support the <samp>client_credentials</samp> grant types as described in [Section 2](#client-profiles).
 The authorization server MUST limit each registered client (identified by a client ID) to a single grant type only, since a single piece of software will be functioning at runtime in only one of the modes described in [Section 2](#client-profiles). Clients that have multiple modes of operation MUST have a separate client ID for each mode.

<!-- iGov-NL : Start of the additional content -->
<aside class=" addition">
<b>iGov-NL : Additional content</b></br>  

Token exchange grant type [[rfc8693]] SHOULD be supported by the authorization server. This is used to translate a third party token (OAuth or SAML). For example, exchanging a DigiD or eHerkenning SAML token for an OAuth token.

When token exchange is not supported, SAML bearer grant [[rfc7522]] MAY be used as alternative.
</aside>
<!-- iGov-NL : End of the additional content -->

<!-- ### [2.1.2.](#rfc.section.3.1.2) Client authentication -->
#### Client authentication

<section class="nlgov-add" aria-label="sectie toegevoegd in NLgov">
In addition to `private_key_jwt`, the client authentication method
`tls_client_auth` [[rfc8705]] MAY also be used.

</section>
<!-- REVIEW (issue #131): `tls_client_auth` is zit nu in iGov. -->

<!-- ### [2.1.3.](#rfc.section.3.1.3) [Dynamic Registration](#DynamicRegistration) -->
#### Dynamic Registration

<section class="nlgov-del" aria-label="sectie verwijderd in NLgov">
Authorization servers MUST support dynamic client registration.

</section>
<section class="nlgov-add" aria-label="sectie toegevoegd in NLgov">
In this version of the NLgov profile, Authorization Servers SHOULD support
dynamic client registration. Depending on how the future authentication
architecture of the Dutch government develops in regards to OAuth, this may be
revisited in a future revision.

The current requirement fits an architecture where there is a limited number of
widely used authorization servers. If in practice a very large number of
authorization servers with limited use emerges, mandatory support for dynamic
client registration is considered a large burden for such servers.

</section>

<!-- ### [2.1.4.](#rfc.section.3.1.4) Client Approval -->
#### Client Approval

<!-- ### [2.1.5.](#rfc.section.3.1.5) [Discovery](#Discovery) -->
#### Discovery

<section class="nlgov-add" aria-label="sectie toegevoegd in NLgov">
The `tls_client_auth` method SHOULD be listed in the Authorization Server
discovery metadata where supported.

</section>
<!-- REVIEW (issue #131): `tls_client_auth` zit in iGov.
     De note over RFC8414 welke OpenID Connect Discovery zou vervangen is verouderd:
     RFC8414 wordt naar gerefereerd in iGov. Voor nu verwijderd. -->

<!-- ### [2.1.6.](#rfc.section.3.1.6) Revocation -->
#### Revocation

<!-- ### [2.1.7.](#rfc.section.3.1.7) PKCE -->
#### PKCE

<!-- ### [2.1.8.](#rfc.section.3.1.8) Redirect URIs -->
#### Redirect URIs


<!-- ### [2.1.9.](#rfc.section.3.1.9) RefreshTokens -->
#### RefreshTokens

<section class="nlgov-add" aria-label="sectie toegevoegd in NLgov">
Refresh tokens issued to public clients MUST be either sender-constrained or
one-time use, per the OAuth 2.1 Authorization Framework
[[draft-ietf-oauth-v2-1]] and [[rfc9700]] section 2.2.2.

</section>
<!-- REVIEW (issue #131): iGov mandateert nu get gebruik van sender-constrained access tokens
     met mTLS [[rfc8705]] of DPoP [[rfc9449]]. Open issue. -->

<!-- ### [2.1.10.](#rfc.section.3.1.10) Token Response -->
#### Token Response

<section class="nlgov-add" aria-label="sectie toegevoegd in NLgov">
The Token Response has the following contents:

`access_token`
: Mandatory. Structured access token (JWT Bearer token). The JWT MUST be signed.

`token_type`
: Mandatory. For a JWT Bearer token the value is `Bearer`, as per [[rfc6750]].

`refresh_token`
: Under this profile, refresh tokens are supported.

`expires_in`
: Optional. Lifetime of the access token, in seconds.

`scope`
: Optional. Scope(s) of the granted access token; multiple scopes are separated
  by whitespace. MAY be omitted if identical to the scope requested.

For best practices on token lifetime see section
[Token Lifetimes](#token-lifetimes).

</section>
<!-- REVIEW (issue #131): Dit zijn standaard OAuth 2.0 velden
     (RFC6749 section 5.1). Nodig? -->

<!-- ### [2.2.](#rfc.section.3.2) Connections between authorization servers and protected resources -->
### Connections between Authorization Servers and Protected Resources

<!-- ### [2.2.1.](#rfc.section.3.2.1) [JWT Bearer Tokens](#JWTBearerTokens) -->

#### JSON Web Token (JWT) Bearer Tokens <!-- kan ik dit afkorten naar JWT Bearer Tokens?>

<section class="nlgov-add" aria-label="sectie toegevoegd in NLgov">
The `sub` claim MUST be present in access tokens issued under this profile.

The Authorization Server SHOULD support the PS256 signing algorithm [[rfc7518]]
for signing JWT Bearer Tokens.

Where the Authorization Server, Resource Server, and client are not operated
under the responsibility of the same organisation, each party MUST use
PKIoverheid certificates with OIN for encryption.

How to select or obtain the key for encryption of an access token is out of
scope of this profile. The `resource` parameter from Resource Indicators for
OAuth 2.0 [[rfc8707]] MAY be used to indicate the applicable resource server.

</section>
<!-- REVIEW (issue #131): RFC8707 is nu vastgesteld als RFC (was een early draft) maar nog niet in iGov.
     The OIN encryption vereiste is dubbel the Client Keys sectie;
     misschien 1 PKIoverheid/OIN sectie opstellen ergens? -->

<!-- ### [2.2.2.](#rfc.section.3.2.2) Introspection -->
#### Introspection

<!-- ### [2.3.](#rfc.section.3.3) Response to Authorization Requests -->
### Response to Authorization Requests

<!-- ### [2.4.](#rfc.section.3.4) [Token Lifetimes](#TokenLifetimes) -->
### Token Lifetimes

<!-- ### [2.5.](#rfc.section.3.5) [Scopes](#Scopes) -->
### Scopes

 <!-- ### [2.5.1.](#rfc.section.3.5.1) [Scopes](#Scopes) -->
#### Claims for Authorization Outside of Delegation Scenarios

<section class="nlgov-add" aria-label="sectie toegevoegd in NLgov">
If there is a need to include resource owner memberships in roles and groups
that are relevant to the resource being accessed, or entitlements assigned to
the resource owner for the targeted resource that the authorization server knows
about, the authorization server SHOULD include such attributes as claims in a
JWT access token as defined in section 2.2.3.1 of [[rfc9068]].

</section>
<!-- REVIEW (issue #131): Kan verder worden uitgewerkt. -->
