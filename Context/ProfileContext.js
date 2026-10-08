import { createContext, useContext, useEffect, useState } from 'react';
import { loadProfile, saveProfile } from '../Services/storage';

const defaultProfile = {
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

  return (
    <ProfileContext.Provider
      value={{
        profile,
        updateProfile,
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