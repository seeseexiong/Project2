# Social Stories

 
## MVP
The primary goal of this project is to enable the user to keep up with headline news, based off their interest.  Social Stories target anyone who likes to keep up with current events/news of their interest.  Our product addresses the time-consuming process searching for interesting headline news.  
Social Stories is structured like a social media website. When the user first signs up, they will be asked what news categories they’re interested in.  On the user’s customize page, they will receive only the headlines news related to the categories they picked.   The user can also follow other users and see their posts on the customize page.
 
## Essential User Stories
As a user, I want to receive headline news based on categories I’m interested in.
As a user, I want to post and share my experience/thoughts related to the news
As a user, I want to be able to search for other users with the same interest and see their post.
 
## Team Members:
Denis Plaster, Katie Kasperek, Isaiah Ramsey, Parker Call, See Xiong



Api Routes:
| Method | Path                                              | Type | Data In                                                | Data Out                                                            | Description                                                                         |
|--------|---------------------------------------------------|------|--------------------------------------------------------|---------------------------------------------------------------------|-------------------------------------------------------------------------------------|
| GET    | '/'                                               | html | 0                                                      | view.html                                                           | General page - if user is not sign-in, we send them to this page                    |
| GET    | '/api/mainPage                                    | data | User Favorites                                         | User.Favorites                                                      | Grabbing Main Page News                                                             |
| POST   | '/registration/:name/dob/ userName/email/password | data | url parameters of name, dob, userName, email, password | user.html?                                                          | User signs up - if successful we send them to their customize page                  |
| POST   | 'login/:userName/password                         | data | url parameters of userName  and password               | user.html?                                                          | User logs in with credentials - if successful we send them to their  customize page |
| GET    | '/authentication'                                 | data | url parameters of userName and password                | user.html?                                                          | User logs in with credentials - if successful we send them to  their customize page |
| GET    | '/news/:category'                                 | data | url parameters                                         | Array [{ title: string author: string article: string & integers }] | Retrieve all headline news by categories                                            |
| POST   | '/news/:category'                                 | data | 0                                                      | Array [{ title: string author: string article: string & integers }] | post news on user's page                                                            |
| GET    | '/search/:user'                                   | data | url parameters                                         | Array [{ userName: string }]                                        | Search for other users                                                              |
| POST   | '/friendList/:friends                             | data | 0                                                      | Array [{ userName: string }]                                        | List of friends                                                                     |
| GET    | '/friendList/:friendActivities                    | data | 0                                                      | Array [{ activity: string title: string }]                          | Friend's activities such as posts, likes, and comments                              |