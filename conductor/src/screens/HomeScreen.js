import { useEffect, useLayoutEffect, useState, useCallback } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, spacing, fonts } from '../theme';
import { useTrip } from '../context/TripContext';
import HomeSidebar from '../components/HomeSidebar';

export default function HomeScreen({ navigation, route }) {
  const { conductor, setConductor, activeTrip, tickets, totalEarnings, logout } = useTrip();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const insets = useSafeAreaInsets();

  useEffect(() => {
    if (route.params?.conductor) {
      setConductor(route.params.conductor);
    }
  }, [route.params, setConductor]);

  const handleLogout = useCallback(async () => {
    await logout();
    navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
  }, [logout, navigation]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRightContainerStyle: { paddingRight: 4 },
      headerRight: () => (
        <Pressable
          onPress={() => setSidebarOpen(true)}
          style={({ pressed }) => [styles.menuBtn, pressed && styles.menuBtnPressed]}
          hitSlop={8}
        >
          <Text style={styles.menuBtnText}>☰</Text>
        </Pressable>
      ),
    });
  }, [navigation]);

  return (
    <View style={styles.screen}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={[styles.content, activeTrip && styles.contentWithFooter]}
      >
        <Text style={styles.greeting}>Hello, {conductor?.name ?? 'Conductor'}!</Text>
        <Text style={styles.sub}>{conductor?.id ?? 'EMP-001'}</Text>

        {activeTrip ? (
          <View style={styles.tripCard}>
            <Text style={styles.tripLabel}>Active Trip</Text>
            <Text style={styles.tripName}>{activeTrip.routeName}</Text>
            <Text style={styles.tripDetail}>Bus {activeTrip.busPlate}</Text>
            <View style={styles.statsRow}>
              <View style={styles.stat}>
                <Text style={styles.statValue}>{tickets.length}</Text>
                <Text style={styles.statLabel}>Passengers</Text>
              </View>
              <View style={styles.stat}>
                <Text style={styles.statValue}>₱{totalEarnings}</Text>
                <Text style={styles.statLabel}>Earnings</Text>
              </View>
            </View>
          </View>
        ) : (
          <View style={styles.emptyCard}>
            <Text style={styles.emptyTitle}>No active trip</Text>
            <Text style={styles.emptyText}>Start a trip to begin issuing digital tickets</Text>
          </View>
        )}

        {activeTrip && (
          <>
            <TouchableOpacity style={styles.secondaryBtn} onPress={() => navigation.navigate('PassengerList')}>
              <Text style={styles.secondaryBtnText}>View Passengers ({tickets.length})</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.summaryBtn} onPress={() => navigation.navigate('TripSummary')}>
              <Text style={styles.summaryBtnText}>End Trip</Text>
            </TouchableOpacity>
          </>
        )}
      </ScrollView>

      <View style={[styles.footer, { paddingBottom: Math.max(insets.bottom, spacing.md) }]}>
        <TouchableOpacity
          style={styles.primaryBtn}
          onPress={() => (activeTrip ? navigation.navigate('IssueTicket') : navigation.navigate('StartTrip'))}
        >
          <Text style={styles.primaryBtnText}>{activeTrip ? 'Issue Ticket' : 'Start Trip'}</Text>
        </TouchableOpacity>
      </View>

      <HomeSidebar
        visible={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        conductor={conductor}
        activeTrip={activeTrip}
        ticketCount={tickets.length}
        navigation={navigation}
        onLogout={handleLogout}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  menuBtn: {
    marginRight: 0,
    width: 36,
    height: 36,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.15)',
  },
  menuBtnPressed: {
    backgroundColor: 'rgba(255,255,255,0.25)',
  },
  menuBtnText: {
    fontFamily: fonts.bodyBold,
    color: colors.white,
    fontSize: 20,
  },
  screen: { flex: 1, backgroundColor: colors.gray50 },
  container: { flex: 1 },
  content: { padding: spacing.lg, flexGrow: 1 },
  contentWithFooter: { paddingBottom: spacing.sm },
  greeting: { fontFamily: fonts.header, fontSize: 24, color: colors.red900 },
  sub: { fontFamily: fonts.body, color: colors.gray600, marginBottom: spacing.lg },
  tripCard: {
    backgroundColor: colors.red900,
    borderRadius: 16,
    padding: spacing.lg,
    marginBottom: spacing.lg,
  },
  tripLabel: { fontFamily: fonts.bodySemi, color: colors.yellow500, fontSize: 13 },
  tripName: { fontFamily: fonts.header, color: colors.white, fontSize: 20, marginTop: 4 },
  tripDetail: { fontFamily: fonts.body, color: 'rgba(255,255,255,0.8)', marginTop: 4, marginBottom: spacing.md },
  statsRow: { flexDirection: 'row', gap: spacing.md },
  stat: { flex: 1, backgroundColor: 'rgba(255,255,255,0.12)', borderRadius: 10, padding: spacing.md },
  statValue: { fontFamily: fonts.header, color: colors.white, fontSize: 22 },
  statLabel: { fontFamily: fonts.body, color: 'rgba(255,255,255,0.75)', fontSize: 12 },
  emptyCard: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: spacing.xl,
    alignItems: 'center',
    marginBottom: spacing.lg,
    borderWidth: 1,
    borderColor: colors.gray200,
  },
  emptyTitle: { fontFamily: fonts.header, fontSize: 18, color: colors.red900 },
  emptyText: { fontFamily: fonts.body, color: colors.gray600, textAlign: 'center', marginTop: 8 },
  footer: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    backgroundColor: colors.gray50,
    borderTopWidth: 1,
    borderTopColor: colors.gray200,
  },
  primaryBtn: {
    backgroundColor: colors.red700,
    padding: spacing.md,
    borderRadius: 12,
    alignItems: 'center',
  },
  primaryBtnText: { fontFamily: fonts.bodyBold, color: colors.white, fontSize: 16 },
  secondaryBtn: {
    backgroundColor: colors.white,
    padding: spacing.md,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.red700,
    marginBottom: spacing.sm,
  },
  secondaryBtnText: { fontFamily: fonts.bodyBold, color: colors.red700, fontSize: 16 },
  summaryBtn: {
    backgroundColor: colors.yellow500,
    padding: spacing.md,
    borderRadius: 12,
    alignItems: 'center',
  },
  summaryBtnText: { fontFamily: fonts.bodyBold, color: colors.red900, fontSize: 16 },
});
