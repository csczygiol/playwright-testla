import { Actor, Task } from "@testla/screenplay-playwright";
import {
    Clear,
    Click,
    Fill,
    Navigate,
    Wait
} from "@testla/screenplay-playwright/web";
import { Account, NextButtonSignIn, SearchButton, SearchInput, SelectVideo, SignInEmail, SkipADButton } from "../screen/yt_locators";
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
        //Steps included in the Login mode
        if (this.mode === "Login") {
            await actor.attemptsTo(
                Clear.cookies(),
                Navigate.to(process.env.YT_URL || "https://www.youtube.com/")
            ); //waits till page is loaded
            await actor.attemptsTo(
                Wait.forLoadState('networkidle'),
            );//triggers function for cookie decline loop
            await clickCookieRetry(actor, 2);
            //clicks on sign in
            await actor.attemptsTo(
                Click.on(Account)
            )
            //email input and clicking next button
            await actor.attemptsTo(
                Fill.in(SignInEmail, 'Testmail@mail.com'),
                Click.on(NextButtonSignIn)
                //add password step
            )
        }

        if (this.mode === "PlayVideo") {
            await actor.attemptsTo(
                Clear.cookies(),
                Navigate.to(process.env.YT_URL || "https://www.youtube.com/")
            ); //waits till page is loaded
            await actor.attemptsTo(
                Wait.forLoadState('networkidle'),
            );//triggers function for cookie decline loop
            await clickCookieRetry(actor, 3);
            //searches for video and selects it
            await actor.attemptsTo(
                Fill.in(SearchInput, 'Playwright Updates'),
                Click.on(SearchButton),
                Click.on(SelectVideo)
            )//skips ad
            await actor.attemptsTo(
                Wait.forLoadState('networkidle'),
                Click.on(SkipADButton)
            )
        }
    }



    public static Login(): yt_tasks {
        return new yt_tasks("Login")
    }

    public static PlayVideo(): yt_tasks {
        return new yt_tasks("PlayVideo")
    }
}