# Мобильное приложение "Острова.65"

<img src="https://leader-id.storage.yandexcloud.net/upload/377252/71c5c4a1-2d43-4531-ad18-9c027589b1f4.jpg" alt="Острова.65" width="100%">

## Описание
"Острова.65" — это мобильное приложение, созданное для улучшения качества жизни жителей и гостей острова Сахалин. Оно предоставляет доступ к актуальной информации и полезным сервисам в удобном формате. 

## Реализованные модули и функционал

### Задача 1: Горный воздух и активный отдых
Цель: Обеспечить пользователей актуальной информацией о горнолыжном курорте.

#### Выполнено:
- Информация о трассах:
  - Состояние трасс (открыты/закрыты).
  - Уровень сложности трасс, длина и перепад высот.
  - Отображение трасс на интерактивной карте.
- Тарифы:
  - Стоимость ски-пассов, проката оборудования и дополнительных услуг.
- Прогноз погоды:
  - Интеграция с API прогноза погоды(API Yandex погода).
- Дополнительные сервисы:
  - Визуализация системы бронирования ски-пассов и проката.
  - Интерактивная карта курорта с инфраструктурой (кафе, рестораны, туалеты).
  - Система поиска попутчиков для поездки на курорт.

#### Не выполнено:
- Реализация полноценного функционала бронирования.
- Система обмена сообщениями между пользователями.

#### Примечание:
- Frontend выполнен на VueJS, backend — кастомный ([репозиторий](https://github.com/W3bWave/island65-back-end)). 
- Решение опубликовано в Telegram Mini Apps ([ссылка](https://t.me/island65_bot/Islands65)).

---

### Задача 4: Афиша
Цель: Создать модуль для отображения культурных мероприятий Сахалина.

#### Выполнено:
- Разработан дизайн-макет в Figma, включающий:
  - Отображение информации о мероприятиях.
  - Календарь мероприятий.
  - Фильтрацию и поиск по ключевым параметрам.
  - Детализированное отображение информации о мероприятии.

#### Не выполнено:
- Парсинг данных с сайта cultsakhalin.ru.
- Разработка backend для обработки и предоставления данных.
- Реализация всех функций, включая фильтрацию, сортировку, интеграцию с геокодированием, покупку билетов и т.д.

---

## Технологии
- Frontend: VueJS.
- Backend: Express ([Репозиторий](https://github.com/W3bWave/island65-back-end)).
- Публикация: Telegram Mini Apps ([Решение для задачи 1 || СЕРВИСЫ -> ГОРНЫЙ ВОЗДУХ](https://t.me/island65_bot/Islands65)).

## План развития
1. Завершение разработки модуля "Афиша".
2. Расширение функционала существующих модулей.
3. Публикация дополнительных треков в Telegram Mini Apps.
