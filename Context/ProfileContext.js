import { createContext, useContext, useEffect, useState } from 'react';
import { loadProfile, saveProfile } from '../Services/storage';

export const defaultProfile = {
  name: 'Nguyen Kim Tram',
  avatar: '👩‍💻',
  major: 'Software Engineering',
  university: 'FPT University',
  bio: 'I am learning mobile app development.'
};

const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState(defaultProfile);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const hydrateProfile = async () => {
      const savedProfile = await loadProfile();

      if (savedProfile) {
        setProfile({
          ...defaultProfile,
          ...savedProfile
        });
      }

      setIsLoading(false);
    };

    hydrateProfile();
  }, []);

  const updateProfile = async (newProfile) => {
    setProfile(newProfile);
    const saved = await saveProfile(newProfile);
    return saved;
  };

  const resetProfile = async () => {
    setProfile(defaultProfile);
    const saved = await saveProfile(defaultProfile);
    return saved;
  };

  return (
    <ProfileContext.Provider
      value={{
        profile,
        updateProfile,
        resetProfile,
        defaultProfile,
        isLoading
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => {
  return useContext(ProfileContext);
};