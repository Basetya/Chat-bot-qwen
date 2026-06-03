# Chatbot GAS Development with Clasp

This project uses clasp (Command Line Apps Script) to develop Google Apps Script locally.

## Setup Instructions

### 1. Prerequisites
- Node.js installed
- Clasp installed globally: `npm install -g @google/clasp`
- Google account with Google Apps Script enabled
- Logged in to clasp: `clasp login`

### 2. Initialize a New Project
If you want to create a new GAS project:

```bash
# Navigate to your project directory
cd d:\Chat Bot Qwen

# Create a new script project
clasp create --type standalone --title "Chatbot Backend"

# This will create a new script and update .clasp.json with the script ID
```

### 3. Or Connect to Existing Project
If you already have a GAS project:

```bash
# Navigate to your project directory
cd d:\Chat Bot Qwen

# Pull code from an existing script
clasp clone <SCRIPT_ID>
```

### 4. Development Workflow
After making changes to your local files:

```bash
# Push your changes to the GAS project
clasp push

# Check the status of your files
clasp status

# View your script in the browser
clasp open
```

### 5. Files in this project:
- `Code.gs` - Main backend code for the chatbot
- `index.html` - Frontend code (not pushed to GAS)
- `.clasp.json` - Configuration file for clasp

### 6. Deploy the script
After pushing your code, you need to deploy it:

```bash
# Create a new deployment
clasp deploy

# Or update an existing deployment
clasp deploy --deploymentId <DEPLOYMENT_ID>
```

### 7. Update your frontend
After deployment, copy the deployment URL and update your `index.html` file:
```javascript
const GAS_URL = "https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec";
```

## Important Notes:
- Remember to add your API key in the `Code.gs` file before pushing
- Don't commit/push your API key to public repositories
- Monitor your API usage to avoid unexpected charges