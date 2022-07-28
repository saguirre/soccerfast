module.exports = {
  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'en'],
    serializeConfig: false,
    interpolation: {
      format: (value, format, lng) => {
        if (typeof value === 'number') {
          return value.toLocaleString(lng);
        }
        return value;
      },
    },
  },
};
