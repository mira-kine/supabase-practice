import {
  getDirectorNames,
  getHighestGrossingMovie,
  getMovieById,
  getMovieByTitle,
  getMovies,
  getMoviesAfter,
  getMoviesWithDirector,
  getOldestMovie,
} from './queries';

test('getMovies should return the list of movies', async () => {
  const resp = await getMovies();
  expect(resp.length).toBe(13);
});

test('getMoviesWithDirector returns movies with director', async () => {
  const resp = await getMoviesWithDirector();
  expect(resp.length).toBe(13);
  expect(resp[0].directors).not.toBe(undefined);
});

test('getDirectorNames returns the list of director names', async () => {
  const resp = await getDirectorNames();
  expect(resp.length).toBe(9);
  expect(resp[0].name).not.toBe(undefined);
  expect(Object.keys(resp[0]).length).toBe(1); // should ONLY return the name
});

test('getMovieById returns a specific movie by ID', async () => {
  const resp = await getMovieById(2);
  expect(resp.title).toBe('Episode V - The Empire Strikes Back');
});

test('getMovieByTitle should match using title', async () => {
  const resp = await getMovieByTitle('Episode V - The Empire Strikes Back');
  expect(resp.id).toBe(2);
});

test('getOldestMovie returns Episode IV', async () => {
  const resp = await getOldestMovie();
  expect(resp.title).toBe('Episode IV - A New Hope');
});

test('getMoviesAfter returns all movies after a certain year', async () => {
  const resp = await getMoviesAfter(2010);
  expect(resp.length).toBe(5);
});

test('getHighestGrossingMovie returns the movie with the highest box_office amount', async () => {
  const resp = await getHighestGrossingMovie();
  expect(resp.title).toBe('Star Wars: The Force Awakens');
});
