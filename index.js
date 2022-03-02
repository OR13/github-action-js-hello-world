const core = require("@actions/core");
const github = require("@actions/github");

const fs = require("fs");

try {
  // `who-to-greet` input defined in action metadata file
  const nameToGreet = core.getInput("who-to-greet");
  console.log(`🇺🇦 Hello ${nameToGreet}!`);

  const howToGreet = core.getInput("how-to-greet"); // a path
  console.log(howToGreet);

  const file = fs.readFileSync(howToGreet);
  console.log(file.toString());

  const time = new Date().toTimeString();
  core.setOutput("time", time);
  // Get the JSON webhook payload for the event that triggered the workflow
  const payload = JSON.stringify(github.context.payload, undefined, 2);
  console.log(`The event payload: ${payload}`);
} catch (error) {
  core.setFailed(error.message);
}
