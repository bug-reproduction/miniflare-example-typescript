import anyTest, {TestFn} from "ava";
import { Miniflare } from "miniflare";

const test = anyTest as TestFn<{mf: Miniflare}>;

test.beforeEach((t) => {
  // Create a new Miniflare environment for each test
  const mf = new Miniflare({
    // Autoload configuration from `.env`, `package.json` and `wrangler.toml`
    envPath: true,
    packagePath: true,
    wranglerConfigPath: true,
    // We don't want to rebuild our worker for each test, we're already doing
    // it once before we run all tests in package.json, so disable it here.
    // This will override the option in wrangler.toml.
    buildCommand: undefined,
  });
  t.context = { mf };
});

test("increments path count for new paths", async (t) => {
  // Get the Miniflare instance
  const { mf } = t.context;
  // Dispatch a fetch event to our worker
  const res = await mf.dispatchFetch("http://localhost:8787/");
  // Check the count is "1" as this is the first time we've been to this path
  t.is(await res.text(), "hello world");
});