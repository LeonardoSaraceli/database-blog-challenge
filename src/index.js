const prisma = require("./db")

async function main() {
    const getAllUsers = await prisma.user.findMany()

    console.log('users', getAllUsers)

    const getUserPostsById = await prisma.post.findMany({
        where: {
            userId: 2
        }
    })

    console.log('posts from the user with id of 2', getUserPostsById)

    const getUserByIdAndItsProfile = await prisma.user.findUnique({
        where: {
            id: 1
        },
        include: {
            profile: true
        }
    })

    console.log('user with id of 1 and its profile', getUserByIdAndItsProfile)

    const updatePostById = await prisma.post.update({
        where: {
            id: 1
        },
        data: {
            title: 'Changed my mind, prisma is bad',
            content: 'Yeah, SQL > prisma'
        }
    })

    console.log('updated post with id of 1', updatePostById)

    const deletePostById = await prisma.post.delete({
        where: {
            id: 3
        }
    })

    console.log('deleted post with id of 3', deletePostById)
}

main().then(() => {console.log('done')})
