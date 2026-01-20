const express = require('express');
const usersRouter = require('./routes/users.routes');
const todosRouter = require('./routes/todos.routes');


const app = express();


app.use(express.json());


app.use('/users', usersRouter);
app.use('/todos', todosRouter);


app.listen(3000, () => {
console.log('Server is running on http://localhost:3000');
});