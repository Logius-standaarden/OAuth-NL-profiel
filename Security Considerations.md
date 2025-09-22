## Security Considerations
<!-- ### [6.](#rfc.section.6) Security Considerations -->

All transactions MUST be protected in transit by TLS as described in [[BCP195]] .


Authorization Servers SHOULD take into account device postures when dealing with native apps if possible. Device postures include characteristics such as a user's lock screen setting, or if the app has 'root access' (meaning the device OS may be compromised to gain additional privilages not intended by the vendor), or if there is a device attestation for the app for its validity. Specific policies or capabilities are outside the scope of this specification.

All clients MUST conform to applicable recommendations found in the Security Considerations sections of [[rfc6749]] and those found in the [OAuth 2.0 Threat Model and Security Considerations document] [[rfc6819]] .
