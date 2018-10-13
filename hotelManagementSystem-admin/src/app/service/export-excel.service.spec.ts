import { TestBed, inject } from '@angular/core/testing';

import { ExportExcelService } from './export-excel.service';

describe('ExportExcelService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ExportExcelService]
    });
  });

  it('should be created', inject([ExportExcelService], (service: ExportExcelService) => {
    expect(service).toBeTruthy();
  }));
});
