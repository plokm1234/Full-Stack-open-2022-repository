const mostLike = (blogs) => {
    let result = []
    blogs.forEach(blog => {
        result.forEach((res) => {
            if(Object.values(res).includes(blog.author)){
                res.likes += blog.likes
            }
        })
        result.push({
            "author": blog.author,
            "likes" : blog.likes,
        })
    });

    let temp = {
        "author" : "temp",
        "likes": 0
    }
    result.forEach((res) => {
        if(res.likes > temp.likes){
            temp.author = res.author
            temp.likes = res.likes
        }
    })
   return temp
  }
  
module.exports = {
    mostLike,
}