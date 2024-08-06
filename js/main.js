"use strict";

// Selectores de elementos en el HTML y variables del juego
const wordsContainer = document.getElementById("word-container");
const userInput = document.getElementById("userInput");
const userHelper = document.getElementById("inputHelper");
const buttonTestLetter = document.getElementById("buttonTestLetter");
const hangmanImg = document.getElementById("hangmanImg");
let isWordCreated = false;
let points = 0;
let failed = 0;

// variables
let userLetters = {};
let randomWordLetters = {};

// * todo Definir un array con varias palabras predefinidas
// * Lista de palabras se llama words y esta en el archivo words.js
// * en el html esta antes del script main.js debería poder usarse su contenido aquí.

// * todo crear la función getRandomWord(arr) que regrese una palabra aleatoria del array words
// *done
const getRandomWord = (arr) => {
  let randomWord = arr[Math.floor(Math.random() * arr.length)];
  if (randomWord.length >= 6) {
    return randomWord;
  } else {
    // console.log("corrí el else");
    return getRandomWord(arr);
  }
};

const randomWord = getRandomWord(words);
console.log(randomWord);

// * todo Mostrar la palabra con guiones bajos
// * todo escribir la función turnWordIn_(word) que regresa el html necesario para convertir la palabra en guiones bajos

const turnWordIn_ = (word) => {
  if (!isWordCreated) {
    isWordCreated = true;
    for (const letter of word) {
      let paragraph = document.createElement("p");
      paragraph.textContent = "_";
      paragraph.dataset.letter = letter;
      wordsContainer.appendChild(paragraph);
      randomWordLetters[letter] = true;
    }
  }
};

const turn_inLetter = () => {
  const mysteryParagraph = document.querySelectorAll("p");
  for (const paragraph of mysteryParagraph) {
    if (userLetters[paragraph.dataset.letter]) {
      paragraph.textContent = paragraph.dataset.letter;
    } else {
      paragraph.textContent = "_";
    }
  }
};

const isWinner = (objA, objB) => {
  // si el objetoB tiene las mismas keys que el A regresa true
  return Object.keys(objA).every((prop) => {
    return objB.hasOwnProperty(prop);
  });
};

const handleInputChange = (event) => {
  let input = event.target.value;
  // todo hay que validar también si no es un carácter especial
  if (input.length === 1 && input !== "" && isNaN(input)) {
    userHelper.textContent = "input valido";
    userHelper.style.color = "green";
    buttonTestLetter.disabled = false;
  } else {
    userHelper.textContent = "ingresa solo una letra";
    userHelper.style.color = "red";
    buttonTestLetter.disabled = true;
  }
};

// * todo Validar que el input acepte solo una letra y que no esté vacío.
userInput.addEventListener("input", handleInputChange);
userInput.addEventListener("propertychange", handleInputChange);

const testLetter = (event) => {
  event.preventDefault();

  const input = userInput.value.toLowerCase();

  if (!userLetters[input] && randomWordLetters[input]) {
    userLetters[input] = true;
    console.log("Letra añadida:", input);
    console.log(userLetters);
    // turnWordIn_(randomWord);
    turn_inLetter(randomWord);
    if (isWinner()) {
      // !! correr aquí la condición de victoria
      console.log("ganaste");
    }
  } else {
    //* !! aquí lo que pase si no esta bien la letra
    failed += 1;

    failureCheckAndDisplay(failed);
    console.log("Fallaste:", input, failed);
  }

  // Reset input field and disable button
  userInput.value = "";
  buttonTestLetter.disabled = true;
};

buttonTestLetter.addEventListener("click", testLetter);

const failureCheckAndDisplay = (failed) => {
  switch (failed) {
    case 0:
      hangmanImg.src = `../assets/img/0.jpg`;
      break;
    case 1:
      hangmanImg.src = `../assets/img/1.jpg`;
      break;

    case 2:
      hangmanImg.src = `../assets/img/2.jpg`;
      break;

    case 3:
      hangmanImg.src = `../assets/img/3.jpg`;
      break;

    case 4:
      hangmanImg.src = `../assets/img/4.jpg`;
      break;

    case 5:
      hangmanImg.src = `../assets/img/5.jpg`;
      break;

    case 6:
      hangmanImg.src = `../assets/img/6.jpg`;
      alert("perdiste");
      // !! función para reiniciar el juego
      break;

    default:
      break;
  }
};

console.log(randomWordLetters);

turnWordIn_(randomWord);
