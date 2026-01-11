import { MapPin, Navigation, Compass, Share2, RefreshCw, Map, Clock } from "lucide-react";
import { useTranslation } from "react-i18next";
import LocationPin from "@/components/LocationPin";
import LocationCard from "@/components/LocationCard";
import ActionButton from "@/components/ActionButton";
import LanguageSelector from "@/components/LanguageSelector";
import useGeolocation from "@/hooks/useGeolocation";
import { useLanguageDetection } from "@/hooks/useLanguageDetection";
import { toast } from "sonner";

const Index = () => {
  const { t, i18n } = useTranslation();
  const location = useGeolocation();
  
  // Konum bazlı dil tespiti
  useLanguageDetection(location.countryCode);

  const formatCoordinate = (coord: number | null, type: 'lat' | 'lon') => {
    if (coord === null) return "---";
    const direction = type === 'lat' 
      ? (coord >= 0 ? t('directions.north') : t('directions.south'))
      : (coord >= 0 ? t('directions.east') : t('directions.west'));
    return `${Math.abs(coord).toFixed(6)}° ${direction}`;
  };

  const getCoordinateCopyValue = (coord: number | null) => {
    if (coord === null) return "";
    return coord.toFixed(6);
  };

  const handleShare = async () => {
    if (!location.latitude || !location.longitude) {
      toast.error(t('location.infoUnavailable'));
      return;
    }

    const shareText = t('share.format', {
      title: t('share.title'),
      address: location.address,
      city: location.city,
      country: location.country,
      coordinates: `${location.latitude?.toFixed(6)}, ${location.longitude?.toFixed(6)}`,
      mapUrl: `https://www.google.com/maps?q=${location.latitude},${location.longitude}`
    });

    if (navigator.share) {
      try {
        await navigator.share({
          title: t('share.title'),
          text: shareText,
        });
      } catch {
        // User cancelled or error
      }
    } else {
      await navigator.clipboard.writeText(shareText);
      toast.success(t('location.copied'));
    }
  };

  const handleOpenMaps = () => {
    if (!location.latitude || !location.longitude) return;
    window.open(`https://www.google.com/maps?q=${location.latitude},${location.longitude}`, '_blank');
  };

  const handleRefresh = () => {
    location.refresh();
    toast.info(t('location.updating'));
  };

  const getFormattedTime = () => {
    if (!location.timestamp) return "---";
    return new Date(location.timestamp).toLocaleTimeString(i18n.language, {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background gradient */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'var(--gradient-radial)' }}
      />

      {/* Main content */}
      <div className="relative z-10 min-h-screen flex flex-col px-5 py-8 max-w-md mx-auto">
        {/* Language Selector - Fixed top right */}
        <div className="fixed top-4 right-4 z-20">
          <LanguageSelector />
        </div>

        {/* Header */}
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">
            {t('app.title').split(' ')[0]} <span className="text-gradient">{t('app.title').split(' ').slice(1).join(' ')}</span>
          </h1>
          <p className="text-sm text-muted-foreground">
            {t('app.subtitle')}
          </p>
        </header>

        {/* Location Pin */}
        <div className="flex justify-center mb-10">
          <LocationPin isLocating={location.loading} />
        </div>

        {/* Error State */}
        {location.error && (
          <div className="glass-card rounded-2xl p-4 mb-6 border-destructive/50">
            <p className="text-center text-destructive text-sm">{location.error}</p>
          </div>
        )}

        {/* Loading State */}
        {location.loading && !location.error && (
          <div className="glass-card rounded-2xl p-6 mb-6">
            <div className="flex items-center justify-center gap-3">
              <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
              <p className="text-muted-foreground text-sm">{t('location.loading')}</p>
            </div>
          </div>
        )}

        {/* Address Display */}
        {!location.loading && !location.error && location.address && (
          <div className="glass-card rounded-2xl p-5 mb-6 text-center">
            <p className="text-lg font-semibold text-foreground mb-1">{location.address}</p>
            <p className="text-sm text-muted-foreground">
              {[location.city, location.country].filter(Boolean).join(", ")}
            </p>
          </div>
        )}

        {/* Location Cards Grid */}
        <div className="grid grid-cols-2 gap-2.5 mb-6">
          <LocationCard
            label={t('labels.latitude')}
            value={formatCoordinate(location.latitude, 'lat')}
            icon={<Navigation />}
            copyable={!!location.latitude}
          />
          <LocationCard
            label={t('labels.longitude')}
            value={formatCoordinate(location.longitude, 'lon')}
            icon={<Compass />}
            copyable={!!location.longitude}
          />
        </div>

        <div className="grid grid-cols-2 gap-2.5 mb-8">
          <LocationCard
            label={t('labels.accuracy')}
            value={location.accuracy ? `±${Math.round(location.accuracy)}m` : "---"}
            tooltip={t('labels.accuracyTooltip')}
            icon={<MapPin />}
          />
          <LocationCard
            label={t('labels.update')}
            value={getFormattedTime()}
            icon={<Clock />}
          />
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-3 gap-3 mt-auto">
          <ActionButton
            onClick={handleRefresh}
            icon={<RefreshCw className={`w-6 h-6 ${location.loading ? 'animate-spin' : ''}`} />}
            label={t('buttons.refresh')}
          />
          <ActionButton
            onClick={handleShare}
            icon={<Share2 className="w-6 h-6" />}
            label={t('buttons.share')}
            variant="primary"
          />
          <ActionButton
            onClick={handleOpenMaps}
            icon={<Map className="w-6 h-6" />}
            label={t('buttons.viewOnMap')}
          />
        </div>

        {/* Footer */}
        <footer className="text-center mt-8 pt-4 border-t border-border/50 space-y-2">
          <p className="text-xs text-muted-foreground">
            {t('app.privacy')}
          </p>
          <p className="text-xs text-muted-foreground/80">
            {t('app.madeBy')}{' '}
            <a 
              href="https://melihkochan.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary hover:text-primary/80 transition-colors font-medium"
            >
              {t('app.developer')}
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
