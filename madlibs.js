/**
 * Complete the implementation of parseStory.
 *
 * parseStory retrieves the story as a single string from story.txt
 * (I have written this part for you).
 *
 * In your code, you are required (please read this carefully):
 * - to return a list of objects
 * - each object should definitely have a field, `word`
 * - each object should maybe have a field, `pos` (part of speech)
 *
 * So for example, the return value of this for the example story.txt
 * will be an object that looks like so (note the comma! periods should
 * be handled in the same way).
 *
 * Input: "Louis[n] went[v] to the store[n], and it was fun[a]."
 * Output: [
 *  { word: "Louis", pos: "noun" },
 *  { word: "went", pos: "verb", },
 *  { word: "to", },
 *  { word: "the", },
 *  { word: "store", pos: "noun" }
 *  { word: "," }
 *  ....
 *
 * There are multiple ways to do this, but you may want to use regular expressions.
 * Please go through this lesson: https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/regular-expressions/
 */

function parseStory(rawStory) {
  const generalRegex = /(\w+\[\w+\]|\w+|\W)/g;
  const wordsArray = rawStory.match(generalRegex).filter((item) => item.trim() !== "");
  
  return wordsArray.map((word) => {
    if (word.endsWith("]")) {
      const pos = word.slice(-3, -1);
      const content = word.slice(0, -3);
      return { word: content, pos: pos };
    } else {
      return { word: word };
    }
  });
}

/**
 * All your other JavaScript code goes here, inside the function. Don't worry about
 * the `then` and `async` syntax for now.
 *
 * NOTE: You should not be writing any code in the global namespace EXCEPT
 * declaring functions. All code should either:
 * 1. Be in a function.
 * 2. Be in .then() below.
 *
 * You'll want to use the results of parseStory() to display the story on the page.
 */

getRawStory()
  .then(parseStory)
  .then((processedStory) => {
    const container = document.querySelector(".madLibsRaw");
    container.classList.add("container");
    const paragraph = document.createElement("p");
    container.appendChild(paragraph);

    let storyInput = processedStory;
    for (let index = 0; index < storyInput.length; index++) {
      const element = storyInput[index];
      if (element.pos) {
        const input = document.createElement("input");
        input.classList.add("user-input");
        input.placeholder = element.pos;
        paragraph.appendChild(input);
      } else {
        const text = document.createElement("span");
        text.textContent = ` ${element.word} `;
        paragraph.appendChild(text);
      }
    }

    // create an empty story based on story.txt

    const storyContainer = document.querySelector(".madLibsResult");
    storyContainer.classList.add("container");
    const storyParagraph = document.createElement("p");
    storyContainer.appendChild(storyParagraph);
    const inputArr = document.querySelectorAll(".user-input");

    for (let index = 0; index < storyInput.length; index++) {
      const element = storyInput[index];
      if (!element.pos) {
        const text = document.createElement("span");
        text.textContent = ` ${element.word} `;
        storyParagraph.appendChild(text);
      } else {
        const yetToBeFilled = document.createElement("span");
        yetToBeFilled.classList.add("yet-to-be-filled");
        yetToBeFilled.textContent = "_________";
        storyParagraph.appendChild(yetToBeFilled);
      }
    }
    const yetToBeFilledArray = document.querySelectorAll(".yet-to-be-filled");

    for (let index = 0; index < inputArr.length; index++) {
      const inputElement = inputArr[index];
      inputElement.addEventListener("input", (e) => {
        const spanElement = e.target.value;
        yetToBeFilledArray[
          index
        ].innerHTML = `<span class="yet-to-be-filled"> ${spanElement} </span>`;
      });
    }
  }
);