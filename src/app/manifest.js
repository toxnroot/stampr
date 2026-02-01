export default function manifest() {
    return {
        name: 'Stampr - Professional Logo Stamping Tool',
        short_name: 'Stampr',
        description: 'Add your logo or watermark to multiple images easily and quickly. Privacy-first, browser-based image stamping.',
        start_url: '/',
        display: 'standalone',
        background_color: '#040714',
        theme_color: '#009966',
        icons: [
            {
                src: '/logo.png',
                sizes: 'any',
                type: 'image/png',
            },
        ],
    }
}
