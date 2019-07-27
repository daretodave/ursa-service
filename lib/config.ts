export const BCRYPT_ROUNDS: number = Number(process.env.BCRYPT_ROUNDS || 10);

export const JWT_SECRET = process.env.JWT_SECRET || 'TEMP_SECRET';