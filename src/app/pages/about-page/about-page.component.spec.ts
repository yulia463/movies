import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AboutPageComponent } from './about-page.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('AboutPageComponent', () => {
  let fixture: ComponentFixture<AboutPageComponent>;
  let component: AboutPageComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AboutPageComponent],
      schemas: [NO_ERRORS_SCHEMA],
    })
      .overrideComponent(AboutPageComponent, { set: { template: '' } })
      .compileComponents();

    fixture = TestBed.createComponent(AboutPageComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
