import { Observable, Subscription, interval } from 'rxjs';
import { first, shareReplay, take } from 'rxjs/operators';

import { share } from 'rxjs/internal/operators';

console.clear();

// See the README.MD for what code we will be writing in this section.
// const promise = new Promise((resolve, reject) => {
//   // some time goes
//   console.log('Creating the Promise')
//   resolve([1, 2, 3])
//   setTimeout(() => resolve([7, 8, 9]), 1000)
// })

const observable = new Observable((observer) => {
  // some time goes
  console.log('Creating the Observable')
  observer.next([4, 5, 6])
  observer.complete()
  //observer.error()
  setTimeout(() => observer.next([7, 8, 9]), 1000)
  setTimeout(() => observer.error('error!!!'), 2000)
})

/* promise.then(result => {
  console.log(result)
}, err => console.log(err))
setTimeout( () => {
  promise.then(result => {
    console.log('second time', result)
  })
}, 4000) */

/* observable.subscribe(result => {
  console.log(result)
},
err => console.log('err', err)) */

// let result: Subscription = observable.subscribe(
//   val => console.log(val), // ? next callback
//   err => console.log(err), // ? error callback
//   () => console.log('Complete') // ? complete callback
// )
// result.unsubscribe();

// observable.subscribe(console.log)

const o = new Observable(observer => {
  console.log("HTTP")
  setTimeout(() => {
    console.log('Did HTTP')
    observer.next(['x', 'y', 'z'])
  }, 1000)

  // }).pipe(share())
})

// o.subscribe(res => console.log('sub1', res))
// o.subscribe(res => console.log('sub2', res))
// o.subscribe(res => console.log('sub3', res))

// const myObs = o.pipe(share())
// myObs.subscribe(res => console.log('sub1-share', res))
// myObs.subscribe(res => console.log('sub2-share', res))
// myObs.subscribe(res => console.log('sub3-share', res))

// interval(1000)
// .pipe(
//   take(5)
// ).subscribe(console.log, console.log, () => console.log('Complete'))

const o2 = new Observable(observer => {

  observer.next(1)
  observer.next(2)
  observer.next(3)

  setTimeout((() => observer.next(4)), 100)

  setTimeout((() => observer.next(5)), 500)

})
  .pipe(share()
    ,
    shareReplay(1))
//.pipe(shareReplay(1))

o2.subscribe((res) => console.log('sub1', res))

o2.subscribe((res) => console.log('sub2!!!!!!', res))

o2.subscribe((res) => console.log('sub3-------------', res))

o2.subscribe((res) => console.log('sub4%%%%-------------', res))