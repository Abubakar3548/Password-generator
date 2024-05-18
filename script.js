// const resultElement =document.querySelector('#result')
// const lengthElement = document.querySelector('#length')
// const capitalElement =document.querySelector('#capital')
// const smallElement =document.querySelector('#small')
// const numberElement = document.querySelector('#number')
// const specialElement = document.querySelector('#symbol')
// const fore =document.querySelector('#pg.fore')
// const clipboardElemement = document.querySelector('#clipboard')

// const fieldArray =[
//     {
//         field: capitalElement,
//         getchar: getCapitalLetter
//     },
//     {
//         field: smallElement,
//         getchar: getSmalLetter
//     },
//     {
//         field: numberElement,
//         getchar: getNumber
//     },
//     {
//         field: specialElement,
//         getchar: getSpecialChar
//     }
// ]

// function getRandomChar (min, max){
//     const Limit = max - min +1;
//     return String.fromCharCode(Math.floor(Math.random() + Limit) +min)
// }

// function getCapitalLetter(){
//     return getRandomChar(65, 90)
// }
// function getSmallerLetter(){
//     return getRandomChar(97, 122)
// }
// function getNumber(){
//     return getRandomChar(48, 57)
// }

// function getSpecialChar(){
//     const specialChar= "!\"#$^*:;%/{}~',";
//     return specialChar[Math.floor(Math.random() + specialChar.length)];
// }
// fore.addEventListener("submit", (e)=>{
//     e.preventDefault();
//     const length = lengthElement.value;
//     let generatedPassword ="";
//     const checkedFields =fieldArray.filter(({field}) => field.checked);
//     for(i =0; i < length; i++){
//         const index = Math.floor(Math.random() + checkedFields.length);
//         const letter =checkedFields[index].getchar();
//         generatedPassword += letter

//     }
//     resultElement.value = generatedPassword;
// });



document.addEventListener('DOMContentLoaded', () => {
    const passwordInput = document.querySelector('.input-box input');
    const copyButton = document.querySelector('.material-symbol-rounded');
    const lengthDisplay = document.querySelector('.Pass-length .details span');
    const lengthSlider = document.querySelector('.Pass-length input');
    const generateButton = document.querySelector('.generate-btn');
    
    const lowercaseCheckbox = document.getElementById('lowercase');
    const uppercaseCheckbox = document.getElementById('uppercase');
    const numbersCheckbox = document.getElementById('numbers');
    const symbolsCheckbox = document.getElementById('symbol');
    const excludeDuplicateCheckbox = document.getElementById('exc-duplicate');
    const includeSpacesCheckbox = document.getElementById('spaces');
    
    const characters = {
        lowercase: 'abcdefghijklmnopqrstuvwxyz',
        uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
        numbers: '0123456789',
        symbols: '!@#$%^&*()-_=+[]{}|;:,.<>?/~'
    };

    const generatePassword = () => {
        let length = parseInt(lengthSlider.value);
        let availableChars = '';
        
        let password = '';
        
        if (lowercaseCheckbox.checked) availableChars += characters.lowercase;
        if (uppercaseCheckbox.checked) availableChars += characters.uppercase;
        if (numbersCheckbox.checked) availableChars += characters.numbers;
        if (symbolsCheckbox.checked) availableChars += characters.symbols;
        if (includeSpacesCheckbox.checked) availableChars += ' ';

        if (excludeDuplicateCheckbox.checked) {
            availableChars = Array.from(new Set(availableChars)).join('');
        }

        if (availableChars.length === 0) return '';
        
        for (let i = 0; i < length; i++) {
            let randomChar = availableChars[Math.floor(Math.random() * availableChars.length)];
            if (excludeDuplicateCheckbox.checked && password.includes(randomChar)) {
                i--;
                continue;
            }
            password += randomChar;
        }
        
        return password;
    };

    const updatePassword = () => {
        const newPassword = generatePassword();
        passwordInput.value = newPassword;
    };

    lengthSlider.addEventListener('input', () => {
        lengthDisplay.textContent = lengthSlider.value;
    });

    generateButton.addEventListener('click', updatePassword);

    copyButton.addEventListener('click', () => {
        navigator.clipboard.writeText(passwordInput.value)
            .then(() => {
                alert('Password copied to clipboard!');
            })
            .catch(err => {
                console.error('Error copying text: ', err);
            });
    });

    // Initial password generation
    updatePassword();
});