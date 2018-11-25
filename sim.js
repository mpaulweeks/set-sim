
class Simulator {
  constructor(){
    this.df = new DeckFactory();
    this.checker = new Checker();
  }
  simulate() {
    const deck = this.df.create();
    let pool = [];
    while (pool.length < 12) {
      pool.push(deck.pop());
    }
    let firstSets = this.checker.checkPoolForAllSets(pool);

    let set = null;
    while (true) {
      while (pool.length < 12 && deck.length > 0) {
        pool.push(deck.pop());
      }
      pool = shuffle(pool);
      set = this.checker.checkPoolForSet(pool);
      if (!set && deck.length > 0){
        // go to 15
        pool.push(deck.pop());
        pool.push(deck.pop());
        pool.push(deck.pop());
        pool = shuffle(pool);
        set = this.checker.checkPoolForSet(pool);
      }
      if (!set && deck.length > 0){
        // go to 18
        pool.push(deck.pop());
        pool.push(deck.pop());
        pool.push(deck.pop());
        pool = shuffle(pool);
        set = this.checker.checkPoolForSet(pool);
      }
      if (!set){
        break;
      }
      pool = pool.filter((e, i) => !set.includes(i));
    }
    return {
      firstSets,
      pool,
    };
  }
  simulateMany() {
    let stats = {};
    for (let i = 0; i < 1000; i++){
      const {
        pool,
        firstSets,
      } = this.simulate();
      const sizeKey = 'ended-with-' + pool.length.toString().padStart(2, '0');
      const firstKey = 'first-sets-' + firstSets.length.toString().padStart(2, '0');
      stats = mergeObjs(stats, {
        'total-games': 1,
        [sizeKey]: 1,
        [firstKey]: 1,
        'ended-06-with-triple-set': this.checker.checkTripleInterset(pool) || 0,
      });
    }
    return stats;
  }
}
