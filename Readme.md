# log-starter-kit
> Nodejs logging starter kit

## Tryout

1. clone this repo
1. `npm install`
1. `node index.js`

## Log sample

Console transport

```
info: Request logging
{ type: 'sometype',
  requestID: '731917ee-9368-41ce-a6a2-ee421351140f' }
info: ::1 - 5504939c-40ec-4793-b1e8-757bdd85f232 [16/Sep/2015:16:29:41 +0800] "GET / HTTP/1.X" 200 12
{ type: 'accesslog',
  requestID: '731917ee-9368-41ce-a6a2-ee421351140f' }
info: { 'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/45.0.2454.85 Safari/537.36' }
{ type: 'headers',
  requestID: '731917ee-9368-41ce-a6a2-ee421351140f' }
```

Scribe transport

```
version=1 app=log-starter-kit host=zhongchiyus-MacBook-Pro.local level=INFO timestamp=1442392218 type=sometype requestID=44647339-f790-4f38-9e9d-4077d4f10fcd message=Request logging
version=1 app=log-starter-kit host=zhongchiyus-MacBook-Pro.local level=INFO timestamp=1442392218 type=accesslog requestID=44647339-f790-4f38-9e9d-4077d4f10fcd message=::1 - 5504939c-40ec-4793-b1e8-757bdd85f232 [16/Sep/2015:16:30:18 +0800] "GET / HTTP/1.X" 200 12
version=1 app=log-starter-kit host=zhongchiyus-MacBook-Pro.local level=INFO timestamp=1442392218 type=headers requestID=44647339-f790-4f38-9e9d-4077d4f10fcd message={ 'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/45.0.2454.85 Safari/537.36' }
```

File transport

```
2015-09-16T08:31:35.944Z - info: Request logging type=sometype, requestID=e54bcd68-5210-451c-b2fc-fbbbf6b3b26f
2015-09-16T08:31:35.949Z - info: ::1 - 5504939c-40ec-4793-b1e8-757bdd85f232 [16/Sep/2015:16:31:35 +0800] "GET / HTTP/1.X" 200 12 type=accesslog, requestID=e54bcd68-5210-451c-b2fc-fbbbf6b3b26f
2015-09-16T08:31:35.950Z - info: { 'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/45.0.2454.85 Safari/537.36' } type=headers, requestID=e54bcd68-5210-451c-b2fc-fbbbf6b3b26f
```
