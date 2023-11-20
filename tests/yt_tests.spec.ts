import { test } from "../fixtures/users";
import { yt_tasks } from "../screenplay/tasks/yt_tasks";

test.describe("test", () => {
    test("Login", async ({ User }) => {
        await User.attemptsTo(
            yt_tasks.Login(),
        );
    })

    test("PlayVideo", async ({ User }) => {
        await User.attemptsTo(
            yt_tasks.PlayVideo(),
        );
    })
})
