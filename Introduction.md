## Introduction
<!-- ### [1.](#rfc.section.1) [Introduction](#Introduction) -->

This document profiles the OAuth 2.0 web authorization framework for use in the context of securing web-facing application programming interfaces (APIs), particularly Representational State Transfer (RESTful) APIs. The OAuth 2.0 specifications accommodate a wide range of implementations with varying security and usability considerations, across different types of software clients. The OAuth 2.0 client, protected resource, and authorization server profiles defined in this document serve two purposes:

1.  Define a mandatory baseline set of security controls suitable for a wide range of government use cases, while maintaining reasonable ease of implementation and functionality
2.  Identify optional, advanced security controls for sensitive use cases where increased risk justifies more stringent controls.

This OAuth profile is intended to be shared broadly, and has been ~~greatly influenced by the [HEART OAuth2 Profile][[HEART.OAuth2]].~~ derived from the [iGov OAuth2 profile] [[iGOV.OAuth2]].

<!-- ### [1.1.](#rfc.section.1.1) [Requirements Notation and Conventions](#rnc) -->
## Requirements Notation and Conventions  
The key words "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT", "SHOULD", "SHOULD NOT", "RECOMMENDED", "NOT RECOMMENDED", "MAY", and "OPTIONAL" in this document are to be interpreted as described in [[rfc2119]] .

All uses of [JSON Web Signature (JWS)] [[rfc7515]] and [JSON Web Encryption (JWE)] [[rfc7516]] data structures in this specification utilize the JWS Compact Serialization or the JWE Compact Serialization; the JWS JSON Serialization and the JWE JSON Serialization are not used.

<!-- ### [1.2.](#rfc.section.1.2) [Terminology](#Terminology) -->
## Terminology

This specification uses the terms "Access Token", "Authorization Code", "Authorization Endpoint", "Authorization Grant", "Authorization Server", "Client", "Client Authentication", "Client Identifier", "Client Secret", "Grant Type", "Protected Resource", "Redirection URI", "Refresh Token", "Resource Owner", "Resource Server", "Response Type", and "Token Endpoint" defined by [OAuth 2.0] [[rfc6749]] , the terms "Claim Name", "Claim Value", and "JSON Web Token (JWT)" defined by [JSON Web Token (JWT)] [[rfc7519]] , and the terms defined by [OpenID Connect Core 1.0] [[OpenID.Core]] .

<!-- ### [1.3.](#rfc.section.1.3) Conformance -->
## Conformance


This specification defines requirements for the following components:

*   OAuth 2.0 clients.
*   OAuth 2.0 authorization servers.
*   OAuth 2.0 protected resources.

The specification also defines features for interaction between these components:

*   Client to authorization server.
*   Protected resource to authorization server.

 <!-- iGov-NL : Start of the additional content -->
<aside class=" addition">
<b>iGov-NL : Additional content</b></br>  
This profile is based upon the international government assurance profile for OAuth 2.0 (iGov) [[iGOV.OAuth2]] as published by the OpenID Foundation (https://openid.net/foundation/). It should be considered a fork of this profile as the iGov profile is geared more towards the American situtation and in the Netherlands we have to deal with an European Union context.
</aside>
<!-- iGov-NL : End of the additional content -->


When an ~~iGov~~ iGov-NL-compliant component is interacting with other ~~iGov~~ iGov-NL-compliant components, in any valid combination, all components MUST fully conform to the features and requirements of this specification. All interaction with non-~~iGov~~ iGov-NL components is outside the scope of this specification.

An ~~iGov~~ iGov-NL-compliant OAuth 2.0 authorization server MUST support all features as described in this specification. A general-purpose authorization server MAY support additional features for use with non-~~iGov~~ iGov-NL clients and protected resources.

An ~~iGov~~ iGov-NL-compliant OAuth 2.0 client MUST use all functions as described in this specification. A general-purpose client library MAY support additional features for use with non-iGov authorization servers and protected resources.

An ~~iGov~~ iGov-NL-compliant OAuth 2.0 protected resource MUST use all functions as described in this specification. A general-purpose protected resource library MAY support additional features for use with non-~~iGov~~ iGov-NL authorization servers and clients.
