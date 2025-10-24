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
| Concept            | Description                                                                                                                                                | Token claim Pattern                               |
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

## Delegation Relationships

In Use Cases that involve Delegation Relationships, as specified in [[rfc8693]], an actor (for example, an intermediary or system) is authorized to perform actions on behalf of another principal, while remaining a distinct identity.

Resources SHOULD process the `act` claim when identification of an intermediary or other acting party is applicable in the context of the OpenID Client and Resource Server.

### claim Structure

This profile specifies delegation relationships in ID Tokens as follows:

- The `sub` claim identifies the represented user (the subject of the authorization).
- The `act` (or `may_act`) claim identifies the intermediary or acting party.
- In case of a delegation chain (multiple parties acting on behalf of each other), these can be nested via multiple `act` objects.
- Each `act` claim:
	- MUST contain `sub` and `iss` claims to uniquely identify the acting party.
	- SHOULD include a `subject_type` claim to indicate the identifier type if multiple types are supported.
 	- MAY include additional identity-related claims (e.g., `email`) to convey useful information about the acting party.


### Example: Nested Delegation
<aside class="example">
[Example 3](https://gitdocumentatie.logius.nl/publicatie/api/oidc/#example-3)

A sample delegation chain may look like this (note: the requested scope also includes the required `openid` scope and a fictional `brp_sensitief` scope; claims not essential to the example are omitted for readability):

<pre>
	{
	  "scope": "openid brp_sensitief",
	  /* Represented party — user with access rights */
	  "sub": "RKyLpEVr1L",
	  "subject_type": "public",
	  "sub_id_type": "urn:nl-eid-gdi:1.0:id:pseudonym",
	  "aud": ???,
	  "act": {
		/* Intermediary in reperesentation chain - an organization oacting on behalf of the user in this example */
		"sub": "492099595",
		"subject_type": "public",
		"aud": ???,
		"sub_id_type": "urn:nl-eid-gdi:1.0:id:RSIN",
		"act": {
		  /* Individual acting on behalf of the intermediary organization */
		  "sub": "4Yg8u72NxR",
		  "subject_type": "pairwise",
		  "aud": "urn:nl-eid-gdi:1.0:id:pseudonym" // klopt dit?
		}
	  }
	}
</pre>
</aside>

### Integration with Rich Authorization Requests (RAR)

If more specific authorization information is required — for example, identifying the organization (e.g., RSIN or KvK number), data categories, or access levels — such details MAY be included using the `authorization_details` claim, as defined in [[rfc9396]].

<aside class="example">
RAR example:
<pre>
	"authorization_details": {
	  "type": "party_authorization_example",
	  /* represented party - an organization in this example */
	  "represented_party": {
	    "sub": "492099595",
	    "subject_type": "public",
	    "sub_id_type": "urn:nl-eid-gdi:1.0:id:RSIN"
	  }
	}
</pre>
</aside>

## Representation Relationships in NL GOV Context

In Use Cases that involve Representation Relationships, or other situations where a token must convey context about who is represented within a specific scope, [[[RFC9396]]] MAY be used to include explicit representation details within the `authorization_details` claim.

A representation relationship expresses that a principal (for example, an intermediary system or individual) acts as another principal (for example, a legal entity or organization).
In contrast to delegation, where the actor remains a distinct identity, representation implies that the actor is treated as the represented party for the duration of the transaction.

The RAR object allows these relationships to be expressed in a structured, scope-specific way.

<aside class="example">
A sample chain representation for a requested scope `urn:uuid:a9e17a2e-d358-406d-9d5f-ad6045f712ba` may look like (note: the requested scope also includes the required `openid` scope; claims that do not add to the example are omitted for readability):
<pre>
      {
        "scope": "openid brp_sensitief",
	    /* Intermediary in representation chain - a system (client) in this example*/
        "sub": "example-client-id",
        "subject_type": "public",
        "iss": "example.as,
		"authorization_details": {
		  “type”: “party_authorization_example"
	 	   /* represented party - an organization in this example */
           “represented_party”:{
       		 "sub": "492099595",
	          "subject_type": "public",
	          "iss": "urn:nl-eid-gdi:1.0:id:RSIN",
			  /* person acting on behalf of the represented organisation */
	          "responsible_person": {
	            "sub": "4Yg8u72NxR",
	            "subject_type": "pairwise",
	            "iss": "urn:<eherkenning>"
          		}
        	}
      }
</pre>
</aside>

### Implementation Guidance

- The `authorization_details` object MAY include one or more `represented_party` elements to indicate the party or organization on whose behalf the client or user acts.

- Nested relationships (for example, `organization → representative → sub-representative`) MAY be expressed through nested objects inside `represented_party`.

- Each object SHOULD include the following claims:

	- `sub` and `iss` — to uniquely identify the represented party.

	- `subject_type` — to indicate the type of identifier used (for example, `public`, `pairwise`, RSIN, KvK).

Additional contextual claims (e.g., `responsible_person`, `role`, or `mandate_type`) MAY be included to convey the legal or organizational basis of the representation.

Claims unrelated to identity (such as `exp`, `nbf`, or `aud`) MUST NOT appear within these objects.


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

Hieronder is een stukje van oude tekst voor opmaak en kan genegeerd worden.

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
