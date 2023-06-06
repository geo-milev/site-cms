import withAlign from "../common/plugin";
import Button from "./Button";
import RightAlignElement from "./Element";

export default {
    name: 'right',
    Button: Button,
    Element: RightAlignElement,
    plugins: [withAlign]
}
