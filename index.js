const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
const database = {
    users: [
        {
            id: '123',
            name: 'John',
            email: 'john@gmail.com',
            password: 'cookies',
            entries: 0,
            joined: new Date() 
        },
        {
            id: '124',
            name: 'Sally',
            email: 'sally@gmail.com',
            password: 'bananas',
            entries: 0,
            joined: new Date()
        }
    ]
}

app.get('/', (req, res) => {
    res.send(database.users);
});

app.post('/register', (req, res) => {
    const { email, name, password } = req.body;
    database.users.push({
        id: '125',
        name: name,
        email: email, 
        password: password,
        entries: 0,
        joined: new Date()
    });
    res.json(database.users[database.users.length - 1]);
});

app.post('/signin', (req, res) => {
    if(req.body.email === database.users[0].email && req.body.password === database.users[0].password) {
        return res.json('Success')
    } else {
        return res.status(400).json('Error Logging In');
    }
})

app.get('/profile/:id', (req, res) => {
    const { id } = req.params;
    let found = false;
    database.users.forEach(user => {
        if(user.id === id) {
            found = true;
           return res.send(user);
        }
    })
    if(!found) {
        res.status(404).send('profile not found');
    }
})

app.post('/image', (req, res) => {
    let found = false;
    const { id } = req.body;
    database.users.forEach(user => {
        if(user.id === id) {
            found = true;
            user.entries++;
            return res.json(user.entries);
        }
    })
    if(!found) {
        res.status(400).json('Image not found')
    }
})



app.listen(3020, () => {
    console.log("app is running on port 3020");
})