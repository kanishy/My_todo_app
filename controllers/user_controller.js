const User = require('../model/users_model.js');
const Task = require('../model/task_model.js');
const path = require('path');
const fs = require("fs");

module.exports.signin = (req, res) => {
    if (!req.isAuthenticated()) {
        return res.render('user-signin');
    }
    else
        res.redirect('/home');
};

module.exports.signup = (req, res) => {
    if (!req.isAuthenticated())
        return res.render('user-signup');
    else
        res.redirect('/home');
};

module.exports.logout = (req, res) => {
    req.logout((err) => {
        if (err) console.log(err);
        else {
            req.flash("success", "Logged out successfully");
            return res.redirect("/");
        }
    });
}

module.exports.settings = (req, res) => {
    return res.render('settings');
}
module.exports.profile = (req, res) => {
    return res.render('profile');
};
module.exports.isFileExists = async (req, res) => {
    let user = await User.findById(req.user._id);
    if (user.avatar) {
        try {
            fs.accessSync(path.join(__dirname, "..", user.avatar), fs.constants.F_OK);
            console.log("file exists");
            return true;
        }
        catch {
            console.log("file does not exist");
            return false;
        }
    }
    else
        return false;
}
module.exports.create = async function (req, res) {
    try {
        let user = await User.findOne({ email: req.body.email })
        if (!user) {
            try {
                user = await User.create(req.body);
                user.avatar = "../images/user.jpg";
                await user.save();
                req.flash('success', 'User created successfully!');
                return res.redirect('/user/signin');
            } catch (err) {
                console.log('error in creating user while signing up', err);
                return;
            }
        } else {
            req.flash("error", "User already exists!");
            return res.redirect('back');
        }
    } catch (err) {
        console.log('error in finding user in signing up');
        return;
    }
}

module.exports.update = async (req, res) => {
    try {
        let user = await User.findById(req.user._id);
        if (req.file) {
            console.log(req.file);
            if (await this.isFileExists(req, res)) {
                fs.unlinkSync(path.join(__dirname, "..", user.avatar));
            }
            user.avatar = User.avatarPath + '/' + req.file.filename;
            await user.save();
        }
        else {
            console.log("File does not exist");
        }
        await User.findByIdAndUpdate(req.user._id, req.body);
        res.locals.user = await User.findById(req.user._id);
        return res.status(200).json({
            data: {
                src: user.avatar,
                name: req.body.name
            },
            message: "updated successfully"
        });
    } catch (err) {
        console.error(err);
    }
}

module.exports.authorize = (req, res) => {
    req.flash("success", "Logged in successfully");
    res.redirect('/home');
}
