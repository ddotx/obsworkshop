import { Observable } from 'rxjs'
import { logBlue, logPink } from './logs'
import { shareReplay } from 'rxjs/operators'

/**
 * 5 - Multi-casting
 * HOT & COLD OBS
 */

const o = window.o = new Observable((observer) => {
  logPink('making call to server')
  observer.next('this is an observable - 1')
  observer.next('this is an observable - 2')
  observer.next('this is an observable - 3')

  let count = 1
  setInterval(() => {
    observer.next('this is an observable # ' + count++)
  }, 10000)
})

const o2 = o.pipe(
  // shareReplay()
  shareReplay({ refCount: true, bufferSize: 1 })
  // NOTE: if ref counted and the ref count drops to zero (without source completion) or if an error occurs, a new subject is created.
  // NOTE: bufferSize === no. of event to replay (latest on observer.next creation)
  // * shareReplay make a singleton obs
  // * shareReplay(x) like a cache x time (hold the value not execute the function)
  // * share() -> not replay
)

o.subscribe(logPink) // -> first sub always got the outcome
o.subscribe(logPink)

// STUB: Try manually subscribing again in the console

// STUB: unsubscribe 2 time and subscribe again

o2.subscribe(logPink)
o2.subscribe(logPink)
// * o2 == sharedObs --> auto subscribe to upstream (o)

// STUB: Late subscribe (use share not replay -> no outcome)
setTimeout(() => {
  o.subscribe(logBlue)
}, 20000) 