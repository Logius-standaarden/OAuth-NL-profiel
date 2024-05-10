## Security Considerations
<!-- ### [6.](#rfc.section.6) Security Considerations -->

All transactions MUST be protected in transit by TLS as described in [[BCP195]] .

<!-- iGov-NL : Start of the additional content -->
<aside class=" addition">
<b>iGov-NL : Additional content</b></br>  

In addition to the Best Current Practice for TLS, it is highly RECOMMENDED for all conforming implementations to incorporate the TLS guidelines from the Dutch NCSC into their implementations. If these guidelines are applied:
* For back-channel communication, the guidelines categorized as "good" MUST be applied.
* For front-channel communication, the guidelines for "good" MUST be applied and the guidelines for "sufficient" MAY be applied, depending on target audience and support requirements.
* Guidelines categorized as "insufficient" MUST NOT be applied and those categorized as "phase out" SHOULD NOT be used.

</aside>
<!-- iGov-NL : End of the additional content -->

Authorization Servers SHOULD take into account device postures when dealing with native apps if possible. Device postures include characteristics such as a user's lock screen setting, or if the app has 'root access' (meaning the device OS may be compromised to gain additional privilages not intended by the vendor), or if there is a device attestation for the app for its validity. Specific policies or capabilities are outside the scope of this specification.

All clients MUST conform to applicable recommendations found in the Security Considerations sections of [[rfc6749]] and those found in the [OAuth 2.0 Threat Model and Security Considerations document] [[rfc6819]] .
