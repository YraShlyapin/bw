# Resedent
| method |          url          |         return          |       request        |
| :----: | :-------------------: | :---------------------: | :------------------: |
|  GET   |   /api/allResedent    |    list of resedent     |         NONE         |
|  GET   | /api/allResedent?tag= | sorted list of resedent |     tag in query     |
|  GET   |   /api/resedent/:id   |     resedent by id      |         NONE         |
|  POST  |     /api/resedent     |     create resedent     |        object        |
|  PUT   |   /api/resedent/:id   |     edite resedent      | id in url and object |
| DELETE |   /api/resedent/:id   |     delete resedent     |      id in url       |

object for post
```js
let obj = {
    name: 
    text: 
}
```

# Tag
| method |     url      |   return    | request |
| :----: | :----------: | :---------: | :-----: |
|  GET   | /api/allTag  | list of tag |
|  GET   | /api/tag/:id |
|  POST  |   /api/tag   |
|  PUT   | /api/tag/:id |
| DELETE | /api/tag/:id |