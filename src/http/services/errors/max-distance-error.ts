export class MaxDistanceError extends Error {
  constructor() {
    super('You have to be close to the gym (100 meters) to check-in')
  }
}