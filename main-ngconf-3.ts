import { Observable } from 'rxjs'
import { logBlue, logPink } from './logs'

/**
 * 3 - Eager vs Lazy
 */

const p = window.p = new Promise((resolve, reject) => {
  logBlue('Creating a Promise')
  resolve('this is a promise')
})

const o = window.o = new Observable((observer) => {
  navigator.mediaDevices.getUserMedia()
  logPink('Creating a Observable')
  observer.next('this is an observable')
  // REVIEW: Not executed until someone subscribe
})

p.then(
  res => logBlue(res)
)

o.subscribe(
  res => logPink(res)
)