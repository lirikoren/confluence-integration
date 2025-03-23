# confluence-integration
## Setup Instructions & Prerequisites

Before running the project, ensure you have the following prerequisites:

- Node.js (version 16 or higher)
- npm (Node Package Manager)
- A Confluence account with API access

### Setup Instructions

### 1. Clone the Repository

Clone this repository to your local machine using the following command:

```bash
git clone https://github.com/lirikoren/confluence-integration.git
cd confluence-integration
```
### 2. Install Dependencies

Install the required dependencies by running:

```bash
npm install
```

### 3. Configure Environment Variables
Create a .env file in the root of the project (or use the .env file already in the repo) and configure the following variables with your Confluence details:
```bash
CLIENT_ID=your-client-id
CLIENT_SECRET=your-client-secret
REDIRECT_URI=http://localhost:3000/auth/callback
PORT=3000
```
You can get the CLIENT_ID and CLIENT_SECRET from your Atlassian Developer Console.

### 4. Running the Application:
To run the application locally, use the following command:

```bash
Copy
```
This will start the application on http://localhost:3000.

### 5. Running Tests:
In the test file change the baseUrl and the space-key to your own (or use the provided to run the integration on example space) , you can find this information from your confluence space page URL 
for example:  
   confluence URL - https://<your-domain>.atlassian.net/wiki/spaces/<space-key>/pages
   test baseUrl = 'https://<your-domain>.atlassian.net/wiki/rest/api/'
   
To run the automated tests, use the following command:
```bash
npm test
```
This will execute the tests using Mocha and display the results in the terminal.

## Integration Details


This project integrates with the Confluence API to:

   1. List pages in a specified space.

   2. Fetch content for a specific page.

Confluence API Endpoints Used
   * List Pages in Space: /rest/api/space/{spaceKey}/content/page

   * Get Page Content: /rest/api/content/{pagetId}?expand=body.storage.value

These endpoints require authentication using OAuth 2.0, and the access token is fetched via the CLIENT_ID and CLIENT_SECRET provided in the .env file.

**Testing the Integration**

You can verify that the integration is working by running the tests. The tests cover:

   1. Listing pages in the space.

   2. Fetching page content.

   3. Handling errors when the space or page doesn't exist.
      

## Screenshot of App Configuration


Here is a screenshot of the app configuration from developer.atlassian.com.

![Screenshot 2025-03-23 100449](https://github.com/user-attachments/assets/3c815ac1-6eb2-4adb-8171-6939231d9da0)


##  Loom Video

You can view the walkthrough of the project and the tests in the Loom video:
