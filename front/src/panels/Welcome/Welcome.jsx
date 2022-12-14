import { Panel } from '@vkontakte/vkui';
import React, { useEffect } from 'react';
import { PAGE_HOME, PAGE_MAIN, router } from '../../router';
import bridge from '@vkontakte/vk-bridge';

import WelcomeIcon from './../../img/Welcome.svg';

import './Welcome.css';

const Welcome = ({ id }) => {
  useEffect(() => {
    async function fetchData() {
      const user = await bridge.send('VKWebAppGetUserInfo');
      console.log(user);
      await bridge
        .send('VKWebAppStorageGet', {
          keys: ['as'],
        })
        .then((data) => {
          if (data.keys[0].value === 'true') {
            console.log('Данные получены');
            setTimeout(() => {
              router.pushPage(PAGE_HOME);
            }, 3200);
          } else {
            setTimeout(() => {
              router.pushPage(PAGE_MAIN);
            }, 3200);
          }
        });
    }
    fetchData();
  }, []);

  return (
    <Panel id={id}>
      <div className="welcome">
        <div className="welcome-content">
          <img className="welcome__icon" src={WelcomeIcon} alt="Welcome" />
          <h1 className="welcome__title">Student Exchange</h1>
        </div>
      </div>
    </Panel>
  );
};

export default Welcome;
