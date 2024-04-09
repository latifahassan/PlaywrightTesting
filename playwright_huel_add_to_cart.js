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

// Wait for the specific flavour button to be visible
await page.waitForSelector(`button[aria-label="${flavour2} Increase Quantity"]`);
await page.waitForTimeout(2000); // Add a delay of 2 seconds

// Click on the "+" button associated with the specified flavour
await page.click(`button[aria-label="${flavour2} Increase Quantity"]`);

// Wait for the "Continue" button and click on it
await page.waitForSelector('huel-button.hydrated');
await page.click('huel-button.hydrated');

// Wait for the "Continue" button on the next page and click on it
await page.waitForSelector('nav[data-testid="StepsNav"]');
await page.click('huel-button.hydrated');;

// Verify there are two products in the cart
const basketCount = await page.textContent('span[data-basket-count]');
const count = parseInt(basketCount.match(/\d+/)[0]);
if (count === 2) {
    console.log("Success! Two items were added to the basket.");
} else {
    console.error(`Error: ${count} item(s) in the basket.`);
}

await browser.close();
})();