import { useState, useEffect } from 'react';

import * as Location from 'expo-location';

export default function useSearchProfessional() {
  const [autoCep, setAutoCep] = useState('');
  const [position, setPosition] =
    useState<{
      latitude: number;
      longitude: number;
    }>();

  useEffect(() => {
    async () => {
      try {
        const allowed = await askPermission();
        if (allowed) {
          setPosition(await pickLocation());
        }
      } catch (error) {}
    };
  }, []);

  useEffect(() => {
    async () => {
      try {
        if (position) {
          setAutoCep(await pickCep());
        }
      } catch (error) {}
    };
  }, [position]);

  async function askPermission(): Promise<boolean> {
    try {
      const { status } =
        await Location.requestForegroundPermissionsAsync();
      return status === 'granted';
    } catch (error) {
      return false;
    }
  }

  async function pickLocation(): Promise<{
    latitude: number;
    longitude: number;
  }> {
    const local = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Highest,
    });

    return local.coords;
  }

  async function pickCep(): Promise<string> {
    if (position) {
      const adress = await Location.reverseGeocodeAsync(
        position
      );
      if (adress.length > 0) {
        return adress[0].postalCode || '';
      }
    }

    return '';
  }

  return { autoCep };
}
