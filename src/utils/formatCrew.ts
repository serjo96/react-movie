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
    if (crew.job === CrewJob.DIRECTOR) {
      response.director.push(crew);
    }

    if (crew.job === CrewJob.PRODUCER) {
      response.producer.push(crew);
    }

    if (CrewJob.MUSIC === crew.job || CrewJob.ORIGINAL_MUSIC_COMPOSER === crew.job) {
      response.music.push(crew);
    }

    if (crew.job === CrewJob.DIRECTOR_OF_PHOTOGRAPHY) {
      response.directorOfPhotography.push(crew);
    }

    if (crew.department === CrewDepartment.ART) {
      response.art.push(crew);
    }

    if (crew.department === CrewDepartment.WRITING) {
      response.screenplay.push(crew);
    }
  });
  return response;
}
