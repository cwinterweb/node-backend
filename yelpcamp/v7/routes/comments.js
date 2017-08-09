var express = require("express");
var router = express.Router({mergeParams: true});
var Campground = require("../models/campground");
var Comment = require("../models/comment");

router.get("/new", isLoggedIn, function(req, res) {
	Campground.findById(req.params.id, function(err, campground) {
		if (err) console.log(err)
		else res.render("comments/new", {campground: campground});
	});
});

router.post("/", isLoggedIn, function(req, res) {
	// lookup campground using id
	Campground.findById(req.params.id, function(err, campground) {
		if (err) {
			console.log(err);
			res.redirect("/campgrounds");
		} else {
			// create new comment
			Comment.create(req.body.comment, function(err, comment) {
				if (err) consoe.log(err);
				else {
					// connect new comment to campground
					// add username and id to comment
					comment.author.id = req.user._id;
					comment.author.username = req.user.username;
					// save comment
					comment.save();
					campground.comments.push(comment);
					campground.save();
					res.redirect("/campgrounds/" + campground._id);
				}
			});
		}
	});
});

function isLoggedIn(req, res, next) {
	if (req.isAuthenticated()) {
		next();
	} else {
		res.redirect("/login");
	}
}

module.exports = router;