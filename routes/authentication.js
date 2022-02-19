const router = require('express').Router();
const Users = require('../models/user');
const crypto = require('crypto'); 


const getHashedPassword = (password) => {
    const sha256 = crypto.createHash('sha256');
    const hash = sha256.update(password).digest('base64');
    return hash;
}

// register
router.post('/register',  async (req,res) => {

    const {name, email, password} = req.body;

    const existingUser = await Users.findOne({name: req.body.name}).exec();

    if (existingUser != null){
        res.status(400).send("User with same name/email already exists");
    }
    else{
        const hashedPassword = getHashedPassword(password);

        const newUser = {
            name,
            email,
            password: hashedPassword
        };

        const user = await Users.create(newUser);

        res.redirect('login');
    }
});

// login
router.post('/login', async (req, res) =>  {

    const { name, password } = req.body;
    const hashedPassword = getHashedPassword(password);

    const user = await Users.findOne({
        name: name, password: hashedPassword
    }).exec();

    if (user){
        req.session.isAuth = true; //Cookier wird client bereitgestellt
        req.session.name = name;//??
        //res.redirect('index');
        res.send(JSON.stringify(user));
        res.end()
    } else {
        //res.status(400).send('Wrong username or password!');
        res.send(JSON.stringify(user));
        res.end();
    }
});


// logout
router.delete('/logout', async (req, res) =>  {
    await req.session.destroy();
    /*req.session.destroy((err) =>{
        if(err) throw err;
        res.redirect('index')
    })*/
});

router.get('/getUsername', async(req, res) => {
    if(req.session.isAuth){
        res.send(req.session.name)
        res.end();
    }
    else{
        res.send('You have to login!');
    }
})


router.get('/userGet/:name', async (req,res) => {
    const user = await Users.findOne({name: req.params.name}).exec();
    user ? res.status(200).send(user) : res.status(404).send('User not found');
});

router.delete('/userDelete/:name', async (req, res) => {
    const user = await Users.findOneAndDelete({name: req.params.name}).exec();
    user ? res.status(200).send(user) : res.status(404).send('User not found');
});

router.put('/userChangePassWord', async (req, res) => {
    const user = await Users.findOneAndUpdate({name:req.body.name},{password: req.body.password}).exec();
    user ? res.status(200).send(user) : res.status(404).send('User not found');
});

module.exports = router;