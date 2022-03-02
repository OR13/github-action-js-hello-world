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

  const parsedInput = JSON.parse(file.toString());
  const extended = { ...parsedInput, yolo: 1 };

  const whenToGreet = core.getInput("when-to-greet"); // a path
  fs.writeFileSync(whenToGreet, JSON.stringify(extended));

  const time = new Date().toTimeString();
  core.setOutput("time", time);
  // Get the JSON webhook payload for the event that triggered the workflow
  const payload = JSON.stringify(github.context.payload, undefined, 2);
  console.log(`The event payload: ${payload}`);
} catch (error) {
  core.setFailed(error.message);
}
