import { Theme } from '~/lib/enums/';

const THEME_LOCAL_STORAGE_KEY = 'appTheme';

export const ThemeSetter = () => {
  // Using inline script to set handle themeing to avoid FOUC
  const script = `
    const handleThemeChange = () => {
      const theme = localStorage.getItem('${THEME_LOCAL_STORAGE_KEY}');

      if (
        localStorage.getItem('${THEME_LOCAL_STORAGE_KEY}') === '${Theme.DARK}' ||
        (!theme && window.matchMedia('(prefers-color-scheme:dark)').matches)
      ) {
        document.documentElement.classList.add('dark');
        return;
      }

      document.documentElement.classList.remove('dark');
    };

    window.setTheme = (newTheme) => {
      newTheme === '${Theme.NO_PREFERENCE}'
        ? localStorage.removeItem('${THEME_LOCAL_STORAGE_KEY}')
        : localStorage.setItem('${THEME_LOCAL_STORAGE_KEY}', newTheme);

      handleThemeChange();
    };

    handleThemeChange();
  `;

  return <script dangerouslySetInnerHTML={{ __html: script }} />;
};
