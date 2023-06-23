const {Exercise} = require('./models/Exercise');
const {Program} = require('./models/Program');
const {User} = require('./models/User');

async function seed() {
    await User.deleteMany({});
    await Exercise.deleteMany({});
    await Program.deleteMany({});

    const user = await User.create({
        name: 'John Doe',
        email: 'example@gmail.com',
        password: 'password123',
    });

    const exercise1 = await Exercise.create({
        creator: user.id,
        name: 'Push-ups',
        description:
            'Start in a plank position with your hands shoulder-width apart...',
        bodyPart: 'Upper body',
        imageUrl:
            'https://images.pexels.com/photos/2803158/pexels-photo-2803158.jpeg?cs=srgb&dl=pexels-tembela-bohle-2803158.jpg&fm=jpg',
        muscles: ['Chest', 'Shoulders', 'Triceps'],
    });

    const exercise2 = await Exercise.create({
        creator: user.id,
        name: 'Squats',
        description: 'Stand with your feet shoulder-width apart...',
        bodyPart: 'Lower body',
        imageUrl:
            'https://images.pexels.com/photos/2803158/pexels-photo-2803158.jpeg?cs=srgb&dl=pexels-tembela-bohle-2803158.jpg&fm=jpg',
        muscles: ['Quadriceps', 'Hamstrings', 'Glutes'],
    });

    const exercise3 = await Exercise.create({
        creator: user.id,
        name: 'Plank',
        description:
            'Start in a push-up position with your forearms on the ground...',
        bodyPart: 'Core',
        imageUrl:
            'https://images.pexels.com/photos/2803158/pexels-photo-2803158.jpeg?cs=srgb&dl=pexels-tembela-bohle-2803158.jpg&fm=jpg',
        muscles: ['Abdominals', 'Obliques', 'Lower back'],
    });

    const program = await Program.create({
        creator: user.id,
        name: 'Full body workout',
        description: 'This is a full body workout program...',
        exercises: [exercise1.id, exercise2.id, exercise3.id],
        sets: 3,
        repetitions: 10,
        rest: 60,
        frequency: '3 times a week',
    });

    console.log('Done seeding');
}

seed();
