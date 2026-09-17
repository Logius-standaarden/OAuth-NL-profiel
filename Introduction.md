This profile is based upon the International Government Assurance Profile (iGov) for OAuth 2.0 [[iGOV.OAuth2]] as published by the [OpenID Foundation](https://openid.net/foundation/). 
It should be considered a fork of that profile, as the iGov profile is geared more towards the American situation; in the Netherlands the European Union context applies.
 
All requirements from [[iGOV.OAuth2]] apply to the corresponding NLgov roles (client, authorization server, protected resource) unless explicitly overridden
or extended in this document. Readers MUST consult [[iGOV.OAuth2]] alongside this document.

## Requirements Notation and Conventions  
The key words "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT", "SHOULD", "SHOULD NOT", "RECOMMENDED", "NOT RECOMMENDED", "MAY", and "OPTIONAL" in this document are to be interpreted as described in [[rfc2119]] .

All uses of [JSON Web Signature (JWS)] [[rfc7515]] and [JSON Web Encryption (JWE)] [[rfc7516]] data structures in this specification utilize the JWS Compact Serialization or the JWE Compact Serialization; the JWS JSON Serialization and the JWE JSON Serialization are not used.

<!-- ### [1.2.](#rfc.section.1.2) [Terminology](#Terminology) -->
## Terminology

This specification uses the terms "Access Token", "Authorization Code", "Authorization Endpoint", "Authorization Grant", "Authorization Server", "Client", "Client Authentication", "Client Identifier", "Client Secret", "Grant Type", "Protected Resource", "Redirection URI", "Refresh Token", "Resource Owner", "Resource Server", "Response Type", and "Token Endpoint" defined by [OAuth 2.0] [[rfc6749]] , the terms "Claim Name", "Claim Value", and "JSON Web Token (JWT)" defined by [JSON Web Token (JWT)] [[rfc7519]] , and the terms defined by [OpenID Connect Core 1.0] [[OpenID.Core]] .

<!-- ### [1.3.](#rfc.section.1.3) Conformance -->
## Conformance
 
Where [[iGOV.OAuth2]] refers to "iGov-compliant" components, this profile substitutes "NLgov-compliant". All conformance requirements of [[iGOV.OAuth2]] section 1.3 apply accordingly.
