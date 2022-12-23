import { createPayments, deletePayments,getAllPayments } from "../services/mongoose/payments.js"

const create = async (req, res, next) => {
    try {
      const result = await createPayments(req);
        console.log('result: ', result)
      res.status(201);

      const redirectTo = req.session.redirectTo || '/places'
      
      // do your thang
      res.redirect(redirectTo);
    } catch (err) {
        console.log(err);
      next(err);
    }
  };  




  const destroy = async (req, res, next) => {
    try {
      const result = await deletePayments(req);
      res.status(200).json({
        data: result,
      });
    } catch (err) {
      next(err);
    }
  };

  const index = async (req, res, next) => {
    try {
      const result = await getAllPayments(req);
  
      res.status(200).json({
        data: result,
      });
    } catch (err) {
      next(err);
    }
  };


export {create, destroy, index};