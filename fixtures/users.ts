import { test as base, firefox, webkit } from "@playwright/test";
import { Actor } from "@testla/screenplay-playwright";
import { UseActor } from "../screenplay/actor/UserActor";

type Actors = { User: Actor };

export const test = base.extend<Actors>({
  User: async ({ browser }, use) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    const RightsManager = await UseActor(page, "Rights Manager");
    await use(RightsManager);
  },
});
export { expect } from "@playwright/test";
