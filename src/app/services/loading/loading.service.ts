import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  finalize,
  Observable,
  tap,
} from 'rxjs';

@Injectable({
  providedIn: 'any',
})
export class LoadingService {
  private loadingSubject$: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  loading$: Observable<boolean> = this.loadingSubject$.asObservable();

  /**
   * The showLoaderUntilCompleted method displays a loader until
   * an observable<T> is completed.
   * @param observable$ - The observable to track
   * @returns - Observable of the same type <T>
   */
  showLoaderUntilCompleted<T>(observable$: Observable<T>): Observable<T> {
    return observable$.pipe(
      tap(() => this.startLoading()),
      finalize(() => this.stopLoading())
    );
  }

  /**
   * Changes the loading state to true and signals the start of loading.
   * @returns - void
   */
  startLoading() {
    this.loadingSubject$.next(true);
  }

  /**
   * Changes the loading state to false and signals the end of loading.
   * @returns - void
   */
  stopLoading() {
    this.loadingSubject$.next(false);
  }
}
