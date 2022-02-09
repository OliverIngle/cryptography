import { cipher, deCipher } from './ceasar-cipher'

const encrypted = cipher("Hello my name is oliver and i am a junior siftware developer",16)
const decrypted = deCipher(encrypted, 16)

console.log(encrypted)
console.log(decrypted)