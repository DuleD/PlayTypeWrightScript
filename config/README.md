### Config and `.env` file setup
This setup is a simulation of how environments and sensitive information would be configured to run the tests in envVariableExample.spec.ts locally using a popular dependency called dotenv. These `.env` files are included in `.gitignore` to prevent "secrets" from being committed to the repository.

1. Create a new User Environment Variable on your machine called TEST_ENV. For simulation purposes the supported values are:
    - ExpandTesting
    - PracticeTestAutomation

2. Create a `.env` file in this config folder. Supported .env file environments are:
    - .env.ExpandTesting
    - .env.PracticeTestAutomation

3. Add the following environment variables:

   ```plaintext
   # .env.ExpandTesting
   TEST_USERNAME='practice'
   TEST_PASSWORD='SuperSecretPassword!'
   TEST_URL='https://practice.expandtesting.com/login'
   ```

   ```plaintext
   # .env.PracticeTestAutomation
   TEST_USERNAME='student'
   TEST_PASSWORD='Password123!'
   TEST_URL='https://practicetestautomation.com/practice-test-login/'
   ```
