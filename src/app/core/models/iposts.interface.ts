
export interface IPosts {
  _id: string
  body: string
  privacy: string
  user: User
  sharedPost: any
  image:string
  likes: string[]
  createdAt: string
  commentsCount: number
  topComment: TopComment
  sharesCount: number
  likesCount: number
  isShare: boolean
  id: string
  bookmarked: boolean
}

export interface User {
  _id: string
  name: string
  username: string
  photo: string
}

export interface TopComment {
  _id: string
  content: string
  commentCreator: CommentCreator
  post: string
  parentComment: any
  likes: string[]
  createdAt: string
}

export interface CommentCreator {
  _id: string
  name: string
  username: string
  photo: string
}
