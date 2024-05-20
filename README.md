# Maven-tech-blog

## Description
A simple CMA-style blogging platform designed to help you share your technology thoughts, ideas, and experiences with the world. Built with Node.js, Express.js, Sequelize, and Handlebars, Maven Tech Blog offers a seamless blogging experience with a user-friendly interface.
![Screenshot 2024-05-20 150430](https://github.com/gocrushgoals/tech-blog/assets/157322992/7d133c5b-ef87-45b6-9f9a-4048f2fa1138)

![Screenshot 2024-05-20 150422](https://github.com/gocrushgoals/tech-blog/assets/157322992/0f583742-4910-4cdc-9030-ec9ae524c8c5)

![Screenshot 2024-05-20 150357](https://github.com/gocrushgoals/tech-blog/assets/157322992/cf880149-7f11-492f-a12b-df157c926e38)


## User Story
AS A developer who writes about tech
I WANT a CMS-style blog site
SO THAT I can publish articles, blog posts, and my thoughts and opinions


## Acceptance Criteria
GIVEN a CMS-style blog site
WHEN I visit the site for the first time
THEN I am presented with the homepage, which includes existing blog posts if any have been posted; navigation links for the homepage and the dashboard; and the option to log in
WHEN I click on the homepage option
THEN I am taken to the homepage
WHEN I click on any other links in the navigation
THEN I am prompted to either sign up or sign in
WHEN I choose to sign up
THEN I am prompted to create a username and password
WHEN I click on the sign-up button
THEN my user credentials are saved and I am logged into the site
WHEN I revisit the site at a later time and choose to sign in
THEN I am prompted to enter my username and password
WHEN I am signed in to the site
THEN I see navigation links for the homepage, the dashboard, and the option to log out
WHEN I click on the homepage option in the navigation
THEN I am taken to the homepage and presented with existing blog posts that include the post title and the date created
WHEN I click on an existing blog post
THEN I am presented with the post title, contents, post creator’s username, and date created for that post and have the option to leave a comment
WHEN I enter a comment and click on the submit button while signed in
THEN the comment is saved and the post is updated to display the comment, the comment creator’s username, and the date created
WHEN I click on the dashboard option in the navigation
THEN I am taken to the dashboard and presented with any blog posts I have already created and the option to add a new blog post
WHEN I click on the button to add a new blog post
THEN I am prompted to enter both a title and contents for my blog post
WHEN I click on the button to create a new blog post
THEN the title and contents of my post are saved and I am taken back to an updated dashboard with my new blog post
WHEN I click on one of my existing posts in the dashboard
THEN I am able to delete or update my post and taken back to an updated dashboard
WHEN I click on the logout option in the navigation
THEN I am signed out of the site
WHEN I am idle on the site for more than a set time
THEN I am able to view posts and comments but I am prompted to log in again before I can add, update, or delete posts


## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Credits](#credits)
- [License](#license)

## Installation
Clone this repository.
Install dependencies using npm install.
Set up your environment variables in a .env file.
Run the application using npm start.
Access the application in your web browser at http://localhost:3001.

## Usage
Run the application with the command node app.js

Sign Up / Sign In: If you're a new user, sign up for an account by clicking on the "Sign Up" link and providing the required information. If you already have an account, simply sign in using your credentials.

Create a Post: Once logged in, navigate to the dashboard or the "New Post" section. Here, you can create a new blog post by providing a title, content, and optional tags. Use the rich text editor to format your post as needed.

Publish Your Post: After writing your post, click on the "Publish" button to make it live on your blog. Your post will now be visible to other users who visit your blog site.

Manage Your Posts: You can manage your posts from the dashboard. Edit existing posts, delete posts you no longer need, or view analytics to see how your posts are performing.


## Credits

OSU coding bootcamp classes

OSU tutors

MDN Web Docs

NMP Documentation

tabnine AI generator

ChatGPT


## License

See the repository for licensing information
