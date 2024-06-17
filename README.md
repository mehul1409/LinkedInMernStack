# Naukri Search Backend

A backend project for managing job postings, user authentication, and job applications.

## Tech Stack

- *Node.js*
  - For building the backend server.
- *Express.js*
  - For setting up the API routes.
- *MongoDB*
  - For storing user data, job postings, and applications.

## Routes

### User Routes

- *Register:* POST /api/v1/user/register
  - Registers a new user.
  - Request body should include name, email, phone number, role and password.

- *Login:* POST /api/v1/user/login
  - Logs in an existing user.
  - Request body should include email, role and password.

- *Logout:* POST /api/v1/user/logout
  - Logs out the currently logged-in user.

### Job Routes

- *Post Job:* POST /api/v1/job/post
  - Creates a new job posting.
  - Request body should include title, description, requirements, and company.

- *Get All Jobs:* GET /api/v1/job/getalljobs
  - Retrieves all job postings.

- *Get My Jobs:* GET /api/v1/job/getmyjobs
  - Retrieves all job postings created by the logged-in user.

### Application Routes

- *Apply for Job:* POST /api/v1/application/post
  - Applies for a job.
  - Request body should include jobId and userId.
