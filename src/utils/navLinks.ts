interface NavLinkData {
    href: string;
    icon: string;
    title: string;
}

export const moviesLinks = (): Array<NavLinkData> => {
  return [
    {
      href: '/movies/all',
      title: 'Все фильмы',
      icon: 'fa-fire'
    },
    {
      href: '/movies/upcoming',
      title: 'Ожидаемые фильмы',
      icon: 'fa-calendar'
    },
    {
      href: '/movies/playing',
      title: 'Фильмы в кино',
      icon: 'fa-ticket'
    }
  ];
};

export const serialsLinks = (): Array<NavLinkData> => {
  return [
    {
      href: '/tv/all',
      title: 'Все сериалы',
      icon: 'fa-fire'
    },
    {
      href: '/tv/airing',
      title: 'Сериалы на тв',
      icon: 'fa-calendar'
    },
    {
      href: '/tv/onAir',
      title: 'Текущие сериалы',
      icon: 'fa-play-circle-o'
    },
    {
      href: '/tv/top',
      title: 'Топ сериалы',
      icon: 'fa-arrow-circle-up'
    }
  ];
};
