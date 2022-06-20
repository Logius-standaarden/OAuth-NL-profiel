
Additional specification and constraints of iGov-NL to the iGov profile
=====

# Introduction
This document is a companion to the NL GOV Assurance profile for OAuth 2.0(iGov-NL). It lists all Added specification and additional constraints of iGov-NL. It provides a compact overview of the differences between the international and dutch profile. For each difference it points to a rationale.

**TODO strikethroughs**

## 2.3.1 Requests to the Authorization Endpoint
iGov-NL

Native clients MUST apply PKCE, as per RFC7636. As code_verifier the S256 method MUST be applied. Effectively this means that a Native Client MUST include a cryptographic random code_challenge of at least 128 bits of entropy and the code_challenge_method with the value S256.

Request fields:

client_id
Mandatory. MUST have the value as obtained during registration.
scope
Optional.
response_type
Mandatory. MUST have value `code` for the Authorization Code Flow.
redirect_uri
Mandatory. MUST be an absolute HTTPS URL, pre-registered with the Authorization Server.
state
Mandatory, see above. Do not use the SessionID secure cookie for this.
code_challenge
In case of using a native app as user-agent mandatory. (Eg. an UUID [rfc4122])
code_challenge_method
In case `code_challenge` is used with a native app, mandatory. MUST use the value `S256`.
/iGov-NL

**reference to rationale: PKCE in Detailed rationale 7, Authorization Request in Detailed rationale 5**

## 2.3.2 Response from the Authorization Endpoint
iGov-NL

Response parameters

code
Mandatory. MUST be a cryptographic random value, using an unpredictable value with at least 128 bits of entropy.
state
Mandatory. MUST be a verbatim copy of the value of the state parameter in the Authorization Request.
/iGov-NL

**reference to rationale: Detailed rationale 5**

## 2.3.3 Requests to the Token Endpoint
iGov-NL

In addition to above signing methods, the Authorization server SHOULD support PS256 signing algorithm [RFC7518] for the signing of the private_key_jwt.

Effectively, the Token Request has the following content:

grant_type
Mandatory. MUST contain the value `authorization_code`
code
Mandatory. MUST be the value obtained from the Authorization Response.
scope
Optional. MUST be less or same as the requested scope.
redirect_uri
Mandatory. MUST be an absolute HTTPS URL, pre-registered with the Authorization Server.
client_id
Mandatory. MUST have the value as obtained during registration.
client_assertion_type
Mandatory. MUST have the value `urn:ietf:params:oauth:client-assertion-type:jwt-bearer`, properly encoded.
client_assertion
Mandatory. MUST have the above specified signed JWT as contents.
/iGov-NL

**reference to rationale: PS256 in Detailed rationale 4, Token Request in Detailed rationale 5**

## 2.3.4 Client Keys

iGov-NL

In case the Authorization Server, Resource Server and client are not operated under responsibility of the same organisation, each party MUST use PKIoverheid certificates with OIN.
The PKIoverheid certificate MUST be included either as a <code>x5c</code> or as <code>x5u</code> parameter, as per [[rfc7517]] §4.6 and 4.7. Parties SHOULD at least support the inclusion of the certificate as <code>x5c</code> parameter, for maximum interoperability. 
Parties MAY agree to use <code>x5u</code>, for instance for communication within specific environments.  

/iGov-NL

**reference to rationale: Detailed rationale 1 & 9**

## 3.1.10 Token Response

iGov-NL

The Token Response has the following contents:

access_token
Mandatory. Structured access token a.k.a. a JWT Bearer token. The JWT MUST be signed.
token_type
Mandatory. The type for a JWT Bearer token is Bearer, as per [rfc6750]
refresh_token
Under this profile, refresh tokens are supported.
expires_in
Optional. Lifetime of the access token, in seconds.
scope
Optional. Scope(s) of the access (token) granted, multiple scopes are separated by whitespace. The scope MAY be omitted if it is identical to the scope requested.
For best practices on token lifetime see section Token Lifetimes. 

