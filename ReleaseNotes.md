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
  
