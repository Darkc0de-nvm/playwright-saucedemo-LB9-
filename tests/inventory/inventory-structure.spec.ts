import { test } from "../../src/fixtures/baseTest";

test("inventory: page structure is correct", async ({ page, inventoryPage }) => {
    await page.goto("/inventory.html");
    await inventoryPage.expectStructure();
});