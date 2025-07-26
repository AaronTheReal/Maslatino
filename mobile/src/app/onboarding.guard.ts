// src/app/guards/onboarding.guard.ts
import { CanMatchFn, Router, UrlTree } from '@angular/router';
import { inject } from '@angular/core';
import { Preferences } from '@capacitor/preferences';

export const onboardingGuard: CanMatchFn = async () => {
  const router = inject(Router);

  const { value: hasCompletedOnboarding } = await Preferences.get({ key: 'hasCompletedOnboarding' });
  const { value: selectedLanguage } = await Preferences.get({ key: 'selectedLanguage' });

  // Si nunca ha hecho onboarding, lo mandamos a /start
  if (!hasCompletedOnboarding) {
    return router.parseUrl('/start');
  }

  // Si ya hizo onboarding pero no eligió idioma, lo mandamos a /select-language
  if (!selectedLanguage) {
    return router.parseUrl('/select-language');
  }

  return true;
};
