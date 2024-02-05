// testing promises with numbers API and deck of cards API

let min = Math.floor(Math.random() * 10);
let max = Math.floor(Math.random() * 10);

if (max < min) {
  let temp = min;
  min = max;
  max = temp;
}

// part 2
axios
  .get(`http://numbersapi.com/${min}..${max}?json`)
  .then((response) => {
    console.log("PART 2", response.data);
  })
  .catch((error) => {
    console.log(error);
  });

// part 3
const requests = [];
for (let i = 0; i < 4; i++) {
  response = axios.get(`http://numbersapi.com/${max - min}?json`);
  requests.push(response);
}

Promise.all(requests)
  .then((responses) => {
    console.log("PART 3");
    responses.forEach((response) => {
      console.log(`${response.data.type} - `, response.data.text);
    });
  })
  .catch((error) => {
    console.log(error);
  });
