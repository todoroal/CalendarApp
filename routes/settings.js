const router = require('express').Router();
const Users = require('../models/user');

const crypto = require('crypto'); 


const getHashedPassword = (password) => {
    const sha256 = crypto.createHash('sha256');
    const hash = sha256.update(password).digest('base64');
    return hash;
}


router.put('/changePassword', async(req, res) => {
    //const data = JSON.parse(req.body);
    const {email, password, newPassword} = req.body;
    const hashedPassword = getHashedPassword(password);
    const newHashedPassword = getHashedPassword(newPassword);

    const user = await Users.findOne({
        email: email, password: hashedPassword
    }).exec();

    if (user){
        //Users.updateOne({email: email}, {$set :  {password: 'testtest'}});
        const user = await Users.findOneAndUpdate({email: email},{password: newHashedPassword}).exec();
        console.log('Password changed successfully!');
        res.send('email');
        res.end();

    } else {
        console.log('nope');
        console.log(user);
        res.end();
    }
})

router.put('/changeUsername', async(req, res) => {
    const {email, password, newUsername} = req.body;
    const hashedPassword = getHashedPassword(password);
    
    const user = await Users.findOne({
        email: email, password: hashedPassword
    }).exec();

    if (user){
        const user = await Users.findOneAndUpdate({email: email},{name: newUsername}).exec();
        console.log('Username changed successfully!');
        res.end();
    } else {
        console.log('nope');
        console.log(user);
        res.end();
    }
})

router.delete('/deleteUser', async(req, res) => {
    const {email, password} = req.body;
    const hashedPassword = getHashedPassword(password);
    
    const user = await Users.findOne({
        email: email, password: hashedPassword
    }).exec();

    if (user){
        const user = await Users.findOneAndDelete({email: email}).exec();
        console.log('User deleted!');
        res.end();
    } else {
        console.log('nope');
        console.log(user);
        res.end();
    }
})


module.exports = router;