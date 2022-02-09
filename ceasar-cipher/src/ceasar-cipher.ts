type Character = "a" | "b" | "c" | "d" | "e" | "f" | "g" | "h" | "i" | "j"
               | "k" | "l" | "m" | "n" | "o" | "p" | "q" | "r" | "s" | "t"
               | "u" | "v" | "w" | "x" | "y" | "z" | "1" | "2" | "3" | "4"
               | "5" | "6" | "7" | "8" | "9" | "0" | " ";

const characters = "abcdefghijklmnopqrstuvwxyz1234567890 "


function charShift(character: Character, shift: number): Character {

    let shifted: Character = " ";
    let characterIndex: number = characters.indexOf(character);

    if (shift > 0) {

        while (shift > characters.length) {
            shift -= characters.length;
        }

        if (characterIndex + shift < characters.length) {
            shifted = characters[characterIndex + shift] as Character;
        } else {
            shifted = characters[characterIndex + shift - characters.length] as Character;
        }

    } else if (shift < 0) {

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

    let formated = text.toLowerCase();
    let ciphered: string = "";

    for (let i = 0; i < formated.length; i ++) {

            ciphered += charShift(formated[i] as Character, shift)

        }

    return ciphered;

}


function deCipher(text: string, shift: number): string {

    return cipher(text, -shift)

}

export {
    cipher,
    deCipher
}