import { Actor, Task } from "@testla/screenplay-playwright";
import {
    Clear,
    Click,
    Navigate,
    Wait
} from "@testla/screenplay-playwright/web";
import { Account, DeclineCookie } from "../screen/yt_locators";
import { clickCookieRetry } from "./clickCookieRetry";

type Mode =
    | "Login"
    | "PlayVideo"
    ;

export class yt_tasks extends Task {

    private constructor(private mode: Mode) {
        super();
    }

    public async performAs(actor: Actor): Promise<void> {
        if (this.mode === "Login") {
            await actor.attemptsTo(
                Clear.cookies(),
                Navigate.to(process.env.YT_URL || "https://www.youtube.com/")
            );
            await actor.attemptsTo(
                Wait.forLoadState('networkidle'),
            );
            await clickCookieRetry(actor, 2);

            await actor.attemptsTo(
                Click.on(Account)
            )
        }
    }

    public static Login(): yt_tasks {
        return new yt_tasks("Login")
    }
}