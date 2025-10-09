# Multi-Actor Authorization in OAuth


1. 2.1 vanuit OIDC
1. Erbij: Korte uitleg rich authorization request en verwijn NL GOV OAuth
1. 5.2.4 Delegation Relationships
1. https://gitdocumentatie.logius.nl/publicatie/api/oidc/#example-2
1. glossary 


## Introduction

The OAuth and OpenID Connect (OIDC) NL GOV profiles support multiple use cases where one entity acts on behalf of another. These occur when an End-User consumes an online service on behalf of a Person (natural or juridical) or an Organisation (the service consumer). In these cases, both authentication and authorization must express not only who the End-User is, but also whom they represent or act for.

Such relationships — called Representation Relationships — must be formally established.
They can arise:
* voluntarily (e.g., power of attorney),
* by legal mandate (e.g., guardian, court-appointed administrator),
* or by corporate capacity (e.g., director, statutory signatory).
<!-- Example Representation Use Cases include voluntary authorization, representative assigned by court order (guardian, administrator), statutory signatory (director, president), limited authorized signatory, etc. -->

The formalization of these relationships is out of scope of this profile; this document focuses on how these relationships are conveyed within OAuth and OIDC tokens.

### Delegation vs Representation
| Concept            | Description                                                                                                                                                | Token Claim Pattern                               |
| ------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------- |
| **Delegation**     | The End-User or service grants another party the right to act on their behalf, while the delegated party remains clearly identifiable as a separate actor. | `act` claim (delegated actor identified)          |
| **Representation** | The actor presents themselves *as* another principal, and is treated as that entity by relying parties.                                                    | `represents` claim (represented party identified) |

So in terms of examples:
* <u>Delegation</u>: A service or application acts on behalf of a user (e.g., backend API call with act claim).
* <u>Representation</u>: A natural person acts as an organization (e.g., director signing an electronic transaction).

## OAuth tokens

In traditional OAuth, an access token represents a single subject (the resource owner). However, many governmental and organizational use cases require multi-actor authorization, where multiple identities participate in or influence the authorization decision.
Examples include:
* an End-User acting as a legal entity,
* an application acting for a user,
* a chain of representation, such as citizen → intermediary → government service.

To model these scenarios, OAuth provides a mechanism for expressing actor relationships through specific claims:
* [[rfc8693]] OAuth 2.0 Token Exchange — defines `act` and `may_act` claims for representing delegation chains.
* [[rfc9396]] Rich Authorization Requests (RAR) — defines how specific authorization details can be requested and conveyed between parties.
* profile-specific claims such as represents introduced in this document.

### Application in NL GOV Profiles

