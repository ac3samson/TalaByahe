import { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, spacing, fonts } from '../theme';
import { useTrip } from '../context/TripContext';
import { routes, buses } from '../../../shared/mockData';

export default function StartTripScreen({ navigation }) {
  const { startTrip } = useTrip();
  const [selectedRoute, setSelectedRoute] = useState(routes[0].id);
  const [selectedBus, setSelectedBus] = useState(buses[0].id);
  const insets = useSafeAreaInsets();

  const handleStart = () => {
    const route = routes.find((r) => r.id === selectedRoute);
    const bus = buses.find((b) => b.id === selectedBus);
    startTrip({
      routeId: route.id,
      routeName: route.name,
      busId: bus.id,
      busPlate: bus.plate,
      stops: route.stops,
    });
    navigation.replace('Home');
  };

  return (
    <View style={styles.screen}>
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <Text style={styles.title}>Start New Trip</Text>
        <Text style={styles.subtitle}>Select route and bus assignment</Text>

        <Text style={styles.label}>Route</Text>
        {routes.map((r) => (
          <TouchableOpacity
            key={r.id}
            style={[styles.option, selectedRoute === r.id && styles.optionSelected]}
            onPress={() => setSelectedRoute(r.id)}
          >
            <Text style={[styles.optionTitle, selectedRoute === r.id && styles.optionTitleSelected]}>{r.name}</Text>
            <Text style={styles.optionSub}>{r.stops.join(' → ')}</Text>
          </TouchableOpacity>
        ))}

        <Text style={[styles.label, { marginTop: spacing.lg }]}>Bus</Text>
        {buses.map((b) => (
          <TouchableOpacity
            key={b.id}
            style={[styles.option, selectedBus === b.id && styles.optionSelected]}
            onPress={() => setSelectedBus(b.id)}
          >
            <Text style={[styles.optionTitle, selectedBus === b.id && styles.optionTitleSelected]}>
              {b.id} — {b.plate}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={[styles.footer, { paddingBottom: Math.max(insets.bottom, spacing.md) }]}>
        <TouchableOpacity style={styles.button} onPress={handleStart}>
          <Text style={styles.buttonText}>Start</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.gray50 },
  container: { flex: 1 },
  content: { padding: spacing.lg, paddingBottom: spacing.sm },
  title: { fontFamily: fonts.header, fontSize: 22, color: colors.red900 },
  subtitle: { fontFamily: fonts.body, color: colors.gray600, marginBottom: spacing.lg },
  label: { fontFamily: fonts.header, color: colors.gray800, marginBottom: spacing.sm },
  option: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: spacing.md,
    marginBottom: spacing.sm,
    borderWidth: 2,
    borderColor: colors.gray200,
  },
  optionSelected: { borderColor: colors.red700, backgroundColor: '#FFF8E1' },
  optionTitle: { fontFamily: fonts.header, color: colors.gray800 },
  optionTitleSelected: { color: colors.red900 },
  optionSub: { fontFamily: fonts.body, fontSize: 12, color: colors.gray600, marginTop: 4 },
  footer: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    backgroundColor: colors.gray50,
    borderTopWidth: 1,
    borderTopColor: colors.gray200,
  },
  button: {
    backgroundColor: colors.red700,
    padding: spacing.md,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: { fontFamily: fonts.bodyBold, color: colors.white, fontSize: 16 },
});
