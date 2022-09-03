const mostBlog = (blogs) => {
    let result = []
    blogs.forEach(blog => {
        result.forEach((res) => {
            if(Object.values(res).includes(blog.author)){
                res.blogs += 1
            }
        })
        result.push({
            "author": blog.author,
            "blogs" : 1,
        })
    });

    let temp = {
        "author" : "temp",
        "blogs": 0
    }
    result.forEach((res) => {
        if(res.blogs > temp.blogs){
            temp.author = res.author
            temp.blogs = res.blogs
        }
    })
   return temp
  }
  
module.exports = {
    mostBlog,
}