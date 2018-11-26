function print(msg){
  document.body.innerHTML += `
    <div>
      ${msg}
    </div>
  `;
}

function shuffle(arr) {
  // https://stackoverflow.com/a/6274381
  var j, x, i;
  for (i = arr.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      x = arr[i];
      arr[i] = arr[j];
      arr[j] = x;
  }
  return arr;
}

function runAsync(func) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(func());
    }, 0);
  });
}

function mergeObjs(a, b){
  const merged = {...a};
  Object.keys(b).forEach(key => {
    merged[key] = (merged[key] || 0) + b[key];
  });
  return merged;
}

function getPercent(numer, denom){
  return (100 * numer / denom).toFixed(10).padStart(13, '0');
}

function displayInterestingPool(pool){
  const html = pool.map(c => c.html).join('');
  document.getElementById('output').innerHTML += `
    <div class="set">${html}</div>
  `;
}
