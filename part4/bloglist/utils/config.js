const PORT = 3003 || process.env.PORT
const password = 1234
const MONGODB_URI = `mongodb+srv://plokm1234:${password}@phonebook.8wfirk5.mongodb.net/bloglist_database?retryWrites=true&w=majority`

module.exports = {
    MONGODB_URI,
    PORT
}