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
        "Hi brothers and sisters do you want to be a millionaire? \n"
    );
    await sleep();
    rainbowTitle.stop();
    console.log(
        `
        ${customChalk.bgGreen("How To Play")}
        ${customChalk.redBright.bold(
          "First of all I'm inside you computer don't freak"
        )}
        I will ask you only some small programming questions
        If you get any question wrong i will be ${chalk.bgRed("Dead")}
        So answer corectlly you piece of ${customChalk
          .hex("#964B00")
          .bold("Shit!")}
        `
    );
}

async function askName() {
    const answers = await inquirer.prompt({
        name: "player_name",
        type: "input",
        message: "What is your name?",
        default () {
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
            " == compares values and === compares values only;",
            "== compares data types and === compares values and data types",
        ],
    });
    return handleAnswer(
        answers.question3 ==
        "== compares values and === compares values and data types"
    );
}
async function handleAnswer(isCorrect) {
    const spinner = createSpinner("Checking Answer...").start();
    await sleep();
    if (isCorrect) {
        spinner.success({ text: `Nice work ${playerName}` });
    } else {
        spinner.error({
            text: `Game Over, ${playerName} ${customChalk.red("you are a looser!")}`,
        });
        process.exit(1);
    }
}
async function congrats() {
    console.clear();
    const msg = `Congrats , ${playerName} !\n YOU ARE a Genius Programmer`;
    figlet(msg, (err, data) => {
        console.log(gradient.pastel.multiline(data));
    });
}

await welcome();

await askName();

await question1();

await question2();

await question3();
await congrats();