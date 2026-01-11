import { Globe } from "lucide-react";
import { useTranslation } from "react-i18next";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const languages = [
  { code: 'tr', name: 'Türkçe', nativeName: 'Türkçe' },
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'de', name: 'Deutsch', nativeName: 'Deutsch' },
  { code: 'fr', name: 'Français', nativeName: 'Français' },
  { code: 'es', name: 'Español', nativeName: 'Español' },
  { code: 'ar', name: 'العربية', nativeName: 'العربية' },
  { code: 'ja', name: '日本語', nativeName: '日本語' },
  { code: 'zh', name: '中文', nativeName: '中文' },
  { code: 'ru', name: 'Русский', nativeName: 'Русский' },
  { code: 'pt', name: 'Português', nativeName: 'Português' },
  { code: 'it', name: 'Italiano', nativeName: 'Italiano' },
  { code: 'hi', name: 'हिन्दी', nativeName: 'हिन्दी' },
  { code: 'ko', name: '한국어', nativeName: '한국어' },
];

const LanguageSelector = () => {
  const { i18n } = useTranslation();

  return (
    <div className="flex items-center gap-1.5 sm:gap-2 glass-card rounded-lg sm:rounded-xl px-2 sm:px-3 py-1 sm:py-1.5 backdrop-blur-sm border border-border/50">
      <Globe className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-muted-foreground flex-shrink-0" />
      <Select
        value={i18n.language.split('-')[0]}
        onValueChange={(value) => i18n.changeLanguage(value)}
      >
        <SelectTrigger className="w-[100px] sm:w-[120px] h-6 sm:h-7 text-[10px] sm:text-xs border-none bg-transparent shadow-none focus:ring-0 focus:ring-offset-0 px-0">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {languages.map((lang) => (
            <SelectItem key={lang.code} value={lang.code}>
              {lang.nativeName}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default LanguageSelector;
