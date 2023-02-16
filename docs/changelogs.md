- ### v.0.4.3.1

1. Bug Fixes

- ### v.0.4.3

1. Added Submission Grading endpoint
2. Modifications
3. Bug Fixes

- ### v.0.4.2

1. Added User Submission endpoint
2. Modifications
3. Bug Fixes

- ### v.0.4.1.2

1. Bug Fixes
2. Modifications

- ### v.0.4.1.1

1. Bug Fixes

- ### v.0.4.1

1. Added Todo Backend
2. [Tested] Tested Todo endpoints
3. Bug Fixes, Improvements
4. Modifications

- ### v.0.4.0

1. Added File Upload methods in **User, Classwork, Submission**
2. Modified some models
3. Bug Fixes, Improvements
4. Modifications to certain codes, Added `fileHandling.js`
5. Cleaned Code

- ### v.0.3.3.5

1. [Testing] Integration Tested: **_Classwork Submissions end-points_**
2. Bug Fixes
3. Minor Additions and Modifications

- ### v.0.3.3.4

1. [Testing] Integration Tested: **_Classwork end-points_**
2. Bug Fixes
3. Minor Additions and Modifications

- ### v.0.3.3.3

1. [Testing] Integration Tested: **_Classrooms Member end-points_**
2. Bug Fixes
3. Minor Additions and Modifications

- ### v.0.3.3.2

1. [Testing] Integration Tested: **_Classrooms end-points_**
2. Bug Fixes
3. Minor Additions and Modifications
4. Merged `loggedInVerify.js` and `ownerVerify.js` to `verifications.js`

- ### v.0.3.3.1

1. [Testing] Integration Tested: **_Users end-points_**
2. Bug Fixes
3. Minor Additions and Modifications

- ### v.0.3.3.0

1. [Testing] Integration Tested: **_Auth end-points_**
2. Tried Endpoint Testing with **Jest.js** and **SuperTest.js**
3. Bug Fixes
4. Minor Customizations

- ### v.0.3.2.1

1. Frontend separated from the backend.
2. deployed to heroku(<https://tranquil-woodland-86159.herokuapp.com/>).
3. minor bug fixes.

- ### v.0.3.1.3

1. Modified email sender
2. Minor Bug fixes
3. Added some documentaion

- ### v.0.3.1.2

1. Added Classroom delete method
2. Minor Bug fixes

- ### v.0.3.1.1

1. Modified `privateVerify` to [loggedInVerify.js](api/middleware/loggedInVerify.js) since this seemed more appropriate according to function context
2. Added end-point **(api/classrooms/users/:userId)**for getting all the classes associated with a user i.e. teaching and attending classes
3. Added a new utility [errorMessage.js](api/utils/errorMessages.js) file to template out error message. The code got very repetetive so tried to implement DRY
4. Added a new middleware [ownerVerify.js](api/middleware/verification.js) for checking ownership
5. Bug Fixes

- ### v.0.3.1

1. Modified Classroom, User model schemas
2. Added Classroom Routes, Controllers
3. Added Group User detail method
4. Modified Joi validation according to latest version
5. Minor Bug fixes

- ### v.0.3.0

1. React setup (Landing Page and User Page)
2. Private Routes setup
3. Minor bug fixes

- ### v.0.2.4.2

1. **[Beta: Testing]** User Avatar Cover Photo Upload feature
2. **[Beta: Testing]** Classroom routes and controllers. So the program wont run. Uncomment `classroomRoute.js` to check routes
3. Added Classroom schema
4. Bug Fixes

- ### v.0.2.4.1

1. Modified path `user` to `auth` as well as user named files to auth
2. **Beta: Build-testing** Created new user profile methods [get all users, get user detail, edit user profile]
3. Modified `server` DB and dotenv config to new `config/` directory
4. **Alpha Build-super early** Added socket channel connection on both `backend` and `frontend`

- ### v.0.2.4

1. Added Delete Account feature
2. Minor Bug fixes

- ### v.0.2.3

1. Implementation of try catch error handling
2. Added Reset password feature
3. Minor Bug fixes

- ### v.0.2.2

1. Implementation of try catch error handling
2. Minor bug fixes

- ### v.0.2.1

1. Added resend email verification confirmation mail
2. Minor bug fixes

- ### v.0.2.0

1. Added Authentication backend
2. Modified directory structure

- ### v.0.1.0.alpha

1. Created basic MERN boilerplate
