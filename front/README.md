[<img width="134" src="https://vk.com/images/apps/mini_apps/vk_mini_apps_logo.svg">](https://vk.com/services)

### Основная реализация

- Переход между панелями осуществляется с помощью router от [happysanta](https://github.com/HappySanta/router).
Пример перехода на главную через панель навигации:
```jsx
Navigation.jsx

// Создаем роутер
const router = useRouter();

// Переход на page
const handlePage = (page) => {
    router.pushPage(page);
    setSelected(page);
    console.log(selected);
  };
/*...*/
// При клике на объект осуществляется переход на PAGE_HOME
<TabbarItem
          onClick={() => handlePage(PAGE_HOME)}
          selected={selected === '/home'}
          data-story="main"
          text="Главная">
          <img src={MainIcon} />
</TabbarItem>
/*...*/
// TabbarItem элемент Tabbar, Tabbar - элемент навигации в VK UI
```
- Вывод объявлений:
```tsx
// task.jsx
// Создадим CSS-Класс Task
const Task = ({ title, descr, dateOrder, price, id, go, ROUTES }) => {
  return (
    <div className="content-item">
      <h1 className="content-item__title">{title}</h1>
      <p className="content-item__descr">{descr}</p>
      <div className="content-info">
        <p className="content-info__date">{dateOrder}</p>
        <p className="content-info__price">от {price} </p>
        <button
          onClick={() => router.pushPage(PAGE_RESPOND, { id: id })}
          className="content-info__button">
          Откликнуться
        </button>
      </div>
    </div>
  );
};

// taskSlice.js
// Получим данные
export const fetchTasks = createAsyncThunk(
    'tasks/fetchTasksStatus',
    async (currentPage) => {
        const res = await axios.get(
            `https://635c0281fc2595be263e82f3.mockapi.io/tasks?page=${currentPage}&limit=5`
        );
        return res.data
    }
)

/*createAsyncThunk не генерирует никаких функций редуктора, поскольку 
не знает, какие данные мы извлекаем, как мы хотим отслеживать состояние
загрузки или как должны обрабатываться возвращаемые данные. Поэтому описываем всё это дело*/

export const tasksSlice = createSlice({
    name: 'tasks',
    initialState: {
        items: [],
        firstFetch: true,
        status: "loading", // loading | success | error,
        currentPage: 1,
        refreshStatus: false,
    },
    reducers: {
        setItems: (state, action) => {
            state.items = action.payload
        },
        setCurrentPage: (state) => {
            state.currentPage = state.currentPage + 1;
        },
        setRefreshStatus: (state, action) => {
            state.refreshStatus = action.payload
        }
    },
    extraReducers: {
        [fetchTasks.pending]: (state, action) => {
            state.items = [...state.items];
            state.status = 'loading';
        },
        [fetchTasks.fulfilled]: (state, action) => {
            state.items.push(...action.payload)
            state.firstFetch = false;
            state.status = 'success';
        },
        [fetchTasks.rejected]: (state, action) => {
            state.items = [];
            state.status = 'error'
        },
    }
})

// Main.jsx

// Получаем items
const tasksData = useSelector((state) => state.tasks.items);

