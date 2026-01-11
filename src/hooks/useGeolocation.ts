import { useState, useEffect, useCallback } from "react";

interface GeolocationState {
  latitude: number | null;
  longitude: number | null;
  accuracy: number | null;
  altitude: number | null;
  altitudeAccuracy: number | null;
  heading: number | null;
  speed: number | null;
  timestamp: number | null;
  error: string | null;
  loading: boolean;
}

interface AddressInfo {
  address: string;
  city: string;
  country: string;
  countryCode: string;
  loading: boolean;
}

const useGeolocation = () => {
  const [state, setState] = useState<GeolocationState>({
    latitude: null,
    longitude: null,
    accuracy: null,
    altitude: null,
    altitudeAccuracy: null,
    heading: null,
    speed: null,
    timestamp: null,
    error: null,
    loading: true,
  });

  const [addressInfo, setAddressInfo] = useState<AddressInfo>({
    address: "",
    city: "",
    country: "",
    countryCode: "",
    loading: false,
  });

  const getAddress = useCallback(async (lat: number, lon: number) => {
    setAddressInfo(prev => ({ ...prev, loading: true }));
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=18&addressdetails=1`,
        {
          headers: {
            'Accept-Language': 'tr',
          }
        }
      );
      const data = await response.json();
      
      const addr = data.address || {};
      
      // Türkçe adres formatı için parçaları topla
      const neighbourhood = addr.neighbourhood || addr.suburb || addr.quarter || "";
      const road = addr.road || addr.pedestrian || "";
      const houseNumber = addr.house_number || "";
      const district = addr.district || "";
      
      // Şehir/İlçe bilgisi
      const city = addr.city || addr.town || addr.municipality || "";
      
      // İl bilgisi
      const province = addr.state || addr.province || "";
      
      // Ülke
      const country = addr.country || "";
      // Ülke kodu (country_code alanı Nominatim'de mevcut değilse, country adından mapping yapılabilir)
      const countryCode = data.address?.country_code?.toUpperCase() || "";

      // Adres formatını oluştur (mahalle, cadde/sokak)
      const addressParts: string[] = [];
      
      if (neighbourhood) {
        addressParts.push(neighbourhood);
      }
      
      if (road) {
        addressParts.push(road);
      }
      
      if (houseNumber) {
        addressParts.push(houseNumber);
      }
      
      if (district && district !== city && district !== neighbourhood) {
        addressParts.push(district);
      }
      
      const fullAddress = addressParts.length > 0 
        ? addressParts.join(", ") 
        : (data.display_name?.split(",").slice(0, 3).join(",") || "Adres bulunamadı");

      // Şehir ve il bilgisini birleştir
      let cityProvince = "";
      if (city && province && city !== province) {
        cityProvince = `${city}, ${province}`;
      } else if (city) {
        cityProvince = city;
      } else if (province) {
        cityProvince = province;
      }

      setAddressInfo({
        address: fullAddress,
        city: cityProvince,
        country,
        countryCode,
        loading: false,
      });
    } catch {
      setAddressInfo({
        address: "Adres alınamadı",
        city: "",
        country: "",
        countryCode: "",
        loading: false,
      });
    }
  }, []);

  const updatePosition = useCallback((position: GeolocationPosition) => {
    setState({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
      accuracy: position.coords.accuracy,
      altitude: position.coords.altitude,
      altitudeAccuracy: position.coords.altitudeAccuracy,
      heading: position.coords.heading,
      speed: position.coords.speed,
      timestamp: position.timestamp,
      error: null,
      loading: false,
    });

    getAddress(position.coords.latitude, position.coords.longitude);
  }, [getAddress]);

  const handleError = useCallback((error: GeolocationPositionError) => {
    let errorMessage = "Konum alınamadı";
    switch (error.code) {
      case error.PERMISSION_DENIED:
        errorMessage = "Konum izni reddedildi";
        break;
      case error.POSITION_UNAVAILABLE:
        errorMessage = "Konum bilgisi mevcut değil";
        break;
      case error.TIMEOUT:
        errorMessage = "Konum isteği zaman aşımına uğradı";
        break;
    }
    setState(prev => ({ ...prev, error: errorMessage, loading: false }));
  }, []);

  const refresh = useCallback(() => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(updatePosition, handleError, {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 0,
      });
    }
  }, [updatePosition, handleError]);

  useEffect(() => {
    if (!navigator.geolocation) {
      setState(prev => ({
        ...prev,
        error: "Tarayıcınız konum özelliğini desteklemiyor",
        loading: false,
      }));
      return;
    }

    navigator.geolocation.getCurrentPosition(updatePosition, handleError, {
      enableHighAccuracy: true,
      timeout: 15000,
      maximumAge: 0,
    });

    const watchId = navigator.geolocation.watchPosition(updatePosition, handleError, {
      enableHighAccuracy: true,
      timeout: 15000,
      maximumAge: 10000,
    });

    return () => navigator.geolocation.clearWatch(watchId);
  }, [updatePosition, handleError]);

  return { ...state, ...addressInfo, refresh };
};

export default useGeolocation;
