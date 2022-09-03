const mostLikes = (blogs) => {
    let most = 0
    let post = {}
    blogs.forEach(blog => {
       if(blog.likes > most){
        most = blog.likes
        post = blog
       }
    });
   return post
  }
  
module.exports = {
    mostLikes,
}