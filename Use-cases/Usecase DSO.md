# Use Case Digital System Environmental Law

## Overview

In this use case, the client credential flow is used in a digital system that enables citizens to request permits for activities they want to undertake in their environment. For example when a citizen wants to cut down a tree or change the exterior of their house they have to request a permit. The citizen can start a permit request in the web interface of the Digitaal Stelsel Omgevingswet - Digital System Environmental Law (hereafter: DSO) and this system will determine what local authorized authority (e.g. a municipality) is responsible. Once the permit request is ready, a trigger is sent to the system of the local authorized authority to use the client credential flow to retrieve the data associated with the request. The request can then be completed in the client software of that local authority.

## Resource owner

The resource owner is the citizen that provided the information during the permit request. 

## Client

In this use case the client is the software that the authorized authority (e.g. the local authority, municipality, county etc.) who wants to retrieve information from the digital system, uses. 

## Authorization server

The authorization server is owned by the DSO, it is part of their API Management platform. 

## Resource server

The resource server is the backend server of the DSO where the permit request is available.

## Scopes & claims

The scopes and claims used in this system are defined by the DSO, and are related to the CRUD actions of the API's available. 

## Rationale

The DSO exposes API's secured on different levels. To standardise as much as possible, OAuth is used in several of the authentication and authorization flows. Therefore besides the Authorization code flow where an enduser is involved, the client credentials flow is used between systems in order to use the same authorization mechanism for as many usecases as possible.
