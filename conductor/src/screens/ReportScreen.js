import { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, spacing, fonts } from '../theme';
import { useTrip } from '../context/TripContext';

const CATEGORIES = [
  'Vehicle Issue',
  'Passenger Incident',
  'Route Problem',
  'Fare Dispute',
  'Safety Concern',
  'Other',
];

export default function ReportScreen({ navigation }) {
  const { conductor, activeTrip } = useTrip();
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [description, setDescription] = useState('');
  const insets = useSafeAreaInsets();

  const handleSubmit = () => {
    if (!description.trim()) {
      Alert.alert('Missing details', 'Please describe the issue before submitting.');
      return;
    }

    Alert.alert(
      'Report Submitted',
      'Your report has been sent to dispatch. Reference will be shared shortly.',
      [{ text: 'OK', onPress: () => navigation.goBack() }],
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.screen}>
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
          <Text style={styles.title}>Issue a Report</Text>
          <Text style={styles.subtitle}>
            Report incidents or problems to dispatch while on duty.
          </Text>

          <Text style={styles.label}>Reported by</Text>
          <Text style={styles.meta}>
            {conductor?.name ?? 'Conductor'} · {conductor?.id ?? '—'}
          </Text>
          {activeTrip && (
            <>
              <Text style={styles.label}>Active trip</Text>
              <Text style={styles.meta}>
                {activeTrip.routeName} · Bus {activeTrip.busPlate}
              </Text>
            </>
          )}

          <Text style={styles.label}>Category</Text>
          <View style={styles.chipRow}>
            {CATEGORIES.map((item) => (
              <Pressable
                key={item}
                style={[styles.chip, category === item && styles.chipActive]}
                onPress={() => setCategory(item)}
              >
                <Text style={[styles.chipText, category === item && styles.chipTextActive]}>
                  {item}
                </Text>
              </Pressable>
            ))}
          </View>

          <Text style={styles.label}>Description</Text>
          <TextInput
            style={styles.textArea}
            value={description}
            onChangeText={setDescription}
            placeholder="Describe what happened..."
            placeholderTextColor={colors.gray600}
            multiline
            numberOfLines={6}
            textAlignVertical="top"
          />
        </ScrollView>

        <View style={[styles.footer, { paddingBottom: Math.max(insets.bottom, spacing.md) }]}>
          <Pressable
            style={({ pressed }) => [styles.submitBtn, pressed && styles.submitBtnPressed]}
            onPress={handleSubmit}
          >
            <Text style={styles.submitBtnText}>Submit Report</Text>
          </Pressable>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  screen: { flex: 1, backgroundColor: colors.gray50 },
  container: { flex: 1 },
  content: { padding: spacing.lg, paddingBottom: spacing.sm },
  title: { fontFamily: fonts.header, fontSize: 22, color: colors.red900 },
  subtitle: { fontFamily: fonts.body, color: colors.gray600, marginTop: 4, marginBottom: spacing.lg },
  label: { fontFamily: fonts.header, color: colors.gray800, marginBottom: 6, marginTop: spacing.md },
  meta: { fontFamily: fonts.body, color: colors.gray600, marginBottom: spacing.sm },
  chipRow: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  chip: {
    paddingVertical: 8,
    paddingHorizontal: spacing.md,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: colors.gray200,
    backgroundColor: colors.white,
  },
  chipActive: {
    borderColor: colors.red700,
    backgroundColor: '#FFF8E1',
  },
  chipText: { fontFamily: fonts.bodyMedium, color: colors.gray800, fontSize: 13 },
  chipTextActive: { fontFamily: fonts.bodyBold, color: colors.red900 },
  textArea: {
    fontFamily: fonts.body,
    borderWidth: 1,
    borderColor: colors.gray200,
    borderRadius: 12,
    backgroundColor: colors.white,
    padding: spacing.md,
    minHeight: 140,
    fontSize: 15,
    color: colors.gray800,
  },
  submitBtn: {
    backgroundColor: colors.red700,
    padding: spacing.md,
    borderRadius: 12,
    alignItems: 'center',
  },
  submitBtnPressed: { backgroundColor: colors.red900 },
  submitBtnText: { fontFamily: fonts.bodyBold, color: colors.white, fontSize: 16 },
  footer: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    backgroundColor: colors.gray50,
    borderTopWidth: 1,
    borderTopColor: colors.gray200,
  },
});
