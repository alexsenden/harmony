import React from 'react'
import Post from '../post/post'

interface PostContainerProps {
  contentType: string
}
export default function PostContainer({ contentType }: PostContainerProps) {
  return (
    <div>
      <h2>
        These are your {contentType} Posts. For now they are static but later
        they will be dynamic
      </h2>

      <Post
        title="Is Jimmy Crazy?"
        name="Jason"
        numComments={100}
        numLikes={400}
        postId="101"
      />

      <Post
        title="Has anyone checked out Post Malone's new track? I think this one is fire"
        name="Jason"
        numComments={100}
        numLikes={400}
        postId="102"
      />
      <Post
        title="lorem ipsum"
        name="Jason"
        numComments={100}
        numLikes={400}
        postId="103"
      />
      <Post
        title="Lorem ipsum dolor sit amet consectetur adipisicing elit. "
        name="Jason"
        numComments={100}
        numLikes={400}
        postId="104"
      />
      <Post
        title="Quam, neque repellendus fugit facilis facere veritatis omnis aut cumque magni sapiente quaerat voluptates."
        name="Jason"
        numComments={100}
        numLikes={400}
        postId="105"
      />
      <Post
        title=" Soluta deserunt totam molestiae rerum mollitia atque ipsum."
        name="Jason"
        numComments={100}
        numLikes={400}
        postId="106"
      />
    </div>
  )
}
