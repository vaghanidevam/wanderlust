const express = require('express');
const router = express.Router();
const adminController = require('../CONTROLLER/adminController');

router.get('/admin-panel', async (req, res) => {
    try {
      const data = await adminController.getAdminPanelData();
      res.render('admin/admin-panel.ejs', {
        totalUsers: data.totalUsers,
        totalListings: data.totalListings,
        totalApprovedListings: data.totalApprovedListings
      });
    } catch (error) {
      console.error('Error loading admin panel:', error);
      res.status(500).send('Server Error');
    }
});

router.get('/users', adminController.showUsers);
router.get('/listings', adminController.showListings);
router.get('/approve-listing', adminController.approveListings);
router.get('/users/:id/edit', adminController.editUserPage);
router.post('/users/:id/update', adminController.updateUser);
router.post('/listings/:id/approve', adminController.approveListing);
router.post('/listings/:id/deapprove', adminController.deapproveListing);

module.exports = router;
