## Project Overview:

Our project is a web application built using Node.js, Express.js, and MongoDB. It allows users to create and publish posts with images. The images are stored on Cloudinary, a cloud-based image management service. Users can view the list of posts on the homepage, and each post can contain multiple images categorized into "Before work," "On work," and "After work." Users can also delete posts along with associated images after confirming their action.

## Installation:

1. Make sure you have Node.js and npm (Node Package Manager) installed on your system.

2. Clone the repository or download the project files.

3. Run the following command to install the required packages:

   ```
   npm install
   ```

4. Create a `.env` file in the project root directory and add your Cloudinary credentials:

   ```
   CLOUDINARY_CLOUD_NAME=name of the cloud
   CLOUDINARY_API_KEY=your api key
   CLOUDINARY_API_SECRET=your cloudinary secret code
   ```

5. Set up your MongoDB Atlas account and replace the placeholders `mongodb username` and `mongodb password` in `app.js` with your actual MongoDB username and password.

6. Run the server:

   ```
   npm start
   ```

7. Access the application in your web browser at `http://localhost:3000`.

## Usage:

### Home Page:

- The home page displays a list of all the published posts.
- Each post shows the title and the first few lines of its content.
- If the post has images, they are displayed under the corresponding category headings: "Before work," "On work," or "After work."

### Compose Page:

- To create a new post, go to the `/compose` page.
- Enter the post's title, location, and optionally upload images for "Before work," "On work," and "After work."
- Click the "Publish" button to save and publish the post.
- A confirmation modal will appear asking you to enter a password. Enter the correct confirmation value to proceed with publishing.

### Individual Post Page:

- Click on the "Open" button on the home page to view an individual post and its details.
- The post title, location, and full content are displayed.
- If available, the images are shown under the corresponding category headings.

### Deleting a Post:

- To delete a post, click the "Delete" button on the home page under the desired post.
- A confirmation modal will appear asking you to enter a password. Enter the correct confirmation value to proceed with deletion.
- Once confirmed, the post and its associated images will be deleted.

## Folder Structure:

- `app.js`: The main application file containing the server and routing logic.
- `views/`: Contains the EJS templates for rendering different pages.
- `public/`: Stores static assets like CSS and client-side JavaScript.
- `public/uploads/`: The directory where uploaded images are temporarily stored before being uploaded to Cloudinary.
- `models/`: Defines the Mongoose schema and model for the MongoDB database.

## Dependencies:

- Express: Web application framework for Node.js.
- Body-parser: Middleware to parse incoming request bodies.
- EJS: Embedded JavaScript templating engine.
- Mongoose: Object-Document Mapper (ODM) for MongoDB.
- Multer: Middleware for handling file uploads.
- Cloudinary: Cloud-based image management service.
- Dotenv: To load environment variables from a `.env` file.

## Conclusion:

The main features of our website include:

1. Home Page: Users can access the home page to see a list of all published posts. Each post displays a title and a brief preview of its content. Posts with associated images are categorized into "Before work," "On work," and "After work," enhancing the visual appeal.

2. Compose Page: The "Compose" page offers an easy way for users to create new posts. Users can enter the post's title, location, and content. Additionally, they can upload images for each category, allowing them to share their experiences effectively.

3. Individual Post Page: By clicking the "Open" button on the home page, users can view individual posts in detail. The complete post title, content, and associated images are displayed, providing users with a comprehensive view of each entry.

4. Deleting Posts: Users can delete posts they have created, along with their associated images. A confirmation process ensures that accidental deletions are minimized.