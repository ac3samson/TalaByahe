import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, Image, Alert } from 'react-native';
import { colors, spacing, fonts } from '../theme';

export default function LoginScreen({ navigation }) {
  const [employeeId, setEmployeeId] = useState('EMP-001');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    navigation.replace('Home', {
      conductor: { id: employeeId, name: 'Juan Dela Cruz' },
    });
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <View style={styles.card}>
        <Image source={require('../../assets/logo.png')} style={styles.logo} resizeMode="contain" />
        <Text style={styles.title}>TalaByahe</Text>
        <Text style={styles.subtitle}>Conductor App</Text>
        <Text style={styles.label}>Employee ID</Text>
        <TextInput style={styles.input} value={employeeId} onChangeText={setEmployeeId} placeholder="EMP-001" />
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          placeholder="Enter password"
          secureTextEntry
        />
        <TouchableOpacity
          style={styles.forgotPassword}
          onPress={() =>
            Alert.alert(
              'Forgot Password',
              'Contact your dispatcher or admin to reset your conductor account password.',
            )
          }
        >
          <Text style={styles.forgotPasswordText}>Forgot password?</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.red900,
    justifyContent: 'center',
    padding: spacing.lg,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: spacing.xl,
  },
  logo: {
    width: 96,
    height: 96,
    alignSelf: 'center',
    marginBottom: spacing.sm,
  },
  title: {
    fontFamily: fonts.header,
    fontSize: 28,
    textAlign: 'center',
    color: colors.red900,
  },
  subtitle: {
    fontFamily: fonts.body,
    textAlign: 'center',
    color: colors.gray600,
    marginBottom: spacing.lg,
  },
  label: {
    fontFamily: fonts.bodySemi,
    marginBottom: 6,
    color: colors.gray800,
  },
  input: {
    fontFamily: fonts.body,
    borderWidth: 1,
    borderColor: colors.gray200,
    borderRadius: 10,
    padding: spacing.md,
    marginBottom: spacing.sm,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: spacing.lg,
  },
  forgotPasswordText: {
    fontFamily: fonts.bodySemi,
    color: colors.red700,
    fontSize: 14,
  },
  button: {
    backgroundColor: colors.red700,
    padding: spacing.md,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    fontFamily: fonts.bodyBold,
    color: colors.white,
    fontSize: 16,
  },
});