/iGov-NL


**reference to rationale: Detailed rationale 5**

## 3.1.3 Dynamic Registration
iGov-NL

In this version of iGov-NL we follow iGov for the requirement that the Authorization servers MUST support dynamic client registration. However depending on how the future authentication architecture of the dutch government develops in regards to OAuth we may revisit this in a future revision. The current requirement fits an architecture where there is a limited number of widely used authorization servers. However if in practice we start seeing a very large number of authorization servers with limited use this requirement can become a recommendation in a future version of this profile. For these authorization servers with limited use we consider mandatory support for dynamic client registration a large burden.

/iGov-NL


**reference to rationale: self explanatory, text provides insight in possible future changes to iGov-NL**

## 3.1.5 Discovery
iGov-NL

iGov requires that the authorization server provides an OpenIDConnect service discovery endpoint. Recently OAuth 2.0 Authorization Server Metadata [rfc8414] has been finalized, this provide the same functionality in a more generic way and could replace this requirement in a future version of the iGov-NL profile.

/iGov-NL

**reference to rationale: Detailed rationale 6**

## 3.2.1 JWT Bearer Tokens

iGov-NL

In iGov-NL the sub claim MUST be present.

/iGov-NL

**rationale to be provided by:**

**reference to rationale: Detailed rationale 3**

iGov-NL

In addition to above signing methods, the Authorization server SHOULD support PS256 signing algorithm [RFC7518] for the signing of the JWT Bearer Tokens.

/iGov-NL

**reference to rationale: Detailed rationale 4**

iGov-NL

How to select or obtain the key to be used for encryption of an access token is out of scope of this profile. A early draft of "Resource Indicators for OAuth 2.0" exist and could be used. This draft describes usage of the resource parameter to indicate the applicable resource server.


**reference to rationale: self explanatory: additional information (non normative) on how to implement requirement**

In case the Authorization Server, Resource Server and client are not operated under responsibility of the same organisation, each party MUST use PKIoverheid certificates with OIN for encryption.


**reference to rationale: Detailed rationale 1**

/iGov-NL


## 4.1 Protecting Resources

iGov-NL

TODO NL example

/iGov-NL

**rationale to be provided by: Jan-Jaap**

**reference to rationale: self explanatory: additional information (non normative) on how to implement requirement**

## 4.2 Connections with Clients

iGov-NL

A Protected Resource under this profile MUST NOT accept access tokens passed using the query parameter method.

A Protected Resource under this profile SHOULD verify if the client is the Authorized party (azp) when client authentication is used. See section Advanced OAuth Security Options as well.

/iGov-NL

**reference to rationale: Detailed rationale 8**

## 4.1 Proof of Possession Tokens

iGov-NL

Proof of possession can be implemented using various methods. An example of such an implementation is using TLS with mutual authentication, where the client is using a PKIoverheid certificate. The authorized party (azp) can then be verified with the client certificate to match the authorized party. As an alternative, the authorization server can include a cnf parameter in the JWT by the authorization server, see [rfc7800]. The key referenced in cnf can be validated using a form of client authentication, e.g. using an private_key_jwt.

/iGov-NL

**reference to rationale: self explanatory: additional information (non normative) on how to implement requirement**

## 6 Security Considerations

iGov-NL

In addition to the Best Current Practice for TLS, it is highly RECOMMENDED for all conforming implementations to incorporate the TLS guidelines from the Dutch NCSC into their implementations. If these guidelines are applied:

For back-channel communication, the guidelines categorized as "good" MUST be applied.
For front-channel communication, the guidelines for "good" MUST be applied and the guidelines for "sufficient" MAY be applied, depending target audience and support requirements.
Guidelines categorized as "insufficient" MUST NOT be applied and those categorized as "deprecated" SHOULD NOT be used.
/iGov-NL


