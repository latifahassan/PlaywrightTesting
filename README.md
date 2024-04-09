# Playwright Automation Script

## Overview
This repository contains a Playwright script that automates the process of adding two products to the basket on the Huel website (https://huel.com/). The script is written in JavaScript and follows the requirements provided in the tech test.

## Requirements
- Launch a headless browser (Chrome, Chromium, or Firefox)
- Navigate to the Huel homepage (https://huel.com/)
- Search for a specific product (e.g., "Huel Instant Meal Pots")
- Add the searched product to the basket
- Search for a second product (e.g., "Huel Complete Nutrition Bar")
- Select a desired flavor for the second product (e.g., "Mexican Chilli")
- Add the second product to the basket
- Verify that at least two items are present in the basket

## Bonus Features
- Error handling for scenarios where adding a product to the cart fails
- Detailed comments explaining each step of the automation process

## Approach and Planning

### 1. Understanding the Requirements
I carefully read and analyzed the requirements provided in the tech test description. I broke down the task into smaller, actionable steps to plan my approach.

### 2. Setting up the Development Environment
- Installed Node.js and npm (Node Package Manager)
- Created a new directory for the project
- Initialized a new Node.js project using `npm init -y`
- Installed the Playwright library using `npm install playwright`

### 3. Learning Playwright Basics
I went through the Playwright documentation (https://playwright.dev/docs/intro) to understand the fundamental concepts and APIs, such as launching a browser, creating a new page, navigating to URLs, and interacting with elements.

### 4. Planning the Automation Flow
I broke down the automation process into the following steps:
- Launch a headless browser
- Navigate to the Huel homepage
- Search for the first product
- Add the first product to the basket
- Search for the second product
- Select the desired flavor for the second product
- Add the second product to the basket
- Verify that at least two items are present in the basket

### 5. Writing the Automation Script
I created a new JavaScript file (`playwright_huel_add_to_cart.js`) and implemented the automation flow using Playwright's methods (`click`, `fill`, `press`, etc.). I also defined helper functions and constants for better code organization and readability.

### 6. Handling Potential Errors
I identified potential error scenarios, such as products not being found or being out of stock. I wrapped error-prone code in `try...catch` blocks and logged error messages for better debugging.

### 7. Verifying the Basket Count
I located the element displaying the basket count, extracted its text content, and parsed the count value. I then used a conditional statement to verify that at least two items were present in the basket.

### 8. Adding Comments and Cleanup
I added detailed comments throughout the code to explain each step and improve readability. I also cleaned up any unnecessary code or variables and modularized the code into separate functions for better organization.

Note: This script assumes that the products and flavors mentioned are available on the Huel website at the time of execution. If the products or flavors change, you may need to update the corresponding variables in the script.

## Potential Improvements
- Implement more robust error handling (e.g., handling timeouts, stale elements)
- Add functionality to handle dynamic content or wait for specific conditions
- Explore Playwright's advanced features (e.g., taking screenshots, handling multiple pages/tabs, simulating different devices)
- Set up a test runner or framework (e.g., Jest, Mocha) for better test organization and reporting
- Implement retry mechanisms for flaky or intermittent failures

## Coding Best Practices
- Followed modular code organization by separating concerns into helper functions
- Adhered to coding standards and maintained consistent formatting
- Focused on code readability and maintainability through descriptive variable and function names
- Implemented error handling and logging mechanisms for better debugging

## Conclusion
This Playwright script demonstrates my ability to understand and implement automation requirements, work with modern web automation tools like Playwright, handle errors and edge cases, and write clean and maintainable code. I hope this submission showcases my technical skills and problem-solving approach effectively.
