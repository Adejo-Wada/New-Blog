const { urlencoded } = require('express');
const express = require ('express');
const mongoose = require('mongoose');
const blogs = require('./db/blog');
const Blog = require('./models/blog');


const app = express();
app.set ('view engine', 'ejs');
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));


const dbURI = "mongodb+srv://tuesday:tuesday123@cluster0.xm2tg.mongodb.net/tues-thurs?retryWrites=true&w=majority";
mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true});



app.get('/', (req, res)=> {
    Blog.find()
    .then(result => {
        res.render('index', {blogs: result});
    })
    .catch(err => {
        console.log(err);
    });
});

app.post('/', (req, res) =>{
    const blog = new Blog(req.body);
    blog.save()
    .then(result => {
        res.redirect('/');
    });
});

app.get('/form', (req, res)=> {
    res.render('form');
});


app.listen(8000, ()=> {
    console.log('sever is working');
});