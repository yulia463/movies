import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GlobalErrorComponent } from './global-error.component';
import { ErrorService } from '../../services/error.service';
import { Subject } from 'rxjs';

describe('GlobalErrorComponent', () => {
  let component: GlobalErrorComponent;
  let fixture: ComponentFixture<GlobalErrorComponent>;
  let errorServiceMock: jasmine.SpyObj<ErrorService>;
  let errorSubject: Subject<string>;

  beforeEach(async () => {
    errorSubject = new Subject<string>();
    errorServiceMock = jasmine.createSpyObj('ErrorService', ['handle', 'clear']);
    Object.defineProperty(errorServiceMock, 'error$', { value: errorSubject });

    await TestBed.configureTestingModule({
      declarations: [GlobalErrorComponent],
      providers: [{ provide: ErrorService, useValue: errorServiceMock }]
    }).compileComponents();

    fixture = TestBed.createComponent(GlobalErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have errorService defined', () => {
    expect(component.errorService).toBeDefined();
  });
});
