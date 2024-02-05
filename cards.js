// testing promises with numbers API and deck of cards API

axios
  .get(`https://deckofcardsapi.com/api/deck/new/draw/?count=1`)
  .then((response) => {
    console.log("PART 1");
    console.log(`${response.data.cards[0].value} of ${response.data.cards[0].suit}`);
  })
  .catch((error) => {
    console.log(error);
  });

axios
  .get(`https://deckofcardsapi.com/api/deck/new/draw/?count=1`)
  .then((response) => {
    console.log("PART 2");
    console.log(`${response.data.cards[0].value} of ${response.data.cards[0].suit}`);
    return axios.get(`https://deckofcardsapi.com/api/deck/${response.data.deck_id}/draw/?count=1`);
  })
  .then((response) => {
    console.log(`${response.data.cards[0].value} of ${response.data.cards[0].suit}`);
  })
  .catch((error) => {
    console.log(error);
  });

// adding user responsiveness

let deckId;
function initializeDeck() {
  axios
    .get("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
    .then((response) => {
      deckId = response.data.deck_id;
    })
    .catch((error) => console.error("Error making deck:", error));
}

function drawCard() {
  // initializes deckId
  initializeDeck();
  if (deckId) {
    axios
      .get(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)
      .then((response) => {
        if (response.data.cards.length > 0) {
          // append card to existing ul
          const card = response.data.cards[0];
          const cardElement = document.createElement("li");
          cardElement.textContent = `${card.value} of ${card.suit}`;
          document.getElementById("cards").append(cardElement);

          // stop appending
          if (response.data.remaining === 0) {
            alert("No more cards in the deck.");
            document.getElementById("draw").disabled = true; // Disable the button
          }
        }
      })
      .catch((error) => console.error("Error drawing a card:", error));
  }
}
document.getElementById("draw").addEventListener("click", drawCard);
