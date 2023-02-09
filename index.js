#!/usr/bin/env node

import chalk from "chalk";
import { Chalk } from "chalk";
import inquirer from "inquirer";
import chalkAnimation from "chalk-animation";
import gradient from "gradient-string";
import figlet from "figlet";
import { createSpinner } from "nanospinner";
let playerName;
const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));
const customChalk = new Chalk({ level: 3 });

async function welcome() {
  const rainbowTitle = chalkAnimation.rainbow(
    "Hi! do you want to test you JavaScript knowledge? \n"
  );
  await sleep();
  rainbowTitle.stop();
  console.log(
    `
        ${customChalk.bgGreen("How To Play")}
        ${customChalk.redBright.bold(
          "First of all I'm just a process inside your computer don't freak"
        )}
        I will ask you only some small JS questions
        If you get any question wrong i will be ${chalk.bgRed("Dead")}
        So try to focus and answer corectlly.
        `
  );
}

async function askName() {
  const answers = await inquirer.prompt({
    name: "player_name",
    type: "input",
    message: "What is your name?",
    default() {
      return "Player";
    },
  });
  playerName = answers.player_name;
}

async function question1() {
  const answers = await inquirer.prompt({
    name: "question1",
    type: "list",
    message: "What is the difference between let and var in JavaScript?",
    choices: [
      "let is block-scoped and var is function-scoped",
      "let is function-scoped and var is block-scoped",
      "let is hoisted and var is not hoisted",
    ],
  });
  return handleAnswer(
    answers.question1 == "let is block-scoped and var is function-scoped"
  );
}

async function question2() {
  const answers = await inquirer.prompt({
    name: "question2",
    type: "list",
    message: "How do you create an object in JavaScript?",
    choices: [
      "var obj = new Object();",
      "var obj = {};",
      "var obj = Object();",
    ],
  });
  return handleAnswer(answers.question2 == "var obj = {};");
}

async function question3() {
  const answers = await inquirer.prompt({
    name: "question3",
    type: "list",
    message: "What is the difference between == and ===?",
    choices: [
      "== compares values and === compares values and data types",
      "== compares values and === compares values only",
      "== compares data types and === compares values and data types",
    ],
  });
  return handleAnswer(
    answers.question3 ==
      "== compares values and === compares values and data types"
  );
}

async function question4() {
  const answers = await inquirer.prompt({
    name: "question4",
    type: "list",
    message: "How do you add an element to an array in JavaScript?",
    choices: [
      "array.append(element)",
      "array.push(element)",
      "array.add(element)",
    ],
  });
  return handleAnswer(answers.question4 == "array.push(element)");
}

async function question5() {
  const answers = await inquirer.prompt({
    name: "question5",
    type: "list",
    message: "What is the purpose of the 'this' keyword in JavaScript?",
    choices: [
      "To refer to the parent object of the current object",
      "To refer to the current function or object",
      "To refer to the global object",
    ],
  });
  return handleAnswer(
    answers.question5 == "To refer to the current function or object"
  );
}

async function handleAnswer(isCorrect) {
  const spinner = createSpinner("Checking Answer...").start();
  await sleep();
  if (isCorrect) {
    spinner.success({ text: `Nice work ${playerName}` });
  } else {
    spinner.error({
      text: `Game Over, ${playerName} ${customChalk.red(
        "you should learn more!"
      )}`,
    });
    process.exit(1);
  }
}
async function congrats() {
  console.clear();
  const msg = `Congrats , ${playerName} !\n You Are a Good JS Programmer`;
  figlet(msg, (err, data) => {
    console.log(gradient.pastel.multiline(data));
  });
}

await welcome();

await askName();

await question1();

await question2();

await question3();

await question4();

await question5();
await congrats();
