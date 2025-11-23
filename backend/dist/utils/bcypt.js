import bcrypt from 'bcrypt';
export const hashValue = async (value, saltRounds) => bcrypt.hash(value, saltRounds || 10);
export const compareHash = async (value, hash) => bcrypt.compare(value, hash);
//# sourceMappingURL=bcypt.js.map