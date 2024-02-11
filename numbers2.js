// testing promises with numbers API and deck of cards API

let min = Math.floor(Math.random() * 10);
let max = Math.floor(Math.random() * 10);

if (max < min) {
  let temp = min;
  min = max;
  max = temp;
}

// part 2
async function getNumbers(min, max) {
  try {
    const response = await axios.get(`http://numbersapi.com/${min}..${max}?json`);
    console.log("PART 2", response.data);
  } catch (error) {
    console.log(error);
  }
}
getNumbers(min, max);

// part 3
const requests = [];
for (let i = 0; i < 4; i++) {
  const promise = await axios.get(`http://numbersapi.com/${max - min}?json`); // gets a random answer for the number every time
  requests.push(promise);
}

async function getNumberData(requests) {
  try {
    const responses = await Promise.all(requests);
    console.log("PART 3");
    responses.forEach((response) => {
      console.log(`${response.data.type} - `, response.data.text);
    });
  } catch (error) {
    console.log(error);
  }
}
getNumberData(request);
