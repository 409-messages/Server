# Server  
Created by Bryce Pfingston, Jacob Gregor, Tim Ma  
  
## Installation  
npm i { jest, express, dotenv, supertest, pg, sequelize, sqlite3, seqluelize-cli, bcrypt, base64, jsonwebtoken, cors, morgan, method-override }  
    * need a .env file with PORT=3001, SECRET=YOURESECRETGOESHERE, DATABASE_URL=postgres string that you get from heroku.  
  
## Summary of Problem Domain  
Using relational dataflows, we set profiles and messages to be pulled up with individual users.  
  
## Links to application deployment  
  
Heroku: https://message-board-cf-401.herokuapp.com  
Githut: https://github.com/409-messages/Server  
  
## Include embedded UML  
![embedded UML](./images/devpath.png)  
  
## Talk about your routes  
  
routes:  
    - SignIn:  
        - validates users with Username:Password  
        - validates users with Token  
        - HTTP POST  
    - SignUp:  
        - Create a new Username and Password  
        - Creates a token for that user to use in the future.  
        - HTTP POST  
    - Secret  
        - Its a secret, can you keep it?  
        - HTTP GET  
    - Users  
        - permissions for individual users, which are based on token.  
        - Guest = Read only; User = Read, Post and Update; and Admin = Read, Post, Update, and Delete  
        - HTTP GET  
    - Profiles  
        - have information that is related to the user, which can be accessed by said user.  
        - HTTP GET/POST/UPDATE/DELETE  
    - Messages  
        - have messages that are related to the user, which can be accessed by said user and by anyone that has directly messaged said user.  
        - HTTP GET/POST/UPDATE/DELETE  