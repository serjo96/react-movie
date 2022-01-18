import { Crew, CrewDepartment, CrewJob } from '~/core/types/crew';
import { CrewState } from '~/store/movies/movies.slice';

export function formatCrew (crewData: Crew[]): CrewState {
  const response: CrewState = {
    director: [],
    screenplay: [],
    producer: [],
    directorOfPhotography: [],
    music: [],
    art: []
  };

  crewData.forEach(crew => {
    switch (crew.job || crew.department) {
      case CrewJob.DIRECTOR:
        response.director.push(crew);
        break;

      case CrewJob.PRODUCER:
        response.producer.push(crew);
        break;

      case CrewJob.MUSIC || CrewJob.ORIGINAL_MUSIC_COMPOSER:
        response.music.push(crew);
        break;

      case CrewJob.DIRECTOR_OF_PHOTOGRAPHY:
        response.directorOfPhotography.push(crew);
        break;

      case CrewDepartment.ART:
        response.art.push(crew);
        break;

      case CrewDepartment.WRITING:
        response.screenplay.push(crew);
        break;
    }
  });
  return response;
}
