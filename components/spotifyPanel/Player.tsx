'use client'

import SpotifyPlayer from 'react-spotify-web-playback';
import React from 'react';

interface PlayerProps {
    uris: string[];
}

export function Player({ uris }: PlayerProps) {
    const token = localStorage.getItem('access_token');

    if (!token || !uris || uris.length === 0) {
        return null;
    }

    return (
        <SpotifyPlayer
            token={token}
            uris={uris}
            play={true}
            magnifySliderOnHover={true}
            styles={{
                bgColor: 'transparent',
                color: '#fff',
                sliderColor: '#1db954',
                trackArtistColor: '#b3b3b3',
                trackNameColor: '#fff',
            }}
        />
    );
}
