import { Click, Wait } from "@testla/screenplay-playwright/web";
import { DeclineCookie } from "../screen/yt_locators";

// loop that presses the cookie decline button in case playwright misses the locator in the first try
export async function clickCookieRetry(actor: any, retries: any) {
    for (let i = 0; i < retries; i++) {
        try {
            await actor.attemptsTo(
                Wait.forLoadState('networkidle'),
                Click.on(DeclineCookie, { timeout: 3000 }),
            );
            return; // Success, exit the loop
        } catch (error) {
            // Handle the error or log it
            console.warn(`Attempt ${i + 1} to click Cookie Decline Button failed. Retrying...`);
        }
    }
    console.error(`Cookie Decline Button click failed after ${retries} attempts.`);
}
//module.exports = clickCookieRetry;