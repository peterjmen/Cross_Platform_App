// The purpose of this file is to add some default data to the database
// This is not something you would normally do in production,
// but it is useful for marking, so you can see the app working without having to add data yourself

const { Exercise } = require("./models/Exercise");
const { Program } = require("./models/Program");
const { User } = require("./models/User");

async function seed() {
    await User.deleteMany({});
    await Exercise.deleteMany({});
    await Program.deleteMany({});

    const user = await User.create({
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: 'password123',
    });

    const exercise1 = await Exercise.create({
        creator: user.id,
        name: 'Shoulder Press',
        description: 'Sit on a chair, hold dumbbells at shoulder level, and press them overhead. Lower them back to shoulder level and repeat.',
        bodyPart: 'Shoulders',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Dumbbell-shoulder-press-1.png/640px-Dumbbell-shoulder-press-1.png',
        muscles: ['Deltoids'],
        sets: 3,
        repetitions: 10,
        rest: 60,
        frequency: '3 times a week',
    });

    const exercise2 = await Exercise.create({
        creator: user.id,
        name: 'Barbell Squat',
        description: 'Stand with feet shoulder-width apart. Place a barbell across your upper back. Bend your knees and lower your body down. Keep your back straight and chest lifted. Push through your heels to return to the starting position.',
        bodyPart: 'Legs',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Squats-2.png/640px-Squats-2.png',
        muscles: ['Quadriceps', 'Hamstrings', 'Glutes'],
        sets: 3,
        repetitions: 10,
        rest: 60,
        frequency: '3 times a week',
    });

    const exercise3 = await Exercise.create({
        creator: user.id,
        name: 'Leg Press',
        description: '1. Sit on the machine with your back against the backrest.\n2. Place your feet on the footplate.\n3. Push the footplate away by extending your legs.\n4. Bend your knees to lower the footplate back down.\n5. Repeat for the desired number of repetitions.',
        bodyPart: 'Legs',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/6/6c/Narrow-stance-leg-press-1-1024x671.png',
        muscles: ['Quadriceps', 'Hamstrings', 'Glutes'],
        sets: 3,
        repetitions: 10,
        rest: 60,
        frequency: '3 times a week',
    });

    const exercise4 = await Exercise.create({
        creator: user.id,
        name: 'Bench Press',
        description: 'Lie on a flat bench with feet firmly planted on the floor. Grip the barbell with slightly wider than shoulder-width grip. Lift the barbell off the rack and lower it to your mid-chest. Push the barbell back up to the starting position by extending your arms. Repeat for desired repetitions and carefully rack the barbell at the end.',
        bodyPart: 'Upper body',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Bench-press-1.png/578px-Bench-press-1.png?20101030110115',
        muscles: ['Chest', 'Shoulders', 'Triceps'],
        sets: 3,
        repetitions: 10,
        rest: 60,
        frequency: '3 times a week',
    });

    const exercise5 = await Exercise.create({
        creator: user.id,
        name: 'Bent Over Row',
        description: 'Bend forward with a straight back, hold the barbell with an overhand grip, and pull it towards your abdomen. Lower it back down and repeat.',
        bodyPart: 'Back',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Barbell-rear-delt-row-1.png/576px-Barbell-rear-delt-row-1.png?20101030105016',
        muscles: ['Lats', 'Rhomboids', 'Biceps'],
        sets: 3,
        repetitions: 10,
        rest: 60,
        frequency: '3 times a week',
    });

    const exercise6 = await Exercise.create({
        creator: user.id,
        name: 'Lat Pulldown',
        description: 'Sit on the lat pulldown machine. Grasp the wide bar with hands wider than shoulder-width. Pull the bar down towards your upper chest, squeezing your shoulder blades together. Slowly release the bar back up and repeat.',
        bodyPart: 'Back',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Wide_grip_lat_pull_down_1.svg/396px-Wide_grip_lat_pull_down_1.svg.png?20160310002655',
        muscles: ['Lats', 'Rhomboids', 'Biceps'],
        sets: 3,
        repetitions: 10,
        rest: 60,
        frequency: '3 times a week',
    });

    const exercise7 = await Exercise.create({
        creator: user.id,
        name: 'Bicep Curl',
        description: 'Stand with feet shoulder-width apart. Hold a barbell with palms facing upward. Curl the barbell up towards your shoulders, squeezing your biceps. Lower the barbell back down and repeat.',
        bodyPart: 'Arms',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/Close_grip_standing_bicep_curls_with_barbell_2.svg/650px-Close_grip_standing_bicep_curls_with_barbell_2.svg.png?20160309201728',
        muscles: ['Biceps'],
        sets: 3,
        repetitions: 10,
        rest: 60,
        frequency: '3 times a week',
    });

    const exercise8 = await Exercise.create({
        creator: user.id,
        name: 'Tricep Extensions',
        description: 'Stand with feet shoulder-width apart. Hold a dumbbell with one hand. Raise your arm overhead and then bend your elbow, lowering the dumbbell behind your head. Extend your arm back up to the starting position. Repeat and then switch sides.',
        bodyPart: 'Arms',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/7/7b/Standing-one-arm-triceps-extension-2.gif?20101107070313',
        muscles: ['Triceps'],
        sets: 3,
        repetitions: 10,
        rest: 60,
        frequency: '3 times a week',
    });

    const program1 = await Program.create({
        creator: user.id,
        name: 'Upper/Lower Split',
        description: 'This program follows an upper/lower split, alternating between upper body and lower body exercises.',
        exercises: [exercise1.id, exercise2.id, exercise4.id, exercise6.id],
    });

    const program2 = await Program.create({
        creator: user.id,
        name: 'Push-Pull Legs Split',
        description: 'This program follows a push-pull legs split, focusing on pushing exercises, pulling exercises, and leg exercises.',
        exercises: [exercise1.id, exercise4.id, exercise5.id, exercise7.id, exercise2.id, exercise3.id],
    });

    console.log('Done seeding');
}

seed();