
class Simulator {
  constructor(){
    this.df = new DeckFactory();
    this.checker = new Checker();
  }
  simulate() {
    const deck = this.df.create();
    let pool = [];
    let set = null;
    while (true) {
      while (pool.length < 12 && deck.length > 0) {
        pool.push(deck.pop());
      }
      pool = shuffle(pool);
      set = this.checker.checkCards(pool);
      if (!set && deck.length > 0){
        // go to 15
        pool.push(deck.pop());
        pool.push(deck.pop());
        pool.push(deck.pop());
        pool = shuffle(pool);
        set = this.checker.checkCards(pool);
      }
      if (!set && deck.length > 0){
        // go to 18
        pool.push(deck.pop());
        pool.push(deck.pop());
        pool.push(deck.pop());
        pool = shuffle(pool);
        set = this.checker.checkCards(pool);
      }
      if (!set){
        break;
      }
      pool = pool.filter((e, i) => !set.includes(i));
    }
    return pool;
  }
  simulateMany() {
    let stats = {};
    for (let i = 0; i < 1000; i++){
      const pool = this.simulate();
      const sizeKey = 'size-' + pool.length.toString().padStart(2, '0');;
      stats = mergeObjs(stats, {
        total: 1,
        [sizeKey]: 1,
        'size-06-triple': this.checker.checkTripleInterset(pool) || 0,
      });
    }
    return stats;
  }
}
