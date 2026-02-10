import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RickService {

  private url = 'https://rickandmortyapi.com/graphql';

  constructor(private http: HttpClient) {}

  getEpisodes() {
    return this.http.post<any>(this.url, {
      query: `
        query {
          episodes(page: 1) {
            results {
              id
              name
              episode
              air_date
            }
          }
        }
      `
    });
  }

  getEpisodeDetail(id: string) {
    return this.http.post<any>(this.url, {
      query: `
        query ($id: ID!) {
          episode(id: $id) {
            id
            name
            episode
            air_date
            characters {
              id
              name
              status
              species
              image
            }
          }
        }
      `,
      variables: { id }
    });
  }
}
