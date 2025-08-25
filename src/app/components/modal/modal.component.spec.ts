import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ModalComponent } from './modal.component';
import { ModalService } from '../../services/modal.service';

describe('ModalComponent', () => {
  let fixture: ComponentFixture<ModalComponent>;
  let component: ModalComponent;
  let modalServiceMock: jasmine.SpyObj<ModalService>;

  beforeEach(async () => {
    modalServiceMock = jasmine.createSpyObj('ModalService', ['open', 'close']);

    await TestBed.configureTestingModule({
      declarations: [ModalComponent],
      providers: [{ provide: ModalService, useValue: modalServiceMock }],
      schemas: [NO_ERRORS_SCHEMA],
    })
      .overrideComponent(ModalComponent, { set: { template: '' } })
      .compileComponents();

    fixture = TestBed.createComponent(ModalComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should accept @Input() title and movie', () => {
    const testTitle = 'Test Modal';
    const testMovie = { id: 1, title: 'The Matrix' };

    component.title = testTitle;
    component.movie = testMovie;

    fixture.detectChanges();

    expect(component.title).toBe(testTitle);
    expect(component.movie).toBe(testMovie);
  });

  it('should have ModalService injected', () => {
    expect(component.modalService).toBe(modalServiceMock);
  });
});
