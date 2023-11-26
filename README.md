# Как пользоваться

### Установка необходимых программ

1. https://nodejs.org/en/ - поставить LTS версию (16.20.2)
2. запустить в терминале `npm install gulp-cli -g`

### Установка зависимостей проекта

* из корневой папки проекта в терминале запустить `npm install`

### Работа с проектом

* `npm run start:dev (gulp --open)` - для запуска сервера разработки в dev режиме
* `npm run start:prod (gulp --open --production)` - для запуска сервера разработки в prod режиме


* `npm run build:dev (gulp --open --production)` - для сборки в продакшн в dev режиме
* `npm run build:prod (gulp build)` - для сборки в продакшн

### Линтер и автофикс

`npm run lint` - запускает поиск ошибок ts/scss
`npm run lintfix` - запускает автоматическое исправление ошибок ts/scss

### Git commit

В сборке используется `husky`, для чистоты кода в репозитории. При коммите вызываются: `npm run lint`

Перед `git push` важно проверить упавшие в консоль `warning/error`

Исходные файлы лежат в `src/`    
Готовые файлы для прода в `build/`

### Смена версии Node.js

1. установить nvm для windows
2. `nvm list` - отображение списка установленных версий Node.js
3. `nvm install n.n.n` - установка необходимой версии Node.js
4. `nvm use n.n.n` - выбрать необходимую версию Node.js из установленных на ПК
5. `nvm current` - узнать текущую активную версию Node.js

### Скрипт modal.js

Обращение к классу Modal извне возможно с помощью объекта window.modal.

`window.modal` имеет следующие методы:

* `window.modal.open(id, lock)` где: id - имя модального окна, которое необходимо открыть и оно находится уже в DOM,
  lock - boolean значение (по умолчанию true), необходимо для блокировки скролла при открытии модального окна
* `window.modal.openWithAjax(id, params)` где передаваемые параметр `id` такой же, как и в предыдущем методе.
  `params` - объект, из которого формируется FormData для отправки на сервер. Скрипт
  выполняет запрос к файлу `id.html` в папке `./ajax/` при разработке и нахождении на `localhost`, или к файлу
  `/local/ajax/`, если проект сбилжен и на стадии продакшена/внедрения битрикса.

### Optimize plugin

При сборке проекта в режиме `production` JS-файлы собираются в два типа:

* `modern` - JS формата ES6. Старается использовать всю доступную JS кодовую базу, не транспилируя код для старых
  браузеров.
* `legacy` - JS формата ES5. Траниспилирует весь JS код в формат ES5.

### Работа с изображениями 

Изображение оборачивается в DIV, который предотвращает построчную загрузку:

```html
<div class="img_wrapper">
    <img src="some-image.jpg" alt="some"/>
</div>
```

С помощью контейнера можно контролировать соотношение сторон картинки, а также использовать индикатор загрузки, что очень удобно, если изображения тяжелые.

```css
.img_wrapper{
    position: relative;
    padding-top: 75%;
    overflow: hidden;
}
 
.img_wrapper img{
    position: absolute;
    top: 0;
    width: 100%;
    opacity: 0;
}
```
При срабатывании события *load* у ***img***, изображению добавляется класс *loaded*, затем плавно появляется картинка

### Работа с Twig

