# Rights delegation key registry Buildings & adresses

## Overview
Key registries in Dutch government often have a single registry where all data is collected but multiple source holders are responsible for maintaining parts of the data.  Source holders, such as municipalities, should not be allowed to modify each others data without permission. It is very common to either have commercial cloud providers or partnerships of cooperating municipalities maintain a key registry on behalf of multiple sourceholders. Currently Dutch Cadastre hosts multiple key registries where this is the case each with its own application level solution to allow for this. Within the key registry adresses and buildings a PoC has been executed to show how OAuth can solve this in a generic way. This has the advantage of cutting down on custom code and affering a uniform procedure to source holders who often maintain multiple key registries at Dutch Cadastre.

## Resource owner
A municipality that is legally required to maintain information on its buildings and adresses.

## Client
A cloud provider or partnership of cooperating municipalities hosts an application that operates on behalf of the legal entity (municipality) to update and maintain the key registry Buildings & Adresses. This application acts as client that connects to the API of the Dutch Cadastre.

## Authorization server
manager
The authorization server is hosted by Dutch Cadastre and provides (among other things) authorizations to municipalities to update and maintain data on buildings and adresses.

## Resource server
The central server that hosts the key registry for buildings and adresses at dutch Cadastre.

## Scopes & claims
A JWT token containting the following claim is used:
The claim "cdi" contains the ID of the municipality delegating its rights to maintain the key registry.
The delegatee, the cloud provider gets a token containing this claim from the authorization server when providing its credentials. The actual delegation, provding client credentials to the client and delegating rights from the resource owner to the cleint is done out of band as this is not part of the client credentials flow.

## Rationale
The client credentials flow is used instead of the authorization codeflow because the resource owner is a legal entity and the client acts on behalf of this legal entity, not the individual user working with the application. 
