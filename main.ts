import { Observable, combineLatest, concat, from, interval, merge, of, zip } from 'rxjs';
import { distinctUntilChanged, filter, map, scan, startWith, take } from 'rxjs/operators'

console.clear()

// const isUserLoggedIn = new Observable(o => o.next(false))

const isLoggedIn = of(false, true, {
  id: 1,
  name: 'Dome'
})
//isLoggedIn.subscribe(console.log)

// const o = from([4,5,6])

/* const p = new Promise(res => res('Promise Resolved'))
const o = from(p)
const p2 = o.toPromise().then(console.log) */

//o.subscribe(console.log)

const o2 = of(1, 2, 3, 4)
const o3 = from(o2)
//o3.subscribe(console.log)

const randomNumbers = interval(1000).pipe(
  startWith(0),
  map(num => Math.floor(Math.random() * 10)),
  take(5)
)

const letters = of('a', 'b', 'c')

// randomNumbers.subscribe(console.log)

// merge(letters, randomNumbers).subscribe(console.log, console.log, () => console.log('Complete'))
zip(randomNumbers, letters).subscribe(console.log, console.log, () => console.log('Complete'))
//concat(randomNumbers, letters).subscribe(console.log, console.log, () => console.log('Complete'))
//combineLatest(randomNumbers, letters).subscribe(console.log, console.log, () => console.log('Complete'))

const int = interval(100).pipe(
  filter(num => num % 3 === 0),
  take(5),
  scan((acc, cur) => [...acc, cur], [])
)

// int.subscribe(console.log)

const int2 = interval(1000).pipe(
  // map(num => (num % 10 === 0 ? false : true)),
  map(num => (num % 10 === 0 ? { loggedIn: false } : { loggedIn: true })),
  distinctUntilChanged(
    (prev, curr) => prev.loggedIn === curr.loggedIn
  ) // * if no arg, it work on primitive value only
)

// int2.subscribe(console.log)

const users = of(
  { name: 'Frosty' },
  { name: 'Joe' },
  { name: 'Bravery' },
  { name: 'Lilian' }
)

users.pipe(
  map(user => ({
    name: user.name.toUpperCase()
  }))
).subscribe(console.log)