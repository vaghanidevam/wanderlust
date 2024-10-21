const joi = require("joi");

const listingSchema = joi.object({
    listing : joi.object({
        title : joi.string().required(),
        description: joi.string().required(),
        location : joi.string().required(),
        country : joi.string().required(),
        price : joi.number().required().min(0),
        image : joi.string().allow("", null)

    }).required()
}) 
// const reviewSchema = joi.object({
//     rating: joi.number()
//         .required()
//         .min(1)
//         .max(5)
//         .label('Rating'),
//     comment: joi.string()
//         .required()
//         .min(1)
//         .max(500)
//         .label('Comment'),
//     createdAt: joi.date()
//         .default(Date.now)
//         .label('Creation Date')
// });
// module.exports = reviewSchema;
module.exports = listingSchema;
