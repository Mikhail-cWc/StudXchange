import React, { useState, useEffect } from 'react';

import { Panel } from '@vkontakte/vkui';
import { useRouter } from '@happysanta/router';

import { useSelector, useDispatch } from 'react-redux';
import { fetchTasks, setCurrentPage } from '../../redux/slices/taskSlice';

import bellIcon from './../../img/bellIcon.svg';
import filterIcon from './../../img/filterIcon.svg';
import infoIcon from './../../img/infoIcon.svg';
import { Task, Navigation, AddButton, Header, SkeletonCard } from '../../components/';
import { MODAL_FILTER, PAGE_CREATE, PAGE_DEV } from '../../router';

import './Main.css';

const Main = ({ id, go, ROUTES }) => {
  const [buttonActive, setButtonActive] = useState('2');
  const router = useRouter();

  const onClickButton = (e) => {
    setButtonActive(e.target.id);
  };

  const dispatch = useDispatch();

  const tasksData = useSelector((state) => state.tasks.items);
  const status = useSelector((state) => state.tasks.status);
  const currentPage = useSelector((state) => state.tasks.currentPage);
  const firstFetch = useSelector((state) => state.tasks.firstFetch);

  const getTasks = async () => {
    dispatch(fetchTasks(currentPage));
  };

  useEffect(() => {
    if (currentPage < 5) {
      getTasks();
    }
  }, [currentPage]);

  useEffect(() => {
    document.addEventListener('scroll', scrollHandler);
    return function () {
      document.removeEventListener('scroll', scrollHandler);
    };
  }, []);

  const scrollHandler = (e) => {
    if (
      e.target.documentElement.scrollHeight -
        (e.target.documentElement.scrollTop + window.innerHeight) <
      100
    ) {
      dispatch(setCurrentPage());
    }
  };

  return (
    <Panel id={id}>
      <Header>
        <div className="wrapper">
          <div className="search-container">
            <div className="button-box">
              <div id="btn"></div>
              <button
                type="button"
                key={1}
                id={'1'}
                onClick={onClickButton}
                className={
                  buttonActive === '1' ? 'toggle-btn toggle-btn--active' : 'toggle-btn'
                }>
                Главная
              </button>
              <button
                key={2}
                id={'2'}
                onClick={onClickButton}
                type="button"
                className={
                  buttonActive === '2' ? 'toggle-btn toggle-btn--active' : 'toggle-btn'
                }>
                Публикации
              </button>
            </div>
            <div className="search">
              <input type="text" placeholder="Поиск" className="search__input" />
              <img src={bellIcon} alt="search" className="search__info-bell" />
            </div>
            <div className={buttonActive === '1' ? 'filter--hidden' : 'filter'}>
              <img
                onClick={() => router.pushModal(MODAL_FILTER)}
                className="filter__icon"
                src={filterIcon}
                alt="filter"
              />
              <h2
                onClick={() => router.pushModal(MODAL_FILTER)}
                className="filter__title">
                Фильтры
              </h2>
            </div>
          </div>
        </div>
      </Header>
      {buttonActive === '1' ? (
        <div className="content-container">
          <div className="content">
            <div className="create-card">
              <div className="create-card--flex">
                <h1 className="create-card__title">Создай свою публикацию</h1>
                <img className="create-card__img" src={infoIcon} alt="info" />
              </div>
              <button
                onClick={() => router.pushPage(PAGE_DEV)}
                className="button create-card--button">
                Начать
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="content-container">
          <AddButton router={router} createPanel={PAGE_CREATE} />
          <div className="content">
            {firstFetch
              ? [...new Array(6)].map((index) => <SkeletonCard key={index} />)
              : tasksData.map((obj) => (
                  <Task
                    go={go}
                    ROUTES={ROUTES}
                    key={obj.id}
                    title={obj.title}
                    descr={obj.description}
                    dateOrder={obj.orderDate}
                    price={obj.price}
                    id={obj.id}
                  />
                ))}
            {status === 'loading' ? (
              <div>
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
              </div>
            ) : null}
          </div>
        </div>
      )}
      <Navigation />
    </Panel>
  );
};

// [...new Array(6)].map((index) => <SkeletonCard key={index} />

export default Main;
