# Caesar cipher

## Description

A Caesar cypher consists of shiftint the charactersd of an input by a spectifed amount amongst a list of characters.

## Instalation

```bash
npm i caesar-cipher
```

## Syntax

### Import

- with `require`

    ```javascript
    const caesarCipher = require('caesar-cipher');
    //or
    const { cipher, deCipher } = require('caesar-cipher');
    ```

- with `import`

    ```javascript
    import { cipher, deCipher } from 'caesar-cipher';
    ```

### Usage

```javascript
cipher(text, shift);
deCipher(text, shift);
```

- **text** (`type: string`) is the input that you want to cipher. it may contain alphanumeric caracters, as well as spaces.
- **shift** (`type: number`) is the number of characters to shift by.

## Examples

*Using character set defined in **caesar-cipher.js***

- `cipher("a", 2)` would return a value of `"c"`
- `cipher("Hello world", 16)` would return a value of `"xu225pb582t"`

- `deCipher("c", 2)` would return a value of `"a"`
- `deCipher("xu225pb582t", 16)` would return a value of `"hello world"`

## CLI tool

Caesar cipher is also a cli tool. Run the following command to try it out:

```bash
npx caesar-cipher
```

(*Make sure you have Node.js installed and up to date on your system*)
