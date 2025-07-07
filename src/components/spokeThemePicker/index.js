import style from "./style.css";
import {h} from 'preact';
import {HexColorPicker} from "react-colorful";
import {getPrimaryColor} from "../storage";

const SpokeThemePicker = () => {
    return (
        <div className={style.lightdark}>
            <div className={style.theme}>
                <span style="background-color:#57129d" onClick={setThemeColor}>Purple</span>
                <span style="background-color:#000" onClick={setThemeColor}>Black</span>
                <span style="background-color:#333" onClick={setThemeColor}>Grey</span>
                <span style="background-color:#0072ff" onClick={setThemeColor}>Blue</span>
                <span style="background-color:#c1121f" onClick={setThemeColor}>Red</span>
                <span
                    style="background: linear-gradient(0deg, rgba(255,0,0,1) 0%, rgba(232,255,0,1) 37%, rgba(0,255,46,1) 56%, rgba(0,104,255,1) 82%, rgba(68,0,255,1) 100%);"
                    id="customColor" onClick={toggleColorPicker}>Custom</span>
            </div>

            <div className={style.customColorPicker}>
                <HexColorPicker color={getPrimaryColor()} onChange={setColor} />
            </div>

            <br />

            <div>
                <span
                    style="background-color:rgba(255,255,255,.9); color:black;"
                    onClick={clickLight}>Light</span>
                <span
                    style="background-color:rgba(255,255,255,.1)"
                    onClick={clickDark}>Dark</span>
                <span
                    style="background:linear-gradient(135deg, rgba(255,255,255,0.1) 49%, rgba(255,255,255,0.9) 51%););"
                    onClick={clickAuto}>Auto</span>
            </div>
        </div>
    )
}

export default SpokeThemePicker;