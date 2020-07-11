import './styles.scss';
import { fromEvent, BehaviorSubject, combineLatest, of, merge } from 'rxjs';
import { fromFetch } from 'rxjs/fetch';
import { map, switchMap, take, withLatestFrom, debounceTime, catchError, tap, shareReplay } from 'rxjs/operators';
import { GIPHY_API_KEY } from './constants';
import { elements } from './elements';

const searchTermChange$ = fromEvent(elements.search, 'keyup').pipe(
    map(event => (event.target as HTMLInputElement).value)
)
const limitLowClick$ = fromEvent(elements.limits.low, 'click');
const limitMidClick$ = fromEvent(elements.limits.mid, 'click');
const limitHighClick$ = fromEvent(elements.limits.high, 'click');
const prevPageClick$ = fromEvent(elements.prevPage, 'click');
const nextPageClick$ = fromEvent(elements.nextPage, 'click');

const DEFAULT_SEARCH = 'HI';
const DEFAULT_LIMIT = 10;
const DEFAULT_PAGE = 0;

const search$ = new BehaviorSubject(DEFAULT_SEARCH)
const limit$ = new BehaviorSubject(DEFAULT_LIMIT)
const page$ = new BehaviorSubject(DEFAULT_PAGE)


// REVIEW compare with of()
of(1,2,3).pipe(
    shareReplay(1)
).subscribe(console.log, console.error, () => console.log('complete'))



const userPage$ = page$.pipe(map(val => val + 1))
const totalResults$ = new BehaviorSubject(0)
const totalPages$ = combineLatest(totalResults$, limit$).pipe(
    map(([totalResults, limit]) => Math.ceil(totalResults / limit))
)

// @ts-ignore
window._ = {search$, limit$, page$}

const changes$ = combineLatest(search$, limit$, page$)

/* const changes$ = combineLatest(search$, limit$).pipe(
    withLatestFrom(page$),
    map(([[search, limit], page]) => [search, limit, page])
) */

/* const gifsData$ = fromFetch(
    // prettier-ignore
    `https://api.giphy.com/v1/gifs/search?q=${DEFAULT_SEARCH}&offset=${DEFAULT_PAGE * DEFAULT_LIMIT}&limit=${DEFAULT_LIMIT}&api_key=${GIPHY_API_KEY}`,
).pipe(
    // fetch returns a response, and we have to switch to the .json call
    // map(resPromise => resPromise.json()) // ! convert Promise to Obs with switchMap
    switchMap(response => response.json()),
); */

const gifsData$ = changes$.pipe(
    debounceTime(200),

 /*    switchMap(values => {
        return fromFetch('myserver.com', {method: 'POST', body: {search: values[0]}}).pipe(
            switchMap(res => of(values),
            // catchError(err => )
        ))
    }), */ 

    switchMap(([search, limit, page]) => {
        return fromFetch(
            `https://api.giphy.com/v1/gifs/search?q=${search}&offset=${page * limit}&limit=${limit}&api_key=${GIPHY_API_KEY}`,
        )
    }),
    // fetch returns a response, and we have to switch to the .json call
    // map(resPromise => resPromise.json()) // ! convert Promise to Obs with switchMap
    switchMap(response => response.json()),
    tap(console.log),
    tap(res => totalResults$.next(res.pagination.total_count))
    /* catchError((err) => {
        // Handle errors and return new observable
    }) */
);

// gifsData$.subscribe(console.log)



// ANCHOR: vvv________VIEW__________vvv === === ===

// Remove just the gifs data from the response
const gifs$ = gifsData$.pipe(map(data => data.data));

gifs$.subscribe(gifs => {
    // Clear out all gifs
    elements.gifContainer.innerHTML = '';

    // Create new gifs and add to DOM
    gifs.forEach(gif => {
        const img = document.createElement('img');
        img.src = gif.images.fixed_height_small.url;
        elements.gifContainer.appendChild(img);
    });
});

// * Wire up DOM to BehaviorSubjects
// searchTermChange$.subscribe(value => search$.next(value))
searchTermChange$.pipe(
    tap(value => search$.next(value))
).subscribe()

search$.pipe(
    tap(val => (elements.search as HTMLInputElement).value = val)
).subscribe()

totalResults$.pipe(
    tap(val => (elements.totalResults.innerHTML) = val.toString())
).subscribe() 

totalPages$.subscribe(pages => (elements.totalPages.innerHTML) = pages.toString())

userPage$.subscribe(page => {
    (elements.pageNum.innerHTML) = page.toString();
    /* if(page === 1) {
        elements.prevPage.setAttribute('disabled', 'true')
    } else {
        elements.prevPage.removeAttribute('disabled')
    } */
})

combineLatest(totalPages$, userPage$)
.subscribe(
    ([total, userPage]) => {
        elements.prevPage.removeAttribute('disabled')
        elements.nextPage.removeAttribute('disabled')
        if(userPage === 1) {
            elements.prevPage.setAttribute('disabled', 'true')
        }
        if(userPage === total) {
            elements.nextPage.setAttribute('disabled', 'true')
        }
    }
)

merge(limitLowClick$, limitMidClick$, limitHighClick$).subscribe(e => {
    const target = e.target as HTMLButtonElement;
    const value = target.innerHTML;
    limit$.next(parseInt(value, 10))
})

limit$.subscribe(limit => {
    [elements.limits.low, elements.limits.mid, elements.limits.high].forEach(
        button => {
            if (button.innerHTML === `${limit}`) {
                button.setAttribute('disabled', 'true')
            } else {
                button.removeAttribute('disabled')
            }
        }
    )
})

prevPageClick$.subscribe(() => {
    // ? Reactive Circuit
    /* let sub = page$.pipe(take(1)).subscribe(page => {
        page$.next(page - 1) // ! infinite loop => take 1
    }) */

    const currentPage = page$.getValue()
    page$.next(currentPage - 1)
})

nextPageClick$.subscribe(() => {
    const currentPage = page$.getValue()
    page$.next(currentPage + 1)
})


/* [
    searchTermChange$.pipe(tap(value => search$.next(value))),
    search$.pipe(tap(val => elements.search.value = val)),
    totalResults$.pipe(tap(val => elements.totalResults.innerHTML = val))
].forEach(o => o.subscribe()) */
