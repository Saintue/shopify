import { TestBed } from '@angular/core/testing';

import { ProductEditorService } from './product-editor.service';

describe('ProductEditorService', () => {
  let service: ProductEditorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductEditorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
