import { checkError, client } from './client.js';
export async function getMovies() {
  const resp = await client.from('movies').select('*');
  return checkError(resp);
}

export async function getMoviesWithDirector() {
  const resp = await client.from('movies').select('*, directors (*)');
  return checkError(resp);
}

export async function getDirectorNames() {
  // return the list of the director's names
  const resp = await client.from('directors').select('name');
  return checkError(resp);
}

export async function getMovieById(id) {
  // return the movie with the given id
  const resp = await client.from('movies').select('*').match({ id }).single();
  return checkError(resp);
}

export async function getMovieByTitle(title) {
  // return the movie with the given title
  const resp = await client.from('movies').select('*').match({ title }).single();
  return checkError(resp);
}

export async function getOldestMovie() {
  // return the oldest movie (assume the database is not sorted)
  const { data, error } = await client.from('movies').select('*').order('year').limit(1).single();
  return data;
}

export async function getMoviesAfter(year) {
  // return movies made after the year passed in
  const resp = await client.from('movies').select('*').gt('year', year);
  return checkError(resp);
}

export async function getHighestGrossingMovie() {
  // return movie with the highest box office total
  // const resp = await client.from('movies').select('*').eq('box_office', '2069').single();
  const { data, error } = await client
    .from('movies')
    .select('*')
    .order('box_office', { ascending: false })
    .limit(1)
    .single();
  return data;
}