Token Exchange ([[rfc8693]]) will be included in an future release of the OAuth 2.0 NL GOV Profile.
See the draft version: [Logius OAuth Profile – Grant Types](https://logius-standaarden.github.io/OAuth-NL-profiel/#grant-types)



### Representation Relationships in NL GOV Context

In Use Cases that involve Representation Relationships, Representation Relationships are explicitly mentioned in the form of a `represents` Claim, analogous to the Delegation Semantics specified in [[rfc8693]].

<p class="note" title="Token Exchange in Assurance profile for OAuth 2.0">
  Token Exchange [[rfc8693]] will be included in the upcoming release of the [[[NLGOV.OAuth2]]]. See the section in the latest draft: https://logius-standaarden.github.io/OAuth-NL-profiel/#grant-types
</p>

> **Note**: Whereas [[rfc8693]] lists the End-User in the `act` or `may_act` Claims and the represented service consumer in the `sub` Claim, this is reversed in this profile: the End-User is listed in the `sub` Claim and the represented service consumer is listed in the `represents` Claim. Reason for this is to mitigate the risk that a Client that does not explicitly supports the Representation Use Cases cannot recognize the difference between an End-User that authenticates on behalf of himself or on behalf of someone else via Representation.

As such, all Clients MUST process `represents` Claims used, in case Representation can be applicable in the context of the OpenID Client and OpenID Provider. As an exception, `represents` Claims MAY be ignored by the Client if, and only if, it is explicitly agreed upon beforehand that no Representation will be provided.

This profile specifies Representation Relations in ID Tokens as follows:

- The End-User is always identified by the `sub` Claim;
- The represented service consumer is mentioned in the `represents` Claim.
- In case a chain representation is applicable, the representation chain is represented as a series of nested `represents` Claims with the represented service consumer listed as the deepest nested `represents` Claim.
- Each `represents` Claim MUST contain `sub` and `iss` Claims to uniquely identify the represented party and SHOULD contain a `sub_id_type` Claim to explicitly indicate the type of identifier used in the `sub` claim if the OpenID Provider supports multiple types of subject identifiers.
- `represents` Claims MAY contain additional Claims (e.g. `email`) to provide additional useful information about the represented party.
- Claims within the `represents` Claim pertain only to the identity of that party and MUST NOT contain Claims that are not related to the represented party, such as top-level Claims `exp`, `nbf`, and `aud`.

<aside class="example">
A sample chain representation for a requested scope `urn:uuid:a9e17a2e-d358-406d-9d5f-ad6045f712ba` may look like (note: the requested scope also includes the required `openid` scope; Claims that do not add to the example are omitted for readability):
<pre>
      {
        "scope": "openid urn:uuid:a9e17a2e-d358-406d-9d5f-ad6045f712ba",
        /* End-User - representing the service consumer */
        "sub": "RKyLpEVr1L",
        "sub_id_type": "urn:nl-eid-gdi:1.0:id:pseudonym",
        "iss": "urn:uuid:b556992a-e233-4fdc-915a-e2b52d3cc355",
        "represents": {
          /* Intermediary in representation chain - an organization in this example */
          "sub": "492099595",
          "sub_id_type": "urn:nl-eid-gdi:1.0:id:RSIN",
          "iss": "urn:uuid:28e0686f-20ff-41bd-8520-57b9c68cc9a3",
          "alt_sub": {
            "sub": "27381312",
            "sub_id_type": "urn:nl-eid-gdi:1.0:id:KvKnr",
            "iss": "urn:uuid:ebc29845-d35f-4c6a-bbb2-a59fdcb1cc6b"
          }
          "represents": {
            /* service consumer - represented by the End-User */
            "sub": "4Yg8u72NxR",
            "sub_id_type": "urn:nl-eid-gdi:1.0:id:pseudonym",
            "iss": "urn:uuid:55291cc0-fd2a-4eb6-b444-5b2783e62673"
          }
        }
      }
</pre>
</aside>

### Example claims
<aside class="example">
Its Claims are as follows:
<pre>
     {
            "auth_time": 1418698782,
            "exp": 1418699412,
            "sub": "6WZQPpnQxV",
            "sub_id_type": "urn:nl-eid-gdi:1.0:id:pseudonym",
            "nonce": "188637b3af14a",
            "aud": [
              "c1bc84e4-47ee-4b64-bb52-5cda6c81f788"
            ],
            "alt_sub": [{
              "aud": "379b022d-d9d0-4c43-b7de-290a023eb461",
              "sub": "xSHCrFm9BG",
              "sub_id_type": "urn:nl-eid-gdi:1.0:id:pseudonym"
            }],
            "iss": "https://idp-p.example.com/",
            "acr": "http://eidas.europa.eu/LoA/substantial",
            "iat": 1418698812,
            "jti": "a65c560d-085c-466e-97c5-f8639fca5ea7",
            "nbf": 1418699112,
      }
  
</pre>
</aside>

## Glossary
| Term                            | Definition                                                                               |
| ------------------------------- | ---------------------------------------------------------------------------------------- |
| **End-User**                    | The natural or juridical person who authenticates and initiates an authorization flow.   |
| **Service Consumer**            | The entity (person or organization) for which the service is ultimately consumed.        |
| **Representation Relationship** | A formally defined relationship where one actor represents another.                      |
| **Delegation**                  | Authorization for an actor to act on behalf of another while retaining its own identity. |
| **Representation**              | Acting as another entity, where the system treats the actor as the represented party.    |
| **Multi-Actor Authorization**   | Authorization scenario involving more than one principal influencing the decision.       |

------

## Delegation Relationships

In Use Cases that involve Delegation Relationships, as specified in [[rfc8693]].

Resources SHOULD process the act claim, in case identification or the representing party (e.g. an intermediary party action on behalf of the subject) can be applicable in the context of the OpenID Client and OpenID Resouce.

This profile specifies Delegation Relations in ID Tokens as follows:

- The sub Claim is used for authorizing access to resources; This is the person being represented.
- In case a chain with parties acting on behalf of the represented user is applicable, this is represented as an act (or may_act) claim.
- Each act Claim MUST contain sub and iss Claims to uniquely identify the acting party and SHOULD contain a subject_type Claim to explicitly indicate the type of identifier used in the sub claim if the OpenID Provider supports multiple types of subject identifiers.
- Act Claims MAY contain additional Claims (e.g. email, etc.) to provide additional useful information about the acting party.

[Example 3](https://gitdocumentatie.logius.nl/publicatie/api/oidc/#example-3)

A sample chain representation for may look like (note: the requested scope also includes the required openid scope and a fictional scope brp_sensitief; Claims that do not add to the example are omitted for readability):

```
{
  "scope": "openid brp_sensitief",
  /* represented party - User that has access the data */
  "sub": "RKyLpEVr1L",
  "subject_type": "public",
  "aud": "sub_id_type": "urn:nl-eid-gdi:1.0:id:pseudonym":
  "act": {
    /* Intermediary in representation chain - an organization in this example */
    "sub": "492099595",
    "subject_type": "public",
    "aud": " urn:nl-eid-gdi:1.0:id:RSIN ",    }
    "act": {
      /* person acting on behalf of the intermediary organisation */
      "sub": "4Yg8u72NxR",
      "subject_type": "pairwise",
     "aud": "urn:nl-eid-gdi:1.0:id:pseudonym"
    }
}
```

NOTE. If more specific information (than a generic scope) is required for authorization - such as the organisation (E.g. the Dutch RSIN and/or KvK number etc.), or specific data, level of access, etc. - this information MAY be included as claims within the authorization_details claim, as specified in [[rfc9396]].
Example:

```
  "authorization_details": {
   	 “type”: “party_authorization_example”
   “represented_party”:{
  		  "sub": "492099595",
 		   /* represented party - an organization in this example */
  		  "subject_type": " public",
		  "sub_id_type": "urn:nl-eid-gdi:1.0:id:RSIN”, 
 }
}
```

## Representation Relationships

In Use Cases that involve Representation Relationships and other situations where a token is meant to be used in the context of a specific scope, Rich Authorization requests MAY be used
Example 4
E.g. an intermediary party acting on behalf of a government party.

```
{
  "scope": "openid brp_sensitief",
  /* Intermediary in representation chain - a system (client) in this */
  "sub": " example-client-id",
  "subject_type": "public",
  "iss": "example.as",
  "authorization_details": {
   	 “type”: “party_authorization_example
   	 “represented_party”:{
       		 "sub": "492099595",
      		 /* represented party - an organization in this example */
      		 "subject_type": " public",
      		 "iss": " urn:nl-eid-gdi:1.0:id:RSIN ",    
      		 "responsible_person": {
             			/* person acting on behalf of the repreented organisation */
             			"sub": "4Yg8u72NxR",
            			"subject_type": "pairwise",
             			"iss": " urn:<..eherkenning…>. "
    			}
 		 }
}
}
```
