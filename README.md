# Ordering a Taxi

## Project Description

This project automates the process of ordering a taxi in the Urban Routes application.

The automated tests verify the main steps involved in placing a taxi order, from entering pickup and destination addresses to confirming the order.

## Technologies and Tools

- **JavaScript** – Programming language used to write the automated tests.
- **WebdriverIO (WDIO)** – Browser automation and testing framework.
- **Mocha** – Test framework used to organise and run the tests.
- **Visual Studio Code** – Code editor.
- **Git Bash** – Command-line environment.
- **Git** – Version control.
- **GitHub** – Repository hosting.

## Tests

The test suite covers the following functionality:

1. Opening the phone number modal.
2. Saving a phone number.
3. Creating a taxi order, including:
   - Selecting the Supportive tariff.
   - Entering and confirming a phone number.
   - Adding a credit card.
   - Entering a message for the driver.
   - Ordering a blanket and handkerchiefs.
   - Ordering two ice creams.
   - Verifying that the car search modal appears.
   - Verifying that driver arrival information appears.

## How to Run the Tests

### Prerequisites

- Node.js and npm installed.
- Google Chrome installed.

### Installation

1. Clone the project repository:

       git clone https://github.com/bgtruscott-maker/hm08-qa-us.git

2. Navigate to the project directory:

       cd hm08-qa-us

3. Install the project dependencies:

       npm ci

### Configuration

Before running the tests, check the `baseUrl` setting in `wdio.conf.js` and update it if the Urban Routes test application URL has changed.

### Running the Tests

Run the following command from the project directory:

    npm run wdio

The tests will run in Google Chrome. The test results will be displayed in the terminal.