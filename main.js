function displayMaster(master){
  const actual = {...master};
  const percentages = {};
  Object.keys(actual).forEach(key => {
    const value = actual[key];
    const percentKey = key;
    const percentValue = getPercent(value, actual['total-games']);
    percentages[percentKey] = percentValue;
  });
  delete percentages['ended-06-with-triple-set'];

  // calc 06 triple of 06's
  actual['06-with-triple-set'] = actual['ended-06-with-triple-set'];
  percentages['06-with-triple-set'] = getPercent(actual['ended-06-with-triple-set'], actual['ended-with-06']);

  const keys = Object.keys(percentages).sort();
  document.getElementById('stats').innerHTML = keys.map(key => `
    <tr>
      <td>${key.split('-').join(' ')}</td>
      <td>${percentages[key] || ''}</td>
      <td>${actual[key] || ''}</td>
    </tr>
  `).join('');
}

async function main() {
  let sim = new Simulator();
  let master = {};

  while (true){
    const stats = await runAsync(() => sim.simulateMany());
    master = mergeObjs(master, stats);
    displayMaster(master);
  }
}

main();
