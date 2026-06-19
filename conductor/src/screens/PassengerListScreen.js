import { FlatList, StyleSheet, Text, View } from 'react-native';
import { colors, spacing, fonts } from '../theme';
import { useTrip } from '../context/TripContext';

export default function PassengerListScreen() {
  const { tickets } = useTrip();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Passenger Monitor</Text>
      <Text style={styles.subtitle}>{tickets.length} ticket(s) issued this trip</Text>
      <FlatList
        data={tickets}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        ListEmptyComponent={<Text style={styles.empty}>No passengers yet. Issue a ticket to begin.</Text>}
        renderItem={({ item, index }) => (
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.ticketId}>{item.id}</Text>
              <Text style={styles.fare}>₱{item.fare}</Text>
            </View>
            <Text style={styles.route}>
              {item.from} → {item.to}
            </Text>
            <Text style={styles.meta}>
              #{index + 1} · {item.time}
            </Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.gray50, padding: spacing.lg },
  title: { fontFamily: fonts.header, fontSize: 22, color: colors.red900 },
  subtitle: { fontFamily: fonts.body, color: colors.gray600, marginBottom: spacing.md },
  list: { paddingBottom: spacing.xl },
  empty: { fontFamily: fonts.body, textAlign: 'center', color: colors.gray600, marginTop: spacing.xl },
  card: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: spacing.md,
    marginBottom: spacing.sm,
    borderLeftWidth: 4,
    borderLeftColor: colors.yellow500,
  },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
  ticketId: { fontFamily: fonts.header, color: colors.red900 },
  fare: { fontFamily: fonts.header, color: colors.yellow600 },
  route: { fontFamily: fonts.bodyMedium, color: colors.gray800 },
  meta: { fontFamily: fonts.body, color: colors.gray600, fontSize: 12, marginTop: 4 },
});
