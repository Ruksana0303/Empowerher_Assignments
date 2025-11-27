const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question("Enter number of seconds for countdown: ", (input) => {
  let seconds = Number(input);

  if (isNaN(seconds) || seconds <= 0) {
    console.log("Please enter a valid positive number.");
    rl.close();
    return;
  }

  console.log(`Countdown started for ${seconds} seconds...`);
  console.log('Press "s" to stop the countdown.');

  const intervalId = setInterval(() => {
    console.log(`Remaining: ${seconds} seconds`);
    seconds--;

    if (seconds < 0) {
      clearInterval(intervalId);
      console.log("Countdown Complete!");
      rl.close();
    }
  }, 1000);

  const checkForKey = () => {
    rl.input.once("data", (key) => {
      key = key.toString().trim();
      if (key === "s") {
        console.log("Countdown stopped manually!");
        clearInterval(intervalId);
        rl.close();
      } else {
        setTimeout(checkForKey, 500);
      }
    });
  };
  setTimeout(checkForKey, 500);
});
