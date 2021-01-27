# REST

- Representational State Transfer

## Guiding principles

- Client-Server - Different interfaces for Server and client improves the portability of the UI across multiple platforms
- Stateless - Session state should be kept entirely on client
- Cacheable - Add appropriate labels if the response is cacheable.
- Uniform Interface - Consistent signatures for Identifying and manipulation of resources, Self descriptive messages. 
- Layered System - Each system is comprised or layers with each layer having a specific functionality and responsibility. 

> REST != HTTP

## Resource

Information is abstracted in REST to a resource. The resource can be anything ranging from a document, image, non-virtual object (eg: a user) or a temporal service. 

### Resource methods

| Method | Intended Operation | Success response | Error response |
| --- | --- | --- | --- |
| POST | Create | 201 (Created) | 409 (Conflict), 400 (Bad request) |
| GET | Read | 200 (Ok) | 404 (Not Found), 412 (Pre-Condition Failed) |
| PUT | Update / Replace | 200 (OK), 204 (No Content) | 404 (Not Found), 412 (Pre-Condition Failed) |
| PATCH | Update / Modify | 200 (OK), 204 (No Content) | 404 (Not Found), 412 (Pre-Condition Failed) |
| DELETE | Delete | 204 (No Content) | 404 (Not Found), 412 (Pre-Condition Failed) |