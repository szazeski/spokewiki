import {
    setValue,
    getBool,
    getPrimaryColor,
    setPrimaryColor,
} from "../src/components/storage";

describe('Test Storage Layer', () => {

    test('setPrimaryColor', () => {

        let actualBefore = getPrimaryColor();
        const expected = "rgb(50,100,200)";
        setPrimaryColor(expected);
        let actual = getPrimaryColor();

        expect(actual).toBe(expected);
        expect(actualBefore).not.toBe(expected);

    });

    test('LocalStorage getBool helper', () => {
        const expected = true;
        const storageKey = "test";

        let actualBeforeSet = getBool(storageKey);
        expect(actualBeforeSet).toBe(false);

        setValue(storageKey, expected);

        let actual = getBool(storageKey);
        expect(actual).toBe(expected);
    });


    // test('loadColors', () => {
    //     loadColors();
    //
    //     let actual = document.documentElement.style.getPropertyValue('--primary');
    //     expect(actual).toBe("rgb(81, 18, 157)");
    //     // Jest is returning a blank root style object
    // });

}); // end describe
