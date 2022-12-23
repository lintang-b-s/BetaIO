"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createTokenParticipant = exports.createTokenUser = void 0;

var createTokenUser = function createTokenUser(user) {
  return {
    name: user.name,
    userId: user._id,
    role: user.role,
    email: user.email,
    id: user._id,
    status: user.status
  };
};

exports.createTokenUser = createTokenUser;

var createTokenParticipant = function createTokenParticipant(participant) {
  return {
    lastName: participant.lastName,
    participantId: participant._id,
    firstName: participant.firstName,
    email: participant.email,
    id: participant._id,
    status: participant.status
  };
};

exports.createTokenParticipant = createTokenParticipant;