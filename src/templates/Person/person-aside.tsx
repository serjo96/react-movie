import React from 'react';
import { Timeline } from 'react-twitter-widgets';
import Image from '~/ui-components/image/image';
import './person-aside.sass';

interface MyProps {
  profileImg: string;
  twitterId?: string;
}

export default function PersonAside ({
  profileImg,
  twitterId
}: MyProps) {
  return (
    <div className='person-aside'>
      <div className='person-photo'>
        <Image
          src={profileImg}
          alt='profile photo'
        />
      </div>
      {twitterId &&
        <Timeline
          dataSource={{
            sourceType: 'profile',
            screenName: twitterId
          }}
          options={{
            username: 'TwitterDev',
            theme: 'dark',
            transparent: true,
            tweetLimit: 10,
            slug: 'official-twitter-accts',
            chrome: ['transparent', 'noborders']
          }}
        />}
    </div>
  );
}
