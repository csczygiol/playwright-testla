import { Actor, Task } from "@testla/screenplay-playwright";
import {
    Clear,
    Click,
    Navigate,
    Wait
} from "@testla/screenplay-playwright/web";
import { DeclineCookie } from "../screen/yt_locators";

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
                Click.on(DeclineCookie),
                Wait.forLoadState('networkidle')
            )
        }
    }

    public static Login(): yt_tasks {
        return new yt_tasks("Login")
    }
}