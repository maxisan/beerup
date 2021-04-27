module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    screens: {
      desk: '770px',
    },
    
    fontFamily: {
      'title': ['Open Sans', 'sans-serif'],
      'body': ['Montserrat', 'sans-serif'],
    },
    extend: {
      backgroundImage: theme => ({
        'meetupCard': "url('/src/resources/meetup-bg.jpg')"
      }),
      colors: {
        redPrimary: '#ec0000',
        redLigth: '#ffd8d8',
        white: '#fff',
        grey: '#666',
        almostBlack: '#333'
      },
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}


//1140px max screen