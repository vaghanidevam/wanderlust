const User = require("../models/users");
const Listing =  require("../models/listing");




exports.getAdminPanelData = async () => {
  try {
    const totalUsers = await User.countDocuments();
    const totalListings = await Listing.countDocuments();
    const totalApprovedListings = await Listing.countDocuments({ status: 'approved' });

    return {
      totalUsers: totalUsers || 0,
      totalListings: totalListings || 0,
      totalApprovedListings: totalApprovedListings || 0
    };
  } catch (error) {
    throw new Error('Error fetching data for admin panel: ' + error.message);
  }
};



// Show All Users
exports.showUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.render('admin/users', { users });
    } catch (err) {
        console.error(err);
        res.status(500).send("Error fetching users");
    }
};

// Show All Listings
exports.showListings = async (req, res) => {
    try {
        const listings = await Listing.find();
        console.log(listings)
        res.render('admin/listings', { listings });
    } catch (err) {
        console.error(err);
        res.status(500).send("Error fetching listings");
    }
};

// Approve Listings
exports.approveListings = async (req, res) => {
    try {
        // Fetch listings that are 'pending' and 'deApproved' is false
        const unapprovedListings = await Listing.find({ 
            status: 'pending', 
            deApproved: false // Ensure listings that are not de-approved are fetched
        });

        // Check if there are unapproved listings
        if (!unapprovedListings || unapprovedListings.length === 0) {
            return res.render('admin/approve-listing', { 
                message: "No listings to approve.", 
                unapprovedListings: [] // Make sure to pass an empty array if no listings
            });
        }

        // Render the view with the unapproved listings
        res.render('admin/approve-listing', { unapprovedListings });
    } catch (err) {
        console.error(err);
        res.status(500).send("Error fetching unapproved listings");
    }
};


// Edit User Page
exports.editUserPage = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.render('admin/edit-user', { user });
    } catch (err) {
        console.error(err);
        res.status(500).send("Error fetching user details");
    }
};

// Update User
exports.updateUser = async (req, res) => {
    const { username, email, role } = req.body;
    try {
        await User.findByIdAndUpdate(req.params.id, { username, email, role });
        res.redirect('/admin/users');
    } catch (err) {
        console.error(err);
        res.status(500).send("Error updating user");
    }
};

// Approve Listing Action (Change status)
exports.approveListing = async (req, res) => {
    try {
        await Listing.findByIdAndUpdate(req.params.id, { status: 'approved' });
        res.redirect('/admin/approve-listing');
    } catch (err) {
        console.error(err);
        res.status(500).send("Error approving listing");
    }
};

exports.approveListing = async (req, res) => {
    try {
        await Listing.findByIdAndUpdate(req.params.id, { status: 'approved' });
        res.redirect('/admin/approve-listing');
    } catch (err) {
        console.error(err);
        res.status(500).send("Error approving listing");
    }
};

exports.deapproveListing = async (req, res) => {
    try {
        // Use a different variable name for the result of the database operation
        const result = await Listing.findByIdAndUpdate(req.params.id, {
            deApproved: true,  // Mark the listing as deapproved
            status: 'deapprove' // Change status to 'deapprove'
        });
        
        // Redirect after deapproving the listing
        res.redirect('/admin/approve-listing');
        
        // Optional: Log the result if you want to check it
        console.log(result);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error deapproving listing");
    }
};
