import app from './app';
require("dotenv").config();

const port = 5000;
// Start server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
