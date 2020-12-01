export interface IPerson {
  /**
   * The name of the person.
   */
  name: string;
  /**
   * The fiance of the person.
   */
  fiance: IPerson;
  /**
   * Existing marriage canidates for the person.
   */
  candidates: IPerson[];
  /**
   * Returns the the rank of a given individual amoungst
   * the person's existing canidates.
   *
   * @param individual
   */
  rank: (individual: IPerson) => {};
  /**
   * Returns if the person prefers an incoming individual
   * or it's current fiance.
   *
   * @param individual
   */
  prefers: (individual: IPerson) => {};
  /**
   * Returns the next avaible canidate.
   */
  nextCandidate: () => any;
  /**
   * Engages the person with another individual.
   *
   * @param individual
   */
  engageTo: (individual: IPerson) => void;
  /**
   * Swaps the person's fiance with a different individual.
   *
   * @param individual
   */
  swapWith: (individual: IPerson) => void;
}
