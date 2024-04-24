## Advanced OAuth Security Options
<!-- ### [5.](#rfc.section.5) [Advanced OAuth Security Options](#AdvancedSecurity) -->

The preceding portions of this OAuth profile provide a level of security adequate for a wide range of use cases, while still maintaining relative ease of implementation and usability for developers, system administrators, and end users. The following are some additional security measures that can be employed for use cases where elevated risks justify the use of additional controls at the expense of implementation effort and usability. This section also addresses future security capabilities, currently in the early draft stages, being added to the OAuth standard suite.

<!-- ### [5.1.](#rfc.section.5.1) [Proof of Possession Tokens](#PoPTokens) -->
## Proof of Possession Tokens

OAuth proof of possession tokens are currently defined in a set of drafts under active development in the Internet Engineering Task Force (IETF) OAuth Working Group. While a bearer token can be used by anyone in possession of the token, a proof of possession token is bound to a particular symmetric or asymmetric key issued to, or already possessed by, the client. The association of the key to the token is also communicated to the protected resource; a variety of mechanisms for doing this are outlined in the draft [OAuth 2.0 Proof-of-Possession (PoP) Security Architecture] [[I-D.ietf-oauth-pop-architecture]] . When the client presents the token to the protected resource, it is also required to demonstrate possession of the corresponding key (e.g., by creating a cryptographic hash or signature of the request).

Proof of Possession tokens are somewhat analogous to the Security Assertion Markup Language's (SAML's) Holder-of-Key mechanism for binding assertions to user identities. Proof of possession could prevent a number of attacks on OAuth that entail the interception of access tokens by unauthorized parties. The attacker would need to obtain the legitimate client's cryptographic key along with the access token to gain access to protected resources. Additionally, portions of the HTTP request could be protected by the same signature used in presentation of the token. Proof of possession tokens may not provide all of the same protections as PKI authentication, but they are far less challenging to implement on a distributed scale.

<!-- iGov-NL : Start of the additional content -->
<aside class=" addition">
<b>iGov-NL : Additional content</b></br>  

Proof of possession can be implemented using various methods. An example of such an implementation is using TLS with mutual authentication, where the client is using a PKIoverheid certificate. The authorized party (<code>azp</code>) can then be verified with the client certificate to match the authorized party.
As an alternative, the authorization server can include a <code>cnf</code> parameter in the JWT by the authorization server, see [[rfc7800]]. The key referenced in <code>cnf</code> can be validated using a form of client authentication, e.g. using an `private_key_jwt` or `tls_client_auth`[[rfc8705]].

</aside>
<!-- iGov-NL : End of the additional content -->
