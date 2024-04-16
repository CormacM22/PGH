const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.sendWelcomeEmail = functions.auth.user().onCreate((user) => {
    const emailsCollection = admin.firestore().collection('emails');
    return emailsCollection.add({
        to: [{
            email: user.email,
            name: user.displayName || 'New User'
        }],
        from: {
            email: 'from@example.com',
            name: 'From Name'
        },
        subject: 'Welcome to Our Service!',
        html: 'This is an <strong>HTML</strong> email body. Welcome!',
        text: 'This is a TEXT email body. Welcome!'
    });
});
