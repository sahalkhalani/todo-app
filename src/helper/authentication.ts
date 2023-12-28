import { hashSync, compareSync } from "bcrypt";
import { sign, verify } from "jsonwebtoken";
import config from "src/config";

export async function hashPassword(password: string): Promise<string> {
  return hashSync(password, 8);
}

export async function createJwtToken(id: string): Promise<string> {
  return sign({ id }, config.jwt_secret);
}

export async function verifyJwtToken(token: string): Promise<{ id: string }> {
  const data = verify(token, config.jwt_secret);
  return data;
}

export async function comparePass(plainPass: string, hashedPass: string) {
  return compareSync(plainPass, hashedPass);
}
