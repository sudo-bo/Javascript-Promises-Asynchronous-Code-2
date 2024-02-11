// testing promises with numbers API and deck of cards API

async function drawSingleCard() {
  try {
    response = await axios.get(`https://deckofcardsapi.com/api/deck/new/draw/?count=1`);
    console.log("PART 1");
    console.log(`${response.data.cards[0].value} of ${response.data.cards[0].suit}`);
  } catch (error) {
    console.log(error);
  }
}
drawSingleCard();

async function drawTwoCardsSequentially() {
  try {
    const response1 = await axios.get(`https://deckofcardsapi.com/api/deck/new/draw/?count=1`);
    console.log("PART 2");
    console.log(`${response1.data.cards[0].value} of ${response1.data.cards[0].suit}`);
    const response2 = await axios.get(`https://deckofcardsapi.com/api/deck/${response1.data.deck_id}/draw/?count=1`);
    console.log(`${response2.data.cards[0].value} of ${response2.data.cards[0].suit}`);
  } catch (error) {
    console.log(error);
  }
}
drawTwoCardsSequentially();

// adding user responsiveness

let deckId;
async function initializeDeck() {
  try {
    reponse = axios.get("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1");
    return response.data.deck_id;
  } catch (error) {
    console.error("Error making deck:", error);
    return null;
  }
}

async function drawCard() {
  // initializes deckId
  try {
    deckId = initializeDeck();
    if (deckId) {
      response = axios.get(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`);
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
    }
  } catch (error) {
    console.error("Error drawing a card:", error);
  }
}
document.getElementById("draw").addEventListener("click", drawCard);
