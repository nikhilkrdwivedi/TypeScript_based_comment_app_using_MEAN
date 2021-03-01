# AIF Metrics Assignment
##### _Developer : Nikhil Kumar_
This is an assignment given by AIF Metrics. This repository contains following folders/file. 
  - Back-end
  - Front-end
  - Postman-collection
  - Project-screenshots
  - ReadMe file 
  - SQL
### Requirements 
Following setup required to make sure project up and run:
  - Nodejs 
  - Angular-cli
  - MySQL
  - Type Script Complier
  - Postman
  - PhpMyAdmin [optional]
  - VS Code [optional]


### Project Start Guide
##### Step-1
- Go to PhpMyAdmin/Terminal and create database `AIFMetrics` .
- If you are using PhpMyAdmin import sql file inside it. 
- You will find two table `user` and `comments`.
- User table has a default admin user. 
- Comments table has a comment by admin user.
- If you are using mysql from terminal, use restore command to update database using `AIFMetrics.sql`
#### Step-2
- Install postman to your machine.
- Open postman and go to Import section and click.
- Choose file tab and upload json file i.e. `AIF_Assignment.postman_collection.json`
- You can find this file inside postman-collection folder.
- You will see one collection will be added to your postman which contains all apis.
#### Step-3
- Go to front-end folder and run following commands -
    ```sh
    $ npm install or  yarn install
    ```
- To run front-end app, you can  type following  command
    ```sh
    $ ng s or  ng serve
    ```
- This will open app in `http://localhost:4200/`
![Home Screen](https://raw.githubusercontent.com/NikhilKrDwivedi/AIF_Metrics_Assignment/master/project-screenshots/1.home_without_login.png)
- Now, app is up and running. Open in vscode and explore further.
- ###### Note: `For bulk upload user functionality, you can get excel file inside front-end/src/assets/file. `

#### Step-4
-  Go to back-end folder and run following commands  -
   ```sh
    $ npm install or  yarn install
    ```
- Go to `back-end/src/config` and open `index.ts`
- Now, configure port and database as per your machine settings.
- Next, from root dir `(directory where package.json exists)` run following commands as per requirements
    ```sh
    $ npm run dev
    This command start server at port 3000 using typescript files
    ```
     ```sh
    $ npm run start
    This command start server at port 3000 using dist folder. Dist folder generates when we build typescript project to js based project using tsc complier
    ```
    ```sh
    $ npm run build
    This command build typescript to js based project 
    ```
- Once server up and running go to chrome/postman and hit url `http://localhost:3000/` 
- If you get response `{"successMsg":"A big Hi from AIF Matrix"}`. That means our server is now up and running.
    
##### Now, we have finished setup.We are good to go to use our app. We can explore API's using postman.

### Project Screenshots and details
#### Screen-1
- Home screen without login
![Home Screen](https://raw.githubusercontent.com/NikhilKrDwivedi/AIF_Metrics_Assignment/master/project-screenshots/1.home_without_login.png)
- Home screen after login
![Home Screen](https://raw.githubusercontent.com/NikhilKrDwivedi/AIF_Metrics_Assignment/master/project-screenshots/2.home_with_login.png)
- Login Screen `[email: admin@gmail.com , password: Admin123.@ ]`
![Login Screen](https://raw.githubusercontent.com/NikhilKrDwivedi/AIF_Metrics_Assignment/master/project-screenshots/3.login_screen.png)
- Comment Screen `User comment will be float left and others and right. User can delete only his/her comments. Counts of comment and hard refresh is on right side top.`
![Comment Screen](https://raw.githubusercontent.com/NikhilKrDwivedi/AIF_Metrics_Assignment/master/project-screenshots/4.comment_window.png)
- Bulk User Upload `User can upload multiple users in one go. Download template from download icon and add your data`
![Comment Screen](https://raw.githubusercontent.com/NikhilKrDwivedi/AIF_Metrics_Assignment/master/project-screenshots/5.bulk_user_upload.png)
- Page Not Found [404] `In case wild url someone hit. `
![Comment Screen](https://raw.githubusercontent.com/NikhilKrDwivedi/AIF_Metrics_Assignment/master/project-screenshots/6.page_not_found.png)



###### I have tried my best to give best documentation so that any one can easily undersatnd and use this project. But there is always hope of improvement so feel free to reach out to me your valuable suggestions will always welcome. 


#### Nikhil Kumar
[linkedin](https://www.linkedin.com/in/nikhilkrdwivedi/) | nikhil.dwivedi@outlook.com | https://www.codeforcoder.com

