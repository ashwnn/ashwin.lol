import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const alt = 'Ashwin Charathsandran'
export const size = {
    width: 1200,
    height: 630,
}

export const contentType = 'image/png'

export default async function Image() {
    return new ImageResponse(
        (
            <div
                style={{
                    background: '#222222',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: 'sans-serif',
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: '1px solid #333',
                        borderRadius: '20px',
                        padding: '40px 80px',
                        background: '#2a2a2a',
                        boxShadow: '0 20px 50px rgba(0,0,0,0.3)',
                    }}
                >
                    <h1
                        style={{
                            fontSize: 80,
                            fontWeight: 'bold',
                            marginBottom: 20,
                            background: 'linear-gradient(to bottom right, #fff, #aaa)',
                            backgroundClip: 'text',
                            color: 'transparent',
                        }}
                    >
                        Ashwin C.
                    </h1>
                    <p
                        style={{
                            fontSize: 30,
                            color: '#888',
                            margin: 0,
                        }}
                    >
                        Cybersecurity & IT
                    </p>
                </div>
            </div>
        ),
        {
            ...size,
        }
    )
}
