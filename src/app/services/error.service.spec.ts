
import { TestBed } from '@angular/core/testing';
import { ErrorService } from './error.service';

describe('ErrorService', () => {
  let service: ErrorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ErrorService);
  });

  it('must be created', () => {
    expect(service).toBeTruthy();
  });

  it('should emit an error when calling handle()', (done) => {
    service.error$.subscribe(message => {
      expect(message).toBe('Test error');
      done();
    });
    service.handle('Test error');
  });

  it('should clear the error when clear()', (done) => {
    service.error$.subscribe(message => {
      expect(message).toBe('');
      done();
    });
    service.clear();
  });
});
