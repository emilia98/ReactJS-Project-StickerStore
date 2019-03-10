module.exports = {
    signUp: (req, res) => {
        let { email, username, password } = req.body;
        let errors = [];

        console.log(req.body);
        errors = checkIfUndefined(email, 'Please, provide an email!', errors);
        errors = checkIfUndefined(username, 'Please, provide a username!', errors);
        errors = checkIfUndefined(password, 'Please, provide a password!', errors);

        if(errors.length > 0) {
            return  res.json({
                errors
            })
        }

        return res.json({hello: 'world'});
    }
}

function checkIfUndefined(field, msg, errors) {
    if(field === undefined) {
        errors.push(msg)
    }

    return errors;
}