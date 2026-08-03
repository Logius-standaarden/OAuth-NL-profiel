## Advanced OAuth Security Options
<!-- ### [5.](#rfc.section.5) [Advanced OAuth Security Options](#AdvancedSecurity) -->

The preceding portions of this OAuth profile provide a level of security adequate for a wide range of use cases, while still maintaining relative ease of implementation and usability for developers, system administrators, and end users. The following are some additional security measures that can be employed for use cases where elevated risks justify the use of additional controls at the expense of implementation effort and usability. This section also addresses future security capabilities, currently in the early draft stages, being added to the OAuth standard suite.

<!-- iGov-NL : Start of the additional content -->
## Pushed Authorization Requests (PAR)

<span class="nlgov-add" aria-label="sectie toegevoegd in NLgov">

Traditionally, OAuth 2.0 authorization requests are sent via front-channel communication (e.g., browser redirects), which exposes sensitive parameters to potential tampering or interception. PAR [[rfc9126]] addresses these vulnerabilities by allowing clients to push authorization requests directly to the authorization server over a secure back-channel. [[[OpenID.FAPI2.0]]] also includes this feature as of version 2.0 . Below are some of the issues it alleviates:

* **Lack of Integrity and Authenticity:**
Authorization request parameters sent as URI query parameters are vulnerable to tampering. Attackers can modify values like scope or redirect_uri, potentially altering the context of transactions or access permissions. Such sensitive data in front-channel requests can be intercepted or phished, compromising client credentials or authorization codes. Attackers can exploit the request_uri parameter by injecting malicious URIs, leading to unauthorized access or token leakage.
* **Lack of Confidentiality:**
Although HTTPS protects the authorization endpoint, request parameters pass through the user agent in the clear, risking exposure via browser logs, referrer headers, or other leaks. This is particularly problematic for sensitive data like personally identifiable information (PII). 
* **Size Limitations:**
Large authorization requests with fine-grained permissions can exceed URL size limits, causing processing errors.
* **Delayed Client Authentication:**
Traditional flows delay client authentication until after user interaction, making it harder to detect and reject illegitimate requests early.

To combat this PAR allows clients to push authorization requests directly to the authorization server over a secure back-channel (HTTPS), effectively preventing tampering. For higher security, PAR can be combined with JWT-based Request Objects for cryptographic signing and optional encryption. Furthermore, by moving sensitive data from the front-channel (user agent) to the back-channel, PAR ensures that request parameters are not exposed to the browser or third parties, mitigating leakage risks.  Also, PAR enables the authorization server to authenticate the client before any user interaction, allowing early detection and rejection of illegitimate requests, such as spoofing or tampering attempts.

</span>
<!-- iGov-NL : End of the additional content -->

<!-- ### [5.1.](#rfc.section.5.1) [Proof of Possession Tokens](#PoPTokens) -->
## Proof of Possession Tokens (PoP)

<span class="nlgov-add" aria-label="sectie toegevoegd in NLgov">

Proof of possession can be implemented using various methods. One example is
mutual TLS, where the client authenticates using a PKIoverheid certificate. The
authorized party (`azp`) can then be verified against the client certificate.
 
As an alternative, the authorization server MAY include a `cnf` parameter in
the JWT access token, as per [[rfc7800]]. The key referenced in `cnf` can be
validated using client authentication such as `private_key_jwt` or
`tls_client_auth` [[rfc8705]].
 
</span>
<!-- iGov-NL : End of the additional content -->


<!-- REVIEW (issue #131): RFC7800 and RFC8705 worden meegenomen in iGov referenties +
     DPoP [[rfc9449]] is natuurlijk verplicht. PKIoverheid context bepalen. -->


<!-- iGov-NL : Start of the additional content -->
## Rich Authorization Requests

<span class="nlgov-add" aria-label="sectie toegevoegd in NLgov">

[[[RFC9396]]] is an extension that provides a way for clients to request and obtain fine-grained authorization from resource owners such as end users during the Authorization Code Flow.
In traditional OAuth flows, clients typically request access to a set of scopes from a Resource Server. The Resource Owner then grants access to the resources to the client. However, this approach allows limited granular control over the access granted to a client and can lead to over-provisioning of access, which poses various security risks. With RAR, clients can pass an `authorization_details` claim with additional details that allow for more fine-grained authorization. This also allows for the Resource Server to implement fine-grained authorization for specific requests. Think of one-time payment approvals, document signing or requesting or approving (access to a) specific cases or documents.

According to the RFC, `authorization_details` requires just one field, `type`, which determines the allowable contents of the `authorization_details`. The value is unique for the described API in the context of the Authorization Server. 
The underlying RFC defines a set of common data fields that are designed to be usable across different types of APIs. Fields like `locations`, `datatypes`, `identifier` and `privileges` can be added in the `authorization_details` parameter.

As mentioned in [[RFC9396]]:
> In case of authorization requests as defined in [[RFC6749]], implementers MAY consider using pushed authorization requests [[RFC9126]] to improve the security, privacy, and reliability of the flow.

In case more data, or more recent data, is required for fine-grained authorization then one MAY include the OpenID AuthZEN standard in the `authorization_details`.

</span>
<!-- iGov-NL : End of the additional content -->
