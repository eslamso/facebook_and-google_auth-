# Facebook and Google Authentication

This project demonstrates how to implement Facebook and Google OAuth authentication using Passport.js in a Node.js and Express application.

## Features

- OAuth 2.0 authentication with Facebook and Google.
- Session-based authentication using `express-session`.
- Passport.js strategies for Facebook and Google.
- Securely stores user session and authentication details.
- Uses `.env` file to manage sensitive API keys and secrets.

## Prerequisites

Before running this project, ensure that you have:

- [Node.js](https://nodejs.org/) installed.
- A MongoDB instance running (for session storage or other data persistence).
- Facebook and Google developer accounts with the following set up:
  - Facebook App (with App ID and App Secret).
  - Google App (with Client ID and Client Secret).

## Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/eslamso/facebook_and-google_auth-.git
   cd facebook_and-google_auth-
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up the environment variables by creating a `.env` file in the root directory and add the following:

   ```plaintext
   FACEBOOK_APP_ID=your-facebook-app-id
   FACEBOOK_APP_SECRET=your-facebook-app-secret
   FACEBOOK_REDIRECT_URL=facebook-redirect-url
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret
   GOOGLE_REDIRECT_URL=google-redirect-url


   SESSION_SECRET=your-session-secret
   ```

4. Run the application:

   ```bash
   npm start
   ```

5. Visit `http://localhost:3000` to test the authentication flow.

## Project Structure

- `app.ts`: Initializes the Express app and configures Passport strategies for Facebook and Google.
- `routes/`: Contains route handlers for login, authentication, and redirecting.
- `config/`: Manages passport configuration and strategies.
- `views/`: Contains view templates (e.g., login page).

## Authentication Flow

1. Navigate to `http://localhost:3000`
2. press login button
3. select login strategy (google or facebook)
4. You will be redirected to the respective provider's login page.
5. After login, you will be redirected back to the app with an authenticated session.
6. visit profile to see some info about you
