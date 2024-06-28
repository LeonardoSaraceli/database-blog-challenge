const prisma = require("../src/db")

async function seed() {
    const usersPromise = [
        {
            username: 'alicemay', 
            email: 'alicermay@gmail.com',
            profile: {
                create: {
                    first_name: 'Alice',
                    last_name: 'May',
                    bio: 'I am Alice and i love coding :)',
                    picture_url: 'date:image/alicemay.jpeg'
                }
            },
            posts: {
                create: [
                    {
                        title: 'I love prisma',
                        content: 'Much better than raw SQL',
                        is_published: true
                    },
                    {
                        title: 'JS is unbeatable',
                        content: 'Get your c# out of here',
                        is_published: true,
                        picture_url: 'data:image/jsisthebestlanguage.jpeg'
                    }
                ]
            }
        },
        { 
            username: 'javiertech', 
            email: 'javiertech@gmail.com',
            profile: {
                create: {
                    first_name: 'Javier',
                    last_name: 'Xapiro',
                    bio: 'Always on touch with new tech',
                    picture_url: 'date:image/javierxapiro.jpeg'
                }
            },
            posts: {
                create: [
                    {
                        title: 'My dog zeus',
                        content: 'It is so kind and handsome',
                        is_published: true,
                        picture_url: 'data:image/zeus.jpeg'
                    },
                    {
                        title: 'My cat blinky',
                        content: 'It blinks too much',
                        is_published: true,
                        picture_url: 'data:image/blinky.jpeg'
                    }
                ]
            }
        },
        { 
            username: 'lindseybo', 
            email: 'lindseybo@gmail.com',
            profile: {
                create: {
                    first_name: 'Lindsey',
                    last_name: 'Bolman',
                    bio: 'CSS is a programming language, change my mind',
                    picture_url: 'date:image/lindseybo.jpeg'
                }
            },
            posts: {
                create: [
                    {
                        title: 'Me at the beach',
                        content: 'The view is pretty nice',
                        is_published: true,
                        picture_url: 'data:image/beach.jpeg'
                    },
                    {
                        title: 'Rome is so amazing',
                        content: 'Eating the real pasta',
                        is_published: true,
                        picture_url: 'data:image/rome.jpeg'
                    }
                ]
            }
        }
    ].map(user => prisma.user.create({
        data: user,
        include: {
            profile: true,
            posts: true
        }
    }))

    const users = await Promise.all(usersPromise)

    const commentsPromise = [
        {
            userId: users[1].id,
            postId: users[0].posts[0].id,
            content: 'I do not agree.. SQL > prisma'
        },
        {
            userId: users[0].id,
            postId: users[1].posts[0].id,
            content: 'OMG, its so cute!!'
        },
        {
            userId: users[0].id,
            postId: users[2].posts[1].id,
            content: 'Need to go there ASAP'
        }
    ].map(comment => prisma.comment.create({
        data: comment
    }))

    const comments = await Promise.all(commentsPromise)

    const repliesPromise = [
        {
            userId: users[0].id,
            postId: users[0].posts[0].id,
            parentId: comments[0].id,
            content: 'Prisma makes your db life easier'
        },
        {
            userId: users[1].id,
            postId: users[1].posts[0].id,
            parentId: comments[1].id,
            content: 'Of course it is'
        },
        {
            userId: users[2].id,
            postId: users[2].posts[1].id,
            parentId: comments[2].id,
            content: 'Strongly recommend you!'
        }
    ].map(reply => prisma.comment.create({
        data: reply
    }))

    const replies = await Promise.all(repliesPromise)

    console.log('users created', users);
    console.log('comments created', comments);
    console.log('replies created', replies);

    process.exit(0);
}

seed()
    .catch(async (error) => {
        console.error(error);
        await prisma.$disconnect();
        process.exit(1);
    })