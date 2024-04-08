// playwright_huel_add_to_cart.js
const { chromium } = require('playwright');

// Define product names and flavours
const product1 = "Huel Instant Meal Pots";
const product2 = "Huel Complete Nutrition Bar";
const flavour2 = "Huel Ready-to-drink";

// Helper function to wait for a specific text to appear on the page
async function waitForText(page, text) {
  await page.waitForSelector(`text="${text}"`);
}

// Launch the browser and navigate to the Huel homepage
(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto('https://huel.com/');

  // Search for the first product
  await page.click('text="Search"');
  await page.fill('input[placeholder="Search products..."]', product1);
  await page.press('input[placeholder="Search products..."]', 'Enter');
  await waitForText(page, product1);

  // Add the first product to the cart
  try {
    await page.click('button:has-text("Add to Basket")');
    await waitForText(page, "Basket");
  } catch (e) {
    console.error(`Error adding ${product1} to cart: ${e}`);
  }

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
