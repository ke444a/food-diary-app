# Calorie Tracking Application "Food Diary"

This is a full-stack web application called "Food Diary" built with React (Vite) on frontend and Django REST framework on backend. The program allows the user to track their daily calorie intake by logging their meals and calculating the total amount of calories consumed. Additionally, the application enables the user to count the amount of protein, carbs, and fats consumed per meal as well as to add meals to the list of favorites for easy logging.
</br>
The frontend sends the requests to the REST API created with Django REST in order to retrieve the information about the user, their logs and favorites. For additional information about meals such as the image of the meal, the backend queries Food Database API. Both the static website and the web server are deployed on Render.
</br>
Moreover, this project makes use of local storage to handle the user's authentication, React Query to send the requests to the API, React Hook Form to handle the forms, and React Router to perform routing. The application is styled using TailwindCSS.

## Table of Contents
- [Features](#features)
- [Demonstration](#demonstration)
- [Technologies](#technologies)
- [Setup](#setup)
- [Contact](#contact)
- [Sources](#sources)

## Features
- Authentication (login, register, logout)
    - Set the profile picture
    - Set the daily calorie goal
- Edit profile of the user
- Add a new meal to the list of logs
- Calculate the total amount of calories consumed as well as amount of protein, carbs, and fats
- Add a new meal to the list of favorites
- Log a meal from the list of favorites
- Responsive design for mobile devices
- Progressive Web App (PWA) support

## Demonstration
### [View the website](https://food-diary-app.onrender.com/)

https://user-images.githubusercontent.com/81090139/231104954-5c1d3795-0505-44bb-ad21-76a38d00a5a4.mp4

#### Logs page
<img src="https://github.com/ke444a/food-diary-app/assets/81090139/f5875cd8-ea68-4564-a9e5-d7b3967c35ef" width="60%" height="50%" >

#### Favorites page
<img src="https://github.com/ke444a/food-diary-app/assets/81090139/fa6275ba-a53c-4e50-86fc-91f17af465be" width="60%" height="50%">

#### Profile page
<img src="https://github.com/ke444a/food-diary-app/assets/81090139/09964232-7996-4e1b-9fb7-55be475745ff" width="60%" height="50%">

## Technologies
* ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
* ![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
* ![React Query](https://img.shields.io/badge/-React%20Query-FF4154?style=for-the-badge&logo=react%20query&logoColor=white)
* ![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
* ![React Hook Form](https://img.shields.io/badge/React_Hook_Form-0088CC?style=for-the-badge&logo=react-hook-form&logoColor=white)
* ![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
* ![Python](https://img.shields.io/badge/python-%2314354C.svg?style=for-the-badge&logo=python&logoColor=white)
* ![DjangoREST](https://img.shields.io/badge/DJANGO-REST-ff1709?style=for-the-badge&logo=django&logoColor=white&color=ff1709&labelColor=gray)

## Setup
Follow the instructions below to run the application locally.
### Getting an API Key
To get an API key, you need to create an account on [Food Database API](https://developer.edamam.com/food-database-api). Once you have an account, you can generate an API key by going to your account settings.

### Installation
Clone the repository:
```bash
$ git clone https://github.com/ke444a/food-diary-app.git
```
Install the dependencies:
```bash
# Install the dependencies for the frontend
$ cd food-diary-app/react-frontend/
$ npm install

# Install the necessary packages for backend
$ cd food-diary-app/django-backend/

# Create and activate virtual environment
$ python3 -m venv my_env
$ source my_env/bin/activate

$ pip install -r requirements.txt
```
Run the application:
```bash
# Run the frontend
$ cd food-diary-app/react-frontend/
$ npm run build
$ npm run preview

# Dev mode:
$ npm run dev

# Run the Django server
$ cd food-diary-app/django-backend/
$ python manage.py runserver
```
### Environment Variables
Create a `.env` file in the "django-backend/" directory 
```bash
$ touch .env
```
Add the following environment variables:
```bash
# Django secret key that can be found under the settings.py
# Use Django's get_random_secret_key() to generate a new secret key
SECRET_KEY=YOUR_SECRET_KEY

# Food Database API related information that can be found in the account settings
APP_ID=YOUR_APP_ID
APP_KEY=YOUR_APP_KEY

DEFAULT_MEAL_IMAGE_URL=https://images.unsplash.com/photo-1546069901-ba9599a7e63c
```
## Contact
- LinkedIn: [Danyl Kecha](https://www.linkedin.com/in/danylkecha/)
- Mail: danyl.kecha.uk@gmail.com
- GitHub: [ke444a](https://github.com/ke444a)
- Twitter: [@ke444a](https://twitter.com/ke444a)

## Sources
- [Food Database API](https://developers.themoviedb.org/3/getting-started/introduction)
- Images used: [1](https://unsplash.com/photos/kcA-c3f_3FE), [2](https://unsplash.com/photos/hrlvr2ZlUNk)
- Icons used: [1](https://www.flaticon.com/free-icon/balanced-diet_6774898?term=food&page=1&position=24&origin=tag&related_id=6774898), [2](https://www.flaticon.com/free-icon/restaurant_562678?term=food&page=1&position=1&origin=tag&related_id=562678), [3](https://www.flaticon.com/free-icon/user_1144760?term=user&page=1&position=2&origin=search&related_id=1144760)