**reference to rationale: Detailed rationale 2**

# General Rationale

The reason for the creation of iGov-NL is an advisory document on the adoption of OAuth as a mandatory(comply or explain) standard for the Dutch public sector. It states that a Dutch profile is needed for the OAuth standard to avoid interoperability problems between different implementations. The existance of iGov-NL has become a precondition for the adaoption of OAuth as mandatory standard for the Dutch public sector.
 
## Expert advice OAuth forum standaardisatie
The creation of the iGov-NL profile is based on a recommendation from the expert advice on OAuth [Expert]. This expert advice was writen as part of the procedure to make OAuth a mandotary standard for the dutch public sector. Conditional for the adoption of OAuth as a mandotory standard was the creation of a Dutch implementation profile. The Rationale provided is that without a local implementation profile the risk of diverging non-interoperable implementations of the standard becomes unacceptably large.

## Orginazational scope of the standaard
When iGov-NL becomes a mandatory standard, the following organisations will have to comply: Dutch government organizations (National, provinces, municipalities and regional water authorities) and organizations in the (semi-) public sector

## Functional scope of the standaard
The use of OAuth 2.0 is mandatory for applications where users (resource owner) delegate rights (implicitly or explicitly) to a (third party) service with the purpose of giving this service acces to specific data using a RESTful API. Specifcally a RESTful API to which the resource owner has acces rights.

## OpenID connect out of scope
The expertgroup that authored the expert advice on OAuth met on the 7th of juli and on 22nd september 2016. Based on their discussion OpenIDConnect was placed out of scope and not (yet) reccomended as a mandatory standard.

