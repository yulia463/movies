import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MovieComponent } from './movie.component';
import {MoviesService} from "src/app/services/movies.service";
import {ModalService} from "src/app/services/modal.service";
import {IMovie} from "src/app/models/movie";


describe('MovieComponent', () => {
  let fixture: ComponentFixture<MovieComponent>;
  let component: MovieComponent;

  let moviesServiceMock: jasmine.SpyObj<MoviesService>;
  let modalServiceMock: jasmine.SpyObj<ModalService>;

  beforeEach(async () => {
    moviesServiceMock = jasmine.createSpyObj('MoviesService', ['setSelectedMovie']);
    modalServiceMock = jasmine.createSpyObj('ModalService', ['open']);

    await TestBed.configureTestingModule({
      declarations: [MovieComponent],
      providers: [
        { provide: MoviesService, useValue: moviesServiceMock },
        { provide: ModalService, useValue: modalServiceMock },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    })
      .overrideComponent(MovieComponent, { set: { template: '' } })
      .compileComponents();

    fixture = TestBed.createComponent(MovieComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call MoviesService.setSelectedMovie and ModalService.open when handleShowDetailsClick is called', () => {
    const mockMovie: IMovie = {
      id: 1,
      title: 'The Matrix',
      genre_ids: [1, 2],
    } as IMovie;

    component.movie = mockMovie;

    component.handleShowDetailsClick();

    expect(moviesServiceMock.setSelectedMovie).toHaveBeenCalledTimes(1);
    expect(moviesServiceMock.setSelectedMovie).toHaveBeenCalledWith(mockMovie);
    expect(modalServiceMock.open).toHaveBeenCalledTimes(1);
  });
});
