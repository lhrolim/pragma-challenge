
## Approach

First I spent some time understanding the requirements and the architecture of the application.

1. Understanding curent State (10 min)

### Server
It's a very basic system where the server consists of a *Proxy* to an api hosted at Heroku that would return random sensor information about beers given their id

### Client
Single page that would display those values in screen.
One request would be made for each the beers at every 5 seconds
Each response would consist of a single item, however the whole list of items would be updated

2. Identify points of improvements and Follow Ups (40min)

* The client is making 6 requests that could have been aggregated into a single one. The server would then orchestrate these same 6 requests to the api.
This would reduce the load on the server while keeping the client application more responsive and efficient in terms of CPU and network usage.
* The client could update the screen only after all the responses are received so that there are not multiple render (and paint) cycles running on the browser, again making the application more responsive and efficient in terms of CPU.
* The requirements around the correct temperatures for each beer should lie on the server side so that it's easier to account for changes in the requirement while also allowing potential extra clients to arise, such as a mobile app. The response would then already contain a more ubiqutuos domain compared to the requirements, i.e, already contain the *status* 
* On a similar note name of the beers should be on the server side, so that we could easily account for changes and fixes
* The main business rule lie on the status compared to the reference temperatures. This should be exercised under a unit test.
* There's no error handling to capture issues should the sever or the sensor API go down. 

3. Implement changes

* After a reading of the situation was made it was time to implement the changes.


## Improvements Highlights

## Assumptions and Questions

* Do we really need to pull data every 5 seconds ? Can we think of a larger interval ?
* On the client side should we care if the temperature changes or only if the status have ? If the later is enough we could reduce the number of refreshs. Also, if that's the case considering that the number of beers could expand we could filter by only the problematic ones 

## Follow Ups

* The list of beers should be moved to a data-storage to account for the evolution of the system withouth the need to deploy new verions of the code (i.e to add a new beer only an insertion would be executed)
I personally tested the herouku API with different range of values and strings 
* Consider refactoring the project to use Typescript 
* Consider using server push technologies such as SSE or websockets so that the proxy server is able to control the pulls to the sensor apis reducing the number of hits it would receive as more and more clients connect. With that approach it would also be possible to cache results that have not varied improving network efficiency.
* Consider improving UI so that there's a better visual cue when the status is not good.
* Still on UI think of pagination and filters as ways to scale up the clients to show up more beers.
* Think of implementing a CircuitBreaker approach to the downstream SensorAPI so that whenever it's down we can return the last cached version and help it to gracefully restore   
