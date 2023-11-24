# DOCUMENTATION

**AUTH**
Register
* URL : http://localhost:5000/api/v1/auth/register
* Method : POST
* Required Token : No
* Request Body :
`
{
    "fullname": "John Doe",
    "address": "Victoria St.",
    "gender": "Laki-laki",
    "username": "johndoe",
    "password": "12345678"
}
`
* Response Body :
`
{
    "code": 201,
    "data": {
        "fullname": "John Doe",
        "address": "Victoria St.",
        "gender": "Laki-laki",
        "username": "johndoe",
        "password": "12345678",
        "id": 1
    }
}
`
Login
* URL : http://localhost:5000/api/v1/auth/login
* Method : POST
* Required Token : No
* Request Body :
`
{
    "username": "johndoe",
    "password": "12345678"
}
`
* Response Body :
`
{
    "code": 200,
    "token": "bearer *generated token by jwt*"
}
`
