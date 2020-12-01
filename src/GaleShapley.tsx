import { IPerson } from "./GaleSharpley.types";

/**
 * Determines if a relationship is stable by comparing canidates.
 *
 * @param men
 * @param women
 */
const isRelationshipStable = (men: IPerson[], women: IPerson[]) => {
  for (let i = 0; i < men.length; i++) {
    for (let j = 0; i < women.length; j++) {
      if (men[i].prefers(women[j]) && women[j].prefers(men[i])) {
        return false;
      }
      return true;
    }
  }
};

/**
 * Engages a potential canidates.
 *
 * @param men
 */
const engage = (men: IPerson[]) => {
  for (var i = 0; i < men.length; i++) {
    const man = men[i];
    if (!man.fiance) {
      const girl = man.nextCandidate();
      if (!girl?.fiance || girl.prefers(man)) {
        man.engageTo(girl);
      }
      engage(men);
    }
  }
};

/**
 * Creates a new person for the stable marriage problem.
 *
 * @param name
 */
export const person = (name: string): IPerson => {
  let index = 0;
  let fiance: IPerson = {};
  let candidates: IPerson[] = [];

  return {
    name,
    fiance,
    candidates,
    rank: (individual: IPerson) => {
      for (let i = 0; i < candidates.length; i++) {
        if (candidates[i] === individual) {
          return i;
        }
      }
      return candidates.length + 1;
    },

    prefers: (individual: IPerson) => {
      if (fiance) {
        // BUG
        return rank(individual) < rank(fiance);
      }
      return true;
    },

    nextCandidate: () => {
      if (index >= candidates.length) {
        return null;
      }
      return candidates[index++];
    },

    // BUG: individual.fiance shouldn't be assigned to person.
    engageTo: (individual: IPerson) => {
      if (individual.fiance) {
        individual.fiance.fiance = null;
      }
      if (fiance) {
        fiance.fiance = null;
      }
      individual.fiance = person;
      fiance = individual;
    },

    swapWith: (individual: any) => {
      console.log("%s & %s swap partners", name, individual.name);
      const thisFiance = fiance;
      const individualFiance = individual.fiance;
      // BUG
      person.engageTo(individualFiance);
      individual.engageTo(thisFiance);
    }
  };
};

export function doMarriage() {
  // Initialize people
  const abe = person("Abe");
  const bob = person("Bob");
  const col = person("Col");
  const dan = person("Dan");
  const ed = person("Ed");
  const fred = person("Fred");
  const gav = person("Gav");
  const hal = person("Hal");
  const ian = person("Ian");
  const jon = person("Jon");
  const abi = person("Abi");
  const bea = person("Bea");
  const cath = person("Cath");
  const dee = person("Dee");
  const eve = person("Eve");
  const fay = person("Fay");
  const gal = person("tim");
  const hope = person("Hope");
  const ivy = person("Ivy");
  const jan = person("Jan");

  // Set up the potential canidates.
  abe.candidates = [abi, eve, cath, ivy, jan, dee, fay, bea, hope, gal];
  bob.candidates = [cath, hope, abi, dee, eve, fay, bea, jan, ivy, gal];
  col.candidates = [hope, eve, abi, dee, bea, fay, ivy, gal, cath, jan];
  dan.candidates = [ivy, fay, dee, gal, hope, eve, jan, bea, cath, abi];
  ed.candidates = [jan, dee, bea, cath, fay, eve, abi, ivy, hope, gal];
  fred.candidates = [bea, abi, dee, gal, eve, ivy, cath, jan, hope, fay];
  gav.candidates = [gal, eve, ivy, bea, cath, abi, dee, hope, jan, fay];
  hal.candidates = [abi, eve, hope, fay, ivy, cath, jan, bea, gal, dee];
  ian.candidates = [hope, cath, dee, gal, bea, abi, fay, ivy, jan, eve];
  jon.candidates = [abi, fay, jan, gal, eve, bea, dee, cath, ivy, hope];
  abi.candidates = [bob, fred, jon, gav, ian, abe, dan, ed, col, hal];
  bea.candidates = [bob, abe, col, fred, gav, dan, ian, ed, jon, hal];
  cath.candidates = [fred, bob, ed, gav, hal, col, ian, abe, dan, jon];
  dee.candidates = [fred, jon, col, abe, ian, hal, gav, dan, bob, ed];
  eve.candidates = [jon, hal, fred, dan, abe, gav, col, ed, ian, bob];
  fay.candidates = [bob, abe, ed, ian, jon, dan, fred, gav, col, hal];
  gal.candidates = [jon, gav, hal, fred, bob, abe, col, ed, dan, ian];
  hope.candidates = [gav, jon, bob, abe, ian, dan, hal, ed, col, fred];
  ivy.candidates = [ian, col, hal, gav, fred, bob, abe, ed, jon, dan];
  jan.candidates = [ed, hal, gav, abe, bob, jon, col, ian, fred, dan];

  // List of men and women.
  const men: IPerson[] = [abe, bob, col, dan, ed, fred, gav, hal, ian, jon];
  const women: IPerson[] = [abi, bea, cath, dee, eve, fay, gal, hope, ivy, jan];

  // Engage everyone
  engage(men);

  // Console.log the results:
  for (var i = 0; i < men.length; i++) {
    console.log("%s is engaged to %s", men[i].name, men[i].fiance.name);
  }

  // Check if each relationship is stable
  console.log("Stable = %s", isRelationshipStable(men, women) ? "Yes" : "No");
}
