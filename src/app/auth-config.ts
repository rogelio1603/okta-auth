export const oktaConfig = {
  clientId: '0oamexmfbftW79amA5d7',
  issuer: 'https://dev-95675621.okta.com',
  redirectUri: window.location.origin + '/login/callback',
  scopes: ['openid', 'profile', 'email'],
  pkce: true
}; 