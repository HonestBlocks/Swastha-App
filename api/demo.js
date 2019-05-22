const AD = require('ad');
 
// Your AD account should be a member
// of the Administrators group.
const ad = new AD({
    url: "ldap://127.0.0.1",
    user: "cn=admin,dc=example,dc=com",
    pass: "toor"
});
 
ad.user().get().then(users => {
    console.log('Your users:', users);
}).catch(err => {
    console.log('Error getting users:', err);
});