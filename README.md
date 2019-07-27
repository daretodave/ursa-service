## ursa

Base URL
```javascript
https://api.ursa.cc
```
------
**POST** auth/sign-in
````json
{
    "username": "email_or_name",
    "password": "credentials"
}
````
**REPLY**
```json
{
  "token": "xxxx_jwt_token",
  "user": {
    "id": 0,
    "name": "user_name",
    "email": "user_email"
  }
}
```
---------
**POST** auth/sign-up
````json
{
    "name": "user_name",
    "email": "user_email",
    "password": "credentials"
}
````
**REPLY**
```json
{
  "token": "xxxx_jwt_token",
  "user": {
    "id": 0,
    "name": "user_name",
    "email": "user_email"
  }
}
```