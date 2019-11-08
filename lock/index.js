import {Auth0LockPasswordless} from 'auth0-lock';

const cid = "yNIrPGnK4cz14M9uMIBlIU106RVvLvxP";
const domain = "eva-auth0.auth0.com";

const lock = new Auth0LockPasswordless(cid, domain);

lock.show();
