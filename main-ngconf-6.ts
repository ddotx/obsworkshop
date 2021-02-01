import { Observable, interval } from 'rxjs'
import { logBlue, logPink } from './logs'
import { startWith, filter, map, take, first } from 'rxjs/operators'


/**
 * 6 - Chaining
 */

const getRandomNumber = () => Math.round(Math.random() * 100)

const o = new Observable((observer) => {

  setInterval(() => {
    observer.next(getRandomNumber())
  }, 1000) // run forever

}).pipe(
  startWith(getRandomNumber()),
  filter(val => val < 50),
  map(val => val * val),
  filter(val => val > 500),
  map(val => Math.sqrt(val)),
  take(4), // make obs stream completed
  first()
)

o.subscribe(logPink, () => { }, () => console.log('DONE'))

/* const firstFour = o.pipe(
  take(4)
)

firstFour.subscribe(logPink, () => { }, () => console.log('DONE')) */

// === === ===

/* const getFirstN = (num: number) => {
  return o.pipe(take(num))
}

getFirstN(4).subscribe(logPink, () => { }, () => console.log('DONE')) */

const obs = interval(1000) // Creator Function
  .pipe(
    map(num => getRandomNumber()),
    filter(val => val < 50),
    map(val => val * val),
    map(val => Math.sqrt(val)),
  )

obs.subscribe(logPink, () => { }, () => console.log('DONE'))