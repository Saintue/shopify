import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { NavigationEnd, Router } from '@angular/router';

const ROUTER_EVENT_TIMOUT = 3000;
const DEFAULT_TOAST_LENGTH = 6000;
const AVERAGE_WORDS_PER_SECOND = 120;

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private keepAfterRouteChange: boolean = false;
  constructor(
    private messageService: MessageService,
    router: Router
  ) {
    router.events.subscribe(event => {
      if (!(event instanceof NavigationEnd)) {
        this.messageService.clear();
        return;
      }
      if (this.keepAfterRouteChange) {
        this.keepAfterRouteChange = false;
        setTimeout(() => {
          messageService.clear();
        }, ROUTER_EVENT_TIMOUT);
        return;
      }
      messageService.clear();
    });
  }

  /**
   * Success method is to fire success toast
   * @param message - toast message as String
   * @param keepAfterRouteChange -  show toast after router change or not
   * @returns - void
   */
  success(message: string, keepAfterRouteChange = false) {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: message,
      life: this.getShowTimeInMilliseconds(message),
    });
    this.keepAfterRouteChange = keepAfterRouteChange;
  }

  /**
   * Error method to fire error taost
   * @param message - toast message as String
   * @param keepAfterRouteChange -  show toast after router change or not
   * @returns - void
   */
  error(message: string,  keepAfterRouteChange = false,) {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: message,
      life: this.getShowTimeInMilliseconds(message),
    });
    this.keepAfterRouteChange = keepAfterRouteChange;
  }

  /**
   * Warn method to fire warn toast
   * @param message - toast message as String
   * @param keepAfterRouteChange - show toast after router change or not
   * @returns - void
   */
  warn(message: string, keepAfterRouteChange = false): void {
    this.messageService.add({
      severity: 'warn',
      summary: 'Warning',
      detail: message,
      life: this.getShowTimeInMilliseconds(message),
    });
    this.keepAfterRouteChange = keepAfterRouteChange;
  }

  /**
   * Info method to fire info toast
   * @param message - toast message as String
   * @param keepAfterRouteChange - show toast after router change or not
   * @returns - void
   */
  info(message: string, keepAfterRouteChange = false): void {
    this.messageService.add({
      severity: 'info',
      summary: 'Info',
      detail: message,
      life: this.getShowTimeInMilliseconds(message),
    });
    this.keepAfterRouteChange = keepAfterRouteChange;
  }

  private getShowTimeInMilliseconds(message: string): number {
    const symbolsLength = Math.floor(message.split(' ').length);
    return DEFAULT_TOAST_LENGTH + symbolsLength / AVERAGE_WORDS_PER_SECOND;
  }
}
