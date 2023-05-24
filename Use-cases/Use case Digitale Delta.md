# Use Case Digitale Delta

## Overview

The Digitale Delta API provides access to measurements and related information.
It is not an specific implementation of an API, but a template that defines its behaviour and its resources.

Consumers of the data, in general, will be automated processes or systems such as Business Intelligence or GIS systems.
Since not all data may be open or public, access to certain data must be restricted.
However, also browser based solutions, or Excel users, can be consumers of the data.

For automated requests, interactive scenario's are no feasible. A certificate scenario may not be feasible either.

Next to cunsuming data, the API allows for adding or removing data by using import files or sensor devices.

This also is (mostly) an automated proces. The same situation applies: interactive scenario's may not be usable, and PKI certificates may not be able to be deployed on sensory devices.

The addition to the Authorization Code Flow, the Client Credential Flow can be used to cover the scenario's.

## Resource owner

The resource owner depends on the implementation of the API. In general, it is the provider of the implementation of the API.

## Client

Clients can be a range of systems: 

- Business Intelligence
- GIS
- Artificial Intelligence/Machine Learning
- REST service consumers
- Web browsers
- Excel users

## Authorization server

In this use case the resource owner also provides the Authorization server. The unique id's of the sensors are preloaded in the authorization server.

## Resource server

The resource server is provided by the sensor provider, e.g. a local government or city, the resource server provides the API where all sensors write their data.

## Scopes & claims

Not applicable

## Rationale

To mitigate the risk of incorrect data or manipulation of sensor data the sensor will connect to the authorization server first while onboarding (Step 1). The authorization server checks the provided sensor ID and provides the sensor with a token (Step 2). The sensor then starts to collect data and upload the data to the provided API and includes the token with each request to the resource server.