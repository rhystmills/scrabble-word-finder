const bag = {
  bagContents: {
    E: 12,
    A: 9,
    I: 8,
    O: 8,
    N: 6,
    R: 6,
    T: 6,
    L: 4,
    S: 4,
    U: 4,
    D: 4,
    G: 3,
    B: 2,
    C: 2,
    M: 2,
    P: 2,
    F: 2,
    H: 2,
    V: 2,
    W: 2,
    Y: 2,
    K: 1,
    J: 1,
    X: 1,
    Q: 1,
    Z: 1
  },

  createBag: function(contents) {
    let string = "";
    let keys = Object.keys(contents);
    for (let i=0; i<keys.length; i++){
      string = string + bag.numLetters(keys[i],contents[keys[i]]);
    }
    return string;
  },

  numLetters: function(letter,num){
    let string = "";
    for (let i=0; i<num; i++){
      string = string + letter;
    }
    return string;
  }
}

export default bag;
