module.exports.isSuspicious = (member) => {
    const accountAge = Date.now() - member.user.createdAt;
    return accountAge < (7 * 24 * 60 * 60 * 1000); // Moins de 7 jours
  };
  