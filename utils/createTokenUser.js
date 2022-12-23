const createTokenUser = (user) => {
  return {
    name: user.name,
    userId: user._id,
    role: user.role,
    email: user.email,
    id: user._id,
    status: user.status,
   
  };
};

const createTokenParticipant = (participant) => {
  return {
    lastName: participant.lastName,
    participantId: participant._id,
    firstName: participant.firstName,
    email: participant.email,
    id: participant._id,
    status: participant.status,
  };
};

export{ createTokenUser, createTokenParticipant };
