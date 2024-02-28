
# Library Management

This project is just for practice... In this user(student) can perform these action
1)register
2)login
3)update
Admin can perform
1)Add books
2)update books
3)delete books
4)transaction functionalities 


# Technologies used
Node, Express, Mongodb, Mongoose
For testing endpoints Postman is used Cookie-parser is used for sending accessToken to login user before runnig project download the necessary npm packages mentioned in package.json



## Running Tests

To run tests, run the following command

```bash
  npm start
```


## Routes
Important routes are 
1)User
2)Books
3)Transaction

the whole project is divided into three main models
1)User
2)Books
3)Transaction

app.use("/api/v1/UserRouter" , UserRouter);
app.use("/api/v1/BookRouter" , BookRouter);
app.use("/api/v1/TransactionRouter" , TransactionRouter);


Model Diagram
![image](https://github.com/shiv-sk/librarymanagement/assets/155430597/83f32568-8b22-4d84-b8b0-b3de454302ee)