const getTasks = async () => {
    try {
      await dispatch(fetchTasks(currentPage)).unwrap();
/*...*/
  useEffect(() => {
    if (currentPage < 5) {
      getTasks();
    }
  }, [currentPage]);
 
// Вышеописанный CSS-класс используется для замены каждого компонента tasksData на Task
/*...*/
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
/*...*/
```
- Панель Фильтров
```tsx
// FilterItem.jsx
// Создадим компонент фильтра (Кнопка для перехода на модалку с выобором)
сonst FilterItem = ({ subTitle, setDiscipline, subModal }) => {
  const router = useRouter();
  return (
    <div className="filterItem-container">
      <div className="filterItem" onClick={() => router.pushModal(subModal)}>
        <h1 className="filterItem__title">{subTitle === '' ? 'Выбрать' : subTitle}</h1>
        <img className="filterItem__img" src={arrowDown} />
      </div>
    </div>
  );
};

// InputItem.jsx
// Поле для ввода
const InputItem = ({ title, setPrice, price, dispatch }) => {
  return (
    <div className="inputItem-container">
      <input
        value={price}
        onChange={(e) => dispatch(setPrice(e.target.value))}
        className="inputItem"
        placeholder={title}
        type="text"
      />
    </div>
  );
};

// filterSlice.js
// Как и taskSlice пишем filterSlice
export const filterSlice = createSlice({
    name: 'filter',
    initialState: {
        discipline: "",
        town: "",
        institute: "",
        dateFrom: new Date(),
        dateTo: new Date(),
        price: "",
    },
    reducers: {
        setDiscipline: (state, action) => {
            state.discipline = action.payload
        },
        setTown: (state, action) => {
            state.town = action.payload
        },
        setInstitute: (state, action) => {
            state.institute = action.payload
        },
        setDateFrom: (state, action) => {
            state.dateFrom = action.payload
        },
        setDateTo: (state, action) => {
            state.dateTo = action.payload
        },
        setPrice: (state, action) => {
            state.price = action.payload
        }
    },
})

// На примере институтов, Institute.jsx
// Пока что институты у нас в массиве
const itemsArray = [
    'Московский государственный университет им. М. В. Ломоносова  ',
    'Московский физико-технический институт',
    'Высшая школа экономики'
  ];

// Поиск в модалке институтов
return (
    <ModalPage id={id} settlingHeight={100}>
      <div className="subFilter">
        <span className="swipe-line"></span>
        <h1 className="subFilter__title">Институт</h1>
        <div className="subFilter__search">
          <input
            onChange={(e) => setSearchValue(e.target.value)}
            className="subFilter__input"
            type="text"
            placeholder="Поиск"
          />
        </div>
 
 // Запись(по клику) в filterSlice найденного(или выбранного) Института в FilterSlice
   {itemsArray
          .filter((item) => {
            if (searchValue === '') {
              return item;
            } else if (item.toLowerCase().includes(searchValue.toLowerCase())) {
              return item;
            }
          })
          .map((item) => (
            <div className="subFilter__item">
              <SimpleCell
                Component="label"
                activeMode="activeItem"
                multiline={true}
                onClick={() => handleInstitute(item)}>
                {item}
              </SimpleCell>
            </div>
          ))}
      </div>
    </ModalPage>
  );
};

  const handleInstitute = (item) => {
/*...*/
      dispatch(setInstitute(item));
/*...*/


// filter.jsx
/*...*/
 <h2 className="filter-modal__title">Учебное заведение</h2>
        <FilterItem
          subTitle={filterState.institute}
          setDiscipline={setDiscipline}
          subModal={MODAL_INSTITUTE}
        />
 <h2 className="filter-modal__title">Сроки</h2>
        <div className="filter-modal__datepicker">
          <DateInput value={dateFrom} onChange={setDateFrom} />
          <DateInput value={dateTo} onChange={setDateTo} />
        </div>
        <h2 className="filter-modal__title">Желаемый бюджет</h2>
        <InputItem
          price={filterState.price}
          dispatch={dispatch}
          setPrice={setPrice}
          title={'Цена, ₽ '}
        />
/*...*/
```

- При загрузке tasks используется анимация react-loading-skeleton.
- В панели пользователя стоят заглушки и ниоткуда информация о пользователе не берется (для своего профиля скорее всего мы будем использовать bridge VK, для чужого профиля уже нашу БД)
- Чат еще не реализован, но панель уже готова, чтобы посмотреть как оно выглядит

# Create VK Mini App [![npm][npm]][npm-url] [![deps][deps]][deps-url]

## How to use

### With NPX

```bash
npx @vkontakte/create-vk-mini-app [app-directory-name] [options]
```
[NPX](https://github.com/npm/npx) allows you to always use the **latest** version of the package without a global installation.

### With installing the package globally
Install the package globally via yarn
```bash
yarn global add @vkontakte/create-vk-mini-app
```
...or npm
```bash
npm install --global @vkontakte/create-vk-mini-app
```

and use as follows

```bash
create-vk-mini-app [app-directory-name] [options]
```

This way is less recommended because you will have to update the package yourself.

### Options
Without `--zeit` and `--surge` options 

#### `--zeit`
Vercel (Zeit) deploy

Firstly, you have to create Vercel account and connect it with your GitHub profile on [vercel.com](https://vercel.com)

#### `--surge <surge-domain>`
Surge deploy

Firstly, you have to create Surge account and Surge-domain on [surge.sh](https://surge.sh)

#### `--help`
Prints the synopsis and a list of options

## How to start work with app

Go to created folder and run:  
`yarn start` or  `npm start` to start dev server with hot reload on `localhost:10888`.

`yarn run build` or `npm run build` to build production bundle, with tree-shaking, uglify and all this modern fancy stuff.

[npm]: https://img.shields.io/npm/v/@vkontakte/create-vk-mini-app.svg
[npm-url]: https://npmjs.com/package/@vkontakte/create-vk-mini-app

[deps]: https://img.shields.io/david/vkcom/create-vk-mini-app.svg
[deps-url]: https://david-dm.org/vkcom/create-vk-mini-app
