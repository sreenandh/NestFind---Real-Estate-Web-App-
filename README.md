# NestFind Real Estate Web Application

NestFind is a full-stack web application designed to simplify the process of finding, buying, renting, or selling properties. It features secure user registration with OTP-based email verification, dynamic property listings with filtering options, real-time chat functionality, and an admin panel for managing user accounts.

## Features

- **User Registration with OTP Verification:**  
  New users register by providing their credentials, after which a 6-digit OTP is generated and sent to their email (using Nodemailer with Gmail). Users verify the OTP to complete their registration.

- **Secure Authentication & Authorization:**  
  JWT tokens are generated upon login and stored in HTTP-only cookies. Protected routes ensure that only authenticated users can access sensitive pages, with additional admin-only routes for management functions.

- **Dynamic Property Listings & Filtering:**  
  Users can browse property listings and apply filters based on city, property type (e.g., apartment, house), price range, and bedroom count. The filter criteria update the URL’s query parameters for easy sharing and bookmarking.

- **Real-Time Chat:**  
  Real-time messaging is implemented using Socket.IO, enabling instant communication between users about property details.

- **Admin Panel:**  
  An admin dashboard (accessible with default credentials: username **SreenandhM**, password **admin123**) allows for viewing user details and deleting user accounts.

## Technologies

**Backend:**  
- Node.js, Express  
- MongoDB with Prisma ORM  
- JWT, bcrypt  
- Nodemailer (using Gmail)  
- Socket.IO  
- Prisma ORM

**Frontend:**  
- React, Vite  
- React Router  
- SCSS  
- axios  
- React Quill (rich text editing)  
- React Leaflet (interactive maps)



