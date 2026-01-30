tailwind.config = {
    theme: {
        extend: {
            gridTemplateColumns: {
                'auto': 'repeat(auto-fit, minmax(200px, 1fr))',
            },
            fontFamily: {
                Outfit: ["Outfit", 'sans-serif'],
                Ovo: ["Ovo", 'serif']
            },
            animation: {
                spin_slow: 'spin 6s linear infinite'
            },
            colors: {
                lightHover: '#fcf4ff',
                darkHover: '#2a004a',
                darkTheme: '#11001f',
                primary: 'oklch(31.753% 0.1904 276.659)',
                lightPrimary: 'oklch(71.203% 0.19483 320.077)',
            },
            boxShadow: {
                'black': '4px 4px  0 #000',
                'white': '4px 4px  0 #fff'
            },
            
        },
    },
    darkMode: 'selector',
}