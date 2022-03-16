interface NavLinkData {
    href: string;
    icon: string;
    title: string;
    keyTitle: string;
}

export const moviesLinks = (): Array<NavLinkData> => {
  return [
    {
      href: '/movies/all',
      title: 'Все фильмы',
      keyTitle: 'all',
      icon: 'fa-fire'
    },
    {
      href: '/movies/upcoming',
      title: 'Ожидаемые фильмы',
      keyTitle: 'upcoming',
      icon: 'fa-calendar'
    },
    {
      href: '/movies/playing',
      title: 'Фильмы в кино',
      keyTitle: 'playing',
      icon: 'fa-ticket'
    }
  ];
};

export const serialsLinks = (): Array<NavLinkData> => {
  return [
    {
      href: '/tv/all',
      title: 'Все сериалы',
      keyTitle: 'all',
      icon: 'fa-fire'
    },
    {
      href: '/tv/airing',
      title: 'Сериалы на тв',
      keyTitle: 'airing',
      icon: 'fa-calendar'
    },
    {
      href: '/tv/onAir',
      title: 'Текущие сериалы',
      keyTitle: 'onAir',
      icon: 'fa-play-circle-o'
    },
    {
      href: '/tv/top',
      title: 'Топ сериалы',
      keyTitle: 'top',
      icon: 'fa-arrow-circle-up'
    }
  ];
};
