import { Page } from "@playwright/test";
import { Actor } from "@testla/screenplay-playwright";
import { BrowseTheWeb } from "@testla/screenplay-playwright/web";

export function UseActor(page: Page, actorName: string): Actor {
  const actor = Actor.named(actorName).can(BrowseTheWeb.using(page));

  return actor;
}
