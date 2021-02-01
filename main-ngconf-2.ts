import { Observable } from 'rxjs'

/**
 * 2 - Single Use vs Multiple Use
 */

const p = new Promise((resolve, reject) => {
  resolve('this is a promise')
  resolve('this is also a promise')
})

const o = new Observable((observer) => {
  observer.next('this is an observable')
  observer.next('this is an also observable')

  // REVIEW: Async
  // XHR, setTimeout, Promised-based API
  let count = 1
  setInterval(() => {
    if (count++ > 3) observer.complete()
    observer.next('this is an observable')
  }, 1000)

})

const p2 = p.then(
  res => {
    // success
    console.log('promise ', res)
  },
  err => {
    // error
    console.error('promise error ', err)
  }
)

const subscription = o.subscribe(console.log, console.error, () => console.log('Completed'))