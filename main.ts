import { combineLatest, interval, merge, of, } from 'rxjs'
import { map, scan, share, take, tap } from 'rxjs/operators'

console.clear()



const randomNumbers = interval(3000)
  .pipe(
    tap(() => console.log('check')),
    map(number => Math.round(Math.random() + number)),
    //share()
  )




const letter = of('A', 'B', 'C', 'D')



randomNumbers.subscribe(console.log)

randomNumbers.subscribe(console.log)

//letter.subscribe(
//)

// combineLatest(randomNumbers, letter).subscribe(console.log)
//combineLatest(letter, randomNumbers).subscribe(console.log)
//merge(randomNumbers, letter).subscribe(console.log)
//merge(letter, randomNumbers).subscribe(console.log)