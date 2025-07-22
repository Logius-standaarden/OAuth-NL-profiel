# Releasenotes NL GOV Assurance profile for OAuth 2.0 V1.2.0 (OAuth-NL)

**Gepubliceerd op:** xxx <br>
**Status:** Release Candidate (ter consultatie)

Deze release candidate bevat inhoudelijke uitbreidingen en verduidelijkingen ten opzichte van v1.1.0 en markeert een belangrijke stap in de doorontwikkeling van het OAuth NL Profiel. De nadruk ligt op aanvullende use-cases, verbeterde securitymechanismen en uitlijning met internationale standaarden zoals RFC 9068, 8693 en 9126.

---

## Belangrijkste wijzigingen

### Autorisatie & Claims

- **Claims buiten delegatiescenario’s**  
  Ondersteuning toegevoegd voor scenario’s waarbij autorisatie plaatsvindt zonder tussenkomst van een resource owner, zoals bij server-naar-server communicatie.  
  _PR: [#48](https://github.com/Logius-standaarden/OAuth-NL-profiel/pull/48)_

### Tokenbeheer 
- **Token Exchange (RFC 8693)**  
  Volledige ondersteuning van token exchange workflows, inclusief specificatie van de vereiste claims en security-eisen.  
  _PR’s: [#69](https://github.com/Logius-standaarden/OAuth-NL-profiel/pull/69), [#98](https://github.com/Logius-standaarden/OAuth-NL-profiel/pull/98)_

- **Pushed Authorization Requests (PAR)**  
  PAR beschreven volgens [RFC 9126](https://datatracker.ietf.org/doc/html/rfc9126), ter ondersteuning van betere beveiliging bij het aanvragen van autorisatiecodes.  
  _PR: [#91](https://github.com/Logius-standaarden/OAuth-NL-profiel/pull/91)_

- **Rich Authorization Requests (RAR)**  
  Toevoeging van het gebruik van RAR als advanced security option, voor fijnmazige autorisatie. 
  _PR: [#85](https://github.com/Logius-standaarden/OAuth-NL-profiel/pull/85)_

-  ***NOTE:** RAR zal ook worden gebruikt in combinatie met Token Exchange in aankomende wijzigingen rondom het delegatie vraagstuk. Dit conform de standaarden en niet een custo oplossing zoals represents.* 

### Securitymechanismen

- **Proof-of-Possession (PoP) en DPoP**  
  De sectie over token binding is uitgebreid en verduidelijkt.  
  _PR: [#68](https://github.com/Logius-standaarden/OAuth-NL-profiel/pull/68)_

- **JWT Access Tokens (RFC 9068)**  
  Het gebruik van JWT-access tokens is geüpdatet volgens de specificatie, inclusief structuur en claims. Dit is een wijziging die geïnspireerd is door iGOV.
  _PR: [#104](https://github.com/Logius-standaarden/OAuth-NL-profiel/pull/104)_

- **Token introspection verduidelijkt**  
  Aanscherping van gebruikscontexten voor introspectie, met verwijzing naar publieke vs. vertrouwelijke clients.  
  _PR: [#88](https://github.com/Logius-standaarden/OAuth-NL-profiel/pull/88)_

- **Sender-constrained tokens**  
  Voorbereidende discussie gestart i.v.m. beweging van iGOV richting het uitfaseren van public clients.  
  _PR: [#113](https://github.com/Logius-standaarden/OAuth-NL-profiel/pull/113)_

---

## Redactionele en beheertechnische wijzigingen

- **Verwijzingen naar beheermodel toegevoegd**  
  Contextuele verwijzingen opgenomen naar het beheermodel van het profiel.  
  _PR: [#77](https://github.com/Logius-standaarden/OAuth-NL-profiel/pull/77)_

- **Dark mode ondersteuning**  
  Technische ondersteuning toegevoegd voor dark mode rendering.  
  _PR: [#94](https://github.com/Logius-standaarden/OAuth-NL-profiel/pull/94)_

- **Verbeterde syntax highlighting**  
  Taalherkenning voor codefragmenten gecorrigeerd.  
  _PR: [#95](https://github.com/Logius-standaarden/OAuth-NL-profiel/pull/95)_


---


# Releasenotes NL GOV Assurance profile for OAuth 2.0 V1.1.0 (OAuth-NL)

Versie 1.1.0 van de standaard sluit beter aan bij de modulaire opbouw van het Kennisplatform API's en bevat nu ondersteuning van de client credentials flow.

## Inleiding
Op 09-07-2020 is besloten om versie 1.0 van het NL GOV Assurance profile for OAuth 2.0 "Verplicht" te stellen op de lijst van open standaarden van het forum standaardisatie. Zie ook https://www.forumstandaardisatie.nl/open-standaarden/nl-gov-assurance-profile-oauth-20

In samenwerking met het Kennisplatform APIs is de afgelopen jaren gewerkt aan het OAuth-NL om om de opmaak te verbeteren en het profiel functioneel uit te breiden met de 'client credentials flow'. Daarnaast zijn verschillende kleine bugs verholpen en correcties doorgevoerd en gezamenlijk hebben deze geleid tot de nieuwe versie 1.1.0.  
Voor OAuth-NL start een publieke consultatie op 13-05-2024 tot 13-06-2024.  

## Samenvatting wijzigingen

De wijzigingen in versie 1.1.0 zijn deels correctief en deels inhoudelijk. Hieronder zijn de belangrijkste wijzigingen samengevat:

- Correctief:
  - verduidelijking van de opmaak
  - eenduidige opmaak in de figuren van de use cases
  - [Authorization servers SHOULD support dynamic client registration](https://github.com/Logius-standaarden/OAuth-NL-profiel/issues/39) gecorrigeerd
  - [Allow direct access clients to authenticate with an X.509 certificate](https://github.com/Logius-standaarden/OAuth-NL-profiel/issues/34)
  - [wijzigingen ten behoeve van de [rfc8705\] OAuth](https://github.com/Logius-standaarden/OAuth-NL-profiel/issues/42)
  - [PKCE beschrijving in Sectie 2.3.1 klopt niet](https://github.com/Logius-standaarden/OAuth-NL-profiel/issues/13)
  - verschillende bugs opgelost
- Inhoudelijk :
  - aangevuld met een extra use case voor de Client credentials flow
  - Duidelijk de building blocks benoemd in de introduction
  - aangevuld met een tabel voor de Status of this document
  
