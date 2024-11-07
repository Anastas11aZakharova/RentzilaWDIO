## ⚡️ Object for testing

Web site - [Rentzila](https://dev.rentzila.com.ua//)

## 📦 Setup

1. Install latest v20.\* [node.js](https://nodejs.org/en/) - JavaScript runtime environment
2. Make sure Java version 8 or above installed, and its directory is specified in the JAVA_HOME environment variable for Allure Report
3. Clone git repository `git clone https://github.com/Anastas11aZakharova/RentzilaWDIO.git`
4. Install project dependencies specified in the package.json `npm install`

## ⚙️ Running Tests

Run the command below to run all tests in headlees mode

```
npm run wdio:all:chrome:headless
```

Running All Tests in Chrome Headed Mode

```
npm run wdio:all:chrome
```

Running a Single Test spec

```
npm run wdio:footer:only:chrome
```

Running a Single Test by id

```
npm run wdio:C214:chrome
```

Running an authorization suite

```
npm run wdio:authorization:chrome
```

Running an advert suite

```
npm run wdio:advert:chrome
```

Running a single test file:

```
npx wdio run ./wdio.conf.ts --spec "./**/**/*.spec.ts"
```

## 📜 Allure Report

For reporting used Allure Report - Automation Test Reporting Tool  
Learn more about Allure Report at [Allure](https://allurereport.org/)

To generate allure report:

```
npm run allure:generate
```
