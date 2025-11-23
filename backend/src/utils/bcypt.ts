import bcrypt from 'bcrypt';

export const hashValue = async (value: string, saltRounds? : number): Promise<string> => 
    bcrypt.hash(value, saltRounds || 10);

export const compareHash = async (value: string, hash: string): Promise<boolean> => 
    bcrypt.compare(value, hash);


