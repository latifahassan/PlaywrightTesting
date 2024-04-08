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
    await page.waitForSelector('input[data-testid="SearchBar__input"]', { visible: true });
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
  await page.click('text="Search"');
  await page.fill('input[placeholder="Search products..."]', product2);
  await page.press('input[placeholder="Search products..."]', 'Enter');
  await waitForText(page, product2);

  // Select the desired flavour
  try {
    await page.click(`text="${flavour2}"`);
    await page.click('button:has-text("Add to Basket")');
    await waitForText(page, "Basket");
  } catch (e) {
    console.error(`Error adding ${product2} (${flavour2}) to cart: ${e}`);
  }

  // Verify that at least two items are present in the basket
  const basketCount = await page.textContent('span[data-basket-count]');
  const count = parseInt(basketCount.match(/\d+/)[0]);
  if (count >= 2) {
    console.log("Success! At least two items were added to the basket.");
  } else {
    console.error(`Error: Only ${count} item(s) in the basket.`);
  }
  await browser.close();
})();
