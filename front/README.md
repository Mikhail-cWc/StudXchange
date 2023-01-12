[<img width="134" src="https://vk.com/images/apps/mini_apps/vk_mini_apps_logo.svg">](https://vk.com/services)

### Основные концепции

Переход между панелями осуществляется с помощью router от [happysanta](https://github.com/HappySanta/router).
Пример перехода на главную через панель навигации:
```jsx
Navigation.jsx
/*...*/
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
Вывод объявлений:
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
