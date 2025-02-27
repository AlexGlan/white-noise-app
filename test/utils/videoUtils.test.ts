import { extractVideoId, validateYoutubeLink } from "../../src/utils/videoUtils";

describe('videoUtils', () => {
    const youtubeCorrectUrls: string[] = [
        'https://www.youtube.com/watch?v=XXXXXXXXXXX',
        'http://www.youtube.com/watch?v=XXXXXXXXXXX',
        'https://youtu.be/XXXXXXXXXXX?si=XXXXXXXXXXXXXXXX',
        'http://youtu.be/XXXXXXXXXXX?si=XXXXXXXXXXXXXXXX',
        'https://www.youtube.com/live/XXXXXXXXXXX',
        'http://www.youtube.com/live/XXXXXXXXXXX',
        'https://www.youtube.com/live/XXXXXXXXXXX?feature=shared',
        'http://www.youtube.com/live/XXXXXXXXXXX?feature=shared',
        'https://www.youtube.com/watch?v=XXXXXXXXXXX&t=1234s',
        'http://www.youtube.com/watch?v=XXXXXXXXXXX&t=1234s',
        'https://www.youtube.com/watch?v=XXXXXXXXXXX&list=XXXXXXXXXXXX-XXXX-XXXXXXXXXX-XXXXX&index=1',
        'https://www.youtube.com/watch?v=XXXXXXXXXXX&list=XXXXXXXXXXXX-XXXX-XXXXXXXXXX-XXXXX&index=1',
        'https://www.youtube.com/watch?v=XX_XXXXXXXX',
        'http://www.youtube.com/watch?v=XX_XXXXXXXX',
        'https://youtu.be/XX_XXXXXXXX?si=XXXXXXXXXXXXXXXX',
        'http://youtu.be/XX_XXXXXXXX?si=XXXXXXXXXXXXXXXX',
        'https://www.youtube.com/live/XX_XXXXXXXX',
        'http://www.youtube.com/live/XX_XXXXXXXX',
    ];
    
    describe('validateYoutubeLink', () => {
        const youtubeIncorrectUrls = [
            undefined,
            null,
            '',
            '123456qwerty',
            'https://en.wikipedia.org/wiki/Frog',
            'https://notyoutube.com/watch?v=XXXXXXXXXXX',
            'https://www.youtubee.com/watch?v=XXXXXXXXXXX',
            'https://www.youtube.com/watch?v=',
            'https://www.youtube.com/watch?v=!invalidID!',
            'www.youtube.com/watch?v=XXXXXXXXXXX',
            'https://www.youtube.com/XXXXXXXXXXX',
            'https://www.youtube.com/v/XXXXXXXXXXX',
            'https://youtube.com/embed/XXXXXXXXXXX',
            'https://youtube.com/',
            'https://www.youtube.com/watch',
            'https://www.youtube.com/abc?v=XXXXXXXXXXX',
            'youtube.com/randomtext',
            'https://youtube.com/just-some-random-url',
            'https://www.youtube.com/watch?v=XXXXXXXXXXX&',
            'https://www.youtube.com/watch?v=XXXXXXXXXXXX',
            'https:/youtube.com/watch?v=XXXXXXXXXXX',
            'https://www.youtube.com/watch?v=XXXXXXXXXXXhttps://www.youtube.com/watch?v=XXXXXXXXXXX',
            'https://www.youtube.com/@XXXXXXXXXXXXXXX/videos'
        ];
          
        it('Should return true for valid youtube links', () => {
            youtubeCorrectUrls.forEach(validUrl => {
                expect(validateYoutubeLink(validUrl)).toBe(true);
            });
        });

        it('Should return false for invalid youtube links', () => {
            youtubeIncorrectUrls.forEach(invalidUrl => {
                // @ts-expect-error
                expect(validateYoutubeLink(invalidUrl)).toBe(false);
            });
        });
    });
    describe('extractVideoId', () => {
        const urlsWithInvalidIds = [
            undefined,
            null,
            '',
            'https://www.youtube.com/watch?v=XXXXXXXXXX',
            'https://www.youtube.com/watch?v=XXXXXXXXXXXX',
        ];

        it('Should return id of a youtube video from an url', () => {
            youtubeCorrectUrls.forEach(url => {
                expect(extractVideoId(url)).toMatch(/[a-z0-9_]{11}/i);
            });
        });

        it('Should return null if the url is invalid or the video id can\'t be extracted', () => {
            urlsWithInvalidIds.forEach(url => {
                // @ts-expect-error
                expect(extractVideoId(url)).toBeNull();
            });
        });
    });
});
