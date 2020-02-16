# foodconnector
Repo for DeveloperWeek 2020 Hackathon
This project is to provide an application to merchants to sell or give expiring food and to let the cumstmers know food discount or free infomation.


## What did we finish
1. Import the map to the application
2. Sign up as a distributor (cafe, hotel, neighbor)
3. Sign up as a consumer (person who needs the food)
4. Distributor can add food to a map
5. Consumer can filter the map of distributed food to what they want. For example if John wants beans, he can filter the map to only show distributors giving away beans
6. Distributor can describe how close the food is to expiring, add a photo, add categories, etc.
7. Consumers can request specific food. For example a food bank can request beans, and a distributor can see that, and then choose to “fill” that order
Distributor can either choose to sell or give away for free


## Getting Started
```sh
# install dependencies
npm install

# run locally
node app.js
```
## Business model
One-third of the world’s food ends up in landfills, while almost a billion people around the globe are hungry. This made the food saving job neccessary.
For TOMTOM, commissions from merchants is one way to make profit. Adding food save module could reflect TOMTOM's social responsibility. By using different ways to motivate merchants and customers, the market share of the app will increase. Then TOMTOM can work with some NGO to collect resources and get financial support from them to enlarge the business so that TOMTOM can help more people. 

## How to motivate customers and merchants to join the food save plan.
1. Give credits to customers so that they can have better discounts when buying food from foodconnector. This can motivate them to buy more.
2. Use Machine Learning to help the merchants know how much food is really needed. So they can balance the supply and demand to make better profits and save food for the world.


## Usage of TomTom Maps APIs
1. We use marker clustering to show multiple eligible merchants according to the customer's choice.
2. We add marker pop-up event when clicking the marker.


## User cases in the future
1. Computer Visualization will be implemented to show the effects of the food saver.
2. A good idea to save food is that user can donate the food to people in need. So donation will be launched in the app.
3. Add machine learning algorithms to give advices to merchants when they buy food ingredients.

