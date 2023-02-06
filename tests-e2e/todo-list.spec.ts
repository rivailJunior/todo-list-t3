import { test, expect } from "@playwright/test";
test.setTimeout(35e3);

test("should render page properly", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/To Do List App/i);
});

test("should add one player properly", async ({ page }) => {
  await page.goto("/");
  const input = page.getByRole("textbox", { name: "name" });
  const addButton = page.getByRole("button", { name: "Save" });
  await expect(input).toHaveAttribute("placeholder", "Type your name here");
  await input.fill("Claudio Adao");
  await addButton.click();
  await expect(page.getByText("Claudio Adao")).toBeVisible();
});

test("should edit last register", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByText(/Claudio Adao/i)).toBeVisible();
  await page
    .getByRole("listitem")
    .filter({ hasText: "Claudio Adao" })
    .locator('button[name="action_edit"]')
    .click();
  const inputText = await page.getByRole("textbox", { name: "name" });
  await expect(inputText).toHaveValue("Claudio Adao");
  inputText.fill("Cristiano Ronaldo");
  const updateButton = await page.getByRole("button", { name: "Update" });
  expect(updateButton).toBeVisible();
  updateButton.click();
  await expect(page.getByText(/Cristiano Ronaldo/i)).toBeVisible();
  await expect(page.getByAltText(/Claudio Adao/)).not.toBeVisible();
});

test("should delete last register updated", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByText(/Cristiano Ronaldo/i)).toBeVisible();
  await page
    .getByRole("listitem")
    .filter({ hasText: "Cristiano Ronaldo" })
    .locator('button[name="action_delete"]')
    .click();
  const modalTitle = await page.getByText(/Deleting User/i);
  const modalBody = await page.getByText(
    "Are you sure, do you want to delete user:Cristiano Ronaldo?"
  );
  await expect(modalTitle).toBeVisible();
  await expect(modalBody).toBeVisible();
  const deleteButton = await page.getByText(/continue/i);
  deleteButton.click();
  await expect(modalTitle).not.toBeVisible();
  await expect(modalBody).not.toBeVisible();
  await expect(page.getByText(/Cristiano Ronaldo/i)).not.toBeVisible();
});
