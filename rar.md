# Multi-Actor Authorization in OAuth


1. 2.1 vanuit OIDC
1. Erbij: Korte uitleg rich authorization request en verwijn NL GOV OAuth
1. 5.2.4 Delegation Relationships
1. https://gitdocumentatie.logius.nl/publicatie/api/oidc/#example-2
1. glossary 


## Introduction

OAuth and OIDC NL GOV profiles support several Use Cases for representing and delegating relationships, which apply when an End-User intends to consume an online service on behalf of a Person (Natural or Juridical) or an Organisation (the service consumer) , where authentication and authorization is required. The End-User in these Use Cases is either a Natural Person or an Organisation, representing the service consumer through a Representation Relationship. The relationship has to be formalized and may be either a direct relationship, either voluntarily or on legal grounds, or a chain of Representation Relationships. The formalization of these relationships is out of scope of this profile.

Example Representation Use Cases include voluntary authorization, representative assigned by court order (guardian, administrator), statutory signatory (director, president), limited authorized signatory, etc.

### Delegation vs Representation
Delegation: The user grants authority to another party (e.g., an app or service) to act on their behalf, but the delegated party’s actions are still traced back to the original user (the delegator).

Representation: The actor presents themselves as another principal, so the system treats the actor as if they are that other entity — effectively standing in the shoes of the represented party.

### Representation Relationships

In Use Cases that involve Representation Relationships, Representation Relationships are explicitly mentioned in the form of a `represents` Claim, analogous to the Delegation Semantics specified in [[RFC8693]].

<p class="note" title="Token Exchange in Assurance profile for OAuth 2.0">
  Token Exchange [[RFC8693]] will be included in the upcoming release of the [[[OAuth2.NLGov]]]. See the section in the latest draft: https://logius-standaarden.github.io/OAuth-NL-profiel/#grant-types
</p>

> **Note**: Whereas [[RFC8693]] lists the End-User in the `act` or `may_act` Claims and the represented service consumer in the `sub` Claim, this is reversed in this profile: the End-User is listed in the `sub` Claim and the represented service consumer is listed in the `represents` Claim. Reason for this is to mitigate the risk that a Client that does not explicitly supports the Representation Use Cases cannot recognize the difference between an End-User that authenticates on behalf of himself or on behalf of someone else via Representation.

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
