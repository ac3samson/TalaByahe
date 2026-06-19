import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { colors, spacing, fonts } from '../theme';
import { company } from '../../../shared/mockData';

export default function ReceiptScreen({ route, navigation }) {
  const { ticket } = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.receipt}>
        <Text style={styles.header}>DIGITAL RECEIPT</Text>
        <Text style={styles.company}>{company.name}</Text>
        <View style={styles.divider} />
        <Text style={styles.ticketId}>{ticket.id}</Text>
        <Text style={styles.date}>{new Date().toLocaleDateString('en-PH')}</Text>
        <View style={styles.row}>
          <Text style={styles.rowLabel}>From</Text>
          <Text style={styles.rowValue}>{ticket.from}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.rowLabel}>To</Text>
          <Text style={styles.rowValue}>{ticket.to}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.rowLabel}>Time</Text>
          <Text style={styles.rowValue}>{ticket.time}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.rowLabel}>Conductor</Text>
          <Text style={styles.rowValue}>{ticket.conductor}</Text>
        </View>
        {ticket.discountApplied && (
          <>
            <View style={styles.row}>
              <Text style={styles.rowLabel}>Regular fare</Text>
              <Text style={styles.rowValue}>₱{ticket.baseFare}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.rowLabel}>Discount</Text>
              <Text style={styles.discountValue}>{ticket.discountPercent}% (Senior / PWD / Student)</Text>
            </View>
          </>
        )}
        <View style={styles.fareRow}>
          <Text style={styles.fareLabel}>TOTAL FARE</Text>
          <Text style={styles.fareValue}>₱{ticket.fare}</Text>
        </View>
        <Text style={styles.footer}>Thank you for riding with us!</Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Home')}>
        <Text style={styles.buttonText}>Back to Home</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.secondary} onPress={() => navigation.replace('IssueTicket')}>
        <Text style={styles.secondaryText}>Issue Another Ticket</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.gray50, padding: spacing.lg, justifyContent: 'center' },
  receipt: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: spacing.xl,
    borderWidth: 2,
    borderColor: colors.red900,
    borderStyle: 'dashed',
    marginBottom: spacing.lg,
  },
  header: { fontFamily: fonts.headerExtra, textAlign: 'center', letterSpacing: 2, color: colors.red900 },
  company: { fontFamily: fonts.body, textAlign: 'center', color: colors.gray600, marginTop: 4, marginBottom: spacing.md },
  divider: { height: 1, backgroundColor: colors.gray200, marginVertical: spacing.md },
  ticketId: { fontFamily: fonts.header, textAlign: 'center', fontSize: 20, color: colors.red900 },
  date: { fontFamily: fonts.body, textAlign: 'center', color: colors.gray600, marginBottom: spacing.md },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: spacing.sm },
  rowLabel: { fontFamily: fonts.body, color: colors.gray600 },
  rowValue: { fontFamily: fonts.bodySemi, color: colors.gray800 },
  discountValue: { fontFamily: fonts.bodySemi, color: colors.red700, fontSize: 13, flexShrink: 1, textAlign: 'right' },
  fareRow: {
    marginTop: spacing.md,
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.gray200,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  fareLabel: { fontFamily: fonts.header, color: colors.red900 },
  fareValue: { fontFamily: fonts.headerExtra, fontSize: 28, color: colors.yellow600 },
  footer: { fontFamily: fonts.body, textAlign: 'center', marginTop: spacing.lg, color: colors.gray600 },
  button: {
    backgroundColor: colors.red700,
    padding: spacing.md,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  buttonText: { fontFamily: fonts.bodyBold, color: colors.white, fontSize: 16 },
  secondary: { padding: spacing.md, alignItems: 'center' },
  secondaryText: { fontFamily: fonts.bodyBold, color: colors.red700 },
});
