import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  reload,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  User,
} from 'firebase/auth';
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from 'react';

import { auth } from '@/src/services/firebase';

type AuthContextType = {
  user: User | null;
  loading: boolean;
  signIn: (
    email: string,
    password: string,
  ) => Promise<void>;
  signUp: (
    email: string,
    password: string,
  ) => Promise<void>;
  signOut: () => Promise<void>;
  resendVerificationEmail: () => Promise<void>;
  refreshUser: () => Promise<boolean>;
};

const AuthContext =
  createContext<AuthContextType | undefined>(
    undefined,
  );

export function AuthProvider({
  children,
}: PropsWithChildren) {
  const [user, setUser] = useState<User | null>(
    auth.currentUser,
  );

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (currentUser) => {
        setUser(currentUser);
        setLoading(false);
      },
    );

    return unsubscribe;
  }, []);

  async function signIn(
    email: string,
    password: string,
  ) {
    await signInWithEmailAndPassword(
      auth,
      email,
      password,
    );
  }

  async function signUp(
    email: string,
    password: string,
  ) {
    const result =
      await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );

    await sendEmailVerification(result.user);

    setUser(result.user);
  }

  async function signOut() {
    await firebaseSignOut(auth);
  }

  async function resendVerificationEmail() {
    if (!auth.currentUser) {
      throw new Error('Usuário não conectado.');
    }

    await sendEmailVerification(auth.currentUser);
  }

  async function refreshUser() {
    if (!auth.currentUser) {
      return false;
    }

    await reload(auth.currentUser);

    setUser(auth.currentUser);

    return auth.currentUser.emailVerified;
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signIn,
        signUp,
        signOut,
        resendVerificationEmail,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      'AuthProvider não encontrado.',
    );
  }

  return context;
}