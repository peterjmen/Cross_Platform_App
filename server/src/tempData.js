const { Exercise } = require('./models/Exercise');

const exercises = [
    {
        creator: '5f9c0b0b0b0b0b0b0b0b0b0b',
        name: 'Push-ups',
        bodyPart: 'Upper body',
        imageUrl: 'https://example.com/push-ups.jpg',
        muscles: ['Chest', 'Shoulders', 'Triceps'],
        description:
            'Start in a plank position with your hands shoulder-width apart...',
    },
    {
        creator: '5f9c0b0b0b0b0b0b0b0b0b0b',
        name: 'Squats',
        bodyPart: 'Lower body',
        imageUrl: 'https://example.com/squats.jpg',
        muscles: ['Quadriceps', 'Hamstrings', 'Glutes'],
        description: 'Stand with your feet shoulder-width apart...',
    },
    {
        creator: '5f9c0b0b0b0b0b0b0b0b0b0b',
        name: 'Plank',
        bodyPart: 'Core',
        imageUrl: 'https://example.com/plank.jpg',
        muscles: ['Abdominals', 'Obliques', 'Lower back'],
        description:
            'Start in a push-up position with your forearms on the ground...',
    },
];

async function seed() {
    await Exercise.deleteMany({});
    await Exercise.insertMany(exercises);
    console.log('Done seeding');
}

seed();
