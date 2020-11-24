import { share, shareReplay } from 'rxjs/operators'

import { Observable } from 'rxjs'

console.clear()

/**
 * Multi-casting
 */
const o = new Observable((observer) => {
  console.log('making call to server')
  observer.next('THIS IS AN OBSERVABLE1')
  observer.next('THIS IS AN OBSERVABLE2')
}).pipe(
  // shareReplay()
  shareReplay({ refCount: true, bufferSize: 1 })
)

/* const s1 = o.subscribe(console.log)
const s2 = o.subscribe(console.log)
s1.unsubscribe()
s2.unsubscribe()

o.subscribe(console.log)
 */

const sourceObs = new Observable((observer) => {
  console.log('making call to server')
  observer.next('THIS IS AN OBSERVABLE1')
  observer.next('THIS IS AN OBSERVABLE2')
})

const sharedObs = sourceObs.pipe(
  // shareReplay(1)
  share()
)

const sub1 = sourceObs.subscribe(console.log)
const sub2 = sourceObs.subscribe(console.log)

const sub3 = sharedObs.subscribe((res) => console.log('1', res))
const sub4 = sharedObs.subscribe((res) => console.log('2', res))
const sub5 = sharedObs.subscribe((res) => console.log('3', res))