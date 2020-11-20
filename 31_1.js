let pile = $("#pile");
let nuberfacts = $("#numberfacts");
let draw = $("#drawCard");
let faveNum = "42";
let deck;
let pileCount = 0;

let fourFactPromises = [];
for (let i = 1; i < 5; i++) {
  fourFactPromises.push(axios.get(`http://numbersapi.com/${faveNum}`));
}
Promise.all(fourFactPromises).then((factsArr) =>
  factsArr.forEach((response) => {
    nuberfacts.append(`<li>${response.data}</li>`);
  })
);

axios
  .get("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
  .then((response) => (deck = response.data))
  .catch((err) => console.log(`ERROR: ${err}`));

function getCard() {
  if (pileCount < 52 && deck) {
    axios
      .get(`https://deckofcardsapi.com/api/deck/${deck.deck_id}/draw`)
      .then((response) => genCard(response))
      .catch((err) => console.log(`ERROR: ${err}`));
  }
}

function genCard(response) {
  let card = response.data.cards[0];
  console.log(`${card.value} of ${card.suit}`);
  pileCount++;
  let newCard = document.createElement("img");
  newCard.setAttribute("src", card.image);
  newCard.classList.add("playingCard");

  let degrees = Math.floor(45 - (Math.random() * 90 + 1));
  $(newCard).css("transform", `rotate(${degrees}deg)`);

  pile.append(newCard);
}

draw.click(getCard);
