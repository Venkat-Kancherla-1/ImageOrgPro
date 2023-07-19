const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');
const multer = require("multer");
const upload = multer({ dest: "public/uploads" });
const cloudinary = require('cloudinary'); // Require Cloudinary package
require('dotenv').config();

// Set up Cloudinary credentials
cloudinary.config({ 
  cloud_name: 'name of the cloud', 
  api_key: 'your api key', 
  api_secret: 'your cloudinary secret code' 
});

const homeStartingContent = "";
const aboutContent = "";
const contactContent = "";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let password = "mongodb password";
let user = "mongodb username";
mongoose.connect("mongodb+srv://" + user + password + "@cluster0.yd4utob.mongodb.net/blogDB", { useNewUrlParser: true });

const postSchema = {
  title: String,
  content: String,
  images: [{ fieldName: String, imageUrl: String }] // Update the schema to store images as an array of objects
};

const Post = mongoose.model("Post", postSchema);

app.get("/", function (req, res) {
  Post.find({}, function (err, posts) {
    if (err) {
      console.log(err);
      res.render("home", {
        startingContent: homeStartingContent,
        posts: [] // Render with an empty array if there's an error
      });
    } else {
      res.render("home", {
        startingContent: homeStartingContent,
        posts: posts || [] // Use an empty array if there are no posts
      });
    }
  });
});

app.get("/compose", function (req, res) {
  res.render("compose");
});

app.post("/compose", upload.fields([
  { name: "image1", maxCount: 10 },
  { name: "image2", maxCount: 10 },
  { name: "image3", maxCount: 10 }
]), async function (req, res) {
  const post = new Post({
    title: req.body.postTitle,
    content: req.body.postBody,
    images: [] // Initialize an empty array to store image objects
  });

  // Upload images to Cloudinary
  const imageFields = ["image1", "image2", "image3"];
  for (const field of imageFields) {
    if (req.files[field]) {
      const files = req.files[field];
      for (const file of files) {
        try {
          const result = await cloudinary.v2.uploader.upload(file.path); // Upload image to Cloudinary
          post.images.push({ fieldName: field, imageUrl: result.secure_url }); // Save image object to the 'images' array in the post
        } catch (error) {
          console.error('Error uploading image to Cloudinary:', error);
        }
      }
    }
  }

  post.save(function (err) {
    if (!err) {
      res.redirect("/");
    }
  });
});

app.get("/posts/:postId", function(req, res){
  const requestedPostId = req.params.postId;

  Post.findOne({_id: requestedPostId}, function(err, post){
    if (err || !post) {
      console.log(err);
      res.redirect("/");
    } else {
      res.render("post", {
        title: post.title,
        content: post.content,
        image: post.images || [] // Make sure 'image' is an array, or provide an empty array if it is undefined
      });
    }
  });
});

app.get("/about", function (req, res) {
  res.render("about", { aboutContent: aboutContent });
});

app.get("/contact", function (req, res) {
  res.render("contact", { contactContent: contactContent });
});

app.get("/VSSR", function (req, res) {
  res.render("VSSR");
});

app.get("/company", function (req, res) {
  res.render("company");
});

app.post("/delete", async function(req, res) {
  const requestedPostId = req.body.postId;
  const confirmationValue = req.body.confirmation; // Get the confirmation value from the form

  if (confirmationValue === "confirmation") {
    try {
      // Find the post in the database to get the image URLs
      const post = await Post.findById(requestedPostId);

      // Delete the post from the MongoDB database
      await Post.findByIdAndRemove(requestedPostId);

      // Delete the associated images from Cloudinary
      deleteImagesFromCloudinary(post.images);

      console.log("Post and associated images deleted successfully.");
      res.redirect("/");
    } catch (error) {
      console.log("Error deleting post and associated images:", error);
      res.redirect("/");
    }
  } else {
    console.log("Confirmation value incorrect. Post not deleted.");
    res.redirect("/");
  }
});


// Function to delete images from Cloudinary
async function deleteImagesFromCloudinary(images) {
  for (const image of images) {
    const publicId = extractPublicIdFromImageUrl(image.imageUrl);
    try {
      await cloudinary.v2.uploader.destroy(publicId);
      console.log(`Image ${publicId} deleted from Cloudinary.`);
    } catch (error) {
      console.error(`Error deleting image from Cloudinary: ${error}`);
    }
  }
}

// Helper function to extract public ID from Cloudinary URL
function extractPublicIdFromImageUrl(imageUrl) {
  const parts = imageUrl.split("/");
  const publicIdWithExtension = parts[parts.length - 1];
  const publicId = publicIdWithExtension.split(".")[0];
  return publicId;
}

app.listen(process.env.PORT || 3000, function () {
  console.log("Server started on port 3000");
});
