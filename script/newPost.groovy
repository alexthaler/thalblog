date = new Date()
defaultTemplate = "article.jade"
defaultAuthor = "athaler"

BufferedReader br = new BufferedReader(new InputStreamReader(System.in))

println "%%%%%%%%%%%%%%%%%%%%%%%"
println "Creating a new post...."
println "%%%%%%%%%%%%%%%%%%%%%%%"

println "Please enter the post title: "
def blogPostTitle = br.readLine()
def blogPostFolder = blogPostTitle.replaceAll(/ /, '_')


blogFolder = new File("./contents/articles/" + blogPostFolder)

//Create a folder for a new blog post
if(blogFolder.exists()) {
    println("ERROR blog post already exists with that name")
} else {
    blogFolder.mkdirs()
}

//Create index.md for the new blog post
blogIndexFile = new File("./contents/articles/" + blogPostFolder + "/index.md")

blogIndexFile << ("---\n")
blogIndexFile << ("title: " + blogPostTitle + "\n")
blogIndexFile << ("author: " + defaultAuthor + "\n")
blogIndexFile << ("date: " + date.format("yyyy-MM-dd HH:MM") + "\n")
blogIndexFile << ("template: " + defaultTemplate + "\n")
blogIndexFile << ("---\n")
blogIndexFile << ("\n")
