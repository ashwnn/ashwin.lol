import { NextRequest, NextResponse } from 'next/server';
import ExifReader from 'exifreader';
import fs from 'fs';
import path from 'path';

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const imagePath = searchParams.get('path');
        
        if (!imagePath) {
            return NextResponse.json({ error: 'Image path is required' }, { status: 400 });
        }

        // Construct the full path to the image file
        const fullPath = path.join(process.cwd(), 'public', imagePath);
        
        // Check if file exists
        if (!fs.existsSync(fullPath)) {
            return NextResponse.json({ error: 'Image not found' }, { status: 404 });
        }

        // Read the image file
        const imageBuffer = fs.readFileSync(fullPath);
        
        // Extract EXIF data
        const tags = ExifReader.load(imageBuffer);
        
        // Extract location data
        const locationData = {
            city: tags['City']?.description || null,
            sublocation: tags['Sub-location']?.description || null,
            country: tags['Country-PrimaryLocationName']?.description || null,
            state: tags['Province-State']?.description || null,
            // Alternative EXIF location fields
            gpsLatitude: tags['GPSLatitude']?.description || null,
            gpsLongitude: tags['GPSLongitude']?.description || null,
            // IPTC location fields
            iptcCity: tags['City']?.description || null,
            iptcSublocation: tags['Sub-location']?.description || null,
            iptcCountry: tags['Country-PrimaryLocationName']?.description || null,
        };

        // Clean up the data and format for display
        const displayLocation = formatLocationDisplay(locationData);

        return NextResponse.json({
            location: locationData,
            displayText: displayLocation
        });

    } catch (error) {
        console.error('Error extracting EXIF data:', error);
        return NextResponse.json({ error: 'Failed to extract EXIF data' }, { status: 500 });
    }
}

interface LocationData {
    city: string | null;
    sublocation: string | null;
    country: string | null;
    state: string | null;
    gpsLatitude: string | null;
    gpsLongitude: string | null;
    iptcCity: string | null;
    iptcSublocation: string | null;
    iptcCountry: string | null;
}

function formatLocationDisplay(locationData: LocationData): string | null {
    const parts = [];
    
    // Priority: Sublocation, City, State, Country
    if (locationData.sublocation) {
        parts.push(locationData.sublocation);
    }
    
    if (locationData.city) {
        parts.push(locationData.city);
    }
    
    if (locationData.country) {
        parts.push(locationData.country);
    }
    
    return parts.length > 0 ? parts.join(', ') : null;
}
