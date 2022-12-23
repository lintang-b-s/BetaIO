import Payments from '../../models/payments.js';


import UnauthenticatedError from '../../errors/unauthenticated.js';
import  UnauthorizedError  from '../../errors/unauthorized.js';
import BadRequest from '../../errors/bad-request.js';
import NotFound from '../../errors/not-found.js';

const getAllPayments = async (req) => {
  let condition = { organizer: req.user.id };

  const result = await Payments.find(condition)
    .select('_id type status');

  return result;
};

const createPayments = async (req) => {
  const { type } = req.body;
  console.log('type:', type);
  console.log('id', req.user.id)

  const check = await Payments.findOne({ type, organizer: req.user.id });

  if (check) throw new BadRequest('Tipe pembayaran duplikat');

  const result = await Payments.create({
    type,
    organizer: req.user.id,
  });

  return result;
};

const getOnePayments = async (req) => {
  const { id } = req.params;

  const result = await Payments.findOne({
    _id: id,
    organizer: req.user.id,
  })
    .select('_id type status ');

  if (!result)
    throw new NotFoundError(`Tidak ada tipe pembayaran dengan id :  ${id}`);

  return result;
};

const updatePayments = async (req) => {
  const { id } = req.params;
  const { type } = req.body;

  

  const check = await Payments.findOne({
    type,
    organizer: req.user.id,
    _id: { $ne: id },
  });

  if (check) throw new BadRequest('Tipe pembayaran duplikat');

  const result = await Payments.findOneAndUpdate(
    { _id: id },
    { type, organizer: req.user.id },
    { new: true, runValidators: true }
  );

  if (!result)
    throw new NotFoundError(`Tidak ada tipe pembayaran dengan id :  ${id}`);

  return result;
};

const deletePayments = async (req) => {
  const { id } = req.params;

  const result = await Payments.findOne({
    _id: id,
    organizer: req.user.id,
  });

  if (!result)
    throw new NotFoundError(`Tidak ada tipe pembayaran dengan id :  ${id}`);

  await result.remove();

  return result;
};

const checkingPayments = async (id) => {
  const result = await Payments.findOne({ _id: id });

  if (!result)
    throw new NotFoundError(`Tidak ada tipe pembayaran dengan id :  ${id}`);

  return result;
};

export {
  getAllPayments,
  createPayments,
  getOnePayments,
  updatePayments,
  deletePayments,
  checkingPayments,
};
