
class Checker {
  constructor(){
    this.setSolutions = {};
    for (let n = 0; n < 3; n++){
      for (let s = 0; s < 3; s++){
        for (let d = 0; d < 3; d++){
          for (let c = 0; c < 3; c++){
            let soln = (
              3000 * n +
               300 * s +
                30 * d +
                 3 * c
            );
            this.setSolutions[soln] = true;
          }
        }
      }
    }
    this.pairIndexes = [
      [0, 1, 2, 3, 4, 5],
      [0, 1, 2, 4, 3, 5],
      [0, 1, 2, 5, 3, 4],
      [0, 2, 1, 3, 4, 5],
      [0, 2, 1, 4, 3, 5],
      [0, 2, 1, 5, 3, 4],
      [0, 3, 1, 3, 4, 5],
      [0, 3, 1, 4, 2, 5],
      [0, 3, 1, 5, 2, 4],
      [0, 4, 1, 2, 3, 5],
      [0, 4, 1, 3, 2, 5],
      [0, 4, 1, 5, 2, 3],
      [0, 5, 1, 2, 3, 4],
      [0, 5, 1, 3, 2, 4],
      [0, 5, 1, 4, 2, 3],
    ];
  }
  determineThirdAttr(a, b){
    return a === b ? a : (3 - (a + b));
  }
  determineThirdCard(a, b){
    return (
      1000 * this.determineThirdAttr(a.number, b.number) +
       100 * this.determineThirdAttr(a.symbol, b.symbol) +
        10 * this.determineThirdAttr(a.shading, b.shading) +
         1 * this.determineThirdAttr(a.color, b.color)
    );
  }
  checkSet(a, b, c){
    let sum = a.key + b.key + c.key;
    return !!this.setSolutions[sum];
  }
  checkPoolForAllSets(pool, exitEarly){
    let sets = [];
    for (let a = 0; a < pool.length; a++){
      let cardA = pool[a];
      for (let b = a + 1; b < pool.length; b++){
        let cardB = pool[b];
        for (let c = b + 1; c < pool.length; c++){
          let cardC = pool[c];
          const success = this.checkSet(cardA, cardB, cardC);
          if (success){
            sets.push([a, b, c]);
            if (exitEarly) {
              return sets;
            }
          }
        }
      }
    }
    return sets;
  }
  checkPoolForSet(pool){
    return this.checkPoolForAllSets(pool, true)[0];
  }
  checkTripleInterset(pool){
    if (pool.length !== 6){
      return false;
    }
    return this.pairIndexes.some(pairStrat => {
      const third1 = this.determineThirdCard(
        pool[pairStrat[0]], pool[pairStrat[1]]
      );
      const third2 = this.determineThirdCard(
        pool[pairStrat[2]], pool[pairStrat[3]]
      );
      const third3 = this.determineThirdCard(
        pool[pairStrat[4]], pool[pairStrat[5]]
      );
      return (third1 === third2) && (third2 === third3);
    });
  }
}
