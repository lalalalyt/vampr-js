class Vampire {
  constructor(name, yearConverted) {
    this.name = name;
    this.yearConverted = yearConverted;
    this.offspring = [];
    this.creator = null;
  }

  /** Simple tree methods **/

  // Adds the vampire as an offspring of this vampire
  addOffspring(vampire) {
    this.offspring.push(vampire);
    vampire.creator = this;
  }

  // Returns the total number of vampires created by that vampire
  get numberOfOffspring() {
    return this.offspring.length;
  }

  // Returns the number of vampires away from the original vampire this vampire is
  get numberOfVampiresFromOriginal() {
    let numberOfAncester = 0;
    let currentVampire = this;
    while (currentVampire.creator) {
      currentVampire = currentVampire.creator;
      numberOfAncester++;
    }
    return numberOfAncester;
  }

  // Returns true if this vampire is more senior than the other vampire. (Who is closer to the original vampire)
  isMoreSeniorThan(vampire) {
    if (
      this.numberOfVampiresFromOriginal < vampire.numberOfVampiresFromOriginal
    ) {
      return true;
    } else {
      return false;
    }
  }

  /** Stretch **/

  // Returns the closest common ancestor of two vampires.
  // The closest common anscestor should be the more senior vampire if a direct ancestor is used.
  // For example:
  // * when comparing Ansel and Sarah, Ansel is the closest common anscestor.
  // * when comparing Ansel and Andrew, Ansel is the closest common anscestor.
  get listOfAncestor() {
    let ancestor = [];
    let currentVampire = this;
    while (currentVampire.creator) {
      ancestor.push(currentVampire.creator);
      currentVampire = currentVampire.creator;
    }
    return ancestor;
  }

  closestCommonAncestor(vampire) {
    if (!vampire.creator) {
      return vampire;
    }
    if (!this.creator) {
      return this;
    }
    if (this.name === vampire.name) {
      return this;
    }
    for (let ancestor1 of this.listOfAncestor) {
      if (ancestor1.name === vampire.name) {
        return vampire;
      }
      for (let ancestor2 of vampire.listOfAncestor) {
        if (ancestor2.name === this.name) {
          return this;
        }
        if (ancestor1.name === ancestor2.name) {
          return ancestor1;
        }
      }
    }
  }
}

module.exports = Vampire;
