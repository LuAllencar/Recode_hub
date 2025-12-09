// context/AuthContext.js - VERSÃO COM FIREBASE
import React, { createContext, useState, useEffect } from 'react';
import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../config/firebase';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Monitora mudanças no estado de autenticação
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // Usuário logado - buscar dados do Firestore
        const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
        setUser({
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          ...userDoc.data() // dados extras do perfil
        });
      } else {
        // Usuário deslogado
        setUser(null);
      }
      setLoading(false);
    });

    return unsubscribe; // Cleanup
  }, []);

  // Função de CADASTRO
  const signUp = async (name, email, password) => {
    try {
      // 1. Criar conta no Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(
        auth, 
        email, 
        password
      );

      // 2. Atualizar nome do perfil
      await updateProfile(userCredential.user, {
        displayName: name
      });

      // 3. Criar documento do usuário no Firestore
      await setDoc(doc(db, 'users', userCredential.user.uid), {
        name: name,
        email: email,
        level: 1,
        xp: 0,
        xpToNextLevel: 1000,
        title: 'Iniciante',
        joinDate: new Date().toISOString(),
        stats: {
          zonesRestored: 0,
          devicesBuilt: 0,
          codeLines: 0,
          hoursPlayed: 0,
          missionsCompleted: 0,
          totalMissions: 30,
        },
        resources: {
          metal: 10,
          chip: 5,
          bateria: 5,
          madeira: 20,
          agua: 10,
        },
      });

      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  // Função de LOGIN
  const login = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  // Função de LOGOUT
  const logout = async () => {
    try {
      await signOut(auth);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, signUp, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}