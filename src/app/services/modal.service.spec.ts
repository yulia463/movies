import { TestBed } from '@angular/core/testing';
import { ModalService } from './modal.service';
import { skip, take } from 'rxjs/operators';

describe('ModalService', () => {
  let service: ModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should open', (done) => {
    service.isVisible$.pipe(skip(1), take(1)).subscribe(value => {
      expect(value).toBeTrue();
      done();
    });
    service.open();
  });

  it('should close', (done) => {
    service.open();

    service.isVisible$.pipe(skip(1), take(1)).subscribe(value => {
      expect(value).toBeFalse();
      done();
    });

    service.close();
  });
});
