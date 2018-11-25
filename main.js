async function main() {
  let sim = new Simulator();
  let master = {};
  const output = document.getElementById('output')

  while (true){
    const stats = await runAsync(() => sim.simulateMany());
    master = mergeObjs(master, stats);

    Object.keys(master).forEach(key => {
      if (key.includes('size-')){
        const value = master[key];
        const percent = getPercent(value, master.total);
        const percentKey = 'percent-' + key.substring(5);
        master[percentKey] = percent;
      }
    });
    master['percent-triple'] = getPercent(master['size-06-triple'], master['size-06']);

    const display = JSON.stringify(master, Object.keys(master).sort(), 2);
    output.innerHTML = display;
  }
}

main();
