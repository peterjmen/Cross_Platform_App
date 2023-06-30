import { Document, Image, Page, StyleSheet, Text, View } from '@react-pdf/renderer';
import ms from 'enhanced-ms';

export function ProgramPDF({ program }) {
    return <Document>
        <Page style={styles.body}>
            <Text style={styles.title}>{program.name}</Text>

            <Text style={styles.description}>{program.description}</Text>

            {program.exercises.map((exercise, index) => <View
                key={`${exercise.id}-${index}`}
                style={styles.card}
            >
                <View style={styles.content}>
                    <Text>{index + 1}. {exercise.name}</Text>

                    <Text>{exercise.description}</Text>

                    <View style={styles.row}>
                        <Text style={styles.badge}>Sets: {exercise.sets}</Text>
                        <Text style={styles.badge}>Reps: {exercise.repetitions}</Text>
                        <Text style={styles.badge}>Rest: {ms(exercise.rest * 1000)}</Text>
                        <Text style={styles.badge}>Freq: {exercise.frequency}</Text>
                    </View>
                </View>

                <Image src={exercise.imageUrl} style={styles.image} />
            </View>)}

            <Text
                style={styles.number}
                render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`}
                fixed
            />
        </Page>
    </Document>
}

const styles = StyleSheet.create({
    body: {
        paddingTop: 35,
        paddingBottom: 65,
        paddingHorizontal: 35,
        fontSize: 12,
    },
    title: {
        fontSize: 24,
        textAlign: 'center',
        marginBottom: 24,
    },
    description: {
        fontSize: 16,
    },

    card: {
        marginTop: 24,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    content: {
        width: '63%',
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
    },
    image: {
        width: '33%',
        borderRadius: 8,
    },

    row: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
    },
    badge: {
        backgroundColor: '#CCCCCC',
        color: 'black',
        padding: 4,
        borderRadius: 8,
    },

    number: {
        position: 'absolute',
        fontSize: 12,
        bottom: 30,
        left: 0,
        right: 0,
        textAlign: 'center',
        color: 'grey',
    },
});