Ссылка на подробную [документацию Twig](https://twig.symfony.com/doc/3.x/)

*Для корректного отображения поставьте плагин Twig*

***Общая структура файлов***

```
-templates
  data
    _data.twig
  layouts
     _layout-default.twig
     -layoit-mobile.twig
  partials
    _header.twig
    _footer.twig
    _modals.twig
    _some-block.twig
  index.twig
  page2.twig
```

* `templates` - корневая директория файлов Twig. Должна содержать вложенные директории и файлы отдельных страниц. В билде элементы `*.twig` из этой директории являются страницами
  браузеров.
* `data` - содержит `_data.twig` где хранятся данные в формате массива объектов.
* `layouts` - директория для макетов страницы. Импортируются по средствам Twig в файл страницы, по дефолту содержат header + footer + modals. Основной функционал - это изменение структуры страницы, например создаётся layout без header для использования на некоторых страницах сайта.
* `partials` - включает основные блоки кода разметки `header` `footer` `some-block`, может содержать вложенные директории.


***Работа с data.twig***

*default use*

Для импорта данных на страницу используйте конструкцию `{% import "data/_data.twig" as data %}`

```twig
variable = [
  {
    property1: 'some value',
    property2: 'some value',
    property3: 'some value',
  }
]
```

Data в Twig используется для создания циклов в шаблонах и упразднения написания повторяющихся блоков кода. Конструкция для объявления цикла следующая:

* `item` - итерируемый элемент цикла
* `data.indexGrid` - элемент data с данными
* `{{ item.propetyName }}` - вывод содержимого свойства data через интерполяцию

```html
     {% for item in data.variable %}
        <div class="card">
          <div class="card-title">{{ item.title }} 
            <span
              class="card-title_value">{{ item.value }}
            </span>
          </div>
          <div class="card-title__description">{{ item.description }}</div>
        </div>
    {% endfor %}
```

Так же data можно напрямую записывать и использовать в шаблонах Twig:

```html
<!--previous html-->
{% set
    social = [
    {icon: 'vk'},
    {icon: 'ok'},
    {icon: 'twitter'},
]
%}
<div class="social-title">Some title</div>
<div class="social">
    {% for item in social %}
        <a href="#" class="social__item">
            {{ mixins.icon(item.icon) }}
        </a>
    {% endfor %}
</div>
<!--next html-->
```

***Для импорта блоков используйте `{% extends "partials/_block.twig" %}`***

Конструкцию `{% set variable = "value" %}` можно использовать для изменения переменных для конкретной страницы или блока:

```html
{% set index = true %}
{% set title = "Главная" %}
```
***Работа svg twig***

Для импорта миксина иконок используйте конструкцию `{% import "partials/_mixins.twig" as mixins %}`

Icons хранятся в директории `src/icons`. При сборке билдятся в спрайт, после с помощью миксина добавляются на страницу:

```html
  {{ mixins.icon(item.iconName) }}
```

***Работа if/else Twig***

Оператор `if` в ***Twig*** аналогичен операторам `if` в ***PHP***.
В простейшей форме вы можете использовать его для проверки того, имеет ли выражение значение `true`:

```html
{% if online == false %}
    <p>Our website is in maintenance mode. Please, come back later.</p>
{% endif %}
```
Для нескольких условий можно использовать `and/or`:

```html
{% if temperature > 18 and temperature < 27 or temperature < 0 %}
    <p>It's a nice day for a walk in the park.</p>
{% endif %}
```
Для нескольких ветвей `elseif` и `else` может использоваться как в ***PHP***. Вы также можете использовать более сложный вариант:

```html
{% if product.stock > 10 %}
   Available
{% elseif product.stock > 0 %}
   Only {{ product.stock }} left!
{% else %}
   Sold-out!
{% endif %}
```

***Работа с modals twig***

Разметка модальных окон находится в _modals.twig

- все стандартные модалки строятся по одному шаблону
- чтобы открыть модалку нужно указать в data-modal и data-modal-inner - id модалки
- для закрытия модалки  нужно указать в data-modal-close - id модалки

```html
<div class="modal" data-modal="modal-id">
    <div class="modal__inner" data-modal-inner="modal-id">
        <div class="modal__header">
            <h3 class="modal__title">Заголовок</h3>
            <button type="button" class="modal__close" data-modal-close="modal-id">
                <svg class="icon icon-close">
                    <use xlink:href="./img/sprite.svg#icon-close"></use>
                </svg>
            </button>
        </div>
        <div class="modal__main">
            Контент внутри
        </div>
    </div>
</div>
```

