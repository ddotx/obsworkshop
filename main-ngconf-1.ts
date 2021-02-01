import { Observable } from 'rxjs'

/**
 * 1 - First Observable
 */

const p = new Promise((resolve, reject) => {
  console.log('CREATING ASYNC PROMISE')
  resolve('this is a promise')
})

const o = new Observable((observer) => {
  console.log('CREATING SYNC OBS')
  observer.next('this is an observable')
  observer.error('this is an error')
  observer.complete()
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

const subscription = o.subscribe(
  res => {
    // success
    console.log('obs ', res)
  },
  err => {
    // error
    console.error('obs error ', err)
  },
  () => {
    // complete
    console.log('obs completed')
  }
)