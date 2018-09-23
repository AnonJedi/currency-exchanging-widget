# Currency Exchanging Widget

This is a simple app on React and Redux which simulate your bank account with 3 currencies (GBP, EUR and USD). You can controll your bills and transfer some sum between that currencies. Also there is rates monitor where you can compare the rates for any of the available currencies.

**Note:** this widget is using [free api](https://www.currencyconverterapi.com/) for getting currencies rate (it can be a bit incorrect and has some limit for requests per day and number of symbols per request)

## Requirements

npm v6.4.1  
node v9.4.0

You can install that requirements via [nvm](https://github.com/creationix/nvm) guide

## Prepearing

For initial prepearing of the app just run follow command in your bash console at the root of the project

```bash
npm i
```

And then for start up the app's dev server run

```bash
npm start
```

check your [localhost](http://0.0.0.0:3000/) to see the widget

For run the tests use

```bash
npm test
```
