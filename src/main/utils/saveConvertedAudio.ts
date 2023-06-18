import os from 'os'
import fs from 'fs'
import https from 'https'
import { ipcMain } from 'electron'
//import type { SpecialWordsEntry } from '../../types/story'

const secretKey = '76907d9a166b420bb32192f796cb84a1'
const userId = 'TJ2Xw7RJUmSGgm8sFR9blRIGiXI3'

export async function saveConvertedAudio(word: string): Promise<{ success: boolean, data: string }> {
    console.log('starting new convert')

    console.log('fetching id')
    const wordId = await fetchAudioId(word)

    console.log('slight pause')
    await new Promise(resolve => setTimeout(() => {
        console.log('inside slight pause')
        resolve('inside pause')
    }, 1500))

    console.log('fetching url')
    const audioUrl = await fetchAudioUrl(wordId, word)
    if (audioUrl === 'failed') {
        return { success: false, data: `failed to get url of ${word}` }
    }

    console.log('saving audio')
    const audioPromise = await saveAudioFromUrl(audioUrl, word)

    return audioPromise

}

async function fetchAudioId(word: string): Promise<string> {
    const url = 'https://play.ht/api/v1/convert';
    const options = {
        method: 'POST',
        headers: {
            accept: 'application/json',
            'content-type': 'application/json',
            AUTHORIZATION: secretKey,
            'X-USER-ID': userId
        },
        body: JSON.stringify({ content: [word], voice: 'en-US-JennyNeural' })
    };

    console.log('body: ', options.body)

    const response = await fetch(url, options)
    console.log('res in fetch id: ', response.statusText)
    if (!response.ok) {
        fetchAudioId(word)
    }
    const parsedInfo = await response.json()
    console.log('fetched id: ', parsedInfo)

    return parsedInfo.transcriptionId
}

async function fetchAudioUrl(transcriptionId: string, word: string): Promise<string> {
    const url = `https://play.ht/api/v1/articleStatus?transcriptionId=${transcriptionId}`;
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            AUTHORIZATION: secretKey,
            'X-USER-ID': userId
        }
    };

    const response = await fetch(url, options)
    console.log('res in fetchurl: ', response.statusText)
    if (!response.ok) {
        fetchAudioUrl(transcriptionId, word)
    }
    const parsedInfo = await response.json()
    if (!parsedInfo.converted) {
        ipcMain.emit('audio:failed', ({ type: 'warning', data: `"${word}" failed to convert to audio` }))
        return 'failed'
    } else {
        console.log('audio url: ', parsedInfo)

        return parsedInfo.audioUrl
    }
}

async function saveAudioFromUrl(audioUrl: string, word: string): Promise<{ success: boolean, data: string }> {
    const mainPath = `${os.homedir()}/Music/audiobook-data/converted`
    const filePath = `${mainPath}/${word.trim()}.mp3`
    const file = fs.createWriteStream(filePath)

    return new Promise((resolve, reject) => {
        try {
            const request = https.get(audioUrl, (res) => {
                res.pipe(file)

                file.on('finish', () => {
                    file.close()
                    resolve({ success: true, data: filePath })
                })

                request.on('error', () => {
                    fs.unlink(filePath, (error) => {
                        console.log('error occurred while saving audio: ', error)
                    })
                    reject({ success: false, data: 'failed to download audio' })
                })
            })
        } catch (error) {
            console.log('error occurred: ', error)
            reject({ success: false, data: 'failed to download audio' })
        }
    })

}

