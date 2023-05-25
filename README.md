# BSD Rank

## Introduction
BSD Rank is a React application that can provide users with data-driven motivation to continue to get stronger by providing a ranking system that lets users earn ranks based on their best lifts in bench, squat and deadlift. 

The BSD ranking system is based off of an analysis performed on a weightlifting database of over 1.6 million individuals. It utilizes industry standard metrics, such as Wilks Score and NSCA Training Load Chart, to determine a user's strength while normalizing for sex, bodyweight and rep ranges.

[Link to Website](https://www.bsdrank.com/).

## Technologies
- Frontend - React, TypeScript
- State Management - Apollo Client
- Backend - Node, Express, Apollo GraphQL Server
- Database - MongoDB
- Testing - Jest and React Testing Library
- Authentication - JWT and bcrypt
- Animation - GSAP

## User Story
As a user:
- I can earn my BSD rank based off my best lifts in bench, squat and deadlift
- I can record my workouts to keep track of my weighlifting progress
- I can submit video verification of my best lifts in order to earn my Verified BSD Rank
- I can earn my spot on the BSD leaderboard by earning my Verified BSD Rank

As an admin:
- I can review users' submissions for lift verification
- I can approve users' lift verifications, making them eligible for their Verified BSD Rank