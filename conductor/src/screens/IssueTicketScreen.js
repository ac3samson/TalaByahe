import { useMemo, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { colors, spacing, fonts } from '../theme';
import { useTrip } from '../context/TripContext';
import { getFare } from '../../../shared/mockData';

const DISCOUNT_PERCENT = 20;

export default function IssueTicketScreen({ navigation }) {
  const { activeTrip, issueTicket } = useTrip();
  const stops = activeTrip?.stops ?? [];
  const [from, setFrom] = useState(stops[0]);
  const [to, setTo] = useState(stops[1]);
  const [discountApplied, setDiscountApplied] = useState(false);

  const baseFare = useMemo(() => {
    if (!activeTrip || !from || !to || from === to) return null;
    return getFare(activeTrip.routeId, from, to);
  }, [activeTrip, from, to]);

  const finalFare = useMemo(() => {
    if (baseFare == null) return null;
    if (!discountApplied) return baseFare;
    return Math.round(baseFare * (1 - DISCOUNT_PERCENT / 100));
  }, [baseFare, discountApplied]);

  const handleIssue = () => {
    if (finalFare == null) return;
    const ticket = issueTicket({
      from,
      to,
      fare: finalFare,
      baseFare,
      discountApplied,
    });
    navigation.navigate('Receipt', { ticket });
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Issue Ticket</Text>

      <Text style={styles.label}>Origin</Text>
      {stops.map((stop) => (
        <TouchableOpacity key={`from-${stop}`} style={[styles.chip, from === stop && styles.chipActive]} onPress={() => setFrom(stop)}>
          <Text style={[styles.chipText, from === stop && styles.chipTextActive]}>{stop}</Text>
        </TouchableOpacity>
      ))}

      <Text style={[styles.label, { marginTop: spacing.lg }]}>Destination</Text>
      {stops.map((stop) => (
        <TouchableOpacity key={`to-${stop}`} style={[styles.chip, to === stop && styles.chipActive]} onPress={() => setTo(stop)}>
          <Text style={[styles.chipText, to === stop && styles.chipTextActive]}>{stop}</Text>
        </TouchableOpacity>
      ))}

      <Text style={[styles.label, { marginTop: spacing.lg }]}>Discount</Text>
      <Text style={styles.discountNote}>Senior, PWD, and Student passengers</Text>
      <View style={styles.discountRow}>
        <TouchableOpacity
          style={[styles.discountChip, !discountApplied && styles.chipActive]}
          onPress={() => setDiscountApplied(false)}
        >
          <Text style={[styles.chipText, !discountApplied && styles.chipTextActive]}>No discount</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.discountChip, discountApplied && styles.chipActive]}
          onPress={() => setDiscountApplied(true)}
        >
          <Text style={[styles.chipText, discountApplied && styles.chipTextActive]}>Apply {DISCOUNT_PERCENT}% off</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.fareBox}>
        <Text style={styles.fareLabel}>{discountApplied ? 'Fare after discount' : 'Computed Fare'}</Text>
        <Text style={styles.fareValue}>{finalFare != null ? `₱${finalFare}` : '—'}</Text>
        {discountApplied && baseFare != null && (
          <Text style={styles.baseFare}>Regular fare: ₱{baseFare}</Text>
        )}
        {from === to && <Text style={styles.error}>Origin and destination must differ</Text>}
        {from !== to && !baseFare && <Text style={styles.error}>No fare found for this segment</Text>}
      </View>

      <TouchableOpacity style={[styles.button, finalFare == null && styles.buttonDisabled]} onPress={handleIssue} disabled={finalFare == null}>
        <Text style={styles.buttonText}>Generate Digital Ticket</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.gray50 },
  content: { padding: spacing.lg },
  title: { fontFamily: fonts.header, fontSize: 22, color: colors.red900, marginBottom: spacing.lg },
  label: { fontFamily: fonts.header, color: colors.gray800, marginBottom: spacing.sm },
  discountNote: {
    fontFamily: fonts.body,
    color: colors.gray600,
    fontSize: 13,
    marginBottom: spacing.sm,
  },
  discountRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing.sm,
  },
  discountChip: {
    flex: 1,
    backgroundColor: colors.white,
    padding: spacing.md,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.gray200,
    alignItems: 'center',
  },
  chip: {
    backgroundColor: colors.white,
    padding: spacing.md,
    borderRadius: 10,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: colors.gray200,
  },
  chipActive: { borderColor: colors.red700, backgroundColor: '#FFF8E1' },
  chipText: { fontFamily: fonts.bodyMedium, color: colors.gray800, textAlign: 'center' },
  chipTextActive: { fontFamily: fonts.bodyBold, color: colors.red900 },
  fareBox: {
    backgroundColor: colors.red900,
    borderRadius: 16,
    padding: spacing.lg,
    alignItems: 'center',
    marginVertical: spacing.lg,
  },
  fareLabel: { fontFamily: fonts.bodySemi, color: colors.yellow500 },
  fareValue: { fontFamily: fonts.header, color: colors.white, fontSize: 40, marginTop: 4 },
  baseFare: {
    fontFamily: fonts.body,
    color: 'rgba(255,255,255,0.75)',
    fontSize: 13,
    marginTop: 6,
    textDecorationLine: 'line-through',
  },
  error: { fontFamily: fonts.body, color: '#FFB4A2', fontSize: 13, marginTop: 8 },
  button: {
    backgroundColor: colors.yellow500,
    padding: spacing.md,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonDisabled: { opacity: 0.5 },
  buttonText: { fontFamily: fonts.bodyBold, color: colors.red900, fontSize: 16 },
});
