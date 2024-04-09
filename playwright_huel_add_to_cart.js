const { chromium } = require('playwright'); // Importing the 'chromium' module from the 'playwright' library

// Define product names and flavours
const product1 = "Huel Daily Greens"; // Variable to store the name of the first product
const product2 = "Huel Instant Meals"; // Variable to store the name of the second product
const flavour2 = "Mexican Chilli"; // Variable to store the name of the second product's flavour

// Function to accept the cookies popup if present
async function acceptCookiesPopup(page) {
    let popupFound = false;

    // Keep checking for the cookies popup at regular intervals
    const interval = setInterval(async () => {
        try {
            if (!popupFound) {
                // Check if the cookies popup is present
                await page.waitForSelector('div[aria-label="Privacy"][role="alertdialog"]', { timeout: 2000 });

                // If found, click on the "Accept" button for cookies
                await page.click('button#onetrust-accept-btn-handler');
                console.log("Clicked on the 'Accept' button for cookies.");
                popupFound = true;
            }
        } catch (error) {
            // If the cookies popup is not found within the timeout, log a message
            console.log("No cookies popup found within the timeout.");
        }
    }, 5000); // Check every 5 seconds

    // Stop checking for the popup after 60 seconds
    setTimeout(() => {
        clearInterval(interval);
    }, 60000);
}

// Launch the browser and handle cookies popup
(async () => {
    const { chromium } = require('playwright');

    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    const page = await context.newPage();

    await acceptCookiesPopup(page); // Handle cookies popup

    await page.goto('https://huel.com/');

    // Search for the first product
    await page.waitForSelector('button[data-testid="IconLink-Search"]', { visible: true }); // Waiting for the search button to be visible
    await page.click('button[data-testid="IconLink-Search"]'); // Clicking on the search button
    await page.waitForSelector('input[data-testid="SearchBar__input"]', { visible: true, timeout: 10000 }); // Waiting for the search input field to be visible
    await page.fill('input[data-testid="SearchBar__input"]', product1); // Entering the name of the first product in the search field
    await page.keyboard.press('Enter'); // Pressing the Enter key to start the search

  
    // Wait for the Daily Greens product image to be visible and click on it
    await page.waitForSelector('img[alt="Product Image"]', { visible: true }); // Waiting for the product image to be visible
    await page.click('img[alt="Product Image"]'); // Clicking on the product image
  
    // Wait for the "Shop Daily Greens" button to be visible and click on it
    await page.waitForSelector('a.button', { visible: true }); // Waiting for the "Shop Daily Greens" button to be visible
    await page.click('a.button'); // Clicking on the "Shop Daily Greens" button
  
    // Wait for the "ADD TO CART" button to be visible and click on it
    await page.waitForSelector('huel-button.VariantsPurchaseForm__purchase-button', { visible: true }); // Waiting for the "ADD TO CART" button to be visible
    await page.click('huel-button.VariantsPurchaseForm__purchase-button'); // Clicking on the "ADD TO CART" button
    
    await page.waitForNavigation(); // Waiting for navigation to complete

    // Search for the second product
    await page.waitForSelector('button[data-testid="IconLink-Search"]', { visible: true }); // Waiting for the search button to be visible
    await page.click('button[data-testid="IconLink-Search"]'); // Clicking on the search button
    await page.waitForSelector('input[data-testid="SearchBar__input"]', { visible: true, timeout: 10000 }); // Waiting for the search input field to be visible
    await page.fill('input[data-testid="SearchBar__input"]', product2); // Entering the name of the second product in the search field
    await page.keyboard.press('Enter'); // Pressing the Enter key to start the search

    // Wait for navigation to complete
    await page.waitForNavigation(); // Waiting for navigation to complete

    // Wait for the image of the "Shop Instant Meal Pouches" and click on it
    await page.waitForSelector('img[alt="Product Image"][src="https://huel.imgix.net/H&S%20final.png"]'); // Waiting for the specific product image to be visible
    await page.click('img[alt="Product Image"][src="https://huel.imgix.net/H&S%20final.png"]'); // Clicking on the specific product image

    // Wait for the flavour picker to be visible
    await page.waitForSelector('div.FlavourPicker__left-side'); // Waiting for the flavour picker to be visible
    await page.waitForTimeout(2000); // Adding a delay of 2 seconds

    // Click on the flavour picker
    await page.click('div.FlavourPicker__left-side'); // Clicking on the flavour picker

    // Wait for the specific flavour button to be visible, enabled, and stable
    await page.waitForSelector(`button[aria-label="${flavour2} Increase Quantity"]`, { visible: true, enabled: true, stable: true }); // Waiting for the specific flavour button to be visible, enabled, and stable

    // Click on the "+" button associated with the specified flavour twice
    await page.click(`button[aria-label="${flavour2} Increase Quantity"]`); // Clicking on the "+" button associated with the specified flavour
    await page.click(`button[aria-label="${flavour2} Increase Quantity"]`); // Clicking on the "+" button associated with the specified flavour again

    try {
        // Wait for the "Continue" button to become enabled (green)
        await page.waitForSelector('huel-button[is-type="green"][is-size="medium"][is-full-width="true"][disabled="false"]', { visible: true, timeout: 30000 }); // Waiting for the "Continue" button to become enabled (green)

        // Click on the "Continue" button
        await page.click('huel-button[is-type="green"][is-size="medium"][is-full-width="true"][disabled="false"]'); // Clicking on the "Continue" button
        
        console.log("Clicked on the 'Continue' button successfully.");
    } catch (error) {
        console.error("Error clicking on the 'Continue' button:", error); // Handling error if unable to click on the "Continue" button
    }

    // Wait for navigation to complete and handle timeout
    await Promise.all([
        page.waitForNavigation({ timeout: 60000 }), // Waiting for navigation to complete with increased timeout
        page.click('huel-button[is-type="green"][is-size="medium"][is-full-width="true"][disabled="false"]') // Clicking on the "Continue" button
    ]).catch(error => {
        console.error("Navigation timeout:", error); // Handling navigation timeout error
    });

    try {
        // Wait for the basket icon to be visible and clickable
        await page.waitForSelector('a[data-testid="IconLink-Basket"] huel-icon[name="Basket"][data-testid="IconLink-icon-Basket"]', { timeout: 30000 }); // Waiting for the basket icon to be visible and clickable
    
        // Click on the basket icon
        await Promise.all([
            page.waitForNavigation({ timeout: 60000 }), // Waiting for navigation to complete with increased timeout
            page.click('a[data-testid="IconLink-Basket"] huel-icon[name="Basket"][data-testid="IconLink-icon-Basket"]') // Clicking on the basket icon
        ]);
    
        console.log("Clicked on the basket icon successfully.");
    
        // Extract the number of items in the cart
        const itemCountElement = await page.$('.cart__items .item_count'); // Selecting the element containing the item count
        const itemCountText = await itemCountElement.evaluate(node => node.textContent); // Retrieving the text content of the element
        const itemCount = parseInt(itemCountText); // Parsing the item count to an integer
    
        // Verify that at least two items are present in the cart
        if (itemCount >= 2) {
            console.log(`Success! ${itemCount} items are present in the cart.`);
        } else {
            console.error(`Error: Only ${itemCount} item(s) in the cart.`);
        }
    } catch (error) {
        console.error("Error clicking on the basket icon or verifying items in the cart:", error); // Handling error if unable to click on the basket icon or verify items in the cart
    }    

await browser.close(); // Closing the browser
})();
