## Security Considerations
<!-- ### [6.](#rfc.section.6) Security Considerations -->

<span class="nlgov-add" aria-label="sectie toegevoegd in NLgov">

Response parameters:
 
`code`
: Mandatory. MUST be a cryptographic random value, using an unpredictable value
  with at least 128 bits of entropy.
 
`state`
: Mandatory. MUST be a verbatim copy of the value of the `state` parameter in
  the Authorization Request.
 
</span>

<!-- REVIEW (issue #131): Beide constraints zitten in iGov (section 3.2
     on code_verifier entropy and state matching). Nog nodig? -->
