for login in AuthTable, we need    - - > username, password
{
	"username": "123",
	"password": "123"
}

for register in AuthTable, we need - - > username, password, id
{
	"username": "123",
	"password": "123",
	"id": "1"
}

for addEmp in user Table, we need  - - > name, email, designation, empId 

data to be given in user Table in the format:
{
    "name": "test1",
    "email": "test1@test1.com",
    "designation": "test1",
    "empId": "500"
}
	
- - - - ---- 	Token: 

Go to the Authorization Tab
	Click on the Authorization tab below the request URL field.
	In the Type dropdown, select Bearer Token.
Paste Your JWT Token
	In the Token field, paste your JWT token (e.g., the token you received after logging in).
	Postman will automatically format the token in the Authorization header as Bearer your-jwt-token.

