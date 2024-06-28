const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

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
        }
    ].map(user => prisma.user.create({
        data: user,
        include: {
            profile: true,
            posts: true
        }
    }))

    const users = await Promise.all(usersPromise)
    console.log('users created', users);
    process.exit(0);
}

seed()
    .catch(async (error) => {
        console.error(error);
        await prisma.$disconnect();
        process.exit(1);
    })