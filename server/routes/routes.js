const express = require('express'),
    userRoutes = require('./users');

var router = express.Router();

router.get('/conferences/:id', userRoutes.get_conferences_by_id);
router.get('/conferences', userRoutes.get_conferences);
router.post('/conferences', userRoutes.create_conference );
router.put('/conferences/:id', userRoutes.update_conference);
router.put('/conferences/lecture/:id', userRoutes.add_lecture_to_conference );
router.delete('/conferences/:id/lectures/:name', userRoutes.delete_lecturer_from_conference );
router.delete('/conferences/:id', userRoutes.delete_conference );
module.exports = router;


