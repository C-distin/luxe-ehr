export async function HashPassword(password: string): Promise<string> {
  return Bun.password.hash(password, {
    algorithm: "argon2id",
    memoryCost: 4096,
    timeCost: 3,
  })
}

export async function VerifyPassword( password: string, hash: string): Promise<boolean> {
  return Bun.password.verify(password, hash)
}
