import mongoose, {ConnectOptions} from 'mongoose'

const db = {
  connect: async (dbHost: string) => {
    await mongoose
      .connect(dbHost, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        autoIndex: true, // Без этого опция уникального поля не работает
      } as ConnectOptions)
      .then((res) => {
        console.log('Connected to Distribution API Database - Initial Connection')
      })
      .catch((err) => {
        console.log(`Initial Distribution API Database connection error occurred -`, err)
      })
  },
  close: () => {
    mongoose.connection.close()
  },
}

export default db
