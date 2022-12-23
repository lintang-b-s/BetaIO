import BaseJoi from "joi";
import sanitizeHtml from "sanitize-html";
import dateJoi from '@joi/date';

const  dateJois = dateJoi;

const extension = (joi) => ({
    type: 'string',
    base: joi.string(),
    messages: {
        'string.escapeHTML': '{{#label}} must not include HTML!'
    },
    rules: {
        escapeHTML: {
            validate(value, helpers) {
                const clean = sanitizeHtml(value, {
                    allowedTags: [],
                    allowedAttributes: {},
                });
                if (clean !== value) return helpers.error('string.escapeHTML', { value });
                return clean;
            }
        }
    }
});

const Joi = BaseJoi.extend(extension,dateJois);

const placeSchema = Joi.object({
    place: Joi.object({
        title: Joi.string().required().escapeHTML(),
        placeType: Joi.string().required().escapeHTML(),
        location: Joi.string().escapeHTML(),
        flora: Joi.string().required().escapeHTML(),
        fauna: Joi.string().required().escapeHTML(),
        makanan: Joi.string().required().escapeHTML(),
        sumberAir: Joi.boolean().required(),
        habitant: Joi.string().required().escapeHTML(),
        description: Joi.string().required().escapeHTML(),
    }).required(),
    deleteImages: Joi.array(),
    author: Joi.string(),
    geometry: Joi.object({
        type: Joi.string().escapeHTML(),
        coordinates: Joi.array().items(Joi.number())
    }),
    // tickets: Joi.string() 
    tickets: Joi.object({
        type: Joi.string().escapeHTML(),
        price: Joi.number(),
        stock: Joi.number(),
        expired: Joi.date().format('YYYY-MM-DD'),
        startDate: Joi.date().format('YYYY-MM-DD'),
        endDate: Joi.date().format('YYYY-MM-DD')
    })
  
})



//   tickets: Joi.array().items(Joi.object({
//         type: Joi.string().escapeHTML(),
//         price: Joi.number(),
//         stock: Joi.number(),
//         expired: Joi.date().format('YYYY-MM-DD'),
//         startDate: Joi.date().format('YYYY-MM-DD'),
//         endDate: Joi.date().format('YYYY-MM-DD') 


export { placeSchema };

