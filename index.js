const input_div = document.querySelector("#input_div");
const output_text = document.querySelector("#output_text");
const output_div = document.querySelector("#output_div");

const input = [0, 4, 0, 0, 0, 6, 0, 6, 4, 0];

function findWater(input) {
  const len = input.length;
  const leftArr = [];

  leftArr.push(input[0]);
  for (let i = 1; i < len; i++) {
    leftArr.push(Math.max(leftArr[i - 1], input[i]));
  }

  const revArr = input.reverse();
  const tempRightArr = [];
  tempRightArr.push(revArr[0]);
  for (let i = 1; i < len; i++) {
    tempRightArr.push(Math.max(tempRightArr[i - 1], revArr[i]));
  }

  const rightArr = tempRightArr.reverse();
  input.reverse();

  const result = [];
  for (let i = 0; i < len; i++) {
    result.push(Math.min(leftArr[i], rightArr[i]) - input[i]);
  }

  return result;
}

const result = findWater(input);

// Input Div
const input_barArr = [];
const input_id = [];
for (let i = 0; i < input.length; i++) {
  if (input[i] === 0 && result[i] === 0) {
    input_barArr.push(0);
    input_id.push("");
  } else {
    if (input[i] !== 0) {
      input_barArr.push(input[i]);
      input_id.push("wall");
      continue;
    }
    if (result[i] !== 0) {
      input_barArr.push(result[i]);
      input_id.push("water");
      continue;
    }
  }
}

for (let i = 0; i < input_barArr.length; i++) {
  displayInput(input_barArr[i], input_id[i]);
}

function displayInput(height, id) {
  input_div.innerHTML += `
      <div class="tank">
          <div class="bar" id="${id}" style="height: ${height * 10}%;"></div>
      </div>
      `;
}

// Output Text
output_text.innerText = `${result.reduce(
  (accum, val) => (accum += val),
  0
)} Units`;

// Output Div
for (let i = 0; i < result.length; i++) {
  displayOutput(result[i]);
}

function displayOutput(data) {
  output_div.innerHTML += `
    <div class="tank">
        <div class="bar" id="water" style="height: ${data * 10}%;"></div>
    </div>
    `;
}
