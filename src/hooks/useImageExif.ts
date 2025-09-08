'use client';

import { useState, useEffect } from 'react';

interface LocationData {
    displayText: string | null;
    city: string | null;
    sublocation: string | null;
    country: string | null;
}

export function useImageExif(imagePath: string) {
    const [location, setLocation] = useState<LocationData | undefined>(undefined);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchExifData() {
            try {
                const response = await fetch(`/api/exif?path=${encodeURIComponent(imagePath)}`);
                if (response.ok) {
                    const data = await response.json();
                    setLocation({
                        displayText: data.displayText,
                        city: data.location.city,
                        sublocation: data.location.sublocation,
                        country: data.location.country,
                    });
                }
            } catch (error) {
                console.error('Error fetching EXIF data:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchExifData();
    }, [imagePath]);

    return { location, loading };
}
