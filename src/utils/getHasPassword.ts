import bcrypt from 'bcrypt'

const getHasPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10)
  return bcrypt.hashSync(password, salt)
}

export default getHasPassword
