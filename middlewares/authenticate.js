import {Place} from "../models/place.js";
import { placeSchema } from "../validator/schemas.js";
import ExpressError from "../utils/ExpressError.js";

const verifyAdmin = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
          throw new UnauthorizedError('Unauthorized to access this route');
        }
        next();
      };
    
}

const validatePlace = (req, res, next) => {
    console.log(req.body)
    const { error } = placeSchema.validate(req.body);

    if (error) { 
        const msg = error.details.map(el => el.message).join(',');
        throw new ExpressError(msg, 400);
    } else {
        next();
    }
}


const isAuthor = async(req, res, next) => {
    const { id } = req.params;
    const place = await Place.findById(id);
    const userId = req.user.id;
    console.log('userId: ', userId)
    if(!place.author.equals(userId)) {
        
        return res.redirect(`/places/${id}`);
    }
    next();
}


export {  verifyAdmin,  validatePlace, isAuthor};