export const oktaConfig = {
  clientId: '0oameax1moG9IDq3U5d7',
  issuer: 'https://dev-20304007.okta.com',
  redirectUri: window.location.origin + '/login/callback',
  scopes: ['openid', 'profile', 'email'],
  pkce: true
}; 