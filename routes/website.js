const router = require('express').Router();

const isAuth = (req, res, next) => {
  if(req.session.isAuth){
      next();
  }else{
      res.redirect('login');
  }
}

router.get('/register', (req,res) => {
    res.render('register');
});
router.get('/calendar', isAuth, (req,res) => {
  res.render('calendar');
});
router.get('/index', (req,res) => {
  //if(req.session.isAuth){
  //  res.render('index', {dpName: req.session.name})
  //}
  res.render('index');//, {dpName: null});  //, {displayUsername: req.session.name}
});
router.get('/news', isAuth, (req,res) => {
  res.render('news');
});
router.get('/settings', isAuth, (req,res) => {
  res.render('settings');
});
module.exports = router;