const Comments = (blog) => {
    console.log('BLOG', blog.blog.comments)
    if (blog.blog.comments.length === 0) {
        return (
            <div>
                <h4>comments</h4>
                <div>no comments yet</div>
            </div>
        )
    }
    return (
        <div>
            <h4>comments</h4>
            {blog.blog.comments.map((comment) => (
                <div key={comment.id}>
                    <li>{comment.content}</li>
                </div>
            ))}
        </div>
    )
}

export default Comments
