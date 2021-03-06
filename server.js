const express = require('express');
const app = express();
const mongoose = require('mongoose');
const schema = require('./schema');
const cors = require('cors');
const multer = require('multer');
const fileUpload = require('express-fileupload');
const path = require('path');
const port = process.env.PORT || 5000;

mongoose.connect(process.env.MONGODB_URI || "mongodb+srv://ProblemChild:bzz4uu8eDU@ig001-nt7pi.mongodb.net/UserList", { useNewUrlParser: true });

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(fileUpload());
app.use('/images', express.static(path.join(__dirname, 'assets','images')));

const User = schema.User;
const Informations = schema.Informations;

/**
 * Multer config for file upload
 */
const storage = multer.memoryStorage();
const upload = multer({ storage :storage });


app.post('/login/addNew/upload', upload.single('file'), (req,res)=>{
    if(!req.files){
        return res.send(400).send('No files were uploaded');
    }
    req.files.file.mv(`./assets/images/thumbnails/${req.files.file.name}`, err=>{
        if(err)return res.status(500).send(err);
        res.send('File Uploaded');
    });
});


app.get('/api', (req, res) => {
    Informations.find({}, (err, info) => {
        if (err)res.status().send(err)
        return (res.json(info));
    })
});

app.post('/login', (req, res) => {
    User.find({ username: req.body.username }, (err, user) => {
        if (err) res.status().send(err);
        user.map(item => {
            if (item.password === req.body.password) {
                return (res.json(item));
            }
        });
    });
});

app.post ('/signUp', (req,res)=>{
    User.find({username:req.body.username }, (err,user)=>{
        if(err) res.status().send(err);
        User.find({username:req.body.username}, (err,user)=>{
            if(err){
                res.status().send(err);
            }
            User.create(req.body, (err, user)=>{
                if(err)res.status().send(err);
                    res.send('Sucessfully SignedUp. Please Login with your usename and password again.')
            })
            User.find({}, (err,user)=>{
                if(err)res.status().send(err);
                return (res.json(user));
            });
        })
    });
});

app.get('/login/images/:id', (req, res) => {
    const id = req.params.id;
    res.sendFile(id, { root: ('assets/images') });
});

app.get('/login/images/thumbnails/:id', (req, res) => {
    const id = req.params.id;
    res.sendFile(id, { root: ('assets/images/thumbnails') });
});

app.post('/login/addNew', (req, res) => {
    Informations.create(req.body, (err, user) => {
        if (err) res.status().send(err);
    });
    Informations.find({}, (err, users) => {
        return (res.json(users));
    })
});

app.delete('/login/delete', (req, res) => {
    req.body.map(item => {
        Informations.deleteOne({ _id: item._id }, (err, user) => {
            if (err) res.status().send(err);
        });
    });
    Informations.find({}, (err, users) => {
        return (res.json(users));
    });
});

app.use(express.static(path.join(__dirname, 'client','build')));
app.get('/*', (req, res)=>{
    res.sendFile(path.join(__dirname, 'client','build','index.html'));
});

app.listen(port, () => {
    console.log(`Listening to port ${port}`);
});