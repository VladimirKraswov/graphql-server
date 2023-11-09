export const createConfirmationUrl = async (userId: string) => {
  return `http://localhost:${process.env.PORT}/user/confirm/${userId}`
}
