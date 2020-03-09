import dictionary from './dictionary.js';
import score from './scores.js';
import bag from './bag.js'

// console.log(dictionary[1]);
// console.log(score.calcWord("kataryna"));

function numLetters(letter,num){
  let string = "";
  for (let i=0; i<num; i++){
    string = string + letter;
  }
  return string;
}

function fetchThing(){
  console.log("fetching");
  fetch('./test.txt')
      .then(results => results.text())
      .then(newResults => console.log(newResults))

}
fetchThing();
// console.log("wha")
// console.log(bag.bagContents);
// console.log(bag.createBag(bag.bagContents));

let bagInstance = (bag.createBag(bag.bagContents));
let playerTiles = "";

function takeLetter(bag){
  let position = Math.floor(Math.random() * bag.length);
  playerTiles = playerTiles + bag[position];
  bagInstance = bag.slice(0,position)+bag.slice(position+1)
  // console.log(bagInstance)
  // console.log(playerTiles)
  return bag;
}

function takeSevenLetters() {
  for ( let i=0; i<7; i++){
    takeLetter(bagInstance)
  }
}

takeSevenLetters();

function findValidWords(hand, dictionary){
  let validWords=[];
  console.log(hand);
  //Start loop through dictionary words
  for (let i=0; i<dictionary.length; i++){
    let curWord=true;
    let curHand=hand;
    //Start loop through letters of dictionary entry
    for (let j=0; j<dictionary[i].length; j++){
      if(curWord===true) {
        if ((curHand.indexOf(dictionary[i][j].toUpperCase()) != -1) && j===(dictionary[i].length-1)) {
          console.log("complete word: "+dictionary[i]);
          validWords.push(dictionary[i]);
        }
        else if(curHand.indexOf(dictionary[i][j].toUpperCase()) != -1){
          let position = curHand.indexOf(dictionary[i][j].toUpperCase())
          curHand = curHand.slice(0,position)+curHand.slice(position+1)
        }
        else {
          curWord=false;
        }
      }

    }
    //Ended word loop j
  }
  //Ended word loop i
  console.log(validWords)
  return validWords;
}


let validWords = findValidWords(playerTiles, dictionary);
let wordValues = validWords.map(function(word) {
  return {
    word: word,
    score: score.calcWord(word)
  }
});

let wordsByValue = wordValues.sort(compare);
let wordLengths = [...wordValues]
let wordsByLength = wordLengths.sort(lengthCompare);

function compare(a, b) {
  const wordA = a.score;
  const wordB = b.score;

  let comparison = 0;
  if (wordA > wordB) {
    comparison = 1;
  } else if (wordA < wordB) {
    comparison = -1;
  }
  return comparison * -1;
}

function lengthCompare (a,b) {
  const wordA = a.word.length;
  const wordB = b.word.length;

  let comparison = 0;
  if (wordA > wordB) {
    comparison = 1;
  } else if (wordA < wordB) {
    comparison = -1;
  }
  return comparison * -1;
}



document.getElementById('hand').appendChild(document.createTextNode(playerTiles))


if (wordsByValue[0]){
  document.getElementById('topWord').appendChild(
    document.createTextNode(
      "Top scoring word: '" + wordsByValue[0].word+"', worth " + wordsByValue[0].score
       + ". The longest word is '" + wordsByLength[0].word + "'."
    )
  )
  let allWords = document.getElementById('allWords');
  allWords.appendChild(tableHeader('Word','Score'))
  wordsByValue.map(word => allWords.appendChild(tableRow(word.word,word.score)))
} else {
  document.getElementById('topWord').appendChild(document.createTextNode("No words found."))
}


function tableRow(firstCell, secondCell){
  let row = document.createElement('tr');
  let cellOne = document.createElement('td');

  cellOne.appendChild(document.createTextNode(firstCell));
  let cellTwo = document.createElement('td');
  cellTwo.appendChild(document.createTextNode(secondCell));
  row.appendChild(cellOne);
  row.appendChild(cellTwo);
  return row;
}

function tableHeader(firstCell, secondCell){
  let row = document.createElement('tr');
  let cellOne = document.createElement('th');

  cellOne.appendChild(document.createTextNode(firstCell));
  let cellTwo = document.createElement('th');
  cellTwo.appendChild(document.createTextNode(secondCell));
  row.appendChild(cellOne);
  row.appendChild(cellTwo);
  return row;
}

// console.log(bagInstance)
// takeLetter(bagInstance)
// takeLetter(bagInstance)
// takeLetter(bagInstance)
// takeLetter(bagInstance)
// takeLetter(bagInstance)
// takeLetter(bagInstance)
// takeLetter(bagInstance)
