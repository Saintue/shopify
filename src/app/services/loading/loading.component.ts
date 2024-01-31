import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AsyncPipe, NgClass, NgIf } from '@angular/common';
import { LoadingService } from './loading.service';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'sf-loading-spinner',
  standalone: true,
  imports: [NgClass, NgIf, AsyncPipe, DialogModule],
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoadingComponent {
  constructor(protected loadingService: LoadingService) {}
}
