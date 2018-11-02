import auth0 from 'auth0-js';
// import history from '../history';

export default class Auth {
  constructor() {
    this.auth0 = new auth0.WebAuth({
      //change these fields for app/deployment
      domain: 'micahweiss.auth0.com',
      clientID: 'SGnlNIpJEKv20KZWd3zcMu4btlEtN-Xw',
      redirectUri: 'http://localhost:3000/home',
      //do not change
      responseType: 'token id_token',
      scope: 'openid profile'
    });
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
  }

  login() {
    this.auth0.authorize();
  }

  handleAuthentication() {
    console.log('handle auth called');
    this.auth0.parseHash((err, authResult) => {

      // console.log('authResult : ', authResult)
      // console.log('authResult.accesstoken : ', authResult.accessToken)
      // console.log('authResult.idToken : ', authResult.idToken);
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
        console.log('Auth successful');
        console.log('authResult', authResult) //fires before setsession
        // history.replace('/home');
      } else if (err) {
        // history.replace('/home')
        this.auth0.authorize();
        console.log(err);
      } else {
        console.log('Error in handleAuthentication parameters');
        this.auth0.authorize();
      }
    });
  }

  setSession(authResult) {
    // Set the time that the Access Token will expire at
    let expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
    localStorage.setItem('name', authResult.idTokenPayload.name);
    // navigate to the home route
    // history.replace('/home');
  }

  logout() {
    // Clear Access Token and ID Token from local storage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    this.idToken = null;
    this.profile = null;
    this.expiresAt = null;
    this.auth0.logout();
    // navigate to the home route
    // history.replace('/home');
  }

  isAuthenticated() {
    // Check whether the current time is past the 
    // Access Token's expiry time
    let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }
}