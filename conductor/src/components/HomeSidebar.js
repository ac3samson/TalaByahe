import { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Pressable,
  StyleSheet,
  Text,
  View,
  Modal,
  Alert,
  ScrollView,
} from 'react-native';
import { FontAwesome6 } from '@expo/vector-icons';
import { colors, spacing, fonts } from '../theme';

const MENU_ITEMS = [
  { id: 'passengers', label: 'View Passengers', faIcon: 'user-group', requiresTrip: true },
  { id: 'summary', label: 'Trip Summary', faIcon: 'chart-simple', requiresTrip: true },
  { id: 'report', label: 'Issue a Report', faIcon: 'circle-exclamation' },
  { id: 'help', label: 'Help & Support', faIcon: 'hand-holding-hand' },
];

function MenuIcon({ item }) {
  if (item.faIcon) {
    return (
      <View style={styles.menuIconWrap}>
        <FontAwesome6 name={item.faIcon} size={20} color={colors.gray800} solid />
      </View>
    );
  }

  return <Text style={styles.menuIcon}>{item.icon}</Text>;
}

export default function HomeSidebar({
  visible,
  onClose,
  conductor,
  activeTrip,
  ticketCount,
  navigation,
  onLogout,
}) {
  const slideAnim = useRef(new Animated.Value(300)).current;
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (visible) {
      setModalVisible(true);
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }).start();
      return;
    }

    if (!modalVisible) return;

    Animated.timing(slideAnim, {
      toValue: 300,
      duration: 250,
      useNativeDriver: true,
    }).start(({ finished }) => {
      if (finished) setModalVisible(false);
    });
  }, [visible, slideAnim, modalVisible]);

  const handleItemPress = (id) => {
    onClose();
    setTimeout(() => {
      switch (id) {
        case 'passengers':
          navigation.navigate('PassengerList');
          break;
        case 'summary':
          navigation.navigate('TripSummary');
          break;
        case 'report':
          navigation.navigate('Report');
          break;
        case 'help':
          Alert.alert(
            'Help & Support',
            'For urgent issues, contact dispatch at (02) 8123-4567 or support@talabyahe.ph.',
          );
          break;
        default:
          break;
      }
    }, 200);
  };

  const handleLogout = () => {
    onClose();
    Alert.alert('Sign out', 'Are you sure you want to sign out?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Sign out', style: 'destructive', onPress: onLogout },
    ]);
  };

  return (
    <Modal visible={modalVisible} transparent animationType="none" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <Pressable style={styles.backdrop} onPress={onClose} />
        <Animated.View style={[styles.panel, { transform: [{ translateX: slideAnim }] }]}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Menu</Text>
            <Pressable onPress={onClose} style={styles.closeBtn} hitSlop={8}>
              <Text style={styles.closeBtnText}>✕</Text>
            </Pressable>
          </View>

          <View style={styles.profile}>
            <View style={styles.avatar}>
              <FontAwesome6 name="user" size={28} color={colors.red900} solid />
            </View>
            <Text style={styles.profileName}>{conductor?.name ?? 'Conductor'}</Text>
            <Text style={styles.profileId}>{conductor?.id ?? '—'}</Text>
            {activeTrip && (
              <View style={styles.tripBadge}>
                <Text style={styles.tripBadgeText}>On trip · {activeTrip.routeName}</Text>
              </View>
            )}
          </View>

          <ScrollView style={styles.menu} showsVerticalScrollIndicator={false}>
            {MENU_ITEMS.filter((item) => !item.requiresTrip || activeTrip).map((item) => (
              <Pressable
                key={item.id}
                style={({ pressed }) => [styles.menuItem, pressed && styles.menuItemPressed]}
                onPress={() => handleItemPress(item.id)}
              >
                <MenuIcon item={item} />
                <Text style={styles.menuLabel}>{item.label}</Text>
                {item.id === 'passengers' && ticketCount > 0 && (
                  <View style={styles.countBadge}>
                    <Text style={styles.countBadgeText}>{ticketCount}</Text>
                  </View>
                )}
              </Pressable>
            ))}
          </ScrollView>

          <Pressable
            style={({ pressed }) => [styles.logoutBtn, pressed && styles.logoutBtnPressed]}
            onPress={handleLogout}
          >
            <FontAwesome6 name="right-from-bracket" size={18} color={colors.red700} solid />
            <Text style={styles.logoutText}>Sign out</Text>
          </Pressable>
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
  },
  panel: {
    width: 300,
    backgroundColor: colors.white,
    height: '100%',
    shadowColor: '#000',
    shadowOffset: { width: -4, height: 0 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.red900,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl,
    paddingBottom: spacing.md,
  },
  headerTitle: {
    fontFamily: fonts.header,
    color: colors.white,
    fontSize: 18,
  },
  closeBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeBtnText: {
    fontFamily: fonts.bodySemi,
    color: colors.white,
    fontSize: 16,
  },
  profile: {
    alignItems: 'center',
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray200,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#FFF8E1',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  profileName: {
    fontFamily: fonts.header,
    fontSize: 18,
    color: colors.red900,
  },
  profileId: {
    fontFamily: fonts.body,
    fontSize: 13,
    color: colors.gray600,
    marginTop: 2,
  },
  tripBadge: {
    marginTop: spacing.sm,
    backgroundColor: '#FFEBEE',
    paddingHorizontal: spacing.md,
    paddingVertical: 4,
    borderRadius: 999,
  },
  tripBadgeText: {
    fontFamily: fonts.bodySemi,
    fontSize: 12,
    color: colors.red700,
  },
  menu: {
    flex: 1,
    paddingTop: spacing.sm,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    gap: spacing.md,
  },
  menuItemPressed: {
    backgroundColor: colors.gray50,
  },
  menuIconWrap: {
    width: 28,
    alignItems: 'center',
  },
  menuIcon: {
    fontSize: 20,
    width: 28,
  },
  menuLabel: {
    flex: 1,
    fontFamily: fonts.bodyMedium,
    fontSize: 16,
    color: colors.gray800,
  },
  countBadge: {
    backgroundColor: colors.yellow500,
    minWidth: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 6,
  },
  countBadgeText: {
    fontFamily: fonts.bodyBold,
    fontSize: 12,
    color: colors.red900,
  },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    margin: spacing.lg,
    padding: spacing.md,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.red700,
  },
  logoutBtnPressed: {
    backgroundColor: '#FFEBEE',
  },
  logoutText: {
    fontFamily: fonts.bodyBold,
    fontSize: 16,
    color: colors.red700,
  },
});
