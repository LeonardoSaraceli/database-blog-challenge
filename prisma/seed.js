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
                        content: 'He is so kind and handsome',
                        is_published: true,
                        picture_url: 'data:image/zeus.jpeg'
                    },
                    {
                        title: 'My cat blinky',
                        content: 'She blinks too much',
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
            userId: (await usersPromise[1]).id,
            postId: (await usersPromise[0]).posts[0].id,
            content: 'I do not agree.. SQL > prisma'
        },
        {
            userId: (await usersPromise[0]).id,
            postId: (await usersPromise[1]).posts[0].id,
            content: 'OMG, he is so cute!!'
        },
        {
            userId: (await usersPromise[0]).id,
            postId: (await usersPromise[2]).posts[1].id,
            content: 'Need to go there ASAP'
        }
    ].map(comment => prisma.comment.create({
        data: comment
    }))

    const comments = await Promise.all(commentsPromise)

    console.log('users created', users);
    console.log('comments created', comments);

    process.exit(0);
}

seed()
    .catch(async (error) => {
        console.error(error);
        await prisma.$disconnect();
        process.exit(1);
    })