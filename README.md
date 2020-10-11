# Завантадення та запуск

1. колувати проекту

```sh
 $ git clone https://github.com/Yugetio/announcement.git
```

2. запуск проекту

```sh
 $ docker-compose up --build
```

# Перевірка роботи

Для перевірки роботи можна використовувати Postman або curl

1. створення

```sh
$ curl --header "Content-Type: application/json" \
  --request POST \
  --data '{"title":"string","description": "string","price": 5,"links": ["https://www.google.com/photos/about/static/images/maggie-2.png", "https://www.google.com/photos/about/static/images/maggie-2.png", "https://www.google.com/photos/about/static/images/maggie-2.png"]}' \
  http://localhost:3000/ad
```

2. отримання одного оголошення

```sh
$ curl http://localhost:3000/ad/1
```

3. отримання одного оголошення з додатковими полями

```sh
$ curl http://localhost:3000/ad/2?filds=description,links
```

4. отримання списку оголошень з пропуском декількох оголошень та сортування їх по по спадаючі ціні

```sh
$ curl http://localhost:3000/ad?skip=10?price=ASC
```

5. отримання списку оголошень з сортування по даті

```sh
$ curl http://localhost:3000/ad?createdAt=DESC
```
## доступні параменти
1. отримання списку оголошень
 - skip - числовий параментр для пропуску ологолень (для пагінації)
 - limit - числовий параметр (не обовязковий), можна задати якщо хотіти змінити кількість отримуваних оголошень
 - createdAt - вказується для сортування по даті. Доступні параметри - DESC, ASC
 - price - вказується для сортування по ціні. Доступні параметри - DESC, ASC


2. отримування одного оголошення
 - id - числовий парамент, отримується із списку оголошень та передається
 - filds - перелік через кому. доступні значення - description, links

 приклади використання можна побачити вище

# Завершення роботи

Потрібно зупини докер за допомогою комбінації клавіш 'Ctrl + C' або команди
```sh
 $ docker-compose down
```