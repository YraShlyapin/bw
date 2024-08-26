# Request
All requests for api start with /api/

All requests for image start with /image/

# Resedent
| method |        url        |         return          |
| :----: | :---------------: | :---------------------: |
|  GET   |   /allResedent    |    list of resedent     |
|  GET   | /allResedent?tag= | sorted list of resedent |
|  GET   |   /resedent/:id   |     resedent by id      |
|  POST  |     /resedent     |     create resedent     |
|  PUT   |   /resedent/:id   |     edite resedent      |
| DELETE |   /resedent/:id   |     delete resedent     |

```json
//example body
{
    "name": "some string",
    "text": "some string in md format",
    "avatar": "some image file"
}
```

# Tag
| method |   url    |   return    |
| :----: | :------: | :---------: |
|  GET   | /allTag  | list of tag |
|  GET   | /tag/:id |  tag by id  |
|  POST  |   /tag   | create tag  |
|  PUT   | /tag/:id |  edite tag  |
| DELETE | /tag/:id | delete tag  |

```json
//example body
{
    "name": "some string" //required unique
}
```

# Add tag on resedent
| method |        url         |          return          |
| :----: | :----------------: | :----------------------: |
|  GET   | /tagOnResedent/:id | list of tag on resedent  |
| DELETE | /tagOnResedent/:id | delete tag from resedent |
|  PUT   | /tagOnResedent/:id |  add tag from resedent   |

require list of tag's id
```json
//example body
[
    1,
    2,
    3
]
```
request with this body update or delete tags with this id from resedent

# Privilege
| method |       url       |       return        |
| :----: | :-------------: | :-----------------: |
|  GET   |   /Privilege    |  list of privilege  |
|  GET   | /privilege/:id  |   privilege by id   |
|  GET   | /tagOnPrivilege | list of unique tags |
|  POST  |   /privilege    |  create privilege   |
|  PUT   | /privilege/:id  |   edite privilege   |
| DELETE | /privilege/:id  |  delete privilege   |

```json
//example body
{
    "name": "some string",
    "text_link": "some string",
    "href_link": "some link",
    "tag": "some string"
}
```

# Project
| method |     url      |     return      |
| :----: | :----------: | :-------------: |
|  GET   | /allProject  | list of project |
|  GET   | /project/:id |  project by id  |
|  POST  |   /project   | create project  |
|  PUT   | /project/:id |  edite project  |
| DELETE | /project/:id | delete project  |

```json
//example body
{
    "name": "some string",
    "text": "some string",
    "url": "some link"
}
```

> TODO get all tags on privilege