async function main() {
  let sim = new Simulator();
  let master = {};
  const percentages = {};
  const domRaw = document.getElementById('output')
  const domPercent = document.getElementById('percent')

  while (true){
    const stats = await runAsync(() => sim.simulateMany());
    master = mergeObjs(master, stats);

    Object.keys(master).forEach(key => {
      if (key.startsWith('ended-with-') || key.startsWith('first-sets-')){
        const value = master[key];
        const percentKey = key;
        const percentValue = getPercent(value, master.total);
        percentages[percentKey] = percentValue;
      }
    });
    percentages['06-with-triple-set'] = getPercent(master['ended-06-with-triple-set'], master['ended-with-06']);

    domRaw.innerHTML = JSON.stringify(master, Object.keys(master).sort(), 2);
    domPercent.innerHTML = JSON.stringify(percentages, Object.keys(percentages).sort(), 2);
  }
}

main();
