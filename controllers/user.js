import User from '../models/user.js';
import bcrypt from 'bcrypt';

export const getLoginPage = (req, res) => {
    res.render('login', { loginTitle: 'Login' });
};

export const getRegisterPage = (req, res) => {
    res.render('register', { registerTitle: 'Register' });
};

export const getHome = (req, res) => {
    res.render('home');
};

export const handleRegistration = async (req, res, next) => {
    const {
        name,
        email,
        password: plainTextPassword,
        confirmpassword,
    } = req.body;
    //function call from model to check if email is duplicated
    const isNewUser = await User.isThisEmailInUse(email);
    if (!isNewUser)
        return res.json({
            success: false,
            message: 'This email is already in use',
        });
    //hash that encrypts the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(plainTextPassword, salt);

    const newUser = new User({
        name: name,
        email: email,
        password: hashedPassword,
    });

    try {
        newUser.save();
        return res.status(200).redirect('/');
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

export const handleLogin = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    User.findOne({ email: email })
        .then((user) => {
            if (!user) {
                // res.json({'error': 'user doesnt exist'});
                return res.redirect('/login');
            }
            bcrypt
                .compare(password, user.password)
                .then((doMatch) => {
                    if (doMatch) {
                        req.session.isLoggedIn = true;
                        console.log(req.session);
                        res.redirect('/');
                    }
                    res.redirect('/login');
                })
                .catch((err) => {
                    console.log(err);
                });
        })
        .catch((err) => console.log(err));
};
