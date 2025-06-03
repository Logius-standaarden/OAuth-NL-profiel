## Advanced OAuth Security Options
<!-- ### [5.](#rfc.section.5) [Advanced OAuth Security Options](#AdvancedSecurity) -->

The preceding portions of this OAuth profile provide a level of security adequate for a wide range of use cases, while still maintaining relative ease of implementation and usability for developers, system administrators, and end users. The following are some additional security measures that can be employed for use cases where elevated risks justify the use of additional controls at the expense of implementation effort and usability. This section also addresses future security capabilities, currently in the early draft stages, being added to the OAuth standard suite.

<!-- iGov-NL : Start of the additional content -->
## Pushed Authorization Requests (PAR)

<aside class="addition">
<b>iGov-NL : Additional content</b></br>

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

</aside>
<!-- iGov-NL : End of the additional content -->

<!-- ### [5.1.](#rfc.section.5.1) [Proof of Possession Tokens](#PoPTokens) -->
## Proof of Possession Tokens (PoP)

~~OAuth proof of possession tokens are currently defined in a set of drafts under active development in the Internet Engineering Task Force (IETF) OAuth Working Group.~~  
While a bearer token can be used by anyone in possession of the token, a proof of possession token is bound to a particular symmetric or asymmetric key issued to, or already possessed by, the client. The association of the key to the token is also communicated to the protected resource.  
~~a variety of mechanisms for doing this are outlined in the draft [OAuth 2.0 Proof-of-Possession (PoP) Security Architecture] [[I-D.ietf-oauth-pop-architecture]] .~~  
When the client presents the token to the protected resource, it is also required to demonstrate possession of the corresponding key ~~(e.g., by creating a cryptographic hash or signature of the request)~~.

<!-- iGov-NL : Start of the additional content -->
<aside class=" addition">
<b>iGov-NL : Additional content</b></br>  
DPoP, or Demonstrating Proof of Possession (see: [[rfc9449]]), is an extension that describes a technique to cryptographically bind access tokens to a particular client when they are issued.   
</aside>
<!-- iGov-NL : End of the additional content -->

~~Proof of Possession tokens are somewhat analogous to the Security Assertion Markup Language's (SAML's) Holder-of-Key mechanism for binding assertions to user identities.~~  
Proof of possession could prevent a number of attacks on OAuth that entail the interception of access tokens by unauthorized parties. The attacker would need to obtain the legitimate client's cryptographic key along with the access token to gain access to protected resources.  
~~Additionally, portions of the HTTP request could be protected by the same signature used in presentation of the token.~~  
Proof of possession tokens may not provide all of the same protections as PKI authentication, but they are far less challenging to implement on a distributed scale.

<!-- iGov-NL : Start of the additional content -->
<aside class=" addition">
<b>iGov-NL : Additional content</b></br>  
Another implementation of PoP is using TLS with mutual authentication, where the client is using a PKI authentication. The authorized party (<code>azp</code>) can then be verified with the client certificate to match the authorized party. As an alternative, the authorization server can include a <code>cnf</code> parameter in the JWT by the authorization server, see [[rfc7800]]. The key referenced in <code>cnf</code> can be validated using a form of client authentication, e.g. using an `private_key_jwt` or `tls_client_auth`[[rfc8705]].
</aside>
<!-- iGov-NL : End of the additional content -->

<!-- iGov-NL : Start of the additional content -->
<aside class=" addition">
<b>iGov-NL : Additional content</b></br>  

More detailed information about securely implementing PoP are described in [FAPI 2.0 Security Profile](https://openid.net/specs/fapi-2_0-security-02.html#name-requirements-for-clients).

</aside>
<!-- iGov-NL : End of the additional content -->
