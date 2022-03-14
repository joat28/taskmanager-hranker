
# TaskManager

A Simple task management and sharing application




![Logo](https://socialify.git.ci/joat28/taskmanager-hranker/image?description=1&language=1&name=1&owner=1&theme=Dark)

## Working link:
https://joat28-taskmanager.netlify.app/


## Installation

Install and run taskmanager with npm and git locally

```bash
  git clone https://github.com/joat28/taskmanager
  cd taskmanager/frontend && npm install
  cd .. 
  cd backend && npm install
  node index.js
  cd .. 
  cd frontend npm run start
```
The application should run on port `http://localhost:3000`
and the server listens to the port set by `.env` variables


    
## Environment and config variables

To run this project, you will need to add the following environment variables to your .env file in backend
`PORT`
`EXPRESS_SESSION_SECRET`
`DB_URI`
and `BASE_URI`
 to the backend root endpoint in config.js in frontend.
 


## API 

```http
  Log in -                    POST /api/auth/login
  Register -                  POST /api/auth/register
  Logout and Clear session -  POST /api/auth/register
  User Data -                 GET /api/home
  Add Task -                  PATCH /home/add
  Delete Task -               PATCH /home/delete/:id   
  Share Task -                PATCH /home/share/   
  Reject incoming Task -      PATCH /home/reject/:id   
  Accept incoming Task -      PATCH /home/accept/:id   
```

