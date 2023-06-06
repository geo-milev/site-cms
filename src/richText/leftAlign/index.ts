import withAlign from "../common/plugin";
import Button from "./Button";
import LeftAlignElement from "./Element";

export default {
    name: 'left',
    Button: Button,
    Element: LeftAlignElement,
    plugins: [withAlign]
}
