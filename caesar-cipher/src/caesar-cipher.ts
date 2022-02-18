//character list to to shift among
const characters = [
    "a", "b", "c", "d", "e", "f", "g", "h", "i", "j",
    "k", "l", "m", "n", "o", "p", "q", "r", "s", "t",
    "u", "v", "w", "x", "y", "z", "1", "2", "3", "4",
    "5", "6", "7", "8", "9", "0", " "
] as const;
//character type (uninon type of all individual characters from the list above)
type Character = typeof characters[number];

function charShift(character: Character, shift: number): Character {
    //function to shift a single character
    let shifted: Character = " ";
    let characterIndex: number = characters.indexOf(character);

    if (shift > 0) {        //handles positive shift

        while (shift > characters.length) {
            shift -= characters.length;
        }

        if (characterIndex + shift < characters.length) {
            shifted = characters[characterIndex + shift] as Character;
        } else {
            shifted = characters[characterIndex + shift - characters.length] as Character;
        }

    } else if (shift < 0) { //handles negative shift

        while (shift < -characters.length) {
            shift += characters.length
        }

        if (characterIndex + shift >= 0) {
            shifted = characters[characterIndex + shift] as Character;
        } else {
            shifted = characters[characterIndex + shift + characters.length] as Character;
        }

    }

    return shifted

}


function cipher(text: string, shift: number): string {
    //ceasar cipher function
    let formated = text.toLowerCase();
    let ciphered: string = "";
    //shifts each character of input and apends them to ciphered
    for (let i = 0; i < formated.length; i ++) {

            ciphered += charShift(formated[i] as Character, shift)

        }

    return ciphered;

}


function deCipher(text: string, shift: number): string {
    //decipher function, basically the oposit of the cipher function
    return cipher(text, -shift)

}

//exports
export {
    cipher,
    deCipher,
    characters
}