class Card {
  constructor(number, symbol, shading, color){
    this.number = number;
    this.symbol = symbol;
    this.shading = shading;
    this.color = color;
    this.key = (
      1000 * number +
       100 * symbol +
        10 * shading +
         1 * color
    );
    this.display = this.key.toString().padStart(4, '0');
    const symbolHTML = `
      <span class="symbol-${symbol} shading-${shading} color-${color}">
      </span>
    `.repeat(number + 1);
    this.html = `<div class="card">${symbolHTML}</div>`;
  }
}

class DeckFactory {
  constructor(){
    this.baseCards = [];
    for (let n = 0; n < 3; n++){
      for (let s = 0; s < 3; s++){
        for (let d = 0; d < 3; d++){
          for (let c = 0; c < 3; c++){
            this.baseCards.push(new Card(n, s, d, c));
          }
        }
      }
    }
  }
  create() {
    return shuffle(this.baseCards.concat());
  }
}
