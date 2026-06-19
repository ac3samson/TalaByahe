import { Alert, StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { colors, spacing, fonts } from '../theme';
import { useTrip } from '../context/TripContext';

export default function TripSummaryScreen({ navigation }) {
  const { activeTrip, tickets, totalEarnings, endTrip, conductor } = useTrip();

  const handleEndTrip = () => {
    Alert.alert('End Trip', 'Finish this trip and save earnings summary?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'End Trip',
        style: 'destructive',
        onPress: () => {
          endTrip();
          navigation.navigate('Home');
        },
      },
    ]);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Trip Summary</Text>
      <Text style={styles.subtitle}>{activeTrip?.routeName}</Text>

      <View style={styles.card}>
        <Text style={styles.cardLabel}>Bus</Text>
        <Text style={styles.cardValue}>{activeTrip?.busPlate}</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.cardLabel}>Conductor</Text>
        <Text style={styles.cardValue}>{conductor?.name}</Text>
      </View>

      <View style={styles.summaryBox}>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryValue}>{tickets.length}</Text>
          <Text style={styles.summaryLabel}>Passengers</Text>
        </View>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryValue}>₱{totalEarnings}</Text>
          <Text style={styles.summaryLabel}>Total Earnings</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Ticket Breakdown</Text>
      {tickets.map((t) => (
        <View key={t.id} style={styles.ticketRow}>
          <Text style={styles.ticketRoute}>
            {t.from} → {t.to}
          </Text>
          <Text style={styles.ticketFare}>₱{t.fare}</Text>
        </View>
      ))}
      {tickets.length === 0 && <Text style={styles.empty}>No tickets issued yet.</Text>}

      <TouchableOpacity style={styles.endBtn} onPress={handleEndTrip}>
        <Text style={styles.endBtnText}>End Trip</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.gray50 },
  content: { padding: spacing.lg },
  title: { fontFamily: fonts.header, fontSize: 22, color: colors.red900 },
  subtitle: { fontFamily: fonts.body, color: colors.gray600, marginBottom: spacing.lg },
  card: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: spacing.md,
    marginBottom: spacing.sm,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardLabel: { fontFamily: fonts.body, color: colors.gray600 },
  cardValue: { fontFamily: fonts.header, color: colors.gray800 },
  summaryBox: {
    flexDirection: 'row',
    gap: spacing.md,
    marginVertical: spacing.lg,
  },
  summaryItem: {
    flex: 1,
    backgroundColor: colors.red900,
    borderRadius: 14,
    padding: spacing.lg,
    alignItems: 'center',
  },
  summaryValue: { fontFamily: fonts.headerExtra, color: colors.white, fontSize: 28 },
  summaryLabel: { fontFamily: fonts.bodySemi, color: colors.yellow500, marginTop: 4 },
  sectionTitle: { fontFamily: fonts.header, color: colors.gray800, marginBottom: spacing.sm },
  ticketRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: colors.white,
    padding: spacing.md,
    borderRadius: 10,
    marginBottom: spacing.sm,
  },
  ticketRoute: { fontFamily: fonts.body, color: colors.gray800 },
  ticketFare: { fontFamily: fonts.bodyBold, color: colors.red700 },
  empty: { fontFamily: fonts.body, color: colors.gray600, marginBottom: spacing.lg },
  endBtn: {
    backgroundColor: colors.yellow600,
    padding: spacing.md,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: spacing.lg,
  },
  endBtnText: { fontFamily: fonts.bodyBold, color: colors.white, fontSize: 16 },
});
