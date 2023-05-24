# Rights delegation Air sensors network

## Overview

With the deployment of an endless number of air sensors the quality of the gathered data depends on the security of the sensor network. In this usecase the sensors are connected to a LoRaWAN network and equiped with a unique ID (GUID) for authentication. This prevents the injection of unindentifiable data into the network.

## Resource owner

The resource owner is the sensor owner. In this case the the sensors are provided to citizens by the Resource owner, e.g. a local government or city.

## Client

The Air sensor itself functions as a client, uploading each measurement to the API of the Resource owner via the LoRaWAN network.

## Authorization server

In this use case the resource owner also provides the Authorization server. The unique id's of the sensors are preloaded in the authorization server.

## Resource server

The resource server is provided by the sensor provider, e.g. a local government or city, the resource server provides the API where all sensors write their data.

## Scopes & claims

not applicable

## Rationale

To mitigate the risk of incorrect data or manipulation of sensor data the sensor will connect to the authorization server first while onboarding (Step 1). The authorization server checks the provided sensor ID and provides the sensor with a token (Step 2). The sensor then starts to collect data and upload the data to the provided API and includes the token with each request to the resource server.