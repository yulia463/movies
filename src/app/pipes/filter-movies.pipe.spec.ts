import { FilterMoviesPipe } from './filter-movies.pipe';
import { IMovie } from 'src/app/models/movie';

describe('FilterMoviesPipe', () => {
  let pipe: FilterMoviesPipe;
  const movies: IMovie[] = [
    {
      id: 1,
      title: 'Inception',
      overview: 'Overview 1',
      poster_path: '/poster1.jpg',
      release_date: '2023-01-01',
      vote_average: 8.8,
      genre_ids: []
    },
    {
      id: 2,
      title: 'Interstellar',
      overview: 'Overview 2',
      poster_path: '/poster2.jpg',
      release_date: '2023-02-01',
      vote_average: 9.0,
      genre_ids: []
    },
    {
      id: 3,
      title: 'Dune',
      overview: 'Overview 3',
      poster_path: '/poster3.jpg',
      release_date: '2023-03-01',
      vote_average: 8.5,
      genre_ids: []
    },
  ];

  beforeEach(() => {
    pipe = new FilterMoviesPipe();
  });

  it('should create pipe', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return all movies if search string is empty', () => {
    expect(pipe.transform(movies, '')).toEqual(movies);
  });

  it('should filter movies by title', () => {
    const result = pipe.transform(movies, 'Incep');
    expect(result.length).toBe(1);
    expect(result[0].title).toBe('Inception');
  });

  it('should be case insensitive', () => {
    const result = pipe.transform(movies, 'INTERSTELLAR');
    expect(result.length).toBe(1);
    expect(result[0].title).toBe('Interstellar');
  });
});
