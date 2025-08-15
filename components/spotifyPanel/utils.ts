"use client"

import { SpotifyPlayer } from 'react-spotify-web-playback';
import React from 'react';

const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID!;
const redirectUri = process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI!;
const scope = 'user-read-private user-read-email streaming playlist-read-private';

if (!clientId || !redirectUri) {
    throw new Error('Missing Spotify client ID or redirect URI in environment variables.');
}

function generateRandomString(length: number) {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

async function generateCodeChallenge(codeVerifier: string) {
    const digest = await crypto.subtle.digest(
        'SHA-256',
        new TextEncoder().encode(codeVerifier)
    );

    return btoa(String.fromCharCode(...new Uint8Array(digest)))
        .replace(/=/g, '')
        .replace(/\+/g, '-')
        .replace(/\//g, '_');
}

function generateUrlWithSearchParams(url: string, params: Record<string, string>) {
    const urlObject = new URL(url);
    urlObject.search = new URLSearchParams(params).toString();
    return urlObject.toString();
}

export async function redirectToSpotifyAuth() {
    const codeVerifier = generateRandomString(64);
    const codeChallenge = await generateCodeChallenge(codeVerifier);

    localStorage.setItem('code_verifier', codeVerifier);

    window.location.href = generateUrlWithSearchParams(
        'https://accounts.spotify.com/authorize',
        {
            response_type: 'code',
            client_id: clientId,
            scope: scope,
            code_challenge_method: 'S256',
            code_challenge: codeChallenge,
            redirect_uri: redirectUri,
        }
    );
}

export async function getSpotifyToken() {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const codeVerifier = localStorage.getItem('code_verifier');

    if (!code || !codeVerifier) {
        throw new Error('Missing code or code_verifier');
    }

    const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
            client_id: clientId,
            grant_type: 'authorization_code',
            code: code,
            redirect_uri: redirectUri,
            code_verifier: codeVerifier,
        })
    });

    if (!response.ok) {
        throw await response.json();
    }

    const data = await response.json();

    localStorage.setItem('access_token', data.access_token);
    localStorage.setItem('refresh_token', data.refresh_token);
    localStorage.setItem('expires_at', new Date().setSeconds(new Date().getSeconds() + data.expires_in).toString());

    window.history.replaceState({}, document.title, '/');

    return data.access_token;
}

export async function refreshSpotifyToken() {
    const refresh_token = localStorage.getItem('refresh_token');

    if (!refresh_token) {
        throw new Error('No refresh token available');
    }

    const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
            client_id: clientId,
            grant_type: 'refresh_token',
            refresh_token: refresh_token,
        })
    });

    if (!response.ok) {
        throw await response.json();
    }

    const data = await response.json();

    localStorage.setItem('access_token', data.access_token);
    localStorage.setItem('expires_at', new Date().setSeconds(new Date().getSeconds() + data.expires_in).toString());

    return data.access_token;
}

export function logout() {
    localStorage.removeItem('access_token');
    window.location.reload();
}

export async function getUserProfile() {
    const access_token = localStorage.getItem('access_token');

    if (!access_token) {
        throw new Error('No access token available');
    }

    const response = await fetch('https://api.spotify.com/v1/me', {
        headers: {
            'Authorization': `Bearer ${access_token}`
        }
    });

    if (!response.ok) {
        throw await response.json();
    }

    console.log(await response.json())
    return await response.json();
}

export async function getUserPlaylists() {
    const access_token = localStorage.getItem('access_token');

    if (!access_token) {
        throw new Error('No access token available');
    }

    const response = await fetch('https://api.spotify.com/v1/me/playlists', {
        headers: {
            'Authorization': `Bearer ${access_token}`
        }
    });

    if (!response.ok) {
        throw await response.json();
    }

    const responseJSON = await response.json();

    console.log(responseJSON.items || null)
    return await responseJSON.items;
}

export async function getPlaylistTracks(playlistId: string) {
    const access_token = localStorage.getItem('access_token');
    let mostRecentTrackRequestLength = 101;
    let lastTrack = 0;
    let tracks: any[] = [];

    if (!access_token) {
        throw new Error('No access token available');
    }

    while (mostRecentTrackRequestLength >= 100) {
        let uri: string = `https://api.spotify.com/v1/playlists/${playlistId}/tracks`

        if (lastTrack > 0) {
            uri += `?offset=${lastTrack}`
        }

        //uri += "/";

        const response = await fetch(uri, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${access_token}`
            }
        });


        if (!response.ok) {
            throw await response.json();
        }

        const responseJSON = await response.json();
        console.log(responseJSON.items)
        lastTrack += responseJSON.items.length;
        mostRecentTrackRequestLength = responseJSON.items.length;

        responseJSON.items.forEach((item: any) => {
            tracks.push(item.track.uri);
        })
    }

    return tracks;
}
