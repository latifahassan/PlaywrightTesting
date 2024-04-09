// playwright_huel_add_to_cart.js
const { chromium } = require('playwright');
 
// Define product names and flavours
const product1 = "Huel Daily Greens";
const product2 = "Huel Instant Meals";
const flavour2 = "Mexican Chilli";

// Launch the browser and navigate to the Huel homepage
(async () => {
    const browser = await chromium.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto('https://huel.com/');
  
    // Search for the first product
    await page.waitForSelector('button[data-testid="IconLink-Search"]', { visible: true });
    await page.click('button[data-testid="IconLink-Search"]');
    await page.waitForSelector('input[data-testid="SearchBar__input"]', { visible: true, timeout: 10000 });
    await page.fill('input[data-testid="SearchBar__input"]', product1);
    await page.keyboard.press('Enter');
  
    // Wait for the Daily Greens product image to be visible and click on it
    await page.waitForSelector('img[alt="Product Image"]', { visible: true });
    await page.click('img[alt="Product Image"]');
  
    // Wait for the "Shop Daily Greens" button to be visible and click on it
    await page.waitForSelector('a.button', { visible: true });
    await page.click('a.button');
  
    // Wait for the "ADD TO CART" button to be visible and click on it
    await page.waitForSelector('huel-button.VariantsPurchaseForm__purchase-button', { visible: true });
    await page.click('huel-button.VariantsPurchaseForm__purchase-button');
    
    await page.waitForNavigation();
// Search for the second product
await page.waitForSelector('button[data-testid="IconLink-Search"]', { visible: true });
await page.click('button[data-testid="IconLink-Search"]');
await page.waitForSelector('input[data-testid="SearchBar__input"]', { visible: true, timeout: 10000 });
await page.fill('input[data-testid="SearchBar__input"]', product2);
await page.keyboard.press('Enter');

// Wait for navigation to complete
await page.waitForNavigation();

// Wait for the image of the "Shop Instant Meal Pouches" and click on it
await page.waitForSelector('img[alt="Product Image"][src="https://huel.imgix.net/H&S%20final.png"]');
await page.click('img[alt="Product Image"][src="https://huel.imgix.net/H&S%20final.png"]');

// Wait for the flavour picker to be visible
await page.waitForSelector('div.FlavourPicker__left-side');
await page.waitForTimeout(2000); // Add a delay of 2 seconds

// Click on the flavour picker
await page.click('div.FlavourPicker__left-side');

// Wait for the specific flavour button to be visible, enabled, and stable
await page.waitForSelector(`button[aria-label="${flavour2} Increase Quantity"]`, { visible: true, enabled: true, stable: true });

// Click on the "+" button associated with the specified flavour
await page.click(`button[aria-label="${flavour2} Increase Quantity"]`);


try {
    // Wait for the "Continue" button to become enabled (green)
    await page.waitForSelector('huel-button[is-type="green"][is-size="medium"][is-full-width="true"][disabled="false"]', { visible: true, timeout: 30000 });

    // Click on the "Continue" button
    await page.click('huel-button[is-type="green"][is-size="medium"][is-full-width="true"][disabled="false"]');
    
    console.log("Clicked on the 'Continue' button successfully.");
} catch (error) {
    console.error("Error clicking on the 'Continue' button:", error);
}

await Promise.all([
    page.waitForNavigation({ timeout: 60000 }), // Increase timeout
    page.click('huel-button[is-type="green"][is-size="medium"][is-full-width="true"][disabled="false"]')
]).catch(error => {
    console.error("Navigation timeout:", error);
});

try {
    // Click on the "Continue to Cart" button
    await page.click('button.button.is-success:has-text("Continue To Cart")');

    // Wait for the cart count element to be visible
    await page.waitForSelector('span.item_count', { visible: true });

    // Get the text content of the cart count element
    const itemCountElement = await page.$('span.item_count');
    const itemCountText = await itemCountElement.textContent();

    // Extract the count of products from the text content
    const count = parseInt(itemCountText);

    // Verify there are two products in the cart
    if (count === 2) {
        console.log("Success! Two items were added to the cart.");
    } else {
        console.error(`Error: ${count} item(s) in the cart.`);
    }
} catch (error) {
    console.error("Error clicking on the 'Continue to Cart' button:", error);
}


// // Click on the "Continue to Cart" button
// await page.click('span:has-text("Continue To Cart")');

// // Wait for the cart count element to be visible
// await page.waitForSelector('span.item_count', { visible: true });

// // Get the text content of the cart count element
// const itemCountElement = await page.$('span.item_count');
// const itemCountText = await itemCountElement.textContent();

// // Extract the count of products from the text content
// const count = parseInt(itemCountText);

// // Verify there are two products in the cart
// if (count === 2) {
//     console.log("Success! Two items were added to the cart.");
// } else {
//     console.error(`Error: ${count} item(s) in the cart.`);
// }
await browser.close();
})();