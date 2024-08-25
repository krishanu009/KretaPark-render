const asyncHandler = require("express-async-handler");
const Post = require("../models/postModel");
const Team = require("../models/teamModel");
//@desc create a new post
//@route POST /api/post/new
//@access private
const newPost = asyncHandler(async (req, res) => {
  const { title, scheduled, scriptId, date, status, assigned, companyId } =
    req.body;
  console.log(req.body);
  if (!title || !scriptId || !companyId) {
    res.status(400);
    throw new Error("All the fileds are mendatory!");
  }
  try {

    const currentUser = req.user;
    const team = await Team.findById(companyId);

    if (!team) {
      res.status(404);
      throw new Error("Company not found");
    }
  
  
    const isMember = team.members.some(element => element.id === currentUser.id);
  
    if (!isMember) {
      res.status(403);
      throw new Error("User is not a member of the team");
    }
  


    const post = await Post.create({
      title,
      scheduled,
      scriptId,
      date,
      status,
      assigned,
      companyId,
    });
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(400);
      throw new Error("Post data is not valid!");
    }
  } catch (error) {
    console.log("error", error);
    res.status(400);
    throw new Error("Post data is not valid!");
  }
});

//@desc get all post
//@route POST /api/post/all
//@access private
const allPost = asyncHandler(async (req, res) => {
  const allPosts = await Post.find();
  res.status(200).json(allPosts);
});

//@desc get all post by company Id
//@route POST /api/post/all/:companyId
//@access private
const allPostByCompanyID = asyncHandler(async (req, res) => {
  const { companyId } = req.params;
  if (!companyId) {
    res.status(400);
    throw new Error("All the fileds are mendatory!");
  }
  try {
    const posts = await Post.find({ companyId });

    if (!posts) {
      return res
        .status(404)
        .json({ message: "No posts found for the given company ID" });
    }

    res.status(200).json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ message: "Server error" });
  }
});

//@desc update a post
//@route POST /api/post/update/:id
//@access private
const updatePost = asyncHandler(async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      res.status(404);
      throw new Error("Post not found");
    }
    const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(updatedPost);
  } catch (error) {}
});

const deleteAllPost = asyncHandler(async (req, res) => {
  try {
    // const post = await Contact.findById(req.params.id);
    await Post.deleteMany();
    res.status(200).json("deleted all post");
  } catch (error) {
    res.status(404);
    throw new Error("post not found");
  }
});

//@desc delete a post
//@route POST /api/post/delete/:id
//@access private
const deletePost = asyncHandler(async (req, res) => {


  if (!req.params.id) {
    res.status(400);
    throw new Error("Please enter id");
  }

  const currentUser = req.user;

  // Find the post by ID
  const post = await Post.findById(req.params.id);

  if (!post) {
    res.status(404);
    throw new Error("Post not found");
  }

  const team = await Team.findById(post.companyId);

  if (!team) {
    res.status(404);
    throw new Error("Company not found");
  }


  const isMember = team.members.some(element => element.id === currentUser.id);

  if (!isMember) {
    res.status(403);
    throw new Error("User is not a member of the team");
  }


  const deletedPost = await Post.deleteOne({ _id: req.params.id });

  if (deletedPost.deletedCount === 0) {
    res.status(404);
    throw new Error("Failed to delete the post");
  }

  res.status(200).json({ message: "Post deleted successfully" });
});


module.exports = {
  newPost,
  allPost,
  updatePost,
  deleteAllPost,
  allPostByCompanyID,
  deletePost
};
