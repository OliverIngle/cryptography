#!/usr/bin/env node

import { cipher, deCipher, characters } from './caesar-cipher';

import chalk from 'chalk';
import chalkAnimation from 'chalk-animation'
import inquirer from 'inquirer';
import { createSpinner } from 'nanospinner';
import clipboard from 'clipboardy';

//global variables
let key: number;
let text: string;
let cipheredText: string;

//sleep helper function
const sleep = (ms: number = 2000) => new Promise((r) => setTimeout(r, ms))

//add 'de'suffix to 'cipher'
function wordSwap(de: boolean, word: string, capitalize: boolean = false): string {
    if (de && capitalize) {
        let str = ('de' + word.toLowerCase())
        return str.charAt(0).toUpperCase() + str.slice(1)
    }
    else if (de)
        return 'de' + word.toLowerCase()
    else
        return word
}

async function info() {
    console.log(
        `
${chalk.bold("Caesar cipher")}
\n\tShift characters among by a certain amount to encode a text.
\t${chalk.blue("Character set:")}
        `
    )
    console.table(characters)
}

async function title() {
    const title = chalkAnimation.glitch(
        "Caesar cipher\n"
    );
    await sleep(1000)
    title.stop()
}

async function getText() {
    const answer = await inquirer.prompt({
        name: 'input_text',
        type: 'input',
        message: 'Text?',
        default() {return 'Lorem ispum'}
    });

    text = answer.input_text;
}

async function getKey(de = false) {
    const answer = await inquirer
        .prompt({
            name: 'input_number',
            type: 'number',
            message: 'Shift?'
        })

        if (!answer.input_number) {//if not a number
            console.log(chalk.bgRed("\n\tPlease enter a NUMBE\n"))
            await getKey()
        } else {
            key = answer.input_number;
            await getCipher(de)
        }
}

async function getCipher(de: boolean) {

    const spinner = createSpinner(`${wordSwap(de, 'Ciphering', true)} text...`).start();

    try {

        if (!de) { cipheredText = cipher(text, key) }
        else { cipheredText = deCipher(text, key) }
        await sleep(500)
        spinner.success({ text: chalk.green(`Text successfully ${wordSwap(de, 'ciphered')}`)} )
        
    } catch (err) {
        spinner.error({ text: `${chalk.red("An error has occured:")} ${err}`} )
    }

}

async function showResult(de = false) {
    console.log(`\n${chalk.blue(wordSwap(de, 'Cipher:', true))}`)
    console.log(`\n\t${chalk.bgBlue(chalk.black(cipheredText))}\n`)
}

async function copyToClipboard() {
    const answer = await inquirer.prompt({
        name: 'request-copy',
        type: 'confirm',
        message: 'Do you want to copy ciphered text to clipboard?',
        default() { return false }
    })

    if (answer['request-copy']) {
        const spinner = createSpinner("Copying...").start();
        try {
            clipboard.writeSync(cipheredText)
            await sleep(500)
            spinner.success( {text: chalk.green("Success")} )
        } catch(err) {
            spinner.error( {text: `${chalk.red("An error has occured:")} ${err}`} )
        }
    }
}

async function getOptions() {
    const answer = await inquirer.prompt({
        name: 'option',
        type: 'list',
        choices: [
            'cipher',
            'decipher',
            'info'
        ]
    })

    return answer.option;
}

//--- Execution order
async function run() {
    await title()
    const option = await getOptions()
    if (option == 'cipher') {
        await getText()
        await getKey()
        await showResult()
        await copyToClipboard()
    } else if (option == 'decipher') {
        await getText()
        await getKey(true)
        await showResult(true)
        await copyToClipboard()
    } else if (option == 'info') {
        info()
    }
}

run()
//---