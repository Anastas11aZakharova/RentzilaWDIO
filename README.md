# Rentzila WDIO

The TypeScript WebdriverIO test authomation project.

# Preconditions

1. Install latest Node.js;
2. Clone the repository where the project is stored:
    - `git clone https://github.com/Anastas11aZakharova/RentzilaWDIO`
3. Install Dependencies;
    - `npm install`

# Steps to run

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


For reporting used Allure Report - Automation Test Reporting Tool

To generate allure report:

```
npm run allure:generate
```
