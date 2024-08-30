import {h} from 'preact';
import SpokeArticle from '../../src/components/spokeArticle';
// See: https://github.com/preactjs/enzyme-adapter-preact-pure
import {mount} from 'enzyme';

describe('Component SpokeArticle', () => {
    test('Load test data and verify it all appears', () => {
        let article = {
            title: "testTitle",
            shortDescription: "testShortDescription",
            stub: "testStub",
            tags: ["testTag1", "testTag2"],
            audio: "testAudio",
            text: "testText",
            urlAudio: "https://media.spokewiki.com/testTitle-123456-a0d60c18-d7b9-49c4-8e7c-123a4b567c89.mp3",
            urlWikipedia: "https://en.wikipedia.org/wiki/testTitle",
        };

        function mockOnPlaying() {
            return;
        }

        const wrapper = mount(<SpokeArticle
            data={article}
            onPlaying={mockOnPlaying}
        />);

        expect(wrapper.find('a').at(0).text()).toEqual(article.tags[0]);
        expect(wrapper.find('a').at(1).text()).toEqual(article.tags[1]);

        expect(wrapper.find('a').at(2).text()).toEqual(article.title);

        expect(wrapper.find('a').at(3).text()).toEqual("PLAY");
        expect(wrapper.find('a').at(4).text()).toEqual("queue");

        expect(wrapper.find('a').at(5).text()).toEqual("mp3");
        expect(wrapper.find('a').at(5).prop('href')).toEqual(article.urlAudio);

        expect(wrapper.find('a').at(6).text()).toEqual("wikipedia");
        expect(wrapper.find('a').at(6).prop('href')).toEqual(article.urlWikipedia);

        expect(wrapper.find('a').at(7).text()).toEqual("archive");

        expect(wrapper.find('p').at(0).text()).toEqual(article.shortDescription);

    });

    // todo - test play calls mocked function

    // todo - test queue
});
