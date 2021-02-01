import { Observable, Subscription } from 'rxjs'
import { logBlue, logPink } from './logs'

/**
 * 4 - Cancelable
 */

const p = new Promise((resolve, reject) => {
  logBlue('Creating a Promise')
  resolve('this is a promise')
})

const o = new Observable((observer) => {
  // STUB: HTTP Call
  setTimeout(() => {
    observer.next('this is an observable')
  }, 1000)

})

p.then(
  res => logBlue(res)
)

const sub: Subscription = o.subscribe(
  res => logPink(res)
)

setTimeout(() => {
  sub.unsubscribe()
}, 999)