## Based on international iGov standard
This profile is based upon the international government assurance profile for OAuth 2.0 (iGov) [iGOV.OAuth2] as published by the OpenID Foundation (https://openid.net/foundation/). It should be considered a fork of this profile as the iGov profile is geared more towards the American situtation and in the Netherlands we have to deal with an European Union context.
We have added the chapter Usecases to illustrate the specific usecase the iGov-NL profile is aimed at.  
Besides the OAuth profile iGov also has a complementary OpenID connect profile [iGOV.OpenID]. If and when OpenID connect becomes a mandatory standard for the Dutch public sector iGov-NL can be expanded with a Dutch version of the iGov OpenID Connect profile. De usecase described at the beginning of iGov-NL was written with this possible expansion in mind.

# Detailed Rationale

## 1 Use of local infrastructure for PKI certificates (PKIOverheid)
The Dutch government has its own infrastructure for PKI certificates based on international open standards(x509 etc...). Its implementation is based on Dutch laws. It allows for a uniform way of identifying organizations based on the OIN identifier included in the certificate and then authenticating an authorizing them. This reduces the complexity of maintainging authorization tables for service providers, as these can be based directly on OIN identifiers. Using PKI certficates allows service consumers to re-use their existing PKIOverheid certificates instead of burdening them with maintaining yet another authentication product. 

## 2 Use of local standards and best practices for TLS
Implementations MUST support TLS. Which version(s) ought to be implemented will vary over time, and depend on the widespread deployment and known security vulnerabilities at the time of implementation.
iGov-NL implementations MUST implement the Forum Standaardisatie TLS standard  https://www.forumstandaardisatie.nl/standaard/tls.

## 3 Limiting the set of usecases 
OAuth2 can be applied over a wide range of various use case scenarios. Profiles like this profile "iGov-NL" therefore exist to set a baseline to be applicable for specific use cases.

Selected use cases have implications on choices for e.g. security, privacy and interoperability. This version of this profile is therefore scoped to a single use case. Future updates to this profile may increase the scope to additional use cases.

Since this profile focuses on a particular use case, certain explicit requirements or changes from the upsteam iGov profile exist. These include (non exhaustive):
- A `sub` identifier MUST be present in access tokens, as the use case by definition focuses on authorization including an identifier.
- Direct access clients are out of scope.

## 4 Support for PSS-based signature methods

Standard OAuth2 and the OAuth2 iGov profile rely on `RS256` as signature method. This is explicitly stated in the international iGov profile. The OAuth2 standards have this implicitly included, as it is built on top of JOSE (signatures in JWS (RC7515), using algorithms of JWA (RFC7518)). RFC7518 recommends support for RS256.

The `RS256` is specified as an RSA signature using PKCS v1.5 padding. This form of padding has been vulnerable to various attacks. Better alternatives are available using PSS padding. A method of RSA signature using PSS and SHA256 is standardized as `PS256` in RFC7518 as well. Other standards are deprecating PKCSv1.5 padding and are migrating towards PSS padding for RSA signatures, however JOSE and thereby OAuth2 have not done so yet.

As PKIoverheid is currently still RSA based, moving to ECDSA is not yet an option. Therefore, this profile recommends (in the form of a SHOULD) the usage of PS256. This helps as a precursor to deprecating and removing RS256/PKCSv1.5 padding.

## 5 Inclusion of detailed request / response structure

Some steps in the flow of the international iGov profile have not been described or have been incompletely described. This profile (iGov-NL) has described some messages or parameters explicitly, although they are specified in the underlying standards. These have been described for reasons of completeness.

## 6 OAuth2 Server Metadata prevails over OpenID Connect Discovery

The international iGov profile specifies usage of metadata for the OAuth2 Authorization Server using OpenID Connect Discovery. A very similar, yet more generic, specification was adopted by the OAuth2 working group of IETF as RFC8414 "OAuth 2.0 Authorization Server Metadata". As this is a profile for OAuth2, relying on generic OAuth2 standards is preferred over application specific standards, such as OpenID Connect Discovery.

## 7 Using PKCE for native applications

A known and actively exploited attack exists against native applications implementing the OAuth2 Authorization Code flow. This attack is described and a countermeasure is standardized in RFC7636, also known as PKCE.

The international iGov profile describes two modes for deployment of native applications. Usage of PKCE is either mandatory in case no unique client id is registered, or optional in case dynamic registration and separate client ids are being used.

However, do note that this profile requires usage of PKIoverheid in inter-organizational use cases. As native application on end-user devices can rarely be considered as fully managed and controlled by one organization, dynamic registration would imply using a PKIoverheid on (mobile) end-user devices. This is in conflict with best practices and terms & conditions for PKIoverheid certificates.

As such PKCE is included in the Autorization Request in this profile. This is in line with Detailed rationale 5 above.

## 8 Mandating security recommendations

The OAuth2 standards include various security considerations. Additional best practices are being drafted. As this profile is intended for broad usage in situations where sensitive data is being exchanged, any compliant implementation should be secure and privacy friendly by default.

As a result, a few not-so-secure options are explicitly prohibited and more secure options required or recommended. These include:
- access tokens in URL query string, as this can have security and privacy implications.
- validation of parameters, as counter measure 
- PSS padding in signing methods, see Detailed rationale 4
- Usage of PKCE, see Detailed rationale 7

## 9 Embedding certificates

The party offering the JWT token has a choice to either include an embedded certificate chain (<code>x5c</code>) or include a url that points to the certificate chain (<code>x5u</code>). 
Parties receiving and validating JWT tokens may need to be able to support both <code>x5c</code> and <code>x5u</code>. 
The choice between <code>x5c</code> and <code>x5u</code> entails a trade-off. Including the certificate chain in JWT tokens makes for longer tokens (around 1kB for tokens with url, versus around 5kB for tokens with a single embedded certificate). 
Also, having the certificates accessible over URLs creates the possibility of establishing the necessary PKI infrastructure for encrypted message exchange. 
However, certificates accessible by url introduce (possibly undesired) run-time dependence on an on-line resource. Also, detecting and supporting both options makes for more complex token validation logic.

