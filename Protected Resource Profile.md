## Protected Resource Profile
<!-- ### [3.](#rfc.section.4) Protected Resource Profile -->

<!-- ### [3.1.](#rfc.section.4.1) [Protecting Resources](#ProtectingResources) -->
### Protecting Resources

### Connections with Clients

<section class="nlgov-del" aria-label="sectie verwijderd in NLgov">
A protected resource MAY accept bearer tokens passed using the query parameter
method.

</section>
<section class="nlgov-add" aria-label="sectie toegevoegd in NLgov">
A Protected Resource under this profile MUST NOT accept access tokens passed
using the query parameter method.

A Protected Resource under this profile SHOULD verify if the client is the
Authorized party (`azp`) when client authentication is used. See section
[Advanced OAuth Security Options](#advanced-oauth-security-options) as well.

</section>
<!-- REVIEW (issue #131): beide reflecteren current best practices en zitten in de laatste
 iGov draft. Nog nodig? -->

<!-- ### [4.3.](#rfc.section.4.3) Connections with Authorization Servers -->
### Connections with Authorization Servers

<section class="nlgov-add" aria-label="sectie toegevoegd in NLgov">
Where the optional token attributes (`aud`, `sub`, `azp`, etc.) are already
present within the access token, token introspection is not required for those
attributes. For further details see the [[NLgov.OpenID]] specification.

</section>
